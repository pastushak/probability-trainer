// js/stats.js

function loadExample(str) {
  document.getElementById('statsInput').value = str;
  calcStats();
}

function calcStats() {
  const raw = document.getElementById('statsInput').value.trim();
  if (!raw) return;

  const nums = raw.split(/[\s,;]+/).map(s => parseFloat(s.replace(',', '.'))).filter(n => !isNaN(n));
  if (nums.length === 0) {
    document.getElementById('statsResult').innerHTML = '<p style="color:#dc2626">Не вдалося розпізнати числа.</p>';
    return;
  }

  const sorted = [...nums].sort((a, b) => a - b);
  const n = sorted.length;

  // Mean
  const mean = nums.reduce((s, v) => s + v, 0) / n;

  // Median
  let median;
  if (n % 2 === 1) {
    median = sorted[Math.floor(n / 2)];
  } else {
    median = (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
  }

  // Mode
  const freq = {};
  nums.forEach(v => { freq[v] = (freq[v] || 0) + 1; });
  const maxFreq = Math.max(...Object.values(freq));
  const modes = Object.keys(freq).filter(k => freq[k] === maxFreq).map(Number);
  const modeStr = maxFreq === 1 ? 'немає' : modes.join(', ');

  // Range
  const range = sorted[n - 1] - sorted[0];

  // Format helper
  const fmt = v => {
    const r = Math.round(v * 1000) / 1000;
    return r.toString().replace('.', ',');
  };

  // Frequency table (for discrete data with repetitions)
  const freqEntries = Object.entries(freq).sort((a, b) => Number(a[0]) - Number(b[0]));
  const hasFreq = freqEntries.some(([, f]) => f > 1);

  let freqTable = '';
  if (hasFreq && freqEntries.length <= 20) {
    const relFreq = freqEntries.map(([v, f]) => `<td>${fmt(f / n)}</td>`).join('');
    freqTable = `
      <div style="overflow-x:auto;margin-top:1rem">
        <table style="border-collapse:collapse;font-size:13px;width:100%">
          <thead>
            <tr>
              <th style="text-align:left;padding:6px 10px;background:#f2f1ee;border:1px solid #ddd">xᵢ</th>
              ${freqEntries.map(([v]) => `<th style="padding:6px 10px;background:#f2f1ee;border:1px solid #ddd">${fmt(Number(v))}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:6px 10px;border:1px solid #ddd;font-weight:500">nᵢ (частота)</td>
              ${freqEntries.map(([, f]) => `<td style="padding:6px 10px;border:1px solid #ddd;text-align:center">${f}</td>`).join('')}
            </tr>
            <tr>
              <td style="padding:6px 10px;border:1px solid #ddd;font-weight:500">wᵢ (відн. частота)</td>
              ${freqEntries.map(([, f]) => `<td style="padding:6px 10px;border:1px solid #ddd;text-align:center">${fmt(f / n)}</td>`).join('')}
            </tr>
          </tbody>
        </table>
      </div>`;
  }

  document.getElementById('statsResult').innerHTML = `
    <div class="sorted-row">Впорядкований ряд: ${sorted.map(fmt).join(', ')}<br>
    <span style="color:#888;font-size:12px">n = ${n}</span></div>
    <div class="stats-grid">
      <div class="stats-card"><div class="val">${fmt(mean)}</div><div class="lbl">Середнє арифметичне (x̄)</div></div>
      <div class="stats-card"><div class="val">${fmt(median)}</div><div class="lbl">Медіана (Me)</div></div>
      <div class="stats-card"><div class="val">${modeStr}</div><div class="lbl">Мода (Mo)</div></div>
      <div class="stats-card"><div class="val">${fmt(range)}</div><div class="lbl">Розмах (R)</div></div>
      <div class="stats-card"><div class="val">${fmt(sorted[0])}</div><div class="lbl">Мінімум</div></div>
      <div class="stats-card"><div class="val">${fmt(sorted[n - 1])}</div><div class="lbl">Максимум</div></div>
    </div>
    ${freqTable}`;
}
