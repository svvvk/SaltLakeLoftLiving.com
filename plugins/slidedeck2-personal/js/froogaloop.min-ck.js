var Froogaloop = function() {
  function e(t) {
    return new e.fn.init(t);
  }
  function t(e, t, n) {
    if (!n.contentWindow.postMessage) return !1;
    var r = n.getAttribute("src").split("?")[0], e = JSON.stringify({
      method: e,
      value: t
    });
    n.contentWindow.postMessage(e, r);
  }
  function n(e) {
    var t, n;
    try {
      t = JSON.parse(e.data), n = t.event || t.method;
    } catch (r) {}
    "ready" == n && !s && (s = !0);
    if (e.origin != o) return !1;
    var e = t.value, u = t.data, a = "" === a ? null : t.player_id;
    t = a ? i[a][n] : i[n];
    n = [];
    if (!t) return !1;
    void 0 !== e && n.push(e);
    u && n.push(u);
    a && n.push(a);
    return 0 < n.length ? t.apply(null, n) : t.call();
  }
  function r(e, t, n) {
    n ? (i[n] || (i[n] = {}), i[n][e] = t) : i[e] = t;
  }
  var i = {}, s = !1, o = "";
  e.fn = e.prototype = {
    element: null,
    init: function(e) {
      "string" == typeof e && (e = document.getElementById(e));
      this.element = e;
      for (var e = this.element.getAttribute("src").split("/"), t = "", n = 0, r = e.length; n < r; n++) {
        if (!(3 > n)) break;
        t += e[n];
        2 > n && (t += "/");
      }
      o = t;
      return this;
    },
    api: function(e, n) {
      if (!this.element || !e) return !1;
      var i = this.element, s = "" !== i.id ? i.id : null, o = !n || !n.constructor || !n.call || !n.apply ? n : null, u = n && n.constructor && n.call && n.apply ? n : null;
      u && r(e, u, s);
      t(e, o, i);
      return this;
    },
    addEvent: function(e, n) {
      if (!this.element) return !1;
      var i = this.element, o = "" !== i.id ? i.id : null;
      r(e, n, o);
      "ready" != e ? t("addEventListener", e, i) : "ready" == e && s && n.call(null, o);
      return this;
    },
    removeEvent: function(e) {
      if (!this.element) return !1;
      var n = this.element, r;
      e : {
        if ((r = "" !== n.id ? n.id : null) && i[r]) {
          if (!i[r][e]) {
            r = !1;
            break e;
          }
          i[r][e] = null;
        } else {
          if (!i[e]) {
            r = !1;
            break e;
          }
          i[e] = null;
        }
        r = !0;
      }
      "ready" != e && r && t("removeEventListener", e, n);
    }
  };
  e.fn.init.prototype = e.fn;
  window.addEventListener ? window.addEventListener("message", n, !1) : window.attachEvent("onmessage", n, !1);
  return window.Froogaloop = window.$f = e;
}();