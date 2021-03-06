jQuery && function(e) {
  e.extend(e.fn, {
    miniColors: function(t, n) {
      var r = function(t, n, r) {
        var i = m(t.val());
        i || (i = "FFFFFF");
        var s = E(i), f = e('<a class="miniColors-trigger" style="background-color: #' + i + '" href="#"></a>');
        f.insertAfter(t);
        t.addClass("miniColors").attr("maxlength", 7).attr("autocomplete", "off");
        t.data("trigger", f);
        t.data("hsb", s);
        n.change && t.data("change", n.change);
        n.readonly && t.attr("readonly", !0);
        n.disabled && o(t);
        f.bind("click.miniColors", function(e) {
          e.preventDefault();
          t.trigger("focus");
        });
        t.bind("focus.miniColors", function(e) {
          u(t);
        });
        t.bind("blur.miniColors", function(e) {
          var n = m(t.val());
          t.val(n ? "#" + n : "");
        });
        t.bind("keydown.miniColors", function(e) {
          e.keyCode === 9 && a(t);
        });
        t.bind("keyup.miniColors", function(e) {
          var n = t.val().replace(/[^A-F0-9#]/ig, "");
          t.val(n);
          p(t) || t.data("trigger").css("backgroundColor", "#FFF");
        });
        t.bind("paste.miniColors", function(e) {
          setTimeout(function() {
            t.trigger("keyup");
          }, 5);
        });
      }, i = function(t) {
        a();
        t = e(t);
        t.data("trigger").remove();
        t.removeAttr("autocomplete");
        t.removeData("trigger");
        t.removeData("selector");
        t.removeData("hsb");
        t.removeData("huePicker");
        t.removeData("colorPicker");
        t.removeData("mousebutton");
        t.removeData("moving");
        t.unbind("click.miniColors");
        t.unbind("focus.miniColors");
        t.unbind("blur.miniColors");
        t.unbind("keyup.miniColors");
        t.unbind("keydown.miniColors");
        t.unbind("paste.miniColors");
        e(document).unbind("mousedown.miniColors");
        e(document).unbind("mousemove.miniColors");
      }, s = function(e) {
        e.attr("disabled", !1);
        e.data("trigger").css("opacity", 1);
      }, o = function(e) {
        a(e);
        e.attr("disabled", !0);
        e.data("trigger").css("opacity", .5);
      }, u = function(t) {
        if (t.attr("disabled")) return !1;
        a();
        var n = e('<div class="miniColors-selector"></div>');
        n.append('<div class="miniColors-colors" style="background-color: #FFF;"><div class="miniColors-colorPicker"></div></div>');
        n.append('<div class="miniColors-hues"><div class="miniColors-huePicker"></div></div>');
        n.css({
          top: t.is(":visible") ? t.offset().top + t.outerHeight() : t.data("trigger").offset().top + t.data("trigger").outerHeight(),
          left: t.is(":visible") ? t.offset().left : t.data("trigger").offset().left,
          display: "none"
        }).addClass(t.attr("class"));
        var r = t.data("hsb");
        n.find(".miniColors-colors").css("backgroundColor", "#" + S({
          h: r.h,
          s: 100,
          b: 100
        }));
        var i = t.data("colorPosition");
        i || (i = d(r));
        n.find(".miniColors-colorPicker").css("top", i.y + "px").css("left", i.x + "px");
        var s = t.data("huePosition");
        s || (s = v(r));
        n.find(".miniColors-huePicker").css("top", s.y + "px");
        t.data("selector", n);
        t.data("huePicker", n.find(".miniColors-huePicker"));
        t.data("colorPicker", n.find(".miniColors-colorPicker"));
        t.data("mousebutton", 0);
        e("BODY").append(n);
        n.fadeIn(100);
        n.bind("selectstart", function() {
          return !1;
        });
        e(document).bind("mousedown.miniColors", function(n) {
          t.data("mousebutton", 1);
          if (e(n.target).parents().andSelf().hasClass("miniColors-colors")) {
            n.preventDefault();
            t.data("moving", "colors");
            f(t, n);
          }
          if (e(n.target).parents().andSelf().hasClass("miniColors-hues")) {
            n.preventDefault();
            t.data("moving", "hues");
            l(t, n);
          }
          if (e(n.target).parents().andSelf().hasClass("miniColors-selector")) {
            n.preventDefault();
            return;
          }
          if (e(n.target).parents().andSelf().hasClass("miniColors")) return;
          a(t);
        });
        e(document).bind("mouseup.miniColors", function(e) {
          t.data("mousebutton", 0);
          t.removeData("moving");
        });
        e(document).bind("mousemove.miniColors", function(e) {
          if (t.data("mousebutton") === 1) {
            t.data("moving") === "colors" && f(t, e);
            t.data("moving") === "hues" && l(t, e);
          }
        });
      }, a = function(t) {
        t || (t = ".miniColors");
        e(t).each(function() {
          var t = e(this).data("selector");
          e(this).removeData("selector");
          e(t).fadeOut(100, function() {
            e(this).remove();
          });
        });
        e(document).unbind("mousedown.miniColors");
        e(document).unbind("mousemove.miniColors");
      }, f = function(t, n) {
        var r = t.data("colorPicker");
        r.hide();
        var i = {
          x: n.clientX - t.data("selector").find(".miniColors-colors").offset().left + e(document).scrollLeft() - 5,
          y: n.clientY - t.data("selector").find(".miniColors-colors").offset().top + e(document).scrollTop() - 5
        };
        i.x <= -5 && (i.x = -5);
        i.x >= 144 && (i.x = 144);
        i.y <= -5 && (i.y = -5);
        i.y >= 144 && (i.y = 144);
        t.data("colorPosition", i);
        r.css("left", i.x).css("top", i.y).show();
        var s = Math.round((i.x + 5) * .67);
        s < 0 && (s = 0);
        s > 100 && (s = 100);
        var o = 100 - Math.round((i.y + 5) * .67);
        o < 0 && (o = 0);
        o > 100 && (o = 100);
        var u = t.data("hsb");
        u.s = s;
        u.b = o;
        c(t, u, !0);
      }, l = function(t, n) {
        var r = t.data("huePicker");
        r.hide();
        var i = {
          y: n.clientY - t.data("selector").find(".miniColors-colors").offset().top + e(document).scrollTop() - 1
        };
        i.y <= -1 && (i.y = -1);
        i.y >= 149 && (i.y = 149);
        t.data("huePosition", i);
        r.css("top", i.y).show();
        var s = Math.round((150 - i.y - 1) * 2.4);
        s < 0 && (s = 0);
        s > 360 && (s = 360);
        var o = t.data("hsb");
        o.h = s;
        c(t, o, !0);
      }, c = function(e, t, n) {
        e.data("hsb", t);
        var r = S(t);
        n && e.val("#" + r);
        e.data("trigger").css("backgroundColor", "#" + r);
        e.data("selector") && e.data("selector").find(".miniColors-colors").css("backgroundColor", "#" + S({
          h: t.h,
          s: 100,
          b: 100
        }));
        e.data("change") && e.data("change").call(e, "#" + r, g(t));
      }, p = function(t) {
        var n = m(t.val());
        if (!n) return !1;
        var r = E(n), i = t.data("hsb");
        if (r.h === i.h && r.s === i.s && r.b === i.b) return !0;
        var s = d(r), o = e(t.data("colorPicker"));
        o.css("top", s.y + "px").css("left", s.x + "px");
        var u = v(r), a = e(t.data("huePicker"));
        a.css("top", u.y + "px");
        c(t, r, !1);
        return !0;
      }, d = function(e) {
        var t = Math.ceil(e.s / .67);
        t < 0 && (t = 0);
        t > 150 && (t = 150);
        var n = 150 - Math.ceil(e.b / .67);
        n < 0 && (n = 0);
        n > 150 && (n = 150);
        return {
          x: t - 5,
          y: n - 5
        };
      }, v = function(e) {
        var t = 150 - e.h / 2.4;
        t < 0 && (h = 0);
        t > 150 && (h = 150);
        return {
          y: t - 1
        };
      }, m = function(e) {
        e = e.replace(/[^A-Fa-f0-9]/, "");
        e.length == 3 && (e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]);
        return e.length === 6 ? e : null;
      }, g = function(e) {
        var t = {}, n = Math.round(e.h), r = Math.round(e.s * 255 / 100), i = Math.round(e.b * 255 / 100);
        if (r == 0) t.r = t.g = t.b = i; else {
          var s = i, o = (255 - r) * i / 255, u = (s - o) * (n % 60) / 60;
          n == 360 && (n = 0);
          if (n < 60) {
            t.r = s;
            t.b = o;
            t.g = o + u;
          } else if (n < 120) {
            t.g = s;
            t.b = o;
            t.r = s - u;
          } else if (n < 180) {
            t.g = s;
            t.r = o;
            t.b = o + u;
          } else if (n < 240) {
            t.b = s;
            t.r = o;
            t.g = s - u;
          } else if (n < 300) {
            t.b = s;
            t.g = o;
            t.r = o + u;
          } else if (n < 360) {
            t.r = s;
            t.g = o;
            t.b = s - u;
          } else {
            t.r = 0;
            t.g = 0;
            t.b = 0;
          }
        }
        return {
          r: Math.round(t.r),
          g: Math.round(t.g),
          b: Math.round(t.b)
        };
      }, y = function(t) {
        var n = [ t.r.toString(16), t.g.toString(16), t.b.toString(16) ];
        e.each(n, function(e, t) {
          t.length == 1 && (n[e] = "0" + t);
        });
        return n.join("");
      }, b = function(e) {
        var e = parseInt(e.indexOf("#") > -1 ? e.substring(1) : e, 16);
        return {
          r: e >> 16,
          g: (e & 65280) >> 8,
          b: e & 255
        };
      }, w = function(e) {
        var t = {
          h: 0,
          s: 0,
          b: 0
        }, n = Math.min(e.r, e.g, e.b), r = Math.max(e.r, e.g, e.b), i = r - n;
        t.b = r;
        t.s = r != 0 ? 255 * i / r : 0;
        t.s != 0 ? e.r == r ? t.h = (e.g - e.b) / i : e.g == r ? t.h = 2 + (e.b - e.r) / i : t.h = 4 + (e.r - e.g) / i : t.h = -1;
        t.h *= 60;
        t.h < 0 && (t.h += 360);
        t.s *= 100 / 255;
        t.b *= 100 / 255;
        return t;
      }, E = function(e) {
        var t = w(b(e));
        t.s === 0 && (t.h = 360);
        return t;
      }, S = function(e) {
        return y(g(e));
      };
      switch (t) {
       case "readonly":
        e(this).each(function() {
          e(this).attr("readonly", n);
        });
        return e(this);
       case "disabled":
        e(this).each(function() {
          n ? o(e(this)) : s(e(this));
        });
        return e(this);
       case "value":
        e(this).each(function() {
          e(this).val(n).trigger("keyup");
        });
        return e(this);
       case "destroy":
        e(this).each(function() {
          i(e(this));
        });
        return e(this);
       default:
        t || (t = {});
        e(this).each(function() {
          if (e(this)[0].tagName.toLowerCase() !== "input") return;
          if (e(this).data("trigger")) return;
          r(e(this), t, n);
        });
        return e(this);
      }
    }
  });
}(jQuery);