let moodData = [];

function switchScreen(screenId) {
  document.querySelectorAll(".screen").forEach(el => el.style.display = "none");
  document.getElementById(screenId + "-screen").style.display = "block";
}

function analyzeMood() {
  const text = document.getElementById("mood-input").value.toLowerCase();
  let score = 0;

  // الكلمات المفتاحية العربية
  const pos = ["رضا", "سعادة", "طمأنينة", "راحة", "حب الله", "يقين"];
  const neg = ["حزن", "قلق", "غضب", "تعب", "ذنوب", "غفلة"];

  pos.forEach(word => { if (text.includes(word)) score += 1; });
  neg.forEach(word => { if (text.includes(word)) score -= 1; });

  // تحليل الحالة
  const mood =
    score > 0 ? "🌿 حالتك إيجابية – واصل الذكر والتأمل" :
    score < 0 ? "🌧 حالتك تحتاج للهدوء – جرب جلسة استغفار وتأمل" :
    "🌗 حالتك متوازنة – استمر بمحاسبة النفس والذكر";

  document.getElementById("mood-recommendation").textContent = mood;

  moodData.push(score);
  renderChart();
}

function renderChart() {
  const ctx = document.getElementById("mood-chart").getContext("2d");
  if (window.moodChart) window.moodChart.destroy();
  window.moodChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: moodData.map((_, i) => i + 1),
      datasets: [{
        label: 'المزاج الروحي',
        data: moodData,
        borderColor: 'green',
        backgroundColor: 'rgba(0, 128, 0, 0.2)',
        tension: 0.3
      }]
    },
    options: {
      scales: {
        y: {
          min: -3,
          max: 3,
          ticks: {
            callback: function(value) {
              return value === 0 ? 'محايد' : value > 0 ? 'إيجابي' : 'سلبي';
            }
          }
        }
      }
    }
  });
}
