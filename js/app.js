// ============================
// メインアプリケーション
// ============================
var App = {
  currentMode: 'full',
  quickType: 'mix',
  selectedSection: null,
  timerInterval: null,
  timeLeft: 3600,
  examStartTime: null,
  currentQ1Index: 0,

  // 出題される問題（毎回ランダム選出）
  shiwakeQuestions: [],
  hojoboboQuestions: [],
  rironQuestions: [],
  kessanData: null,

  // --- モード選択 ---
  selectMode: function (mode) {
    App.currentMode = mode;
    document.querySelectorAll('#start-screen .mode-card').forEach(function (c) { c.classList.remove('selected'); });
    var el = document.getElementById('mode-' + mode);
    if (el) el.classList.add('selected');

    var sectionSelect = document.getElementById('section-select');
    var quickTypeSelect = document.getElementById('quick-type-select');
    if (mode === 'section') {
      sectionSelect.classList.remove('hidden');
      quickTypeSelect.classList.add('hidden');
      App.selectedSection = null;
    } else if (mode === 'quick') {
      sectionSelect.classList.add('hidden');
      quickTypeSelect.classList.remove('hidden');
      App.selectedSection = null;
    } else {
      sectionSelect.classList.add('hidden');
      quickTypeSelect.classList.add('hidden');
      App.selectedSection = null;
    }
  },

  selectQuickType: function (type) {
    App.quickType = type;
    document.querySelectorAll('#quick-type-select .mode-card').forEach(function (c) { c.classList.remove('selected'); });
    var el = document.getElementById('qt-' + type);
    if (el) el.classList.add('selected');
  },

  selectSection: function (sec) {
    App.selectedSection = sec;
    document.querySelectorAll('#section-select .mode-card').forEach(function (c) { c.classList.remove('selected'); });
    var el = document.getElementById('sec-' + sec);
    if (el) el.classList.add('selected');
  },

  // --- テスト開始 ---
  startExam: function () {
    if (App.currentMode === 'section' && !App.selectedSection) {
      alert('練習する大問を選択してください。');
      return;
    }

    // 問題をランダム選出
    if (App.currentMode === 'quick') {
      var qt = App.quickType;
      if (qt === 'shiwake') {
        App.shiwakeQuestions = App.shuffleArray(SHIWAKE_POOL.slice()).slice(0, 8);
        App.hojoboboQuestions = [];
        App.rironQuestions = [];
      } else if (qt === 'riron') {
        App.shiwakeQuestions = [];
        App.hojoboboQuestions = [];
        App.rironQuestions = App.shuffleArray(RIRON_POOL.slice()).slice(0, 8);
      } else {
        App.shiwakeQuestions = App.shuffleArray(SHIWAKE_POOL.slice()).slice(0, 5);
        App.hojoboboQuestions = [];
        App.rironQuestions = App.shuffleArray(RIRON_POOL.slice()).slice(0, 3);
      }
    } else {
      App.shiwakeQuestions = App.shuffleArray(SHIWAKE_POOL.slice()).slice(0, 15);
      App.hojoboboQuestions = App.shuffleArray(HOJOBOBO_POOL.slice()).slice(0, 4);
      App.rironQuestions = App.shuffleArray(RIRON_POOL.slice()).slice(0, 4);
    }
    App.kessanData = KESSAN_POOL[Math.floor(Math.random() * KESSAN_POOL.length)];
    App.examStartTime = Date.now();

    App.hideAllScreens();
    document.getElementById('exam-screen').classList.remove('hidden');

    // セクション表示制御
    document.querySelectorAll('.section').forEach(function (s) { s.classList.remove('active'); });
    if (App.currentMode === 'section') {
      document.getElementById('section-tabs').classList.add('hidden');
      document.getElementById('section' + App.selectedSection).classList.add('active');
      document.getElementById('timer').textContent = '∞';
    } else if (App.currentMode === 'quick') {
      document.getElementById('section-tabs').classList.add('hidden');
      var qt = App.quickType;
      if (qt === 'shiwake') {
        document.getElementById('section1').classList.add('active');
      } else if (qt === 'riron') {
        document.getElementById('section2').classList.add('active');
      } else {
        document.getElementById('section1').classList.add('active');
        document.getElementById('section2').classList.add('active');
      }
      document.getElementById('timer').textContent = '∞';
      var qtLabels = { shiwake: '仕訳8問', riron: '理論8問', mix: '仕訳5問 + 理論3問' };
      document.getElementById('progress-info').textContent = 'クイック：' + qtLabels[qt];
    } else {
      document.getElementById('section-tabs').classList.remove('hidden');
      App.timeLeft = 3600;
      App.startTimer();
    }

    Render.renderSection1();
    Render.renderSection2();
    Render.renderSection3();
    App.updateProgress();
    window.scrollTo(0, 0);
  },

  // --- タイマー ---
  startTimer: function () {
    App.updateTimerDisplay();
    App.timerInterval = setInterval(function () {
      App.timeLeft--;
      App.updateTimerDisplay();
      if (App.timeLeft <= 0) {
        clearInterval(App.timerInterval);
        App.timerInterval = null;
        Grading.submitExam();
      }
    }, 1000);
  },

  updateTimerDisplay: function () {
    var min = Math.floor(App.timeLeft / 60);
    var sec = App.timeLeft % 60;
    var el = document.getElementById('timer');
    el.textContent = String(min).padStart(2, '0') + ':' + String(sec).padStart(2, '0');
    el.className = 'timer';
    if (App.timeLeft <= 300) el.classList.add('danger');
    else if (App.timeLeft <= 600) el.classList.add('warning');
  },

  // --- セクション切り替え ---
  showSection: function (num) {
    document.querySelectorAll('.section').forEach(function (s) { s.classList.remove('active'); });
    document.getElementById('section' + num).classList.add('active');
    document.querySelectorAll('.section-tab').forEach(function (t) { t.classList.remove('active'); });
    document.getElementById('tab' + num).classList.add('active');
    App.updateProgress();
    window.scrollTo(0, 0);
  },

  updateProgress: function () {
    var activeTab = document.querySelector('.section-tab.active');
    if (activeTab) {
      document.getElementById('progress-info').textContent = activeTab.textContent.trim().split('\n')[0];
    }
  },

  // --- 画面遷移 ---
  goHome: function () {
    if (confirm('ホーム画面に戻りますか？\n解答内容は保存されません。')) {
      App.resetExam();
    }
  },

  hideAllScreens: function () {
    ['start-screen', 'exam-screen', 'result-screen', 'history-screen'].forEach(function (id) {
      document.getElementById(id).classList.add('hidden');
    });
  },

  resetExam: function () {
    if (App.timerInterval) {
      clearInterval(App.timerInterval);
      App.timerInterval = null;
    }
    App.hideAllScreens();
    document.getElementById('start-screen').classList.remove('hidden');

    document.querySelectorAll('.section').forEach(function (s) { s.classList.remove('active'); });
    document.getElementById('section1').classList.add('active');
    document.querySelectorAll('.section-tab').forEach(function (t) { t.classList.remove('active'); });
    document.getElementById('tab1').classList.add('active');

    window.scrollTo(0, 0);
  },

  showHistory: function () {
    App.hideAllScreens();
    document.getElementById('history-screen').classList.remove('hidden');
    Render.renderHistoryScreen();
    window.scrollTo(0, 0);
  },

  showHistoryDetail: function (id) {
    Render.renderHistoryDetail(id);
  },

  deleteHistory: function (id) {
    if (confirm('この受験記録を削除しますか？')) {
      History.deleteById(id);
      Render.renderHistoryScreen();
    }
  },

  clearHistory: function () {
    if (confirm('全ての受験履歴を削除しますか？\nこの操作は取り消せません。')) {
      History.clearAll();
      Render.renderHistoryScreen();
    }
  },

  // --- ユーティリティ ---
  toggleCheckbox: function (label) {
    setTimeout(function () {
      if (label.querySelector('input').checked) {
        label.classList.add('checked');
      } else {
        label.classList.remove('checked');
      }
    }, 10);
  },

  shuffleArray: function (arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  },

  // --- Q1 ページネーション ---
  showQ1: function (index) {
    var total = App.shiwakeQuestions.length;
    if (index < 0 || index >= total) return;

    // ページ切替
    document.querySelectorAll('.q1-page').forEach(function (p) { p.classList.remove('active'); });
    var page = document.getElementById('q1-page-' + index);
    if (page) page.classList.add('active');

    // ドット更新
    document.querySelectorAll('.q1-dot').forEach(function (d) { d.classList.remove('current'); });
    var dot = document.getElementById('q1-dot-' + index);
    if (dot) dot.classList.add('current');

    // カウンター更新
    var counter = document.getElementById('q1-counter');
    if (counter) counter.textContent = (index + 1) + ' / ' + total;

    // ボタン状態
    var prevBtn = document.getElementById('q1-prev');
    var nextBtn = document.getElementById('q1-next');
    if (prevBtn) prevBtn.disabled = (index === 0);
    if (nextBtn) nextBtn.disabled = (index === total - 1);

    App.currentQ1Index = index;
    App.updateQ1Dots();

    // 開いてるピッカーを閉じる
    document.querySelectorAll('.account-picker-menu').forEach(function (m) { m.classList.add('hidden'); });
    document.querySelectorAll('.account-picker-btn').forEach(function (b) { b.classList.remove('active'); });

    // セクション上部にスクロール
    var section = document.getElementById('section1');
    if (section) {
      var offset = section.getBoundingClientRect().top + window.pageYOffset - 60;
      window.scrollTo(0, Math.max(0, offset));
    }
  },

  nextQ1: function () {
    App.showQ1(App.currentQ1Index + 1);
  },

  prevQ1: function () {
    App.showQ1(App.currentQ1Index - 1);
  },

  updateQ1Dots: function () {
    App.shiwakeQuestions.forEach(function (q, i) {
      var dot = document.getElementById('q1-dot-' + i);
      if (!dot) return;
      var hasAnswer = false;
      var maxRows = Math.max(Math.max(q.debit.length, 2), Math.max(q.credit.length, 2));
      for (var r = 0; r < maxRows; r++) {
        var dAcc = document.getElementById('q1_' + i + '_d_acc_' + r);
        if (dAcc && dAcc.value) { hasAnswer = true; break; }
        var cAcc = document.getElementById('q1_' + i + '_c_acc_' + r);
        if (cAcc && cAcc.value) { hasAnswer = true; break; }
        var dAmt = document.getElementById('q1_' + i + '_d_amt_' + r);
        if (dAmt && dAmt.value) { hasAnswer = true; break; }
        var cAmt = document.getElementById('q1_' + i + '_c_amt_' + r);
        if (cAmt && cAmt.value) { hasAnswer = true; break; }
      }
      if (hasAnswer) {
        dot.classList.add('answered');
      } else {
        dot.classList.remove('answered');
      }
    });
  },

  // --- 科目ピッカー ---
  togglePicker: function (id) {
    var menu = document.getElementById(id + '_menu');
    if (!menu) return;
    var wasHidden = menu.classList.contains('hidden');

    // 全メニューを閉じる
    document.querySelectorAll('.account-picker-menu').forEach(function (m) { m.classList.add('hidden'); });
    document.querySelectorAll('.account-picker-btn').forEach(function (b) { b.classList.remove('active'); });

    if (wasHidden) {
      menu.classList.remove('hidden');
      var btn = document.getElementById(id + '_btn');
      if (btn) btn.classList.add('active');
    }
  },

  pickAccount: function (id, value) {
    // 隠しinputに値をセット
    var hidden = document.getElementById(id);
    if (hidden) hidden.value = value;

    // ボタン表示更新
    var btn = document.getElementById(id + '_btn');
    if (btn) {
      if (value) {
        btn.textContent = value;
        btn.classList.add('picked');
      } else {
        btn.innerHTML = '科目を選択 &#9660;';
        btn.classList.remove('picked');
      }
      btn.classList.remove('active');
    }

    // メニューを閉じる
    var menu = document.getElementById(id + '_menu');
    if (menu) menu.classList.add('hidden');

    App.updateQ1Dots();
  }
};
