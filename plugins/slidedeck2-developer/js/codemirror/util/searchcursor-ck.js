(function() {
  function e(e, t, n, r) {
    this.atOccurrence = !1;
    this.cm = e;
    r == null && typeof t == "string" && (r = !1);
    n = n ? e.clipPos(n) : {
      line: 0,
      ch: 0
    };
    this.pos = {
      from: n,
      to: n
    };
    if (typeof t != "string") this.matches = function(n, r) {
      if (n) {
        var i = e.getLine(r.line).slice(0, r.ch), s = i.match(t), o = 0;
        while (s) {
          var u = i.indexOf(s[0]);
          o += u;
          i = i.slice(u + 1);
          var a = i.match(t);
          if (!a) break;
          s = a;
          o++;
        }
      } else var i = e.getLine(r.line).slice(r.ch), s = i.match(t), o = s && r.ch + i.indexOf(s[0]);
      if (s) return {
        from: {
          line: r.line,
          ch: o
        },
        to: {
          line: r.line,
          ch: o + s[0].length
        },
        match: s
      };
    }; else {
      r && (t = t.toLowerCase());
      var i = r ? function(e) {
        return e.toLowerCase();
      } : function(e) {
        return e;
      }, s = t.split("\n");
      s.length == 1 ? this.matches = function(n, r) {
        var s = i(e.getLine(r.line)), o = t.length, u;
        if (n ? r.ch >= o && (u = s.lastIndexOf(t, r.ch - o)) != -1 : (u = s.indexOf(t, r.ch)) != -1) return {
          from: {
            line: r.line,
            ch: u
          },
          to: {
            line: r.line,
            ch: u + o
          }
        };
      } : this.matches = function(t, n) {
        var r = n.line, o = t ? s.length - 1 : 0, u = s[o], a = i(e.getLine(r)), f = t ? a.indexOf(u) + u.length : a.lastIndexOf(u);
        if (t ? f >= n.ch || f != u.length : f <= n.ch || f != a.length - u.length) return;
        for (;;) {
          if (t ? !r : r == e.lineCount() - 1) return;
          a = i(e.getLine(r += t ? -1 : 1));
          u = s[t ? --o : ++o];
          if (o > 0 && o < s.length - 1) {
            if (a != u) return;
            continue;
          }
          var l = t ? a.lastIndexOf(u) : a.indexOf(u) + u.length;
          if (t ? l != a.length - u.length : l != u.length) return;
          var c = {
            line: n.line,
            ch: f
          }, h = {
            line: r,
            ch: l
          };
          return {
            from: t ? h : c,
            to: t ? c : h
          };
        }
      };
    }
  }
  e.prototype = {
    findNext: function() {
      return this.find(!1);
    },
    findPrevious: function() {
      return this.find(!0);
    },
    find: function(e) {
      function r(e) {
        var n = {
          line: e,
          ch: 0
        };
        t.pos = {
          from: n,
          to: n
        };
        t.atOccurrence = !1;
        return !1;
      }
      var t = this, n = this.cm.clipPos(e ? this.pos.from : this.pos.to);
      for (;;) {
        if (this.pos = this.matches(e, n)) {
          this.atOccurrence = !0;
          return this.pos.match || !0;
        }
        if (e) {
          if (!n.line) return r(0);
          n = {
            line: n.line - 1,
            ch: this.cm.getLine(n.line - 1).length
          };
        } else {
          var i = this.cm.lineCount();
          if (n.line == i - 1) return r(i);
          n = {
            line: n.line + 1,
            ch: 0
          };
        }
      }
    },
    from: function() {
      if (this.atOccurrence) return this.pos.from;
    },
    to: function() {
      if (this.atOccurrence) return this.pos.to;
    },
    replace: function(e) {
      var t = this;
      this.atOccurrence && (t.pos.to = this.cm.replaceRange(e, t.pos.from, t.pos.to));
    }
  };
  CodeMirror.defineExtension("getSearchCursor", function(t, n, r) {
    return new e(this, t, n, r);
  });
})();