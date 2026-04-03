// js/app.js — ініціалізація та навігація

// ===== TABS =====
document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.tab;
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + id).classList.add('active');

    // Lazy init
    if (id === 'simulate') initSimulate();
    if (id === 'formulas') renderFormulas();
    if (id === 'venn') initVenn();
  });
});

// ===== SIM TABS =====
document.querySelectorAll('.sim-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.sim;
    document.querySelectorAll('.sim-tab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.sim-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('sim-' + id).classList.add('active');
  });
});

// ===== INIT =====
let simulateInited = false, formulasInited = false, vennInited = false;

function initSimulate() {
  if (simulateInited) return;
  simulateInited = true;
  updateBalls();
  runCoin();
  runDice();
}

function initVenn() {
  if (vennInited) return;
  vennInited = true;
  // Set default
  const firstBtn = document.querySelector('.venn-btn');
  if (firstBtn) setVenn('A', firstBtn);
}

function renderFormulas() {
  if (formulasInited) return;
  formulasInited = true;
  const grid = document.getElementById('formulas-grid');
  grid.innerHTML = FORMULAS.map(f => `
    <div class="formula-card">
      <div class="qtag ${f.tag}">${f.tagLabel}</div>
      <span class="formula-main">${f.formula}</span>
      <div class="formula-desc">${f.desc}</div>
    </div>`).join('');
}

// ===== STARTUP =====
renderQ();
