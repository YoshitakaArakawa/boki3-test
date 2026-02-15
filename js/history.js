// ============================
// 履歴管理（localStorage）
// ============================
var History = (function () {
  var STORAGE_KEY = 'boki3_history';

  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  function getAll() {
    try {
      var data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveAll(records) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch (e) {
      console.error('履歴の保存に失敗しました:', e);
    }
  }

  function save(record) {
    record.id = generateId();
    record.date = new Date().toISOString();
    var records = getAll();
    records.unshift(record);
    saveAll(records);
    return record;
  }

  function getById(id) {
    var records = getAll();
    return records.find(function (r) { return r.id === id; }) || null;
  }

  function deleteById(id) {
    var records = getAll();
    var filtered = records.filter(function (r) { return r.id !== id; });
    saveAll(filtered);
  }

  function clearAll() {
    localStorage.removeItem(STORAGE_KEY);
  }

  function getStats() {
    var records = getAll();
    if (records.length === 0) {
      return { count: 0, avgScore: 0, bestScore: 0, passRate: 0 };
    }
    var fullRecords = records.filter(function (r) { return r.mode === 'full'; });
    var scores = fullRecords.map(function (r) { return r.scores.total; });
    var passCount = fullRecords.filter(function (r) { return r.passed; }).length;

    return {
      count: records.length,
      fullCount: fullRecords.length,
      avgScore: scores.length > 0 ? Math.round(scores.reduce(function (a, b) { return a + b; }, 0) / scores.length) : 0,
      bestScore: scores.length > 0 ? Math.max.apply(null, scores) : 0,
      passRate: fullRecords.length > 0 ? Math.round((passCount / fullRecords.length) * 100) : 0
    };
  }

  return {
    save: save,
    getAll: getAll,
    getById: getById,
    deleteById: deleteById,
    clearAll: clearAll,
    getStats: getStats
  };
})();
