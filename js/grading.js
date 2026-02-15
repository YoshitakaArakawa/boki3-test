// ============================
// 採点ロジック
// ============================
var Grading = (function () {

  function checkJournal(expected, user) {
    if (expected.length !== user.length) return false;
    var sortedExp = expected.slice().sort(function (a, b) { return a.account.localeCompare(b.account); });
    var sortedUser = user.slice().sort(function (a, b) { return a.account.localeCompare(b.account); });
    return sortedExp.every(function (e, i) {
      return e.account === sortedUser[i].account && e.amount === sortedUser[i].amount;
    });
  }

  function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    return a.every(function (v, i) { return v === b[i]; });
  }

  function submitExam() {
    if (App.timerInterval) clearInterval(App.timerInterval);

    if (!confirm('採点しますか？\n（採点後は解答を変更できません）')) {
      if (App.currentMode === 'full' && App.timeLeft > 0) {
        App.startTimer();
      }
      return;
    }

    var score1 = 0, score2 = 0, score3 = 0;
    var total1 = 0, total2 = 0, total3 = 0;
    var details = { q1: [], q2p1: [], q2p2: [], q3: [] };

    // --- 第1問採点（各3点） ---
    total1 = App.shiwakeQuestions.length * 3;

    App.shiwakeQuestions.forEach(function (q, i) {
      var maxDebit = Math.max(q.debit.length, 2);
      var maxCredit = Math.max(q.credit.length, 2);
      var maxRows = Math.max(maxDebit, maxCredit);
      var userDebit = [], userCredit = [];

      for (var r = 0; r < maxRows; r++) {
        var dAcc = (document.getElementById('q1_' + i + '_d_acc_' + r) || {}).value || '';
        var dAmt = parseInt((document.getElementById('q1_' + i + '_d_amt_' + r) || {}).value) || 0;
        var cAcc = (document.getElementById('q1_' + i + '_c_acc_' + r) || {}).value || '';
        var cAmt = parseInt((document.getElementById('q1_' + i + '_c_amt_' + r) || {}).value) || 0;
        if (dAcc) userDebit.push({ account: dAcc, amount: dAmt });
        if (cAcc) userCredit.push({ account: cAcc, amount: cAmt });
      }

      var correct = checkJournal(q.debit, userDebit) && checkJournal(q.credit, userCredit);
      if (correct) score1 += 3;
      details.q1.push({ question: q, userDebit: userDebit, userCredit: userCredit, correct: correct });
    });

    // --- 第2問採点 ---
    if (App.currentMode !== 'quick') {
      total2 = 20;

      // Part 1: 補助簿選択（各2.5点 × 4問 = 10点）
      App.hojoboboQuestions.forEach(function (q, i) {
        var checked = Array.from(document.querySelectorAll('input[name="q2p1_' + i + '"]:checked'))
          .map(function (cb) { return cb.value; });
        var correct = arraysEqual(checked.sort(), q.books.slice().sort());
        if (correct) score2 += 2.5;
        details.q2p1.push({ question: q, userAnswer: checked, correct: correct });
      });

      // Part 2: 理論問題（各2.5点 × 4問 = 10点）
      App.rironQuestions.forEach(function (q, i) {
        var userVal = (document.getElementById('q2p2_' + i) || {}).value || '';
        var correct = userVal === q.answer;
        if (correct) score2 += 2.5;
        details.q2p2.push({ question: q, userAnswer: userVal, correct: correct });
      });
    }

    // --- 第3問採点（各5点 × 7問 = 35点） ---
    if (App.currentMode !== 'quick') {
      total3 = 35;

      App.kessanData.questions.forEach(function (q) {
        var userVal = parseInt((document.getElementById(q.id) || {}).value) || 0;
        var correct = userVal === q.answer;
        if (correct) score3 += q.points;
        details.q3.push({ question: q, userAnswer: userVal, correct: correct, correctAnswer: q.answer });
      });
    }

    // スコア算出（モード別）
    var totalPossible, totalScore;
    if (App.currentMode === 'quick') {
      totalPossible = total1;
      totalScore = score1;
    } else if (App.currentMode === 'section') {
      if (App.selectedSection === 1) { totalPossible = total1; totalScore = score1; }
      else if (App.selectedSection === 2) { totalPossible = total2; totalScore = score2; }
      else { totalPossible = total3; totalScore = score3; }
    } else {
      totalPossible = 100;
      totalScore = score1 + score2 + score3;
    }

    var pct = Math.round((totalScore / totalPossible) * 100);
    var passed = pct >= 70;

    // 履歴保存
    var timeUsed = App.currentMode === 'full' ? (3600 - App.timeLeft) : null;
    History.save({
      mode: App.currentMode,
      selectedSection: App.selectedSection,
      timeUsed: timeUsed,
      scores: {
        total: totalScore,
        possible: totalPossible,
        section1: { score: score1, possible: total1 },
        section2: { score: score2, possible: total2 },
        section3: { score: score3, possible: total3 }
      },
      passed: passed,
      details: details
    });

    // 結果表示
    Render.renderResults(totalScore, totalPossible, score1, total1, score2, total2, score3, total3, details);
  }

  return {
    submitExam: submitExam
  };
})();
