// ============================
// メインアプリケーション
// ============================
var App = {
  currentMode: 'full',
  selectedSection: null,
  timerInterval: null,
  timeLeft: 3600,
  examStartTime: null,

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
    if (mode === 'section') {
      sectionSelect.classList.remove('hidden');
    } else {
      sectionSelect.classList.add('hidden');
      App.selectedSection = null;
    }
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
    var shiwakeCount = App.currentMode === 'quick' ? 5 : 15;
    App.shiwakeQuestions = App.shuffleArray(SHIWAKE_POOL.slice()).slice(0, shiwakeCount);
    App.hojoboboQuestions = App.shuffleArray(HOJOBOBO_POOL.slice()).slice(0, 4);
    App.rironQuestions = App.shuffleArray(RIRON_POOL.slice()).slice(0, 4);
    App.kessanData = KESSAN_POOL[Math.floor(Math.random() * KESSAN_POOL.length)];
    App.examStartTime = Date.now();

    App.hideAllScreens();
    document.getElementById('exam-screen').classList.remove('hidden');

    // セクション表示制御
    if (App.currentMode === 'section') {
      document.getElementById('section-tabs').classList.add('hidden');
      document.querySelectorAll('.section').forEach(function (s) { s.classList.remove('active'); });
      document.getElementById('section' + App.selectedSection).classList.add('active');
      document.getElementById('timer').textContent = '∞';
    } else if (App.currentMode === 'quick') {
      document.getElementById('section-tabs').classList.add('hidden');
      document.querySelectorAll('.section').forEach(function (s) { s.classList.remove('active'); });
      document.getElementById('section1').classList.add('active');
      document.getElementById('timer').textContent = '∞';
    } else {
      document.getElementById('section-tabs').classList.remove('hidden');
      App.timeLeft = 3600;
      App.startTimer();
    }

    Render.renderSection1();
    Render.renderSection2();
    Render.renderSection3();
    App.updateProgress();
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
  },

  updateProgress: function () {
    var activeTab = document.querySelector('.section-tab.active');
    if (activeTab) {
      document.getElementById('progress-info').textContent = activeTab.textContent.trim().split('\n')[0];
    }
  },

  // --- 画面遷移 ---
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
  }
};
