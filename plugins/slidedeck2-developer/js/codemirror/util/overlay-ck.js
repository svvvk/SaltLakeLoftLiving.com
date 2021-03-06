// Utility function that allows modes to be combined. The mode given
// as the base argument takes care of most of the normal mode
// functionality, but a second (typically simple) mode is used, which
// can override the style of text. Both modes get to parse all of the
// text, but when both assign a non-null style to a piece of code, the
// overlay wins, unless the combine argument was true, in which case
// the styles are combined.
CodeMirror.overlayParser = function(e, t, n) {
  return {
    startState: function() {
      return {
        base: CodeMirror.startState(e),
        overlay: CodeMirror.startState(t),
        basePos: 0,
        baseCur: null,
        overlayPos: 0,
        overlayCur: null
      };
    },
    copyState: function(n) {
      return {
        base: CodeMirror.copyState(e, n.base),
        overlay: CodeMirror.copyState(t, n.overlay),
        basePos: n.basePos,
        baseCur: null,
        overlayPos: n.overlayPos,
        overlayCur: null
      };
    },
    token: function(r, i) {
      if (r.start == i.basePos) {
        i.baseCur = e.token(r, i.base);
        i.basePos = r.pos;
      }
      if (r.start == i.overlayPos) {
        r.pos = r.start;
        i.overlayCur = t.token(r, i.overlay);
        i.overlayPos = r.pos;
      }
      r.pos = Math.min(i.basePos, i.overlayPos);
      r.eol() && (i.basePos = i.overlayPos = 0);
      return i.overlayCur == null ? i.baseCur : i.baseCur != null && n ? i.baseCur + " " + i.overlayCur : i.overlayCur;
    },
    indent: e.indent && function(t, n) {
      return e.indent(t.base, n);
    },
    electricChars: e.electricChars
  };
};