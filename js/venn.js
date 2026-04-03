// js/venn.js

const VENN_DATA = {
  A: {
    A: 'rgba(37,99,235,0.3)', B: 'transparent', int: 'transparent', outer: 'transparent', AminB: 'transparent',
    info: '<strong>Подія A</strong> — підмножина Ω, що містить всі елементарні події, сприятливі для A.<br><span class="formula-inline">P(A) = m / n</span>'
  },
  B: {
    A: 'transparent', B: 'rgba(37,99,235,0.3)', int: 'transparent', outer: 'transparent', AminB: 'transparent',
    info: '<strong>Подія B</strong> — підмножина Ω, що містить всі елементарні події, сприятливі для B.<br><span class="formula-inline">P(B) = m / n</span>'
  },
  AiB: {
    A: 'transparent', B: 'transparent', int: 'rgba(37,99,235,0.55)', outer: 'transparent', AminB: 'transparent',
    info: '<strong>A ∩ B — перетин (добуток)</strong> — події A і B відбуваються одночасно.<br>Незалежні: <span class="formula-inline">P(A∩B) = P(A)·P(B)</span><br>Залежні: <span class="formula-inline">P(A∩B) = P(A)·P(B|A)</span>'
  },
  AuB: {
    A: 'rgba(37,99,235,0.25)', B: 'rgba(37,99,235,0.25)', int: 'rgba(37,99,235,0.25)', outer: 'transparent', AminB: 'transparent',
    info: '<strong>A ∪ B — об\'єднання (сума)</strong> — відбувається хоча б одна з подій.<br>Сумісні: <span class="formula-inline">P(A∪B) = P(A)+P(B)−P(A∩B)</span><br>Несумісні: <span class="formula-inline">P(A∪B) = P(A)+P(B)</span>'
  },
  notA: {
    A: 'transparent', B: 'rgba(37,99,235,0.2)', int: 'transparent', outer: 'rgba(37,99,235,0.2)', AminB: 'transparent',
    info: '<strong>Ā — протилежна (доповнення)</strong> — подія A НЕ відбулась.<br><span class="formula-inline">P(Ā) = 1 − P(A)</span><br>P(A) + P(Ā) = 1 завжди.'
  },
  AminB: {
    A: 'rgba(37,99,235,0.3)', B: 'transparent', int: 'transparent', outer: 'transparent', AminB: 'rgba(220,50,50,0.2)',
    info: '<strong>A \\ B — різниця</strong> — подія A відбулась, але B — ні.<br>Це частина A, що не перетинається з B.<br><span class="formula-inline">A \\ B = A ∩ B̄</span>'
  },
  none: {
    A: 'transparent', B: 'transparent', int: 'transparent', outer: 'transparent', AminB: 'transparent',
    info: '<strong>∅ — неможлива подія</strong> — при жодному наслідку даного досліду не відбувається.<br><span class="formula-inline">P(∅) = 0</span>'
  }
};

function setVenn(type, btn) {
  document.querySelectorAll('.venn-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const d = VENN_DATA[type];
  document.getElementById('vA-bg').setAttribute('fill', d.A);
  document.getElementById('vB-bg').setAttribute('fill', d.B);
  document.getElementById('vInt').setAttribute('fill',  d.int);
  document.getElementById('vU-bg').setAttribute('fill', d.outer);

  // AminB overlay — covers A minus intersection
  const aminb = document.getElementById('vAminB');
  if (type === 'AminB') {
    aminb.setAttribute('fill', 'rgba(220,50,50,0.2)');
    // hide the intersection part by drawing it white
    document.getElementById('vInt').setAttribute('fill', 'rgba(255,255,255,0.6)');
  } else {
    aminb.setAttribute('fill', 'transparent');
  }

  document.getElementById('venn-info').innerHTML = d.info;
}
