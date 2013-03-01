CodeMirror.defineMode("javascript", function(e, t) {
  function o(e, t, n) {
    t.tokenize = n;
    return n(e, t);
  }
  function u(e, t) {
    var n = !1, r;
    while ((r = e.next()) != null) {
      if (r == t && !n) return !1;
      n = !n && r == "\\";
    }
    return n;
  }
  function l(e, t, n) {
    a = e;
    f = n;
    return t;
  }
  function c(e, t) {
    var n = e.next();
    if (n == '"' || n == "'") return o(e, t, h(n));
    if (/[\[\]{}\(\),;\:\.]/.test(n)) return l(n);
    if (n == "0" && e.eat(/x/i)) {
      e.eatWhile(/[\da-f]/i);
      return l("number", "number");
    }
    if (/\d/.test(n) || n == "-" && e.eat(/\d/)) {
      e.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/);
      return l("number", "number");
    }
    if (n == "/") {
      if (e.eat("*")) return o(e, t, p);
      if (e.eat("/")) {
        e.skipToEnd();
        return l("comment", "comment");
      }
      if (t.reAllowed) {
        u(e, "/");
        e.eatWhile(/[gimy]/);
        return l("regexp", "string-2");
      }
      e.eatWhile(s);
      return l("operator", null, e.current());
    }
    if (n == "#") {
      e.skipToEnd();
      return l("error", "error");
    }
    if (s.test(n)) {
      e.eatWhile(s);
      return l("operator", null, e.current());
    }
    e.eatWhile(/[\w\$_]/);
    var r = e.current(), a = i.propertyIsEnumerable(r) && i[r];
    return a && t.kwAllowed ? l(a.type, a.style, r) : l("variable", "variable", r);
  }
  function h(e) {
    return function(t, n) {
      u(t, e) || (n.tokenize = c);
      return l("string", "string");
    };
  }
  function p(e, t) {
    var n = !1, r;
    while (r = e.next()) {
      if (r == "/" && n) {
        t.tokenize = c;
        break;
      }
      n = r == "*";
    }
    return l("comment", "comment");
  }
  function v(e, t, n, r, i, s) {
    this.indented = e;
    this.column = t;
    this.type = n;
    this.prev = i;
    this.info = s;
    r != null && (this.align = r);
  }
  function m(e, t) {
    for (var n = e.localVars; n; n = n.next) if (n.name == t) return !0;
  }
  function g(e, t, n, i, s) {
    var o = e.cc;
    y.state = e;
    y.stream = s;
    y.marked = null, y.cc = o;
    e.lexical.hasOwnProperty("align") || (e.lexical.align = !0);
    for (;;) {
      var u = o.length ? o.pop() : r ? A : L;
      if (u(n, i)) {
        while (o.length && o[o.length - 1].lex) o.pop()();
        return y.marked ? y.marked : n == "variable" && m(e, i) ? "variable-2" : t;
      }
    }
  }
  function b() {
    for (var e = arguments.length - 1; e >= 0; e--) y.cc.push(arguments[e]);
  }
  function w() {
    b.apply(null, arguments);
    return !0;
  }
  function E(e) {
    var t = y.state;
    if (t.context) {
      y.marked = "def";
      for (var n = t.localVars; n; n = n.next) if (n.name == e) return;
      t.localVars = {
        name: e,
        next: t.localVars
      };
    }
  }
  function x() {
    y.state.context || (y.state.localVars = S);
    y.state.context = {
      prev: y.state.context,
      vars: y.state.localVars
    };
  }
  function T() {
    y.state.localVars = y.state.context.vars;
    y.state.context = y.state.context.prev;
  }
  function N(e, t) {
    var n = function() {
      var n = y.state;
      n.lexical = new v(n.indented, y.stream.column(), e, null, n.lexical, t);
    };
    n.lex = !0;
    return n;
  }
  function C() {
    var e = y.state;
    if (e.lexical.prev) {
      e.lexical.type == ")" && (e.indented = e.lexical.indented);
      e.lexical = e.lexical.prev;
    }
  }
  function k(e) {
    return function(n) {
      return n == e ? w() : e == ";" ? b() : w(arguments.callee);
    };
  }
  function L(e) {
    return e == "var" ? w(N("vardef"), j, k(";"), C) : e == "keyword a" ? w(N("form"), A, L, C) : e == "keyword b" ? w(N("form"), L, C) : e == "{" ? w(N("}"), B, C) : e == ";" ? w() : e == "function" ? w(z) : e == "for" ? w(N("form"), k("("), N(")"), I, k(")"), C, L, C) : e == "variable" ? w(N("stat"), _) : e == "switch" ? w(N("form"), A, N("}", "switch"), k("{"), B, C, C) : e == "case" ? w(A, k(":")) : e == "default" ? w(k(":")) : e == "catch" ? w(N("form"), x, k("("), W, k(")"), L, C, T) : b(N("stat"), A, k(";"), C);
  }
  function A(e) {
    return d.hasOwnProperty(e) ? w(M) : e == "function" ? w(z) : e == "keyword c" ? w(O) : e == "(" ? w(N(")"), O, k(")"), C, M) : e == "operator" ? w(A) : e == "[" ? w(N("]"), H(A, "]"), C, M) : e == "{" ? w(N("}"), H(P, "}"), C, M) : w();
  }
  function O(e) {
    return e.match(/[;\}\)\],]/) ? b() : b(A);
  }
  function M(e, t) {
    if (e == "operator" && /\+\+|--/.test(t)) return w(M);
    if (e == "operator" || e == ":") return w(A);
    if (e == ";") return;
    if (e == "(") return w(N(")"), H(A, ")"), C, M);
    if (e == ".") return w(D, M);
    if (e == "[") return w(N("]"), A, k("]"), C, M);
  }
  function _(e) {
    return e == ":" ? w(C, L) : b(M, k(";"), C);
  }
  function D(e) {
    if (e == "variable") {
      y.marked = "property";
      return w();
    }
  }
  function P(e) {
    e == "variable" && (y.marked = "property");
    if (d.hasOwnProperty(e)) return w(k(":"), A);
  }
  function H(e, t) {
    function n(r) {
      return r == "," ? w(e, n) : r == t ? w() : w(k(t));
    }
    return function(i) {
      return i == t ? w() : b(e, n);
    };
  }
  function B(e) {
    return e == "}" ? w() : b(L, B);
  }
  function j(e, t) {
    if (e == "variable") {
      E(t);
      return w(F);
    }
    return w();
  }
  function F(e, t) {
    if (t == "=") return w(A, F);
    if (e == ",") return w(j);
  }
  function I(e) {
    return e == "var" ? w(j, R) : e == ";" ? b(R) : e == "variable" ? w(q) : b(R);
  }
  function q(e, t) {
    return t == "in" ? w(A) : w(M, R);
  }
  function R(e, t) {
    return e == ";" ? w(U) : t == "in" ? w(A) : w(A, k(";"), U);
  }
  function U(e) {
    e != ")" && w(A);
  }
  function z(e, t) {
    if (e == "variable") {
      E(t);
      return w(z);
    }
    if (e == "(") return w(N(")"), x, H(W, ")"), C, L, T);
  }
  function W(e, t) {
    if (e == "variable") {
      E(t);
      return w();
    }
  }
  var n = e.indentUnit, r = t.json, i = function() {
    function e(e) {
      return {
        type: e,
        style: "keyword"
      };
    }
    var t = e("keyword a"), n = e("keyword b"), r = e("keyword c"), i = e("operator"), s = {
      type: "atom",
      style: "atom"
    };
    return {
      "if": t,
      "while": t,
      "with": t,
      "else": n,
      "do": n,
      "try": n,
      "finally": n,
      "return": r,
      "break": r,
      "continue": r,
      "new": r,
      "delete": r,
      "throw": r,
      "var": e("var"),
      "const": e("var"),
      let: e("var"),
      "function": e("function"),
      "catch": e("catch"),
      "for": e("for"),
      "switch": e("switch"),
      "case": e("case"),
      "default": e("default"),
      "in": i,
      "typeof": i,
      "instanceof": i,
      "true": s,
      "false": s,
      "null": s,
      "undefined": s,
      NaN: s,
      Infinity: s
    };
  }(), s = /[+\-*&%=<>!?|]/, a, f, d = {
    atom: !0,
    number: !0,
    variable: !0,
    string: !0,
    regexp: !0
  }, y = {
    state: null,
    column: null,
    marked: null,
    cc: null
  }, S = {
    name: "this",
    next: {
      name: "arguments"
    }
  };
  C.lex = !0;
  return {
    startState: function(e) {
      return {
        tokenize: c,
        reAllowed: !0,
        kwAllowed: !0,
        cc: [],
        lexical: new v((e || 0) - n, 0, "block", !1),
        localVars: t.localVars,
        context: t.localVars && {
          vars: t.localVars
        },
        indented: 0
      };
    },
    token: function(e, t) {
      if (e.sol()) {
        t.lexical.hasOwnProperty("align") || (t.lexical.align = !1);
        t.indented = e.indentation();
      }
      if (e.eatSpace()) return null;
      var n = t.tokenize(e, t);
      if (a == "comment") return n;
      t.reAllowed = a == "operator" || a == "keyword c" || !!a.match(/^[\[{}\(,;:]$/);
      t.kwAllowed = a != ".";
      return g(t, n, a, f, e);
    },
    indent: function(e, t) {
      if (e.tokenize != c) return 0;
      var r = t && t.charAt(0), i = e.lexical;
      i.type == "stat" && r == "}" && (i = i.prev);
      var s = i.type, o = r == s;
      return s == "vardef" ? i.indented + 4 : s == "form" && r == "{" ? i.indented : s == "stat" || s == "form" ? i.indented + n : i.info == "switch" && !o ? i.indented + (/^(?:case|default)\b/.test(t) ? n : 2 * n) : i.align ? i.column + (o ? 0 : 1) : i.indented + (o ? 0 : n);
    },
    electricChars: ":{}"
  };
});

CodeMirror.defineMIME("text/javascript", "javascript");

CodeMirror.defineMIME("application/json", {
  name: "javascript",
  json: !0
});