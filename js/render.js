// ============================
// 画面描画
// ============================
var Render = (function () {

  // --- 第1問：仕訳問題（6択形式） ---
  function renderSection1() {
    var container = document.getElementById('section1');
    var label = App.currentMode === 'quick' ? 'クイック確認（仕訳5問）' : '第1問　仕訳問題';
    var pts = App.currentMode === 'quick' ? '15点' : '45点';

    var html = '<div class="card"><h2>' + label + ' <span style="font-size:0.85rem;color:var(--gray-500)">' + pts + '</span></h2></div>';

    App.shiwakeQuestions.forEach(function (q, i) {
      var maxDebit = Math.max(q.debit.length, 2);
      var maxCredit = Math.max(q.credit.length, 2);
      var maxRows = Math.max(maxDebit, maxCredit);

      // 選択肢ラベル（ア〜カ）
      var choiceText = q.choices.map(function (c, idx) {
        return CHOICE_LABELS[idx] + '. ' + c;
      }).join('　');

      html += '<div class="card" id="q1_' + i + '">' +
        '<div class="card-header">' +
        '<h3><span class="q-number">' + (i + 1) + '</span> 仕訳問題</h3>' +
        '<span style="color:var(--gray-500);font-size:0.85rem">3点</span>' +
        '</div>' +
        '<div class="question-text">' + q.q + '</div>' +
        '<div style="padding:8px 12px;margin-bottom:12px;background:var(--gray-100);border-radius:var(--radius);font-size:0.85rem;line-height:1.8">' +
        choiceText + '</div>' +
        '<div class="journal-entry">' +
        '<div class="journal-side debit"><h4>借方（左側）</h4>';

      for (var r = 0; r < maxRows; r++) {
        html += '<div class="journal-row">' +
          '<select id="q1_' + i + '_d_acc_' + r + '">' +
          buildChoiceOptions(q.choices) +
          '</select>' +
          '<input type="number" id="q1_' + i + '_d_amt_' + r + '" placeholder="金額">' +
          '</div>';
      }

      html += '</div><div class="journal-side credit"><h4>貸方（右側）</h4>';

      for (var r = 0; r < maxRows; r++) {
        html += '<div class="journal-row">' +
          '<select id="q1_' + i + '_c_acc_' + r + '">' +
          buildChoiceOptions(q.choices) +
          '</select>' +
          '<input type="number" id="q1_' + i + '_c_amt_' + r + '" placeholder="金額">' +
          '</div>';
      }

      html += '</div></div></div>';
    });

    container.innerHTML = html;
  }

  function buildChoiceOptions(choices) {
    var html = '<option value="">-- 勘定科目 --</option>';
    choices.forEach(function (c, idx) {
      html += '<option value="' + c + '">' + CHOICE_LABELS[idx] + '. ' + c + '</option>';
    });
    return html;
  }

  // --- 第2問：補助簿・理論 ---
  function renderSection2() {
    var container = document.getElementById('section2');
    var html = '<div class="card"><h2>第2問　補助簿・理論問題 <span style="font-size:0.85rem;color:var(--gray-500)">20点</span></h2></div>';

    // Part 1: 補助簿選択（4問 × 2.5点 = 10点）
    html += '<div class="card"><h3 style="margin-bottom:16px">次の各取引について、記入が必要な補助簿をすべて選びなさい。</h3>';

    App.hojoboboQuestions.forEach(function (q, i) {
      html += '<div style="margin-bottom:24px;padding:16px;background:var(--gray-50);border-radius:var(--radius)" id="q2p1_' + i + '">' +
        '<p style="font-weight:600;margin-bottom:12px"><span class="q-number">' + (i + 1) + '</span>' + q.q + '</p>' +
        '<div class="checkbox-group">';

      q.allBooks.forEach(function (book) {
        html += '<label class="checkbox-label" onclick="App.toggleCheckbox(this)">' +
          '<input type="checkbox" name="q2p1_' + i + '" value="' + book + '"> ' + book +
          '</label>';
      });

      html += '</div></div>';
    });
    html += '</div>';

    // Part 2: 理論問題（4問 × 2.5点 = 10点）— 1空欄5択（ア〜オ）
    html += '<div class="card"><h3 style="margin-bottom:16px">次の文章の（　　）にあてはまる語句を選びなさい。</h3>';

    App.rironQuestions.forEach(function (q, i) {
      html += '<div style="margin-bottom:24px;padding:16px;background:var(--gray-50);border-radius:var(--radius)" id="q2p2_' + i + '">' +
        '<p style="margin-bottom:12px"><span class="q-number">' + (i + 1) + '</span>' + q.q + '</p>' +
        '<div>' +
        '<select id="q2p2_' + i + '" style="padding:8px 12px;border:1px solid var(--gray-300);border-radius:4px;font-size:0.95rem;min-width:200px">' +
        '<option value="">-- 選択 --</option>';

      q.choices.forEach(function (c, ci) {
        var label = ['ア', 'イ', 'ウ', 'エ', 'オ'][ci] || '';
        html += '<option value="' + c + '">' + label + '. ' + c + '</option>';
      });

      html += '</select></div></div>';
    });
    html += '</div>';

    container.innerHTML = html;
  }

  // --- 第3問：決算整理 ---
  function renderSection3() {
    var container = document.getElementById('section3');
    var kd = App.kessanData;

    var html = '<div class="card"><h2>第3問　決算整理 <span style="font-size:0.85rem;color:var(--gray-500)">35点</span></h2></div>' +
      '<div class="card">' +
      '<h3 style="margin-bottom:16px">' + kd.title + '</h3>' +
      '<h4 style="margin:16px 0 8px">【決算整理前残高試算表】</h4>' +
      '<table class="data-table"><thead><tr><th>勘定科目</th><th>借方</th><th>貸方</th></tr></thead><tbody>';

    kd.trialBalance.forEach(function (row) {
      html += '<tr><td>' + row.account + '</td>' +
        '<td class="amount">' + (row.debit ? row.debit.toLocaleString() : '') + '</td>' +
        '<td class="amount">' + (row.credit ? row.credit.toLocaleString() : '') + '</td></tr>';
    });

    html += '</tbody></table>' +
      '<h4 style="margin:24px 0 8px">【決算整理事項】</h4>' +
      '<div style="padding:16px;background:var(--gray-50);border-radius:var(--radius);margin-bottom:20px">';

    kd.adjustments.forEach(function (a) {
      html += '<p style="margin-bottom:8px">' + a + '</p>';
    });

    html += '</div>' +
      '<h4 style="margin:24px 0 12px">【解答欄】各金額を計算して入力してください。</h4>';

    kd.questions.forEach(function (q) {
      html += '<div class="q3-answer-row" style="display:flex;align-items:center;gap:12px;margin-bottom:12px;padding:12px;background:var(--gray-50);border-radius:var(--radius);flex-wrap:wrap" id="' + q.id + '_wrap">' +
        '<label style="flex:1;min-width:120px;font-weight:600;font-size:0.95rem">' + q.label + '</label>' +
        '<div style="display:flex;align-items:center;gap:4px"><span>¥</span>' +
        '<input type="number" id="' + q.id + '" style="width:150px;padding:10px 8px;border:1px solid var(--gray-300);border-radius:4px;text-align:right;font-size:1rem" placeholder="金額を入力">' +
        '</div>' +
        '<span style="font-size:0.8rem;color:var(--gray-500)">' + q.points + '点</span>' +
        '</div>';
    });

    html += '</div>';
    container.innerHTML = html;
  }

  // --- 結果画面 ---
  function renderResults(total, possible, s1, t1, s2, t2, s3, t3, details) {
    var pct = Math.round((total / possible) * 100);
    var passed = pct >= 70;
    var screen = document.getElementById('result-screen');

    var html = '<div class="header"><h1>採点結果</h1></div>' +
      '<div class="card result-card">' +
      '<h2>' + (passed ? '合格！' : 'もう少し！') + '</h2>' +
      '<div class="result-score ' + (passed ? 'pass' : 'fail') + '">' + total + '点 / ' + possible + '点</div>' +
      '<p style="font-size:1.2rem;color:var(--gray-500)">(' + pct + '%)</p>';

    if (App.currentMode === 'full') {
      html += '<div class="result-detail">' +
        '<div class="result-item"><h4>第1問 仕訳</h4><div class="score">' + s1 + ' / ' + t1 + '</div></div>' +
        '<div class="result-item"><h4>第2問 補助簿・理論</h4><div class="score">' + s2 + ' / ' + t2 + '</div></div>' +
        '<div class="result-item"><h4>第3問 決算</h4><div class="score">' + s3 + ' / ' + t3 + '</div></div>' +
        '</div>';
    }
    html += '</div>';

    html += renderQ1Details(details.q1);
    html += renderQ2Details(details.q2p1, details.q2p2);
    html += renderQ3Details(details.q3);

    html += '<div class="btn-group" style="margin:32px 0">' +
      '<button class="btn btn-primary btn-lg" onclick="App.resetExam()">もう一度挑戦</button>' +
      '<button class="btn btn-outline btn-lg" onclick="App.showHistory()">受験履歴を見る</button>' +
      '</div>';

    screen.innerHTML = html;
    document.getElementById('exam-screen').classList.add('hidden');
    screen.classList.remove('hidden');
    window.scrollTo(0, 0);
  }

  function renderQ1Details(q1) {
    if (!q1 || q1.length === 0) return '';

    var html = '<div class="card"><h3 style="margin-bottom:16px">第1問　解答・解説</h3>';
    q1.forEach(function (d, i) {
      var borderColor = d.correct ? 'var(--success)' : 'var(--danger)';
      var bgColor = d.correct ? 'var(--success-light)' : 'var(--danger-light)';
      var icon = d.correct ? '○' : '×';

      html += '<div style="margin-bottom:20px;padding:16px;border-radius:var(--radius);border:2px solid ' + borderColor + ';background:' + bgColor + '">' +
        '<p style="font-weight:600;margin-bottom:8px">' + icon + ' 問' + (i + 1) + ': ' + d.question.q + '</p>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:8px 0;font-size:0.9rem">' +
        '<div><strong>あなたの解答（借方）:</strong><br>' + formatEntries(d.userDebit) + '</div>' +
        '<div><strong>あなたの解答（貸方）:</strong><br>' + formatEntries(d.userCredit) + '</div></div>';

      if (!d.correct) {
        html += '<div class="correct-answer-display"><strong>正解：</strong><br>' +
          '借方: ' + d.question.debit.map(function (e) { return e.account + ' ' + e.amount.toLocaleString(); }).join(' / ') + '<br>' +
          '貸方: ' + d.question.credit.map(function (e) { return e.account + ' ' + e.amount.toLocaleString(); }).join(' / ') +
          '</div>';
      }
      html += '<div class="explanation">' + d.question.explanation + '</div></div>';
    });
    return html + '</div>';
  }

  function renderQ2Details(q2p1, q2p2) {
    if ((!q2p1 || q2p1.length === 0) && (!q2p2 || q2p2.length === 0)) return '';

    var html = '';

    // 補助簿選択
    if (q2p1 && q2p1.length > 0) {
      html += '<div class="card"><h3 style="margin-bottom:16px">第2問(1)　補助簿選択・解説</h3>';
      q2p1.forEach(function (d, i) {
        var borderColor = d.correct ? 'var(--success)' : 'var(--danger)';
        var bgColor = d.correct ? 'var(--success-light)' : 'var(--danger-light)';
        var icon = d.correct ? '○' : '×';

        html += '<div style="margin-bottom:16px;padding:16px;border-radius:var(--radius);border:2px solid ' + borderColor + ';background:' + bgColor + '">' +
          '<p style="font-weight:600;margin-bottom:8px">' + icon + ' 問' + (i + 1) + ': ' + d.question.q + '</p>' +
          '<p style="font-size:0.9rem">あなたの解答: ' + (d.userAnswer.join(', ') || '（未選択）') + '</p>';

        if (!d.correct) {
          html += '<div class="correct-answer-display">正解: ' + d.question.books.join(', ') + '</div>';
        }
        html += '<div class="explanation">' + d.question.explanation + '</div></div>';
      });
      html += '</div>';
    }

    // 理論問題（1空欄形式）
    if (q2p2 && q2p2.length > 0) {
      html += '<div class="card"><h3 style="margin-bottom:16px">第2問(2)　理論問題・解説</h3>';
      q2p2.forEach(function (d, i) {
        var borderColor = d.correct ? 'var(--success)' : 'var(--danger)';
        var bgColor = d.correct ? 'var(--success-light)' : 'var(--danger-light)';
        var icon = d.correct ? '○' : '×';

        html += '<div style="margin-bottom:16px;padding:16px;border-radius:var(--radius);border:2px solid ' + borderColor + ';background:' + bgColor + '">' +
          '<p style="font-weight:600;margin-bottom:8px">' + icon + ' 問' + (i + 1) + ': ' + d.question.q + '</p>' +
          '<p style="font-size:0.9rem">あなたの解答: ' + (d.userAnswer || '（未回答）') + '</p>';

        if (!d.correct) {
          html += '<div class="correct-answer-display">正解: ' + d.question.answer + '</div>';
        }
        html += '<div class="explanation">' + d.question.explanation + '</div></div>';
      });
      html += '</div>';
    }

    return html;
  }

  function renderQ3Details(q3) {
    if (!q3 || q3.length === 0) return '';

    var html = '<div class="card"><h3 style="margin-bottom:16px">第3問　決算整理・解説</h3>';
    q3.forEach(function (d) {
      var answer = d.correctAnswer !== undefined ? d.correctAnswer : d.question.answer;
      var borderColor = d.correct ? 'var(--success)' : 'var(--danger)';
      var bgColor = d.correct ? 'var(--success-light)' : 'var(--danger-light)';
      var icon = d.correct ? '○' : '×';

      html += '<div style="margin-bottom:16px;padding:16px;border-radius:var(--radius);border:2px solid ' + borderColor + ';background:' + bgColor + '">' +
        '<p style="font-weight:600;margin-bottom:8px">' + icon + ' ' + d.question.label + '</p>' +
        '<p style="font-size:0.9rem">あなたの解答: ¥' + d.userAnswer.toLocaleString() + '</p>';

      if (!d.correct) {
        html += '<div class="correct-answer-display">正解: ¥' + answer.toLocaleString() + '</div>';
      }
      html += '<div class="explanation">' + d.question.explanation + '</div></div>';
    });
    return html + '</div>';
  }

  function formatEntries(entries) {
    if (!entries || entries.length === 0) return '（未回答）';
    return entries.map(function (e) { return e.account + ' ' + e.amount.toLocaleString(); }).join('<br>');
  }

  // --- 履歴一覧画面 ---
  function renderHistoryScreen() {
    var screen = document.getElementById('history-screen');
    var records = History.getAll();
    var stats = History.getStats();

    var html = '<div class="header"><h1>受験履歴</h1><p>過去の成績を確認できます</p></div>';

    if (records.length === 0) {
      html += '<div class="card empty-state">' +
        '<p>まだ受験履歴がありません</p>' +
        '<p style="font-size:0.85rem">テストを受けると、ここに記録されます。</p>' +
        '</div>';
    } else {
      // 統計サマリー
      html += '<div class="card">' +
        '<h3 style="margin-bottom:16px">成績サマリー</h3>' +
        '<div class="history-stats">' +
        '<div class="history-stat"><div class="stat-value">' + stats.count + '</div><div class="stat-label">総受験回数</div></div>' +
        '<div class="history-stat"><div class="stat-value">' + stats.avgScore + '<span style="font-size:0.8rem">点</span></div><div class="stat-label">平均点（本番形式）</div></div>' +
        '<div class="history-stat"><div class="stat-value">' + stats.bestScore + '<span style="font-size:0.8rem">点</span></div><div class="stat-label">最高点（本番形式）</div></div>' +
        '<div class="history-stat"><div class="stat-value">' + stats.passRate + '<span style="font-size:0.8rem">%</span></div><div class="stat-label">合格率（本番形式）</div></div>' +
        '</div></div>';

      // スコア推移グラフ（本番形式のみ、直近20件）
      var fullRecords = records.filter(function (r) { return r.mode === 'full'; }).slice(0, 20).reverse();
      if (fullRecords.length >= 2) {
        html += '<div class="card">' +
          '<h3 style="margin-bottom:16px">スコア推移（本番形式）</h3>' +
          '<div style="position:relative">' +
          '<div class="score-chart">';

        fullRecords.forEach(function (r) {
          var pct = Math.round((r.scores.total / r.scores.possible) * 100);
          var barHeight = Math.max(pct * 1.1, 5);
          var cls = r.passed ? 'pass' : 'fail';
          html += '<div class="score-bar ' + cls + '" style="height:' + barHeight + 'px" title="' + r.scores.total + '点">' +
            '<span class="bar-label">' + r.scores.total + '</span></div>';
        });

        html += '</div>' +
          '<div class="chart-pass-line"><span>70点</span></div>' +
          '<div class="chart-dates">';

        fullRecords.forEach(function (r) {
          var d = new Date(r.date);
          html += '<span>' + (d.getMonth() + 1) + '/' + d.getDate() + '</span>';
        });

        html += '</div></div></div>';
      }

      // 履歴テーブル
      html += '<div class="card">' +
        '<div class="history-header">' +
        '<h3>受験一覧</h3>' +
        '<button class="btn btn-danger btn-sm" onclick="App.clearHistory()">全履歴クリア</button>' +
        '</div>' +
        '<table class="history-table"><thead><tr>' +
        '<th>日時</th><th>モード</th><th>スコア</th><th>合否</th><th>操作</th>' +
        '</tr></thead><tbody>';

      records.forEach(function (r) {
        var d = new Date(r.date);
        var dateStr = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + ' ' +
          String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');

        var modeLabel = { full: '本番形式', section: '大問別', quick: 'クイック' }[r.mode] || r.mode;
        if (r.mode === 'section' && r.selectedSection) {
          modeLabel += '（第' + r.selectedSection + '問）';
        }

        var pct = Math.round((r.scores.total / r.scores.possible) * 100);
        var passClass = r.passed ? 'badge-pass' : 'badge-fail';
        var passLabel = r.passed ? '合格' : '不合格';

        html += '<tr>' +
          '<td>' + dateStr + '</td>' +
          '<td><span class="badge badge-mode">' + modeLabel + '</span></td>' +
          '<td><strong>' + r.scores.total + '</strong> / ' + r.scores.possible + ' (' + pct + '%)</td>' +
          '<td><span class="badge ' + passClass + '">' + passLabel + '</span></td>' +
          '<td>' +
          '<button class="btn btn-outline btn-sm" onclick="App.showHistoryDetail(\'' + r.id + '\')">詳細</button> ' +
          '<button class="btn btn-sm" style="background:var(--gray-200);color:var(--gray-700)" onclick="App.deleteHistory(\'' + r.id + '\')">削除</button>' +
          '</td></tr>';
      });

      html += '</tbody></table></div>';
    }

    html += '<div class="btn-group" style="margin:32px 0">' +
      '<button class="btn btn-primary btn-lg" onclick="App.resetExam()">テストに戻る</button>' +
      '</div>';

    screen.innerHTML = html;
  }

  // --- 履歴詳細画面 ---
  function renderHistoryDetail(id) {
    var record = History.getById(id);
    if (!record) return;

    var screen = document.getElementById('history-screen');
    var d = new Date(record.date);
    var dateStr = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + ' ' +
      String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');

    var pct = Math.round((record.scores.total / record.scores.possible) * 100);
    var passed = record.passed;

    var html = '<div class="header"><h1>受験結果詳細</h1><p>' + dateStr + '</p></div>' +
      '<div class="card result-card">' +
      '<h2>' + (passed ? '合格' : '不合格') + '</h2>' +
      '<div class="result-score ' + (passed ? 'pass' : 'fail') + '">' + record.scores.total + '点 / ' + record.scores.possible + '点</div>' +
      '<p style="font-size:1.2rem;color:var(--gray-500)">(' + pct + '%)</p>';

    if (record.mode === 'full' && record.scores.section1) {
      html += '<div class="result-detail">' +
        '<div class="result-item"><h4>第1問 仕訳</h4><div class="score">' + record.scores.section1.score + ' / ' + record.scores.section1.possible + '</div></div>' +
        '<div class="result-item"><h4>第2問 補助簿・理論</h4><div class="score">' + record.scores.section2.score + ' / ' + record.scores.section2.possible + '</div></div>' +
        '<div class="result-item"><h4>第3問 決算</h4><div class="score">' + record.scores.section3.score + ' / ' + record.scores.section3.possible + '</div></div>' +
        '</div>';
    }
    html += '</div>';

    if (record.details) {
      html += renderQ1Details(record.details.q1);
      html += renderQ2Details(record.details.q2p1, record.details.q2p2);
      html += renderQ3Details(record.details.q3);
    }

    html += '<div class="btn-group" style="margin:32px 0">' +
      '<button class="btn btn-outline btn-lg" onclick="App.showHistory()">一覧に戻る</button>' +
      '<button class="btn btn-primary btn-lg" onclick="App.resetExam()">テストに戻る</button>' +
      '</div>';

    screen.innerHTML = html;
    window.scrollTo(0, 0);
  }

  return {
    renderSection1: renderSection1,
    renderSection2: renderSection2,
    renderSection3: renderSection3,
    renderResults: renderResults,
    renderHistoryScreen: renderHistoryScreen,
    renderHistoryDetail: renderHistoryDetail
  };
})();
