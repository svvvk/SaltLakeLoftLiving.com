/**
 * jQuery Masonry v2.1.01
 * A dynamic layout plugin for jQuery
 * The flip-side of CSS Floats
 * http://masonry.desandro.com
 *
 * Licensed under the MIT license.
 * Copyright 2011 David DeSandro
 */(function(e, t, n) {
  var r = t.event, i;
  r.special.smartresize = {
    setup: function() {
      t(this).bind("resize", r.special.smartresize.handler);
    },
    teardown: function() {
      t(this).unbind("resize", r.special.smartresize.handler);
    },
    handler: function(e, t) {
      var n = this, r = arguments;
      e.type = "smartresize", i && clearTimeout(i), i = setTimeout(function() {
        jQuery.event.handle.apply(n, r);
      }, t === "execAsap" ? 0 : 100);
    }
  }, t.fn.smartresize = function(e) {
    return e ? this.bind("smartresize", e) : this.trigger("smartresize", [ "execAsap" ]);
  }, t.Mason = function(e, n) {
    this.element = t(n), this._create(e), this._init();
  };
  var s = [ "position", "height" ];
  t.Mason.settings = {
    isResizable: !0,
    isAnimated: !1,
    animationOptions: {
      queue: !1,
      duration: 500
    },
    gutterWidth: 0,
    isRTL: !1,
    isFitWidth: !1
  }, t.Mason.prototype = {
    _filterFindBricks: function(e) {
      var t = this.options.itemSelector;
      return t ? e.filter(t).add(e.find(t)) : e;
    },
    _getBricks: function(e) {
      var t = this._filterFindBricks(e).css({
        position: "absolute"
      }).addClass("masonry-brick");
      return t;
    },
    _create: function(n) {
      this.options = t.extend(!0, {}, t.Mason.settings, n), this.styleQueue = [], this.reloadItems();
      var r = this.element[0].style;
      this.originalStyle = {};
      for (var i = 0, o = s.length; i < o; i++) {
        var u = s[i];
        this.originalStyle[u] = r[u] || "";
      }
      this.element.css({
        position: "relative"
      }), this.horizontalDirection = this.options.isRTL ? "right" : "left", this.offset = {
        x: parseInt(this.element.css("padding-" + this.horizontalDirection), 10),
        y: parseInt(this.element.css("padding-top"), 10)
      }, this.isFluid = this.options.columnWidth && typeof this.options.columnWidth == "function";
      var l = this;
      setTimeout(function() {
        l.element.addClass("masonry");
      }, 0), this.options.isResizable && t(e).bind("smartresize.masonry", function() {
        l.resize();
      });
    },
    _init: function(e) {
      this._getColumns(), this._reLayout(e);
    },
    option: function(e, n) {
      t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e));
    },
    layout: function(e, t) {
      for (var n = 0, r = e.length; n < r; n++) this._placeBrick(e[n]);
      var i = {};
      i.height = Math.max.apply(Math, this.colYs);
      if (this.options.isFitWidth) {
        var s = 0, n = this.cols;
        while (--n) {
          if (this.colYs[n] !== 0) break;
          s++;
        }
        i.width = (this.cols - s) * this.columnWidth - this.options.gutterWidth;
      }
      this.styleQueue.push({
        $el: this.element,
        style: i
      });
      var o = this.isLaidOut ? this.options.isAnimated ? "animate" : "css" : "css", u = this.options.animationOptions, a;
      for (n = 0, r = this.styleQueue.length; n < r; n++) a = this.styleQueue[n], a.$el[o](a.style, u);
      this.styleQueue = [], t && t.call(e), this.isLaidOut = !0;
    },
    _getColumns: function() {
      var e = this.options.isFitWidth ? this.element.parent() : this.element, t = e.width();
      this.columnWidth = this.isFluid ? this.options.columnWidth(t) : this.options.columnWidth || this.$bricks.outerWidth(!0) || t, this.columnWidth += this.options.gutterWidth, this.cols = Math.floor((t + this.options.gutterWidth) / this.columnWidth), this.cols = Math.max(this.cols, 1);
    },
    _placeBrick: function(e) {
      var n = t(e), r, i, s, o, u;
      r = Math.ceil(n.outerWidth(!0) / (this.columnWidth + this.options.gutterWidth)), r = Math.min(r, this.cols);
      if (r === 1) s = this.colYs; else {
        i = this.cols + 1 - r, s = [];
        for (u = 0; u < i; u++) o = this.colYs.slice(u, u + r), s[u] = Math.max.apply(Math, o);
      }
      var a = Math.min.apply(Math, s), f = 0;
      for (var l = 0, c = s.length; l < c; l++) if (s[l] === a) {
        f = l;
        break;
      }
      var h = {
        top: a + this.offset.y
      };
      h[this.horizontalDirection] = this.columnWidth * f + this.offset.x, this.styleQueue.push({
        $el: n,
        style: h
      });
      var p = a + n.outerHeight(!0), d = this.cols + 1 - c;
      for (l = 0; l < d; l++) this.colYs[f + l] = p;
    },
    resize: function() {
      var e = this.cols;
      this._getColumns(), (this.isFluid || this.cols !== e) && this._reLayout();
    },
    _reLayout: function(e) {
      var t = this.cols;
      this.colYs = [];
      while (t--) this.colYs.push(0);
      this.layout(this.$bricks, e);
    },
    reloadItems: function() {
      this.$bricks = this._getBricks(this.element.children());
    },
    reload: function(e) {
      this.reloadItems(), this._init(e);
    },
    appended: function(e, t, n) {
      if (t) {
        this._filterFindBricks(e).css({
          top: this.element.height()
        });
        var r = this;
        setTimeout(function() {
          r._appended(e, n);
        }, 1);
      } else this._appended(e, n);
    },
    _appended: function(e, t) {
      var n = this._getBricks(e);
      this.$bricks = this.$bricks.add(n), this.layout(n, t);
    },
    remove: function(e) {
      this.$bricks = this.$bricks.not(e), e.remove();
    },
    destroy: function() {
      this.$bricks.removeClass("masonry-brick").each(function() {
        this.style.position = "", this.style.top = "", this.style.left = "";
      });
      var n = this.element[0].style;
      for (var r = 0, i = s.length; r < i; r++) {
        var o = s[r];
        n[o] = this.originalStyle[o];
      }
      this.element.unbind(".masonry").removeClass("masonry").removeData("masonry"), t(e).unbind(".masonry");
    }
  }, t.fn.imagesLoaded = function(e) {
    function n(e) {
      e.target.src !== u && t.inArray(this, a) === -1 && (a.push(this), --o <= 0 && (setTimeout(r), s.unbind(".imagesLoaded", n)));
    }
    function r() {
      e.call(i, s);
    }
    var i = this, s = i.find("img").add(i.filter("img")), o = s.length, u = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==", a = [];
    o || r(), s.bind("load.imagesLoaded error.imagesLoaded", n).each(function() {
      var e = this.src;
      this.src = u, this.src = e;
    });
    return i;
  };
  var o = function(e) {
    this.console && console.error(e);
  };
  t.fn.masonry = function(e) {
    if (typeof e == "string") {
      var n = Array.prototype.slice.call(arguments, 1);
      this.each(function() {
        var r = t.data(this, "masonry");
        if (!r) o("cannot call methods on masonry prior to initialization; attempted to call method '" + e + "'"); else {
          if (!t.isFunction(r[e]) || e.charAt(0) === "_") {
            o("no such method '" + e + "' for masonry instance");
            return;
          }
          r[e].apply(r, n);
        }
      });
    } else this.each(function() {
      var n = t.data(this, "masonry");
      n ? (n.option(e || {}), n._init()) : t.data(this, "masonry", new t.Mason(e, this));
    });
    return this;
  };
})(window, jQuery);