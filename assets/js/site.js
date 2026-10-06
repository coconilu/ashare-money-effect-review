/* 赚钱效应复盘终端 · 站点级 JS：进度条 + 完成标记 + 导航高亮 */
(function () {
  "use strict";

  // 阅读进度条
  var bar = document.querySelector(".progress");
  if (bar) {
    var onScroll = function () {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
    };
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // 完成标记（localStorage，按页面路径作 key）
  var KEY = "me-effect-done-v1";
  var page = location.pathname.split("/").pop() || "index.html";
  var load = function () {
    try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { return {}; }
  };
  var save = function (s) {
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {}
  };

  var btn = document.querySelector(".btn-done");
  if (btn) {
    var state = load();
    if (state[page]) {
      btn.classList.add("done");
      btn.textContent = "已完成 ✓";
    }
    btn.addEventListener("click", function () {
      var s = load();
      s[page] = !s[page];
      save(s);
      btn.classList.toggle("done", !!s[page]);
      btn.textContent = s[page] ? "已完成 ✓" : "标记本章完成";
    });
  }

  // 时间轴节点展开/收起
  document.querySelectorAll(".tl-node .tl-head").forEach(function (head) {
    head.addEventListener("click", function () {
      head.parentElement.classList.toggle("open");
    });
  });
})();
