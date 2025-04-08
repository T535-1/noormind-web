let moodData = [];

function switchScreen(screenId) {
  document.querySelectorAll(".screen").forEach(el => el.style.display = "none");
  document.getElementById(screenId + "-screen").style.display = "block";
}

function analyzeMood() {
  const text = document.getElementById("mood-input").value.toLowerCase();
  let score = 0;
  const pos = ["happy", "joy", "peace", "calm", "content"];
  const neg = ["sad", "anxious", "angry", "stress", "depressed"];

  pos.forEach(word => { if (text.includes(word)) score += 1; });
  neg.forEach(word => { if (text.includes(word)) score -= 1; });

  const mood = score > 0 ? "إيجابي" : score < 0 ? "سلبي" : "محايد";
  document.getElementById("mood-recommendation").textContent =
    `مزاجك: ${mood} - ننصحك بجلسة "التنفس الواعي"`;

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
        label: 'تحليل المزاج',
        data: moodData,
        borderColor: 'teal',
        backgroundColor: 'rgba(0, 128, 128, 0.2)',
        tension: 0.3
      }]
    },
    options: {
      scales: {
        y: {
          min: -3,
          max: 3
        }
      }
    }
  });
}
