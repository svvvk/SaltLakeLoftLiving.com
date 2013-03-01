// Simple Set Clipboard System
// Author: Joseph Huckaby
var ZeroClipboard = {
  version: "1.0.7",
  clients: {},
  moviePath: "ZeroClipboard.swf",
  nextId: 1,
  $: function(e) {
    typeof e == "string" && (e = document.getElementById(e));
    if (!e.addClass) {
      e.hide = function() {
        this.style.display = "none";
      };
      e.show = function() {
        this.style.display = "";
      };
      e.addClass = function(e) {
        this.removeClass(e);
        this.className += " " + e;
      };
      e.removeClass = function(e) {
        var t = this.className.split(/\s+/), n = -1;
        for (var r = 0; r < t.length; r++) if (t[r] == e) {
          n = r;
          r = t.length;
        }
        if (n > -1) {
          t.splice(n, 1);
          this.className = t.join(" ");
        }
        return this;
      };
      e.hasClass = function(e) {
        return !!this.className.match(new RegExp("\\s*" + e + "\\s*"));
      };
    }
    return e;
  },
  setMoviePath: function(e) {
    this.moviePath = e;
  },
  dispatch: function(e, t, n) {
    var r = this.clients[e];
    r && r.receiveEvent(t, n);
  },
  register: function(e, t) {
    this.clients[e] = t;
  },
  getDOMObjectPosition: function(e, t) {
    var n = {
      left: 0,
      top: 0,
      width: e.width ? e.width : e.offsetWidth,
      height: e.height ? e.height : e.offsetHeight
    };
    while (e && e != t) {
      n.left += e.offsetLeft;
      n.top += e.offsetTop;
      e = e.offsetParent;
    }
    return n;
  },
  Client: function(e) {
    this.handlers = {};
    this.id = ZeroClipboard.nextId++;
    this.movieId = "ZeroClipboardMovie_" + this.id;
    ZeroClipboard.register(this.id, this);
    e && this.glue(e);
  }
};

ZeroClipboard.Client.prototype = {
  id: 0,
  ready: !1,
  movie: null,
  clipText: "",
  handCursorEnabled: !0,
  cssEffects: !0,
  handlers: null,
  glue: function(e, t, n) {
    this.domElement = ZeroClipboard.$(e);
    var r = 99;
    this.domElement.style.zIndex && (r = parseInt(this.domElement.style.zIndex, 10) + 1);
    typeof t == "string" ? t = ZeroClipboard.$(t) : typeof t == "undefined" && (t = document.getElementsByTagName("body")[0]);
    var i = ZeroClipboard.getDOMObjectPosition(this.domElement, t);
    this.div = document.createElement("div");
    var s = this.div.style;
    s.position = "absolute";
    s.left = "" + i.left + "px";
    s.top = "" + i.top + "px";
    s.width = "" + i.width + "px";
    s.height = "" + i.height + "px";
    s.zIndex = r;
    if (typeof n == "object") for (addedStyle in n) s[addedStyle] = n[addedStyle];
    t.appendChild(this.div);
    this.div.innerHTML = this.getHTML(i.width, i.height);
  },
  getHTML: function(e, t) {
    var n = "", r = "id=" + this.id + "&width=" + e + "&height=" + t;
    if (navigator.userAgent.match(/MSIE/)) {
      var i = location.href.match(/^https/i) ? "https://" : "http://";
      n += '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="' + i + 'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="' + e + '" height="' + t + '" id="' + this.movieId + '" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="' + ZeroClipboard.moviePath + '" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="' + r + '"/><param name="wmode" value="transparent"/></object>';
    } else n += '<embed id="' + this.movieId + '" src="' + ZeroClipboard.moviePath + '" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="' + e + '" height="' + t + '" name="' + this.movieId + '" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="' + r + '" wmode="transparent" />';
    return n;
  },
  hide: function() {
    this.div && (this.div.style.left = "-2000px");
  },
  show: function() {
    this.reposition();
  },
  destroy: function() {
    if (this.domElement && this.div) {
      this.hide();
      this.div.innerHTML = "";
      var e = document.getElementsByTagName("body")[0];
      try {
        e.removeChild(this.div);
      } catch (t) {}
      this.domElement = null;
      this.div = null;
    }
  },
  reposition: function(e) {
    if (e) {
      this.domElement = ZeroClipboard.$(e);
      this.domElement || this.hide();
    }
    if (this.domElement && this.div) {
      var t = ZeroClipboard.getDOMObjectPosition(this.domElement), n = this.div.style;
      n.left = "" + t.left + "px";
      n.top = "" + t.top + "px";
    }
  },
  setText: function(e) {
    this.clipText = e;
    this.ready && this.movie.setText(e);
  },
  addEventListener: function(e, t) {
    e = e.toString().toLowerCase().replace(/^on/, "");
    this.handlers[e] || (this.handlers[e] = []);
    this.handlers[e].push(t);
  },
  setHandCursor: function(e) {
    this.handCursorEnabled = e;
    this.ready && this.movie.setHandCursor(e);
  },
  setCSSEffects: function(e) {
    this.cssEffects = !!e;
  },
  receiveEvent: function(e, t) {
    e = e.toString().toLowerCase().replace(/^on/, "");
    switch (e) {
     case "load":
      this.movie = document.getElementById(this.movieId);
      if (!this.movie) {
        var n = this;
        setTimeout(function() {
          n.receiveEvent("load", null);
        }, 1);
        return;
      }
      if (!this.ready && navigator.userAgent.match(/Firefox/) && navigator.userAgent.match(/Windows/)) {
        var n = this;
        setTimeout(function() {
          n.receiveEvent("load", null);
        }, 100);
        this.ready = !0;
        return;
      }
      this.ready = !0;
      this.movie.setText(this.clipText);
      this.movie.setHandCursor(this.handCursorEnabled);
      break;
     case "mouseover":
      if (this.domElement && this.cssEffects) {
        this.domElement.addClass("hover");
        this.recoverActive && this.domElement.addClass("active");
      }
      break;
     case "mouseout":
      if (this.domElement && this.cssEffects) {
        this.recoverActive = !1;
        if (this.domElement.hasClass("active")) {
          this.domElement.removeClass("active");
          this.recoverActive = !0;
        }
        this.domElement.removeClass("hover");
      }
      break;
     case "mousedown":
      this.domElement && this.cssEffects && this.domElement.addClass("active");
      break;
     case "mouseup":
      if (this.domElement && this.cssEffects) {
        this.domElement.removeClass("active");
        this.recoverActive = !1;
      }
    }
    if (this.handlers[e]) for (var r = 0, i = this.handlers[e].length; r < i; r++) {
      var s = this.handlers[e][r];
      typeof s == "function" ? s(this, t) : typeof s == "object" && s.length == 2 ? s[0][s[1]](this, t) : typeof s == "string" && window[s](this, t);
    }
  }
};