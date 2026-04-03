// js/simulate.js

let coinChartInst = null, diceChartInst = null;

// ===== COIN =====
function runCoin() {
  const n = parseInt(document.getElementById('coinN').value);
  let h = 0;
  const series = [];
  for (let i = 1; i <= n; i++) {
    if (Math.random() < 0.5) h++;
    series.push(parseFloat((h / i).toFixed(4)));
  }
  document.getElementById('c-total').textContent = n;
  document.getElementById('c-heads').textContent = h;
  document.getElementById('c-tails').textContent = n - h;

  const ph = Math.round(h / n * 100);
  document.getElementById('bh').style.width = ph + '%';
  document.getElementById('bh-p').textContent = ph + '%';
  document.getElementById('bt').style.width = (100 - ph) + '%';
  document.getElementById('bt-p').textContent = (100 - ph) + '%';

  drawCoinLineChart(series, n);
}

function runCoinMany() {
  const freq = Array(101).fill(0);
  for (let s = 0; s < 500; s++) {
    let h = 0;
    for (let i = 0; i < 100; i++) if (Math.random() < 0.5) h++;
    freq[h]++;
  }
  const labels = [], data = [];
  for (let i = 30; i <= 70; i++) { labels.push(i); data.push(freq[i]); }

  if (coinChartInst) coinChartInst.destroy();
  const ctx = document.getElementById('coinChart').getContext('2d');
  coinChartInst = new Chart(ctx, {
    type: 'bar',
    data: { labels, datasets: [{ label: 'Частота', data, backgroundColor: 'rgba(37,99,235,0.65)', borderWidth: 0 }] },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => c.raw + ' серій' } } },
      scales: {
        x: { title: { display: true, text: 'Кількість орлів зі 100 підкидань', font: { size: 11 } } },
        y: { title: { display: true, text: 'Кількість серій', font: { size: 11 } } }
      }
    }
  });
  document.getElementById('c-total').textContent = '500×100';
  document.getElementById('c-heads').textContent = '≈50';
  document.getElementById('c-tails').textContent = '≈50';
  document.getElementById('bh').style.width = '50%'; document.getElementById('bh-p').textContent = '50%';
  document.getElementById('bt').style.width = '50%'; document.getElementById('bt-p').textContent = '50%';
}

function drawCoinLineChart(series, n) {
  if (coinChartInst) coinChartInst.destroy();
  const step = Math.max(1, Math.floor(n / 200));
  const labels = [], data = [];
  for (let i = 0; i < series.length; i += step) { labels.push(i + 1); data.push(series[i]); }

  const ctx = document.getElementById('coinChart').getContext('2d');
  coinChartInst = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        { label: 'Факт. ймов.', data, borderColor: '#2563eb', borderWidth: 1.5, pointRadius: 0, tension: 0.2 },
        { label: 'Теор. 0,5', data: labels.map(() => 0.5), borderColor: '#059669', borderWidth: 1.5, borderDash: [5, 4], pointRadius: 0 }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { min: 0, max: 1, title: { display: true, text: 'P(Орел)', font: { size: 11 } } }
      }
    }
  });
}

// ===== DICE =====
function runDice() {
  const n = parseInt(document.getElementById('diceN').value);
  const counts = Array(6).fill(0);
  for (let i = 0; i < n; i++) counts[Math.floor(Math.random() * 6)]++;

  const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
  document.getElementById('diceGrid').innerHTML = counts.map((c, i) =>
    `<div class="die"><div class="die-face">${faces[i]}</div><div class="die-n">${c}</div><div class="die-p">${(c / n * 100).toFixed(1)}%</div></div>`
  ).join('');

  if (diceChartInst) diceChartInst.destroy();
  const ctx = document.getElementById('diceChart').getContext('2d');
  diceChartInst = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['1', '2', '3', '4', '5', '6'],
      datasets: [
        { label: 'Факт.', data: counts.map(c => parseFloat((c / n).toFixed(4))), backgroundColor: 'rgba(37,99,235,0.65)', borderWidth: 0 },
        { label: 'Теор. 1/6', data: Array(6).fill(parseFloat((1 / 6).toFixed(4))), type: 'line', borderColor: '#059669', borderWidth: 2, borderDash: [5, 4], pointRadius: 0 }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { min: 0, max: 0.35, ticks: { callback: v => v.toFixed(2) }, title: { display: true, text: 'Відносна частота', font: { size: 11 } } }
      }
    }
  });
}

// ===== BALLS =====
function updateBalls() {
  const nEl = document.getElementById('totalBalls');
  const mEl = document.getElementById('redBalls');
  let n = parseInt(nEl.value);
  let m = parseInt(mEl.value);

  mEl.max = n - 1;
  if (m >= n) { m = n - 1; mEl.value = m; }

  document.getElementById('totalBallsVal').textContent = n;
  document.getElementById('redBallsVal').textContent = m;

  const viz = document.getElementById('ballViz');
  viz.innerHTML = Array(n).fill(0).map((_, i) =>
    `<div class="ball ${i < m ? 'red' : 'gray'}"></div>`
  ).join('');

  const p = (m / n).toFixed(2).replace('.', ',');
  document.getElementById('b-n').textContent = n;
  document.getElementById('b-m').textContent = m;
  document.getElementById('b-p').textContent = p;
  document.getElementById('ballInfo').textContent =
    `Із ${n} куль ${m} червоних. P(червона) = ${m}/${n} = ${p}`;
}

// Slider live update labels
['coinN', 'diceN'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('input', () => {
    document.getElementById(id + 'Val').textContent = el.value;
  });
});
