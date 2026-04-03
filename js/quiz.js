// js/quiz.js

let curQ = 0, correctCount = 0, errorCount = 0, answered = false;

function renderQ() {
  const q = QUESTIONS[curQ];
  const total = QUESTIONS.length;

  document.getElementById('sc-left').textContent = (total - curQ) + ' задач';
  document.getElementById('prog').style.width = (curQ / total * 100) + '%';
  document.getElementById('btn-next').style.display = 'none';
  document.getElementById('btn-hint').style.display = 'inline-block';
  answered = false;

  const html = `
    <div class="qcard">
      <div class="qtag ${q.tag}">${q.tagLabel}</div>
      <div class="qtext"><span class="qnum">Задача ${curQ + 1} / ${total}.</span> ${q.text}</div>
      <div class="choices" id="choices">
        ${q.choices.map((c, i) =>
          `<button class="choice" data-idx="${i}" onclick="checkAnswer(${i})">${c}</button>`
        ).join('')}
      </div>
      <div class="solution" id="sol">
        <div class="solution-title">Розв'язання:</div>
        <pre>${q.solution}</pre>
      </div>
    </div>`;
  document.getElementById('qarea').innerHTML = html;
}

function checkAnswer(idx) {
  if (answered) return;
  answered = true;

  const q = QUESTIONS[curQ];
  const correctIdx = q.answer;
  const btns = document.querySelectorAll('.choice');

  btns.forEach((b, i) => {
    b.onclick = null;
    if (i === correctIdx) b.classList.add('show-correct');
    if (i === idx && idx !== correctIdx) b.classList.add('wrong');
    if (i === idx && idx === correctIdx) {
      b.classList.remove('show-correct');
      b.classList.add('correct');
    }
  });

  if (idx === correctIdx) {
    correctCount++;
    document.getElementById('sc-ok').textContent = '✓ ' + correctCount + ' правильно';
  } else {
    errorCount++;
    document.getElementById('sc-err').textContent = '✗ ' + errorCount + ' помилок';
  }

  document.getElementById('sol').classList.add('visible');
  document.getElementById('btn-next').style.display = 'inline-block';
  document.getElementById('btn-hint').style.display = 'none';
}

function showHint() {
  if (answered) return;
  const q = QUESTIONS[curQ];
  alert('💡 Підказка:\n\n' + q.hint);
}

function nextQ() {
  curQ++;
  if (curQ >= QUESTIONS.length) {
    showResult();
    return;
  }
  renderQ();
}

function showResult() {
  const total = QUESTIONS.length;
  const pct = Math.round(correctCount / total * 100);
  let msg, color;
  if (pct >= 80) { msg = '🎉 Чудовий результат! Ти готовий до НМТ.'; color = '#059669'; }
  else if (pct >= 60) { msg = '👍 Добре! Ще трохи практики — і буде відмінно.'; color = '#2563eb'; }
  else if (pct >= 40) { msg = '📚 Непогано, але є над чим попрацювати.'; color = '#d97706'; }
  else { msg = '💪 Поверни до теорії та спробуй ще раз!'; color = '#dc2626'; }

  document.getElementById('qarea').innerHTML = `
    <div class="result-box">
      <div class="result-score" style="color:${color}">${correctCount} / ${total}</div>
      <div class="result-msg">${pct}% правильних відповідей<br>${msg}</div>
    </div>`;
  document.getElementById('btn-next').style.display = 'none';
  document.getElementById('btn-hint').style.display = 'none';
  document.getElementById('sc-left').textContent = 'Завершено';
  document.getElementById('prog').style.width = '100%';
}

function restartQuiz() {
  curQ = 0; correctCount = 0; errorCount = 0; answered = false;
  document.getElementById('sc-ok').textContent  = '✓ 0 правильно';
  document.getElementById('sc-err').textContent = '✗ 0 помилок';
  document.getElementById('prog').style.width   = '0%';
  renderQ();
}
