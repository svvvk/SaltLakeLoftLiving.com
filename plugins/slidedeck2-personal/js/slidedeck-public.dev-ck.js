/*!
 * Public SlideDeck JavaScript
 * 
 * All public JavaScript necessary for globally applicable SlideDeck features
 * 
 * @package SlideDeck
 * 
 * @author dtelepathy
 * @package SlideDeck
 * @since 2.0.0
 *//*!
Copyright 2012 digital-telepathy  (email : support@digital-telepathy.com)

This file is part of SlideDeck.

SlideDeck is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

SlideDeck is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with SlideDeck.  If not, see <http://www.gnu.org/licenses/>.
*/// ----------------------------------------------------------
// A short snippet for detecting versions of IE in JavaScript
// without resorting to user-agent sniffing
// ----------------------------------------------------------
// If you're not in IE (or IE version is less than 5) then:
//     ie === undefined
// If you're in IE (>=5) then you can determine which version:
//     ie === 7; // IE7
// Thus, to detect IE:
//     if (ie) {}
// And to detect the version:
//     ie === 6 // IE6
//     ie > 7 // IE8, IE9 ...
//     ie < 9 // Anything less than IE9
// ----------------------------------------------------------
// UPDATE: Now using Live NodeList idea from @jdalton
function __isVerticalDeck(e) {
  return typeof (e.deck == "undefined") ? jQuery(e).find(".slidesVertical").length > 0 ? !0 : !1 : e.verticalSlides && e.verticalSlides[e.current - 1] ? e.verticalSlides[e.current - 1].navChildren ? !0 : !1 : !1;
}

function __slidedeck2_isiOS() {
  var e = !1;
  if (navigator.userAgent.match(/like Mac OS X/i) || navigator.userAgent.match(/iPad/i)) e = !0;
  return e;
}

function __slidedeck2_isMobile() {
  var e = !1;
  if (navigator.userAgent.match(/like Mac OS X/i) || navigator.userAgent.match(/android/i) || navigator.userAgent.match(/like Mac OS X/i) || navigator.userAgent.match(/iPad/i)) e = !0;
  return e;
}

function onYouTubePlayerAPIReady() {
  jQuery(".slidedeck").has(".slide-type-video").each(function() {
    deckElement = jQuery(this);
    var e = this.id;
    deckElement.find(".video-container.youtube").each(function() {
      var t = this, n = jQuery(t).attr("id"), r = "";
      jQuery(t).data("video-id") ? r = jQuery(t).data("video-id") : r = n.split("__")[1];
      var i = new YT.Player(n, {
        height: "100%",
        width: "100%",
        videoId: r,
        playerVars: {
          wmode: "opaque",
          showinfo: 0,
          autohide: 1,
          rel: 0,
          disablekb: 1,
          cc_load_policy: 0,
          iv_load_policy: 3,
          modestbranding: 1
        }
      }), s = deckElement.find("dd").index(jQuery("#" + n).parents("dd")) - (__isVerticalDeck(deckElement) ? 1 : 0);
      i.playerType = "youtube";
      i.addEventListener("onStateChange", function(t) {
        switch (t.data) {
         case 0:
          jQuery.data(deckElement[0], "video-slidedeck").videoEnded(s, "youtube", e);
          break;
         case 1:
          jQuery(deckElement[0]).parents(".slidedeck-frame").addClass("sd2-video-playing");
          jQuery(deckElement[0]).slidedeck().pauseAutoPlay = !0;
        }
        i.youTubePlayerState = t.data;
      });
      typeof __slideDeckVideos[deckElement.attr("id")] != "object" && (__slideDeckVideos[deckElement.attr("id")] = {});
      __slideDeckVideos[deckElement.attr("id")]["v" + s] = i;
    });
  });
}

function briBriFlex(e, t) {
  var n = jQuery(e);
  n.append('<span class="test-character" style="position:absolute;display:block;top:0;left:-999em;">M</span>');
  var r = n.find(".test-character"), i = n.outerHeight(), s = r.outerHeight(), o = 0, u = parseInt(n.css("font-size"), 10), a = parseInt(n.css("line-height"), 10);
  i > s * t && n.css("line-height", "auto");
  while (i > s * t) {
    u--;
    a--;
    n.css("font-size", u + "px");
    o++;
    s = r.outerHeight();
    i = n.outerHeight();
  }
  o && n.css("line-height", a + "px");
  r.remove();
}

var ie = function() {
  var e, t = 3, n = document.createElement("div"), r = n.getElementsByTagName("i");
  while (n.innerHTML = "<!--[if gt IE " + ++t + "]><i></i><![endif]-->", r[0]) ;
  return t > 4 ? t : e;
}(), SlideDeckFadingNav = function(e) {
  this.elems = {};
  this.initialize(e);
}, SlideDeckPrefix = "sd2-", SlideDeckVideoAPIs, __slideDeckVideos = {};

window.dmAsyncInit = function() {
  jQuery(".slidedeck").has(".slide-type-video").each(function() {
    deckElement = jQuery(this);
    var e = this.id;
    deckElement.find(".video-container.dailymotion").append('<div class="video-player-dm"></div>');
    deckElement.find(".video-container.dailymotion .video-player-dm").each(function() {
      var t = this, n = jQuery(t).parent().attr("id"), r = "";
      jQuery(t).parent().data("video-id") ? r = jQuery(t).parent().data("video-id") : r = n.split("__")[1];
      var i = deckElement.find("dd").index(jQuery("#" + n).parents("dd")) - (__isVerticalDeck(deckElement) ? 1 : 0), s = DM.player(t, {
        video: r,
        width: "100%",
        height: "100%",
        params: {}
      });
      s.playerType = "dailymotion";
      s.addEventListener("ended", function(t) {
        jQuery.data(deckElement[0], "video-slidedeck").videoEnded(i, s.playerType, e);
      });
      s.addEventListener("playing", function(e) {
        jQuery(deckElement[0]).parents(".slidedeck-frame").addClass("sd2-video-playing");
        jQuery(deckElement[0]).slidedeck().pauseAutoPlay = !0;
      });
      typeof __slideDeckVideos[deckElement.attr("id")] != "object" && (__slideDeckVideos[deckElement.attr("id")] = {});
      __slideDeckVideos[deckElement.attr("id")]["v" + i] = s;
    });
  });
};

var SlideDeckOverlay = function(e) {
  this.classes = {
    container: "slidedeck-overlays",
    frame: "slidedeck-frame",
    toggle: "slidedeck-overlays-showhide",
    wrapper: "slidedeck-overlays-wrapper",
    overlay: "slidedeck-overlay",
    flipper: "slidedeck-overlay-flipper"
  };
  this.elems = {};
  this.speed = 200;
  this.easing = "ease-in-out";
  this.initialize(e);
}, SlideDeckOverlays = {
  actions: {},
  inits: {}
};

(function(e) {
  e.extend(e.fn, {
    isMobile: function() {
      return !1;
    }
  });
  window.SlideDeckVideoAPIs = function(t) {
    function E(e, t) {
      var n = "sd2-video-playing", r = __slideDeckVideos[f[0].id]["v" + e];
      switch (t) {
       case "youtube":
        if (typeof r != "undefined" && typeof r.getDuration == "function") {
          var i = r.getDuration(), s = r.getCurrentTime();
          if (r.getCurrentTime() > 0 && i != s) {
            r.playVideo();
            o.addClass(n);
          }
        }
        break;
       case "vimeo":
        typeof r != "undefined" && typeof r.api == "function" && r.api("getCurrentTime", function(e, t) {
          var i = e;
          if (i > 0) {
            r.api("play");
            o.addClass(n);
          }
        });
        break;
       case "dailymotion":
        if (typeof r != "undefined" && r.currentTime > 0 && r.currentTime < r.duration - 1) {
          r.play();
          o.addClass(n);
        }
      }
    }
    function S(t, n, r) {
      var i = e("#" + r), s = __slideDeckVideos[i[0].id]["v" + (t - 1)];
      if (typeof s != "undefined") {
        switch (n) {
         case "youtube":
          typeof s.playVideo == "function" && s.playVideo();
          break;
         case "vimeo":
          typeof s.api == "function" && s.api("play");
          break;
         case "dailymotion":
          typeof s.play == "function" && s.play();
        }
        o.addClass("sd2-video-playing");
      }
    }
    function x(e, t, n) {
      var r = __slideDeckVideos[f[0].id]["v" + e];
      switch (t) {
       case "youtube":
        typeof r != "undefined" && r.seekTo(n);
        break;
       case "vimeo":
        typeof r != "undefined" && r.api("seekTo", n);
        break;
       case "dailymotion":
        typeof r != "undefined" && r.seek(n);
      }
    }
    var n = this, r = !0, i = !0, s = !0;
    navigator.userAgent.match(/like Mac OS X/i) && (r = !1);
    if (navigator.userAgent.match(/android/i) || navigator.userAgent.match(/like Mac OS X/i)) i = !1;
    navigator.userAgent.match(/iPad/i) && (i = !0);
    var t = e(t), o = t.closest(".slidedeck-frame"), u = t.slidedeck(), a, f = t, l = f.find(".cover .play");
    for (var c = 0; c < l.length; c++) {
      var h = e(l[c]);
      h.css({
        marginTop: Math.round(h.outerHeight() / 2) * -1,
        marginLeft: Math.round(h.outerWidth() / 2) * -1
      });
      if (ie <= 8) {
        var p = h.parents(".cover");
        if (p.css("background-image") != "none") {
          var d = p.css("background-image").match(/url\([\"\'](.*)[\"\']\)/)[1];
          p.css({
            background: "none"
          });
          p.append('<div class="ie-background-image"></div>');
          var v = p.find(".ie-background-image");
          v[0].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + d + "', sizingMethod='scale')";
        }
      }
    }
    f.find(".cover .play").click(function(t) {
      t.preventDefault();
      var n = e(this).parent(), r = f[0].id, i = "";
      n.prev(".video-container").data("video-id") ? i = n.prev(".video-container").data("video-id") : i = n.prev(".video-container").attr("id").split("__")[1];
      var s = f.slidedeck(), o = s.slides;
      __isVerticalDeck(f) && (o = s.vertical().slides);
      var a = o.index(jQuery('[id*="video__' + i + '"]').closest("dd")), l = o.eq(a).find(".video-container")[0].className.split(" ")[0];
      n.fadeOut();
      u.pauseAutoPlay = !0;
      S(a + 1, l, r);
    });
    f.find(".cover .play-video-alternative").click(function(t) {
      t.preventDefault();
      e(this).closest(".cover").find(".play").trigger("click");
    });
    var m = u.options, g = u.options.before, y = u.options.complete, b = u, w = !1;
    if (__isVerticalDeck(u.deck)) {
      w = !0;
      b = u.vertical();
      m = u.vertical().options;
      g = m.before;
      y = m.complete;
    }
    m.before = function(e) {
      typeof g == "function" && g(e);
      if (typeof e.deck != "undefined") var t = e.deck[0]; else var t = e.slides.closest(".slidedeck")[0];
      jQuery.data(t, "video-slidedeck").slideDeckPauseAllVideos(e);
    };
    m.complete = function(e) {
      typeof y == "function" && y(e);
      var t = b.current;
      w && (t += 1);
      var n = b.slides.eq(t - 1).find(".video-container");
      if (n.length) {
        var r = n[0].className.split(" ")[0];
        i && E(t - 1, r);
      }
    };
    u.loaded(function(e) {
      var t = e.slides;
      __isVerticalDeck(e.deck) && (t = e.vertical().slides);
      e.deck.find(".video-container.vimeo").each(function() {
        var n = this, r = this.id, i = "";
        jQuery(n).data("video-id") ? i = jQuery(n).data("video-id") : i = r.split("__")[1];
        jQuery(n).append('<iframe id="vimeoiFrame-' + r + '" src="http://player.vimeo.com/video/' + i + "?api=1&byline=0&title=0&portrait=0&player_id=vimeoiFrame-" + r + '" width="100%" height="100%" frameborder="0"></iframe>');
        var s = t.index(jQuery("#" + r).closest("dd")), o = document.getElementById("vimeoiFrame-" + r), u = $f(o).addEvent("ready", function(t) {
          var n = $f(t);
          n.addEvent("finish", function(t) {
            jQuery.data(e.deck[0], "video-slidedeck").videoEnded(s, "vimeo", e.deck[0].id);
          });
          n.addEvent("play", function(t) {
            jQuery(e.deck[0]).parents(".slidedeck-frame").addClass("sd2-video-playing");
            jQuery(f[0]).slidedeck().pauseAutoPlay = !0;
          });
        });
        u.playerType = "vimeo";
        typeof __slideDeckVideos[e.deck.attr("id")] != "object" && (__slideDeckVideos[e.deck.attr("id")] = {});
        __slideDeckVideos[e.deck.attr("id")]["v" + s] = u;
      });
    });
    this.videoEnded = function(t, n, i) {
      var o = e("#" + i), u = __slideDeckVideos[i]["v" + t];
      switch (n) {
       case "youtube":
        break;
       case "vimeo":
        typeof (u != "undefined") && u.api("unload");
        break;
       case "dailymotion":
        typeof (u != "undefined");
      }
      if (s) {
        var a = o.slidedeck();
        __isVerticalDeck(o) && (a = a.vertical());
        a.next(function() {
          var t = a.current, n = e("#" + i).find("dd:eq(" + (t - 1) + ")");
          if (__isVerticalDeck(o)) {
            t += 1;
            n = e("#" + i).find(".slidesVertical dd:eq(" + (t - 1) + ")");
          }
          var s = o.find("dd .video-container:eq(" + (t - 1) + ")")[0].className.split(" ")[0];
          if (r) {
            n.find("a.play-video-button").parents("dd").addClass("sd2-hide-slide-content");
            n.find("a.play-video-button").click();
          }
        });
      }
    };
    this.slideDeckPauseAllVideos = function(e) {
      if (e.deck) var t = e.deck.attr("id"); else var t = e.slides.closest(".slidedeck").attr("id");
      var n = __slideDeckVideos[t];
      for (var r in n) {
        var i = n[r];
        o.removeClass("sd2-video-playing");
        switch (i.playerType) {
         case "youtube":
          typeof i.getPlayerState == "function" && i.getPlayerState() == 1 && i.pauseVideo();
          break;
         case "vimeo":
          i.api("pause");
          break;
         case "dailymotion":
          i.paused || i.pause();
        }
      }
    };
    return !0;
  };
  SlideDeckFadingNav.prototype.nav = function(e) {
    this.slidedeck.pauseAutoPlay = !0;
    switch (e) {
     case "next-horizontal":
      this.slidedeck.next();
      break;
     case "prev-horizontal":
      this.slidedeck.prev();
      break;
     case "next-vertical":
      this.slidedeck.options.cycle && this.slidedeck.vertical().current == this.slidedeck.vertical().slides.length - 1 ? this.slidedeck.vertical().goTo(0) : this.slidedeck.vertical().next();
      break;
     case "prev-vertical":
      this.slidedeck.options.cycle && this.slidedeck.vertical().current == 0 ? this.slidedeck.vertical().goTo(this.slidedeck.vertical().slides.length) : this.slidedeck.vertical().prev();
    }
  };
  SlideDeckFadingNav.prototype.checkVertical = function(e) {
    if (typeof e == "undefined") var e = this.slidedeck, t = this.elems.frame, n = this.elems.previousVertical, r = this.elems.nextVertical; else var t = e.deck.closest(".slidedeck-frame"), n = t.find(".deck-navigation.vertical.prev"), r = t.find(".deck-navigation.vertical.next");
    t.addClass("no-vertical-slide");
    e.verticalSlides && e.verticalSlides[e.current - 1] && e.verticalSlides[e.current - 1].navChildren && t.removeClass("no-vertical-slide");
    if (t.hasClass("no-vertical-slide")) return !1;
    n.show();
    r.show();
    if (e.options.cycle) return !1;
    typeof e.vertical() != "undefined" && (e.vertical().current == e.vertical().slides.length - 1 && !t.hasClass(SlideDeckPrefix + "show-back-cover") ? r.hide() : e.vertical().current == 0 && n.hide());
  };
  SlideDeckFadingNav.prototype.checkHorizontal = function(e) {
    if (typeof e == "undefined") var e = this.slidedeck, t = this.elems.frame, n = this.elems.previousHorizontal, r = this.elems.nextHorizontal; else var t = e.deck.closest(".slidedeck-frame"), n = t.find(".deck-navigation.horizontal.prev"), r = t.find(".deck-navigation.horizontal.next");
    if (!t.hasClass("no-vertical-slide")) return !1;
    n.show();
    r.show();
    if (e.options.cycle) return !1;
    e.current == e.slides.length && !t.hasClass(SlideDeckPrefix + "show-back-cover") ? r.hide() : e.current == 1 && n.hide();
  };
  SlideDeckFadingNav.prototype.initialize = function(t) {
    var n = this;
    this.elems.slidedeck = e(t);
    this.elems.frame = this.elems.slidedeck.closest(".slidedeck-frame");
    this.elems.navs = this.elems.frame.find(".deck-navigation");
    if (this.elems.navs.length < 1) return !1;
    this.elems.previousHorizontal = this.elems.navs.filter(".horizontal.prev");
    this.elems.nextHorizontal = this.elems.navs.filter(".horizontal.next");
    this.elems.previousVertical = this.elems.navs.filter(".vertical.prev");
    this.elems.nextVertical = this.elems.navs.filter(".vertical.next");
    this.slidedeck = this.elems.slidedeck.slidedeck();
    this.elems.frame.delegate(".deck-navigation", "click", function(e) {
      e.preventDefault();
      n.nav(this.href.split("#")[1]);
    });
    var r = this.slidedeck.options.before;
    this.slidedeck.setOption("before", function(e) {
      typeof r == "function" && r(e);
      n.checkHorizontal();
      n.checkVertical();
    });
    this.slidedeck.verticalSlides && this.slidedeck.slides.each(function(e) {
      if (n.slidedeck.verticalSlides[e] && typeof n.slidedeck.verticalSlides[e].slides != "undefined") {
        var t = n.slidedeck.vertical().options.complete;
        n.slidedeck.vertical().options.complete = function(e) {
          typeof t == "function" && t(e);
          n.checkVertical();
        };
      }
    });
    this.elems.frame.hasClass("display-nav-hover") && this.elems.frame.mouseenter(function(e) {
      n.elems.frame.addClass("hover");
    }).mouseleave(function(e) {
      n.elems.frame.removeClass("hover");
    });
    this.slidedeck.slides.length == 1 && this.elems.frame.find(".deck-navigation.horizontal").hide();
    this.checkVertical();
    this.checkHorizontal();
  };
  SlideDeckOverlay.prototype.close = function() {
    var e = this;
    this.elems.container.removeClass("open");
    this.elems.container.width(0);
  };
  SlideDeckOverlay.prototype.initialize = function(t) {
    var n = this;
    this.elems.slidedeck = e(t);
    this.elems.frame = this.elems.slidedeck.closest(".slidedeck-frame");
    if (this.elems.frame.length < 1) return !1;
    if (this.elems.frame.find("." + this.classes.container).length < 1) return !1;
    if (__slidedeck2_isMobile() && this.elems.frame.hasClass("show-overlay-hover")) {
      this.elems.frame.removeClass("show-overlay-hover");
      this.elems.frame.addClass("show-overlay-always");
    }
    __slidedeck2_isiOS() && this.elems.frame.addClass("sd2-is-ios");
    this.elems.container = this.elems.frame.find("." + this.classes.container);
    this.elems.toggle = this.elems.container.find("." + this.classes.toggle);
    this.elems.wrapper = this.elems.container.find("." + this.classes.wrapper);
    this.elems.overlays = this.elems.wrapper.find("." + this.classes.overlay);
    this.elems.container.offset().left < this.elems.frame.outerWidth() / 2 && this.elems.container.addClass("left");
    this.overlayWidth = 2;
    this.elems.overlays.each(function(e) {
      n.overlayWidth += n.elems.overlays.eq(e).outerWidth();
    });
    if (this.elems.frame.hasClass("show-overlay-never")) return !1;
    this.elems.frame.hasClass("show-overlay-hover") && this.elems.frame.bind("mouseenter", function(e) {
      n.elems.frame.addClass("hover");
    }).bind("mouseleave", function(e) {
      n.elems.frame.removeClass("hover");
    });
    this.elems.container.delegate("." + this.classes.toggle, "click", function(e) {
      e.preventDefault();
      n.toggle();
    });
    this.elems.container.delegate("." + this.classes.overlay, "click", function(t) {
      var n = e.data(this, "$this");
      if (!n) {
        n = e(this);
        e.data(this, "$this", n);
      }
      var r = n.attr("data-type");
      typeof SlideDeckOverlays.actions[r] == "function" && SlideDeckOverlays.actions[r](this, t);
    });
    this.elems.overlays.each(function(t) {
      var n = e.data(this, "$this");
      if (!n) {
        n = e(this);
        e.data(this, "$this", n);
      }
      var r = n.attr("data-type");
      typeof SlideDeckOverlays.inits[r] == "function" && SlideDeckOverlays.inits[r](this);
    });
    this.elems.frame.hasClass(SlideDeckPrefix + "overlays-open") && this.open();
  };
  SlideDeckOverlay.prototype.open = function() {
    var e = this;
    this.elems.container.addClass("open");
    this.elems.container.width(this.overlayWidth);
  };
  SlideDeckOverlay.prototype.toggle = function() {
    this.elems.container.hasClass("open") ? this.close() : this.open();
  };
  SlideDeckOverlays.actions.facebook = function(t, n) {
    n.preventDefault();
    var r = e.data(t, "$this");
    if (!r) {
      r = e(t);
      e.data(t, "$this", r);
    }
    var i = e(parent), s = {
      top: parent.screenY || parent.screenTop,
      left: parent.screenX || parent.screenLeft,
      width: i.outerWidth(),
      height: i.outerHeight()
    }, o = {
      width: parseInt(r.attr("data-popup-width"), 10),
      height: parseInt(r.attr("data-popup-height"), 10)
    };
    o.top = s.height / 2 - o.height / 2 + s.top;
    o.left = s.width / 2 - o.width / 2 + s.left;
    window.open(t.href, "_slidedeck_overlay", "width=" + o.width + ",height=" + o.height + ",channelmode=no,directories=no,fullscreen=no,location=yes,resizable=yes,menubar=no,scrollbars=yes,status=no,titlebar=yes,left=" + o.left + ",top=" + o.top);
  };
  SlideDeckOverlays.inits.facebook = function(e) {
    var t = parent.document.location.href.replace(parent.document.location.hash, "");
    e.href = e.href.replace(/u\=(\#|\%23)/, "u=" + escape(t + "#"));
  };
  SlideDeckOverlays.inits.twitter = function(e) {
    var t = parent.document.location.href.replace(parent.document.location.hash, "");
    e.href = e.href.replace(/url\=(\#|\%23)/, "url=" + escape(t + "#"));
  };
  e(document).ready(function() {
    e(".slidedeck").each(function() {
      var t = e(this);
      e.data(this, "SlideDeckFadingNav") || e.data(this, "SlideDeckFadingNav", new SlideDeckFadingNav(this));
      e.data(this, "SlideDeckOverlay") || e.data(this, "SlideDeckOverlay", new SlideDeckOverlay(this));
      t.has(".slide-type-video").each(function() {
        typeof e.data(this, "video-slidedeck") == "undefined" && e.data(this, "video-slidedeck", new SlideDeckVideoAPIs(this));
      });
      ie && ie <= 8 && t.find(".sd2-slide-background").each(function() {
        var t = e(this), n = t.closest("dd");
        if (t.css("background-image") != "none") {
          var r = t.css("background-image").match(/url\([\"\'](.*)[\"\']\)/)[1];
          this.style.background = "none";
          var i = "scale";
          n.hasClass("sd2-image-scaling-none") && (i = "image");
          this.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + r + "', sizingMethod='" + i + "')";
        }
      });
    });
  });
})(jQuery);

var SlideDeckCoverPostProcessFront = {}, SlideDeckCoverPostProcessBack = {}, SlideDeckCover = function(e) {
  this.elems = {};
  this.slidedeckOptions = {};
  this.hasFront = !1;
  this.hasBack = !1;
  this.classes = {
    backCover: "slidedeck-cover-back",
    cover: "slidedeck-cover",
    frame: "slidedeck-frame",
    frontCover: "slidedeck-cover-front",
    mask: "slidedeck-cover-mask",
    nav: "deck-navigation",
    open: "slidedeck-cover-open",
    overlay: "slidedeck-overlays",
    restart: "slidedeck-cover-restart",
    wrapper: "slidedeck-cover-wrapper"
  };
  this.easing = {
    smooth: {
      front: "easeInCubic",
      back: "easeOutCubic"
    },
    back: {
      front: "easeSlideDeckCoverEaseIn",
      back: "easeSlideDeckCoverEaseOut"
    }
  };
  this.speed = 750;
  this.slidedeck = null;
  this.backCoverVisible = !1;
  this.coverStyle = "";
  this.initialize(e);
};

(function(e) {
  jQuery.extend(jQuery.easing, {
    easeSlideDeckCoverEaseIn: function(e, t, n, r, i, s) {
      s == undefined && (s = .9);
      return r * (t /= i) * t * ((s + 1) * t - s) + n;
    },
    easeSlideDeckCoverEaseOut: function(e, t, n, r, i, s) {
      s == undefined && (s = .9);
      return r * ((t = t / i - 1) * t * ((s + 1) * t + s) + 1) + n;
    }
  });
  SlideDeckCover.prototype.close = function() {
    var e = this;
    this.backCoverVisible = !0;
    this.slidedeck.setOption("keys", !1);
    this.slidedeck.setOption("scroll", !1);
    this.slidedeck.pauseAutoPlay = !0;
    this.elems.frame.addClass("force-nav-hidden");
    this.elems.overlay.fadeOut(this.speed);
    this.elems.backCover.css({
      zIndex: 1e3,
      display: "block"
    });
    var t = this.elems.backWrapper.outerWidth();
    this.elems.backWrapper.css({
      right: 0 - t
    }).animate({
      right: 0
    }, this.speed, this.easing[this.easingStyle()].back);
    this.elems.backMask.animate({
      opacity: .8
    }, this.speed);
  };
  SlideDeckCover.prototype.easingStyle = function() {
    var e = "back", t = this.elems.frame[0].className.match(/slidedeck-cover-easing-([a-z0-9A-Z\-]+)/);
    t.length > 1 && (e = t[1]);
    return e;
  };
  SlideDeckCover.prototype.open = function() {
    var e = this;
    this.slidedeck.pauseAutoPlay = !1;
    this.slidedeck.options.keys = this.slidedeckOptions.keys;
    this.slidedeck.options.scroll = this.slidedeckOptions.scroll;
    this.elems.frame.removeClass("force-nav-hidden");
    this.elems.frame.hasClass("show-overlay-never") || (this.elems.frame.hasClass("show-overlay-hover") ? this.elems.overlay.removeAttr("style") : this.elems.overlay.animate({
      opacity: 1
    }, this.speed));
    var t = this.elems.frontWrapper.outerWidth();
    this.elems.frontWrapper.animate({
      left: 0 - t
    }, this.speed, this.easing[this.easingStyle()].front);
    this.elems.frontMask.fadeOut(this.speed, function() {
      e.elems.frontCover.hide();
    });
  };
  SlideDeckCover.prototype.revert = function() {
    var e = this;
    this.backCoverVisible = !0;
    __isVerticalDeck(this.slidedeck) ? this.slidedeck.goToVertical(1) : this.slidedeck.goTo(1);
    this.slidedeck.setOption("keys", this.slidedeckOptions.keys);
    this.slidedeck.setOption("scroll", this.slidedeckOptions.scroll);
    this.slidedeck.pauseAutoPlay = !1;
    this.elems.frame.removeClass("force-nav-hidden");
    this.elems.overlay.fadeIn(this.speed);
    var t = this.elems.backWrapper.outerWidth();
    this.elems.backWrapper.animate({
      right: 0 - t
    }, this.speed, this.easing[this.easingStyle()].back);
    this.elems.backMask.animate({
      opacity: 0
    }, this.speed, function() {
      e.elems.backCover.css("z-index", 1);
      e.backCoverVisible = !1;
    });
  };
  SlideDeckCover.prototype.initialize = function(t) {
    var n = this;
    if (n.elems.frame && n.elems.frame.hasClass("sd2-small")) return !1;
    this.elems.slidedeck = e(t);
    this.elems.frame = this.elems.slidedeck.closest("." + this.classes.frame);
    if (this.elems.frame.length < 1) return !1;
    this.elems.frontCover = this.elems.frame.find("." + this.classes.frontCover);
    this.elems.backCover = this.elems.frame.find("." + this.classes.backCover);
    this.elems.nav = this.elems.frame.find("." + this.classes.nav);
    this.elems.overlay = this.elems.frame.find("." + this.classes.overlay);
    this.slidedeck = this.elems.slidedeck.slidedeck();
    this.slidedeckOptions = e.extend(this.slidedeckOptions, this.slidedeck.options);
    var r = this.elems.frame[0].className.match(/slidedeck-cover-style-([a-z0-9A-Z\-]+)/);
    if (r) {
      r.length > 1 && (this.coverStyle = r[1]);
      var i = this.elems.frame[0].className.match(/slidedeck-cover-easing-([a-z0-9A-Z\-]+)/);
      i || this.elems.frame.addClass("slidedeck-cover-easing-back");
      if (this.elems.frontCover.length) {
        this.hasFront = !0;
        this.initializeFront();
      }
      if (this.elems.backCover.length) {
        this.hasBack = !0;
        this.initializeBack();
      }
    }
  };
  SlideDeckCover.prototype.initializeBack = function() {
    var e = this;
    if (e.elems.frame && e.elems.frame.hasClass("sd2-small")) return !1;
    this.elems.backWrapper = this.elems.backCover.find("." + this.classes.wrapper);
    this.elems.backMask = this.elems.backCover.find("." + this.classes.mask);
    this.elems.restart = this.elems.backCover.find("." + this.classes.restart);
    var n = this.slidedeck.options.before;
    this.slidedeck.setOption("before", function(t) {
      typeof n == "function" && n(t);
      if ((t.current == 1 && t.former == t.slides.length || t.current == t.former && t.current == t.slides.length && t.options.cycle == 0) && t.slides.length > 1 && e.backCoverVisible == 0) {
        t.current = t.slides.length;
        e.close();
      }
    });
    this.elems.restart.bind("click", function(t) {
      t.preventDefault();
      e.revert();
    });
    typeof t == "function" && t(this.elems.restart);
    SlideDeckCoverPostProcessBack[this.coverStyle] && SlideDeckCoverPostProcessBack[this.coverStyle](this.elems.restart, this.elems.frame.hasClass("slidedeck-cover-peek"));
    e.elems.backCover.hide();
  };
  SlideDeckCover.prototype.initializeFront = function() {
    var n = this;
    if (n.elems.frame && n.elems.frame.hasClass("sd2-small")) return !1;
    this.elems.frontWrapper = this.elems.frontCover.find("." + this.classes.wrapper);
    this.elems.frontMask = this.elems.frontCover.find("." + this.classes.mask);
    this.elems.open = this.elems.frontCover.find("." + this.classes.open);
    this.elems.frame.addClass("force-nav-hidden");
    this.elems.overlay.css("opacity", 0);
    this.slidedeck.pauseAutoPlay = !0;
    this.slidedeck.setOption("keys", !1);
    this.slidedeck.setOption("scroll", !1);
    this.elems.open.bind("click", function(e) {
      e.preventDefault();
      n.open();
    });
    this.slidedeck.options.autoPlay == 1 && setTimeout(function() {
      n.open();
    }, this.slidedeck.options.autoPlayInterval);
    typeof t == "function" && t(this.elems.open);
    SlideDeckCoverPostProcessFront[this.coverStyle] && SlideDeckCoverPostProcessFront[this.coverStyle](this.elems.open, this.elems.frame.hasClass("slidedeck-cover-peek"));
    e(window).load(function() {
      n.elems.frontMask.animate({
        opacity: .35
      }, 1e3);
    });
  };
  SlideDeckCoverPostProcessFront.leather = function(e, t) {
    var n = e.find(".slidedeck-cover-color"), r = n.css("background-color"), i = Raphael.getRGB(r), s = Raphael.rgb2hsl(i.r, i.g, i.b);
    s.l = Math.min(100, 110 * s.l) / 100;
    var o = Raphael.hsl(s.h, s.s, s.l), u = Raphael(n[0], 42, 84), a = t ? 0 : 42, f = u.ellipse(a, 42, 41, 42);
    f.attr({
      stroke: "none",
      fill: r
    });
    n.css("background-color", "").data("slidedeck-cover-shape", f);
    e.bind("mouseenter", function(e) {
      f.attr("fill", o);
    }).bind("mouseleave", function(e) {
      f.attr("fill", r);
    });
    e.closest(".slidedeck-frame")[0].className = e.closest(".slidedeck-frame")[0].className.replace(/slidedeck-cover-easing-([a-z0-9A-Z\-]+)/, "slidedeck-cover-easing-back");
  };
  SlideDeckCoverPostProcessBack.leather = function(e, t) {
    var n = e.find(".slidedeck-cover-color"), r = n.css("background-color"), i = Raphael.getRGB(r), s = Raphael.rgb2hsl(i.r, i.g, i.b);
    s.l = Math.min(100, 110 * s.l) / 100;
    var o = Raphael.hsl(s.h, s.s, s.l), u = Raphael(n[0], 42, 84), a = t ? 42 : 0, f = u.ellipse(a, 42, 41, 42);
    f.attr({
      stroke: "none",
      fill: r
    });
    e.bind("mouseenter", function(e) {
      f.attr("fill", o);
    }).bind("mouseleave", function(e) {
      f.attr("fill", r);
    });
    var l = e.parents(".slidedeck-cover-wrapper").find(".slidedeck-cover-cta"), c = l.find(".slidedeck-cover-color");
    c.find(".cap2").remove();
    c.find(".cap2-image").remove();
    l.find(".cap1").remove();
    l.find(".cap1-image").remove();
    c.append('<div class="cap2"></div>');
    c.append('<div class="cap2-image"></div>');
    l.append('<div class="cap1"></div>');
    l.append('<div class="cap1-image"></div>');
    var h = Raphael(l.find(".cap1")[0], 32, 57), p = Raphael(c.find(".cap2")[0], 32, 57), d = h.ellipse(31, 29, 26, 26);
    d.attr({
      fill: r
    });
    var v = p.ellipse(0, 29, 26, 26);
    v.attr({
      fill: r
    });
    n.css("background-color", "").data("slidedeck-cover-shape", [ f, d, v ]);
    l.bind("mouseenter", function(e) {
      d.attr("fill", o);
      v.attr("fill", o);
    }).bind("mouseleave", function(e) {
      d.attr("fill", r);
      v.attr("fill", r);
    });
    e.closest(".slidedeck-frame")[0].className = e.closest(".slidedeck-frame")[0].className.replace(/slidedeck-cover-easing-([a-z0-9A-Z\-]+)/, "slidedeck-cover-easing-back");
  };
  SlideDeckCoverPostProcessFront.book = function(e, t) {
    var n = e.find(".slidedeck-cover-color"), r = n.css("background-color"), i = Raphael.getRGB(r), s = Raphael.rgb2hsl(i.r, i.g, i.b);
    s.l = Math.min(100, 110 * s.l) / 100;
    var o = Raphael.hsl(s.h, s.s, s.l), u = Raphael(n[0], 90, 72);
    if (t) var a = u.path("M84.246,0.901c-4.648-0.482-11.957-0.625-22.065-0.822L60.646,0.05  C58.979,0.017,57.227,0,55.445,0C33.884,0,5.432,2.263,0,2.712c0,0.037,0,0.111,0,0.201v67.831c0,0,29.504-2.716,49-2  c23.397,0.86,40.878,4.236,40.878-1.404c0-0.154,0-0.354,0-0.596c0.099,0.03,0.205,0.057,0.297,0.09c0-4.062,0-64.046,0-64.046  C90.176,2.31,89.408,1.434,84.246,0.901z"); else var a = u.path("M92.65,2.782c0,0-37.278-3.218-61.673-2.739 C9.446,0.466,0.471,0.56,0.471,3.781c0,3.626,0,59.199,0,66.549c-0.053-0.429,0.106-0.775,0.436-1.061 c1.439,4.389,14.292,1.716,35.801,1.333c18.233-0.327,55.941,1.146,55.941,1.146v-0.941h0.001V2.782z");
    a.attr({
      stroke: "none",
      fill: r
    });
    n.css("background-color", "").data("slidedeck-cover-shape", a);
    e.bind("mouseenter", function(e) {
      a.attr("fill", o);
    }).bind("mouseleave", function(e) {
      a.attr("fill", r);
    });
    e.closest(".slidedeck-frame")[0].className = e.closest(".slidedeck-frame")[0].className.replace(/slidedeck-cover-easing-([a-z0-9A-Z\-]+)/, "slidedeck-cover-easing-smooth");
  };
  SlideDeckCoverPostProcessBack.book = function(e, t) {
    var n = e.find(".slidedeck-cover-color"), r = n.css("background-color"), i = Raphael.getRGB(r), s = Raphael.rgb2hsl(i.r, i.g, i.b);
    s.l = Math.min(100, 110 * s.l) / 100;
    var o = Raphael.hsl(s.h, s.s, s.l), u = Raphael(n[0], 90, 72), a = u.path("M92.65,2.782c0,0-37.278-3.218-61.673-2.739 C9.446,0.466,0.471,0.56,0.471,3.781c0,3.626,0,59.199,0,66.549c-0.053-0.429,0.106-0.775,0.436-1.061 c1.439,4.389,14.292,1.716,35.801,1.333c18.233-0.327,55.941,1.146,55.941,1.146v-0.941h0.001V2.782z");
    a.attr({
      stroke: "none",
      fill: r
    });
    n.css("background-color", "").data("slidedeck-cover-shape", a);
    e.bind("mouseenter", function(e) {
      a.attr("fill", o);
    }).bind("mouseleave", function(e) {
      a.attr("fill", r);
    });
    e.closest(".slidedeck-frame")[0].className = e.closest(".slidedeck-frame")[0].className.replace(/slidedeck-cover-easing-([a-z0-9A-Z\-]+)/, "slidedeck-cover-easing-smooth");
  };
  SlideDeckCoverPostProcessFront.glass = function(e, t) {
    var n = e.find(".slidedeck-cover-color"), r = n.css("background-color"), i = Raphael.getRGB(r), s = Raphael.rgb2hsl(i.r, i.g, i.b);
    s.l = Math.min(100, 110 * s.l) / 100;
    var o = Raphael.hsl(s.h, s.s, s.l), u = Raphael.rgb2hsb(i.r, i.g, i.b);
    u.s = u.s * .2;
    u.b = 1;
    var a = Raphael.rgb2hsb(i.r, i.g, i.b);
    a.s = a.s * .05;
    a.b = 1;
    var f = "90-hsb(" + u.h + "," + u.s + "," + u.b + ")-hsb(" + a.h + "," + a.s + "," + a.b + ")";
    e.parents(".slidedeck-cover-front").find(".frosted-glass").remove();
    e.parents(".slidedeck-cover-front").find(".slidedeck-cover-copy").append('<div class="frosted-glass"></div>');
    var l = e.parents(".slidedeck-cover-wrapper").find(".frosted-glass"), c = l.width(), h = l.height(), p = Raphael(l[0], c, h), d = 25, v = 10, m = "M0,0";
    m += "H" + c;
    m += "V" + h;
    m += "H0";
    m += "z";
    m += "M " + parseInt(c - d * 2 - v, 10) + " " + parseInt(h / 2, 10) + " a " + d + " " + d + " 0 1 0 0 " + -0.0001;
    m += "m14,-6h13v-4l12,11,l-12,11,v-4h-13";
    var g = p.path(m);
    g.attr({
      stroke: "none",
      fill: "url(" + slideDeck2URLPath + "/images/frosted-glass-noise.png)",
      opacity: 1
    });
    var y = p.path(m);
    y.attr({
      stroke: "none",
      fill: f,
      opacity: .6
    });
    l.data("slidedeck-frosted-cover-background", y);
    var m = "M0,0";
    m += "H" + c;
    m += "V" + h * .1;
    m += "Q" + c * .3 + "," + h * .3 + ", 0 " + h * .85;
    m += "z";
    var b = p.path(m);
    b.attr({
      stroke: "none",
      fill: f,
      opacity: .2
    });
    l.data("slidedeck-frosted-cover-shine", b);
  };
  SlideDeckCoverPostProcessBack.glass = function(e, t) {
    var n = e.find(".slidedeck-cover-color"), r = n.css("background-color"), i = Raphael.getRGB(r), s = Raphael.rgb2hsl(i.r, i.g, i.b);
    s.l = Math.min(100, 110 * s.l) / 100;
    var o = Raphael.hsl(s.h, s.s, s.l), u = Raphael.rgb2hsb(i.r, i.g, i.b);
    u.s = u.s * .2;
    u.b = 1;
    var a = Raphael.rgb2hsb(i.r, i.g, i.b);
    a.s = a.s * .05;
    a.b = 1;
    var f = "90-hsb(" + u.h + "," + u.s + "," + u.b + ")-hsb(" + a.h + "," + a.s + "," + a.b + ")";
    e.parents(".slidedeck-cover-back").find(".frosted-glass-back").remove();
    e.parents(".slidedeck-cover-back").find(".slidedeck-cover-copy").append('<div class="frosted-glass-back"></div>');
    var l = e.parents(".slidedeck-cover-back").find(".frosted-glass-back"), c = l.width(), h = l.height(), p = Raphael(l[0], c, h), d = 25, v = 10, m = "M0,0";
    m += "H" + c;
    m += "V" + h;
    m += "H0";
    m += "z";
    m += "M " + parseInt(d - v, 10) + " " + parseInt(h / 2, 10) + " a " + d + " " + d + " 0 1 0 0 " + -0.0001;
    var g = p.path(m);
    g.attr({
      stroke: "none",
      fill: "url(" + slideDeck2URLPath + "/images/frosted-glass-noise.png)",
      opacity: 1
    });
    var y = p.path(m);
    y.attr({
      stroke: "none",
      fill: f,
      opacity: .6
    });
    l.data("slidedeck-frosted-cover-back-background", y);
    var m = "M0,0";
    m += "H" + c;
    m += "V" + h * .1;
    m += "Q" + c * .3 + "," + h * .3 + ", 0 " + h * .85;
    m += "z";
    m += "M " + parseInt(d - v, 10) + " " + parseInt(h / 2, 10) + " a " + d + " " + d + " 0 1 0 0 " + -0.0001;
    var b = p.path(m);
    b.attr({
      stroke: "none",
      fill: f,
      opacity: .2
    });
    l.data("slidedeck-frosted-cover-back-shine", b);
  };
  var t = function(t) {
    var n = t.find(".slidedeck-cover-color"), r = n.css("background-color"), i = Raphael.getRGB(r), s = Raphael.rgb2hsl(i.r, i.g, i.b);
    s.l = Math.min(100, 110 * s.l) / 100;
    var o = Raphael.hsl(s.h, s.s, s.l);
    t.parent().delegate(".slidedeck-cover-cta", "mouseenter mouseleave", function(t) {
      t.type == "mouseenter" ? e(this).find(".slidedeck-cover-color").css({
        backgroundColor: o
      }) : e(this).find(".slidedeck-cover-color").css({
        backgroundColor: r
      });
    });
  };
  e(document).ready(function() {
    e(".slidedeck").each(function() {
      e.data(this, "SlideDeckCover") || e.data(this, "SlideDeckCover", new SlideDeckCover(this));
    });
  });
})(jQuery);

(function(e) {
  var t = {
    linkTargets: function(e) {
      this.setContext(e).context.find('.slidedeck-frame a.slidedeck-2-bug[rel*="external"]').attr("target", "_blank");
      return this;
    },
    setContext: function(t) {
      typeof t != "undefined" && (this.context = e(t));
      return this;
    },
    initialize: function(t) {
      typeof t == "undefined" && (t = e(document.body));
      this.setContext(t).linkTargets();
    }
  };
  e(document).ready(function() {
    t.initialize();
  });
})(jQuery);

(function(e) {
  var t = "0.3.4", n = "hasOwnProperty", r = /[\.\/]/, i = "*", s = function() {}, o = function(e, t) {
    return e - t;
  }, u, a, f = {
    n: {}
  }, l = function(e, t) {
    var n = f, r = a, i = Array.prototype.slice.call(arguments, 2), s = l.listeners(e), c = 0, p = !1, d, v = [], m = {}, y = [], b = u, w = [];
    u = e, a = 0;
    for (var E = 0, S = s.length; E < S; E++) "zIndex" in s[E] && (v.push(s[E].zIndex), s[E].zIndex < 0 && (m[s[E].zIndex] = s[E]));
    v.sort(o);
    while (v[c] < 0) {
      d = m[v[c++]], y.push(d.apply(t, i));
      if (a) {
        a = r;
        return y;
      }
    }
    for (E = 0; E < S; E++) {
      d = s[E];
      if ("zIndex" in d) if (d.zIndex == v[c]) {
        y.push(d.apply(t, i));
        if (a) break;
        do {
          c++, d = m[v[c]], d && y.push(d.apply(t, i));
          if (a) break;
        } while (d);
      } else m[d.zIndex] = d; else {
        y.push(d.apply(t, i));
        if (a) break;
      }
    }
    a = r, u = b;
    return y.length ? y : null;
  };
  l.listeners = function(e) {
    var t = e.split(r), n = f, s, o, u, a, l, c, h, p, v = [ n ], m = [];
    for (a = 0, l = t.length; a < l; a++) {
      p = [];
      for (c = 0, h = v.length; c < h; c++) {
        n = v[c].n, o = [ n[t[a]], n[i] ], u = 2;
        while (u--) s = o[u], s && (p.push(s), m = m.concat(s.f || []));
      }
      v = p;
    }
    return m;
  }, l.on = function(e, t) {
    var n = e.split(r), i = f;
    for (var o = 0, u = n.length; o < u; o++) i = i.n, !i[n[o]] && (i[n[o]] = {
      n: {}
    }), i = i[n[o]];
    i.f = i.f || [];
    for (o = 0, u = i.f.length; o < u; o++) if (i.f[o] == t) return s;
    i.f.push(t);
    return function(e) {
      +e == +e && (t.zIndex = +e);
    };
  }, l.stop = function() {
    a = 1;
  }, l.nt = function(e) {
    return e ? (new RegExp("(?:\\.|\\/|^)" + e + "(?:\\.|\\/|$)")).test(u) : u;
  }, l.off = l.unbind = function(e, t) {
    var s = e.split(r), o, u, a, l, h, p, v, m = [ f ];
    for (l = 0, h = s.length; l < h; l++) for (p = 0; p < m.length; p += a.length - 2) {
      a = [ p, 1 ], o = m[p].n;
      if (s[l] != i) o[s[l]] && a.push(o[s[l]]); else for (u in o) o[n](u) && a.push(o[u]);
      m.splice.apply(m, a);
    }
    for (l = 0, h = m.length; l < h; l++) {
      o = m[l];
      while (o.n) {
        if (t) {
          if (o.f) {
            for (p = 0, v = o.f.length; p < v; p++) if (o.f[p] == t) {
              o.f.splice(p, 1);
              break;
            }
            !o.f.length && delete o.f;
          }
          for (u in o.n) if (o.n[n](u) && o.n[u].f) {
            var g = o.n[u].f;
            for (p = 0, v = g.length; p < v; p++) if (g[p] == t) {
              g.splice(p, 1);
              break;
            }
            !g.length && delete o.n[u].f;
          }
        } else {
          delete o.f;
          for (u in o.n) o.n[n](u) && o.n[u].f && delete o.n[u].f;
        }
        o = o.n;
      }
    }
  }, l.once = function(e, t) {
    var n = function() {
      var r = t.apply(this, arguments);
      l.unbind(e, n);
      return r;
    };
    return l.on(e, n);
  }, l.version = t, l.toString = function() {
    return "You are running Eve " + t;
  }, typeof module != "undefined" && module.exports ? module.exports = l : typeof define != "undefined" ? define("eve", [], function() {
    return l;
  }) : e.eve = l;
})(this), function() {
  function e(e) {
    for (var t = 0; t < An.length; t++) An[t].el.paper == e && An.splice(t--, 1);
  }
  function t(e, t, n, i, s, u) {
    n = at(n);
    var a, f, l, c = [], h, p, d, v = e.ms, m = {}, g = {}, y = {};
    if (i) for (E = 0, x = An.length; E < x; E++) {
      var b = An[E];
      if (b.el.id == t.id && b.anim == e) {
        b.percent != n ? (An.splice(E, 1), l = 1) : f = b, t.attr(b.totalOrigin);
        break;
      }
    } else i = +g;
    for (var E = 0, x = e.percents.length; E < x; E++) {
      if (e.percents[E] == n || e.percents[E] > i * e.top) {
        n = e.percents[E], p = e.percents[E - 1] || 0, v = v / e.top * (n - p), h = e.percents[E + 1], a = e.anim[n];
        break;
      }
      i && t.attr(e.anim[e.percents[E]]);
    }
    if (!!a) {
      if (!f) {
        for (var T in a) if (a[C](T)) if (ht[C](T) || t.paper.customAttributes[C](T)) {
          m[T] = t.attr(T), m[T] == null && (m[T] = ct[T]), g[T] = a[T];
          switch (ht[T]) {
           case J:
            y[T] = (g[T] - m[T]) / v;
            break;
           case "colour":
            m[T] = w.getRGB(m[T]);
            var N = w.getRGB(g[T]);
            y[T] = {
              r: (N.r - m[T].r) / v,
              g: (N.g - m[T].g) / v,
              b: (N.b - m[T].b) / v
            };
            break;
           case "path":
            var k = Qt(m[T], g[T]), L = k[1];
            m[T] = k[0], y[T] = [];
            for (E = 0, x = m[T].length; E < x; E++) {
              y[T][E] = [ 0 ];
              for (var A = 1, O = m[T][E].length; A < O; A++) y[T][E][A] = (L[E][A] - m[T][E][A]) / v;
            }
            break;
           case "transform":
            var M = t._, _ = an(M[T], g[T]);
            if (_) {
              m[T] = _.from, g[T] = _.to, y[T] = [], y[T].real = !0;
              for (E = 0, x = m[T].length; E < x; E++) {
                y[T][E] = [ m[T][E][0] ];
                for (A = 1, O = m[T][E].length; A < O; A++) y[T][E][A] = (g[T][E][A] - m[T][E][A]) / v;
              }
            } else {
              var P = t.matrix || new o, H = {
                _: {
                  transform: M.transform
                },
                getBBox: function() {
                  return t.getBBox(1);
                }
              };
              m[T] = [ P.a, P.b, P.c, P.d, P.e, P.f ], on(H, g[T]), g[T] = H._.transform, y[T] = [ (H.matrix.a - P.a) / v, (H.matrix.b - P.b) / v, (H.matrix.c - P.c) / v, (H.matrix.d - P.d) / v, (H.matrix.e - P.e) / v, (H.matrix.f - P.f) / v ];
            }
            break;
           case "csv":
            var B = j(a[T])[F](S), I = j(m[T])[F](S);
            if (T == "clip-rect") {
              m[T] = I, y[T] = [], E = I.length;
              while (E--) y[T][E] = (B[E] - m[T][E]) / v;
            }
            g[T] = B;
            break;
           default:
            B = [][D](a[T]), I = [][D](m[T]), y[T] = [], E = t.paper.customAttributes[T].length;
            while (E--) y[T][E] = ((B[E] || 0) - (I[E] || 0)) / v;
          }
        }
        var q = a.easing, R = w.easing_formulas[q];
        if (!R) {
          R = j(q).match(st);
          if (R && R.length == 5) {
            var U = R;
            R = function(e) {
              return r(e, +U[1], +U[2], +U[3], +U[4], v);
            };
          } else R = Nt;
        }
        d = a.start || e.start || +(new Date), b = {
          anim: e,
          percent: n,
          timestamp: d,
          start: d + (e.del || 0),
          status: 0,
          initstatus: i || 0,
          stop: !1,
          ms: v,
          easing: R,
          from: m,
          diff: y,
          to: g,
          el: t,
          callback: a.callback,
          prev: p,
          next: h,
          repeat: u || e.times,
          origin: t.attr(),
          totalOrigin: s
        }, An.push(b);
        if (i && !f && !l) {
          b.stop = !0, b.start = new Date - v * i;
          if (An.length == 1) return Mn();
        }
        l && (b.start = new Date - b.ms * i), An.length == 1 && On(Mn);
      } else f.initstatus = i, f.start = new Date - f.ms * i;
      eve("raphael.anim.start." + t.id, t, e);
    }
  }
  function n(e, t) {
    var n = [], r = {};
    this.ms = t, this.times = 1;
    if (e) {
      for (var i in e) e[C](i) && (r[at(i)] = e[i], n.push(at(i)));
      n.sort(xt);
    }
    this.anim = r, this.top = n[n.length - 1], this.percents = n;
  }
  function r(e, t, n, r, i, s) {
    function o(e, t) {
      var n, r, i, s, o, u;
      for (i = e, u = 0; u < 8; u++) {
        s = a(i) - e;
        if (X(s) < t) return i;
        o = (3 * c * i + 2 * l) * i + f;
        if (X(o) < 1e-6) break;
        i -= s / o;
      }
      n = 0, r = 1, i = e;
      if (i < n) return n;
      if (i > r) return r;
      while (n < r) {
        s = a(i);
        if (X(s - e) < t) return i;
        e > s ? n = i : r = i, i = (r - n) / 2 + n;
      }
      return i;
    }
    function u(e, t) {
      var n = o(e, t);
      return ((d * n + p) * n + h) * n;
    }
    function a(e) {
      return ((c * e + l) * e + f) * e;
    }
    var f = 3 * t, l = 3 * (r - t) - f, c = 1 - f - l, h = 3 * n, p = 3 * (i - n) - h, d = 1 - h - p;
    return u(e, 1 / (200 * s));
  }
  function i() {
    return this.x + B + this.y + B + this.width + " × " + this.height;
  }
  function s() {
    return this.x + B + this.y;
  }
  function o(e, t, n, r, i, s) {
    e != null ? (this.a = +e, this.b = +t, this.c = +n, this.d = +r, this.e = +i, this.f = +s) : (this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.e = 0, this.f = 0);
  }
  function u(e, t, n) {
    e = w._path2curve(e), t = w._path2curve(t);
    var r, i, s, o, u, f, l, c, h, p, d = n ? 0 : [];
    for (var v = 0, m = e.length; v < m; v++) {
      var g = e[v];
      if (g[0] == "M") r = u = g[1], i = f = g[2]; else {
        g[0] == "C" ? (h = [ r, i ].concat(g.slice(1)), r = h[6], i = h[7]) : (h = [ r, i, r, i, u, f, u, f ], r = u, i = f);
        for (var y = 0, b = t.length; y < b; y++) {
          var E = t[y];
          if (E[0] == "M") s = l = E[1], o = c = E[2]; else {
            E[0] == "C" ? (p = [ s, o ].concat(E.slice(1)), s = p[6], o = p[7]) : (p = [ s, o, s, o, l, c, l, c ], s = l, o = c);
            var S = a(h, p, n);
            if (n) d += S; else {
              for (var x = 0, T = S.length; x < T; x++) S[x].segment1 = v, S[x].segment2 = y, S[x].bez1 = h, S[x].bez2 = p;
              d = d.concat(S);
            }
          }
        }
      }
    }
    return d;
  }
  function a(e, t, n) {
    var r = w.bezierBBox(e), i = w.bezierBBox(t);
    if (!w.isBBoxIntersect(r, i)) return n ? 0 : [];
    var s = p.apply(0, e), o = p.apply(0, t), u = ~~(s / 5), a = ~~(o / 5), f = [], l = [], h = {}, d = n ? 0 : [];
    for (var v = 0; v < u + 1; v++) {
      var m = w.findDotsAtSegment.apply(w, e.concat(v / u));
      f.push({
        x: m.x,
        y: m.y,
        t: v / u
      });
    }
    for (v = 0; v < a + 1; v++) m = w.findDotsAtSegment.apply(w, t.concat(v / a)), l.push({
      x: m.x,
      y: m.y,
      t: v / a
    });
    for (v = 0; v < u; v++) for (var g = 0; g < a; g++) {
      var y = f[v], b = f[v + 1], E = l[g], S = l[g + 1], x = X(b.x - y.x) < .001 ? "y" : "x", T = X(S.x - E.x) < .001 ? "y" : "x", N = c(y.x, y.y, b.x, b.y, E.x, E.y, S.x, S.y);
      if (N) {
        if (h[N.x.toFixed(4)] == N.y.toFixed(4)) continue;
        h[N.x.toFixed(4)] = N.y.toFixed(4);
        var C = y.t + X((N[x] - y[x]) / (b[x] - y[x])) * (b.t - y.t), k = E.t + X((N[T] - E[T]) / (S[T] - E[T])) * (S.t - E.t);
        C >= 0 && C <= 1 && k >= 0 && k <= 1 && (n ? d++ : d.push({
          x: N.x,
          y: N.y,
          t1: C,
          t2: k
        }));
      }
    }
    return d;
  }
  function f(e, t) {
    return a(e, t, 1);
  }
  function l(e, t) {
    return a(e, t);
  }
  function c(e, t, n, r, i, s, o, u) {
    if (!(z(e, n) < W(i, o) || W(e, n) > z(i, o) || z(t, r) < W(s, u) || W(t, r) > z(s, u))) {
      var a = (e * r - t * n) * (i - o) - (e - n) * (i * u - s * o), f = (e * r - t * n) * (s - u) - (t - r) * (i * u - s * o), l = (e - n) * (s - u) - (t - r) * (i - o);
      if (!l) return;
      var c = a / l, h = f / l, p = +c.toFixed(2), d = +h.toFixed(2);
      if (p < +W(e, n).toFixed(2) || p > +z(e, n).toFixed(2) || p < +W(i, o).toFixed(2) || p > +z(i, o).toFixed(2) || d < +W(t, r).toFixed(2) || d > +z(t, r).toFixed(2) || d < +W(s, u).toFixed(2) || d > +z(s, u).toFixed(2)) return;
      return {
        x: c,
        y: h
      };
    }
  }
  function h(e, t, n, r, i, s, o, u, a) {
    if (!(a < 0 || p(e, t, n, r, i, s, o, u) < a)) {
      var f = 1, l = f / 2, c = f - l, h, d = .01;
      h = p(e, t, n, r, i, s, o, u, c);
      while (X(h - a) > d) l /= 2, c += (h < a ? 1 : -1) * l, h = p(e, t, n, r, i, s, o, u, c);
      return c;
    }
  }
  function p(e, t, n, r, i, s, o, u, a) {
    a == null && (a = 1), a = a > 1 ? 1 : a < 0 ? 0 : a;
    var f = a / 2, l = 12, c = [ -0.1252, .1252, -0.3678, .3678, -0.5873, .5873, -0.7699, .7699, -0.9041, .9041, -0.9816, .9816 ], h = [ .2491, .2491, .2335, .2335, .2032, .2032, .1601, .1601, .1069, .1069, .0472, .0472 ], p = 0;
    for (var v = 0; v < l; v++) {
      var m = f * c[v] + f, g = d(m, e, n, i, o), y = d(m, t, r, s, u), b = g * g + y * y;
      p += h[v] * U.sqrt(b);
    }
    return f * p;
  }
  function d(e, t, n, r, i) {
    var s = -3 * t + 9 * n - 9 * r + 3 * i, o = e * s + 6 * t - 12 * n + 6 * r;
    return e * o - 3 * t + 3 * n;
  }
  function v(e, t) {
    var n = [];
    for (var r = 0, i = e.length; i - 2 * !t > r; r += 2) {
      var s = [ {
        x: +e[r - 2],
        y: +e[r - 1]
      }, {
        x: +e[r],
        y: +e[r + 1]
      }, {
        x: +e[r + 2],
        y: +e[r + 3]
      }, {
        x: +e[r + 4],
        y: +e[r + 5]
      } ];
      t ? r ? i - 4 == r ? s[3] = {
        x: +e[0],
        y: +e[1]
      } : i - 2 == r && (s[2] = {
        x: +e[0],
        y: +e[1]
      }, s[3] = {
        x: +e[2],
        y: +e[3]
      }) : s[0] = {
        x: +e[i - 2],
        y: +e[i - 1]
      } : i - 4 == r ? s[3] = s[2] : r || (s[0] = {
        x: +e[r],
        y: +e[r + 1]
      }), n.push([ "C", (-s[0].x + 6 * s[1].x + s[2].x) / 6, (-s[0].y + 6 * s[1].y + s[2].y) / 6, (s[1].x + 6 * s[2].x - s[3].x) / 6, (s[1].y + 6 * s[2].y - s[3].y) / 6, s[2].x, s[2].y ]);
    }
    return n;
  }
  function m() {
    return this.hex;
  }
  function g(e, t, n) {
    function r() {
      var i = Array.prototype.slice.call(arguments, 0), s = i.join("␀"), o = r.cache = r.cache || {}, u = r.count = r.count || [];
      if (o[C](s)) {
        y(u, s);
        return n ? n(o[s]) : o[s];
      }
      u.length >= 1e3 && delete o[u.shift()], u.push(s), o[s] = e[_](t, i);
      return n ? n(o[s]) : o[s];
    }
    return r;
  }
  function y(e, t) {
    for (var n = 0, r = e.length; n < r; n++) if (e[n] === t) return e.push(e.splice(n, 1)[0]);
  }
  function b(e) {
    if (Object(e) !== e) return e;
    var t = new e.constructor;
    for (var n in e) e[C](n) && (t[n] = b(e[n]));
    return t;
  }
  function w(e) {
    if (w.is(e, "function")) return E ? e() : eve.on("raphael.DOMload", e);
    if (w.is(e, Q)) return w._engine.create[_](w, e.splice(0, 3 + w.is(e[0], J))).add(e);
    var t = Array.prototype.slice.call(arguments, 0);
    if (w.is(t[t.length - 1], "function")) {
      var n = t.pop();
      return E ? n.call(w._engine.create[_](w, t)) : eve.on("raphael.DOMload", function() {
        n.call(w._engine.create[_](w, t));
      });
    }
    return w._engine.create[_](w, arguments);
  }
  w.version = "2.1.0", w.eve = eve;
  var E, S = /[, ]+/, x = {
    circle: 1,
    rect: 1,
    path: 1,
    ellipse: 1,
    text: 1,
    image: 1
  }, T = /\{(\d+)\}/g, N = "prototype", C = "hasOwnProperty", k = {
    doc: document,
    win: window
  }, L = {
    was: Object.prototype[C].call(k.win, "Raphael"),
    is: k.win.Raphael
  }, A = function() {
    this.ca = this.customAttributes = {};
  }, O, M = "appendChild", _ = "apply", D = "concat", P = "createTouch" in k.doc, H = "", B = " ", j = String, F = "split", I = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel"[F](B), q = {
    mousedown: "touchstart",
    mousemove: "touchmove",
    mouseup: "touchend"
  }, R = j.prototype.toLowerCase, U = Math, z = U.max, W = U.min, X = U.abs, V = U.pow, $ = U.PI, J = "number", K = "string", Q = "array", G = "toString", Y = "fill", Z = Object.prototype.toString, et = {}, tt = "push", nt = w._ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i, rt = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i, it = {
    NaN: 1,
    Infinity: 1,
    "-Infinity": 1
  }, st = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/, ot = U.round, ut = "setAttribute", at = parseFloat, ft = parseInt, lt = j.prototype.toUpperCase, ct = w._availableAttrs = {
    "arrow-end": "none",
    "arrow-start": "none",
    blur: 0,
    "clip-rect": "0 0 1e9 1e9",
    cursor: "default",
    cx: 0,
    cy: 0,
    fill: "#fff",
    "fill-opacity": 1,
    font: '10px "Arial"',
    "font-family": '"Arial"',
    "font-size": "10",
    "font-style": "normal",
    "font-weight": 400,
    gradient: 0,
    height: 0,
    href: "http://raphaeljs.com/",
    "letter-spacing": 0,
    opacity: 1,
    path: "M0,0",
    r: 0,
    rx: 0,
    ry: 0,
    src: "",
    stroke: "#000",
    "stroke-dasharray": "",
    "stroke-linecap": "butt",
    "stroke-linejoin": "butt",
    "stroke-miterlimit": 0,
    "stroke-opacity": 1,
    "stroke-width": 1,
    target: "_blank",
    "text-anchor": "middle",
    title: "Raphael",
    transform: "",
    width: 0,
    x: 0,
    y: 0
  }, ht = w._availableAnimAttrs = {
    blur: J,
    "clip-rect": "csv",
    cx: J,
    cy: J,
    fill: "colour",
    "fill-opacity": J,
    "font-size": J,
    height: J,
    opacity: J,
    path: "path",
    r: J,
    rx: J,
    ry: J,
    stroke: "colour",
    "stroke-opacity": J,
    "stroke-width": J,
    transform: "transform",
    width: J,
    x: J,
    y: J
  }, pt = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]/g, dt = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/, vt = {
    hs: 1,
    rg: 1
  }, mt = /,?([achlmqrstvxz]),?/gi, gt = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig, yt = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig, bt = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/ig, wt = w._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/, Et = {}, St = function(e, t) {
    return e.key - t.key;
  }, xt = function(e, t) {
    return at(e) - at(t);
  }, Tt = function() {}, Nt = function(e) {
    return e;
  }, Ct = w._rectPath = function(e, t, n, r, i) {
    return i ? [ [ "M", e + i, t ], [ "l", n - i * 2, 0 ], [ "a", i, i, 0, 0, 1, i, i ], [ "l", 0, r - i * 2 ], [ "a", i, i, 0, 0, 1, -i, i ], [ "l", i * 2 - n, 0 ], [ "a", i, i, 0, 0, 1, -i, -i ], [ "l", 0, i * 2 - r ], [ "a", i, i, 0, 0, 1, i, -i ], [ "z" ] ] : [ [ "M", e, t ], [ "l", n, 0 ], [ "l", 0, r ], [ "l", -n, 0 ], [ "z" ] ];
  }, kt = function(e, t, n, r) {
    r == null && (r = n);
    return [ [ "M", e, t ], [ "m", 0, -r ], [ "a", n, r, 0, 1, 1, 0, 2 * r ], [ "a", n, r, 0, 1, 1, 0, -2 * r ], [ "z" ] ];
  }, Lt = w._getPath = {
    path: function(e) {
      return e.attr("path");
    },
    circle: function(e) {
      var t = e.attrs;
      return kt(t.cx, t.cy, t.r);
    },
    ellipse: function(e) {
      var t = e.attrs;
      return kt(t.cx, t.cy, t.rx, t.ry);
    },
    rect: function(e) {
      var t = e.attrs;
      return Ct(t.x, t.y, t.width, t.height, t.r);
    },
    image: function(e) {
      var t = e.attrs;
      return Ct(t.x, t.y, t.width, t.height);
    },
    text: function(e) {
      var t = e._getBBox();
      return Ct(t.x, t.y, t.width, t.height);
    }
  }, At = w.mapPath = function(e, t) {
    if (!t) return e;
    var n, r, i, s, o, u, a;
    e = Qt(e);
    for (i = 0, o = e.length; i < o; i++) {
      a = e[i];
      for (s = 1, u = a.length; s < u; s += 2) n = t.x(a[s], a[s + 1]), r = t.y(a[s], a[s + 1]), a[s] = n, a[s + 1] = r;
    }
    return e;
  };
  w._g = k, w.type = k.win.SVGAngle || k.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML";
  if (w.type == "VML") {
    var Ot = k.doc.createElement("div"), Mt;
    Ot.innerHTML = '<v:shape adj="1"/>', Mt = Ot.firstChild, Mt.style.behavior = "url(#default#VML)";
    if (!Mt || typeof Mt.adj != "object") return w.type = H;
    Ot = null;
  }
  w.svg = !(w.vml = w.type == "VML"), w._Paper = A, w.fn = O = A.prototype = w.prototype, w._id = 0, w._oid = 0, w.is = function(e, t) {
    t = R.call(t);
    return t == "finite" ? !it[C](+e) : t == "array" ? e instanceof Array : t == "null" && e === null || t == typeof e && e !== null || t == "object" && e === Object(e) || t == "array" && Array.isArray && Array.isArray(e) || Z.call(e).slice(8, -1).toLowerCase() == t;
  }, w.angle = function(e, t, n, r, i, s) {
    if (i == null) {
      var o = e - n, u = t - r;
      return !o && !u ? 0 : (180 + U.atan2(-u, -o) * 180 / $ + 360) % 360;
    }
    return w.angle(e, t, i, s) - w.angle(n, r, i, s);
  }, w.rad = function(e) {
    return e % 360 * $ / 180;
  }, w.deg = function(e) {
    return e * 180 / $ % 360;
  }, w.snapTo = function(e, t, n) {
    n = w.is(n, "finite") ? n : 10;
    if (w.is(e, Q)) {
      var r = e.length;
      while (r--) if (X(e[r] - t) <= n) return e[r];
    } else {
      e = +e;
      var i = t % e;
      if (i < n) return t - i;
      if (i > e - n) return t - i + e;
    }
    return t;
  };
  var _t = w.createUUID = function(e, t) {
    return function() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(e, t).toUpperCase();
    };
  }(/[xy]/g, function(e) {
    var t = U.random() * 16 | 0, n = e == "x" ? t : t & 3 | 8;
    return n.toString(16);
  });
  w.setWindow = function(e) {
    eve("raphael.setWindow", w, k.win, e), k.win = e, k.doc = k.win.document, w._engine.initWin && w._engine.initWin(k.win);
  };
  var Dt = function(e) {
    if (w.vml) {
      var t = /^\s+|\s+$/g, n;
      try {
        var r = new ActiveXObject("htmlfile");
        r.write("<body>"), r.close(), n = r.body;
      } catch (i) {
        n = createPopup().document.body;
      }
      var s = n.createTextRange();
      Dt = g(function(e) {
        try {
          n.style.color = j(e).replace(t, H);
          var r = s.queryCommandValue("ForeColor");
          r = (r & 255) << 16 | r & 65280 | (r & 16711680) >>> 16;
          return "#" + ("000000" + r.toString(16)).slice(-6);
        } catch (i) {
          return "none";
        }
      });
    } else {
      var o = k.doc.createElement("i");
      o.title = "Raphaël Colour Picker", o.style.display = "none", k.doc.body.appendChild(o), Dt = g(function(e) {
        o.style.color = e;
        return k.doc.defaultView.getComputedStyle(o, H).getPropertyValue("color");
      });
    }
    return Dt(e);
  }, Pt = function() {
    return "hsb(" + [ this.h, this.s, this.b ] + ")";
  }, Ht = function() {
    return "hsl(" + [ this.h, this.s, this.l ] + ")";
  }, Bt = function() {
    return this.hex;
  }, jt = function(e, t, n) {
    t == null && w.is(e, "object") && "r" in e && "g" in e && "b" in e && (n = e.b, t = e.g, e = e.r);
    if (t == null && w.is(e, K)) {
      var r = w.getRGB(e);
      e = r.r, t = r.g, n = r.b;
    }
    if (e > 1 || t > 1 || n > 1) e /= 255, t /= 255, n /= 255;
    return [ e, t, n ];
  }, Ft = function(e, t, n, r) {
    e *= 255, t *= 255, n *= 255;
    var i = {
      r: e,
      g: t,
      b: n,
      hex: w.rgb(e, t, n),
      toString: Bt
    };
    w.is(r, "finite") && (i.opacity = r);
    return i;
  };
  w.color = function(e) {
    var t;
    w.is(e, "object") && "h" in e && "s" in e && "b" in e ? (t = w.hsb2rgb(e), e.r = t.r, e.g = t.g, e.b = t.b, e.hex = t.hex) : w.is(e, "object") && "h" in e && "s" in e && "l" in e ? (t = w.hsl2rgb(e), e.r = t.r, e.g = t.g, e.b = t.b, e.hex = t.hex) : (w.is(e, "string") && (e = w.getRGB(e)), w.is(e, "object") && "r" in e && "g" in e && "b" in e ? (t = w.rgb2hsl(e), e.h = t.h, e.s = t.s, e.l = t.l, t = w.rgb2hsb(e), e.v = t.b) : (e = {
      hex: "none"
    }, e.r = e.g = e.b = e.h = e.s = e.v = e.l = -1)), e.toString = Bt;
    return e;
  }, w.hsb2rgb = function(e, t, n, r) {
    this.is(e, "object") && "h" in e && "s" in e && "b" in e && (n = e.b, t = e.s, e = e.h, r = e.o), e *= 360;
    var i, s, o, u, a;
    e = e % 360 / 60, a = n * t, u = a * (1 - X(e % 2 - 1)), i = s = o = n - a, e = ~~e, i += [ a, u, 0, 0, u, a ][e], s += [ u, a, a, u, 0, 0 ][e], o += [ 0, 0, u, a, a, u ][e];
    return Ft(i, s, o, r);
  }, w.hsl2rgb = function(e, t, n, r) {
    this.is(e, "object") && "h" in e && "s" in e && "l" in e && (n = e.l, t = e.s, e = e.h);
    if (e > 1 || t > 1 || n > 1) e /= 360, t /= 100, n /= 100;
    e *= 360;
    var i, s, o, u, a;
    e = e % 360 / 60, a = 2 * t * (n < .5 ? n : 1 - n), u = a * (1 - X(e % 2 - 1)), i = s = o = n - a / 2, e = ~~e, i += [ a, u, 0, 0, u, a ][e], s += [ u, a, a, u, 0, 0 ][e], o += [ 0, 0, u, a, a, u ][e];
    return Ft(i, s, o, r);
  }, w.rgb2hsb = function(e, t, n) {
    n = jt(e, t, n), e = n[0], t = n[1], n = n[2];
    var r, i, s, o;
    s = z(e, t, n), o = s - W(e, t, n), r = o == 0 ? null : s == e ? (t - n) / o : s == t ? (n - e) / o + 2 : (e - t) / o + 4, r = (r + 360) % 6 * 60 / 360, i = o == 0 ? 0 : o / s;
    return {
      h: r,
      s: i,
      b: s,
      toString: Pt
    };
  }, w.rgb2hsl = function(e, t, n) {
    n = jt(e, t, n), e = n[0], t = n[1], n = n[2];
    var r, i, s, o, u, a;
    o = z(e, t, n), u = W(e, t, n), a = o - u, r = a == 0 ? null : o == e ? (t - n) / a : o == t ? (n - e) / a + 2 : (e - t) / a + 4, r = (r + 360) % 6 * 60 / 360, s = (o + u) / 2, i = a == 0 ? 0 : s < .5 ? a / (2 * s) : a / (2 - 2 * s);
    return {
      h: r,
      s: i,
      l: s,
      toString: Ht
    };
  }, w._path2string = function() {
    return this.join(",").replace(mt, "$1");
  };
  var It = w._preload = function(e, t) {
    var n = k.doc.createElement("img");
    n.style.cssText = "position:absolute;left:-9999em;top:-9999em", n.onload = function() {
      t.call(this), this.onload = null, k.doc.body.removeChild(this);
    }, n.onerror = function() {
      k.doc.body.removeChild(this);
    }, k.doc.body.appendChild(n), n.src = e;
  };
  w.getRGB = g(function(e) {
    if (!e || !!((e = j(e)).indexOf("-") + 1)) return {
      r: -1,
      g: -1,
      b: -1,
      hex: "none",
      error: 1,
      toString: m
    };
    if (e == "none") return {
      r: -1,
      g: -1,
      b: -1,
      hex: "none",
      toString: m
    };
    !vt[C](e.toLowerCase().substring(0, 2)) && e.charAt() != "#" && (e = Dt(e));
    var t, n, r, i, s, o, u, a = e.match(rt);
    if (a) {
      a[2] && (i = ft(a[2].substring(5), 16), r = ft(a[2].substring(3, 5), 16), n = ft(a[2].substring(1, 3), 16)), a[3] && (i = ft((o = a[3].charAt(3)) + o, 16), r = ft((o = a[3].charAt(2)) + o, 16), n = ft((o = a[3].charAt(1)) + o, 16)), a[4] && (u = a[4][F](dt), n = at(u[0]), u[0].slice(-1) == "%" && (n *= 2.55), r = at(u[1]), u[1].slice(-1) == "%" && (r *= 2.55), i = at(u[2]), u[2].slice(-1) == "%" && (i *= 2.55), a[1].toLowerCase().slice(0, 4) == "rgba" && (s = at(u[3])), u[3] && u[3].slice(-1) == "%" && (s /= 100));
      if (a[5]) {
        u = a[5][F](dt), n = at(u[0]), u[0].slice(-1) == "%" && (n *= 2.55), r = at(u[1]), u[1].slice(-1) == "%" && (r *= 2.55), i = at(u[2]), u[2].slice(-1) == "%" && (i *= 2.55), (u[0].slice(-3) == "deg" || u[0].slice(-1) == "°") && (n /= 360), a[1].toLowerCase().slice(0, 4) == "hsba" && (s = at(u[3])), u[3] && u[3].slice(-1) == "%" && (s /= 100);
        return w.hsb2rgb(n, r, i, s);
      }
      if (a[6]) {
        u = a[6][F](dt), n = at(u[0]), u[0].slice(-1) == "%" && (n *= 2.55), r = at(u[1]), u[1].slice(-1) == "%" && (r *= 2.55), i = at(u[2]), u[2].slice(-1) == "%" && (i *= 2.55), (u[0].slice(-3) == "deg" || u[0].slice(-1) == "°") && (n /= 360), a[1].toLowerCase().slice(0, 4) == "hsla" && (s = at(u[3])), u[3] && u[3].slice(-1) == "%" && (s /= 100);
        return w.hsl2rgb(n, r, i, s);
      }
      a = {
        r: n,
        g: r,
        b: i,
        toString: m
      }, a.hex = "#" + (16777216 | i | r << 8 | n << 16).toString(16).slice(1), w.is(s, "finite") && (a.opacity = s);
      return a;
    }
    return {
      r: -1,
      g: -1,
      b: -1,
      hex: "none",
      error: 1,
      toString: m
    };
  }, w), w.hsb = g(function(e, t, n) {
    return w.hsb2rgb(e, t, n).hex;
  }), w.hsl = g(function(e, t, n) {
    return w.hsl2rgb(e, t, n).hex;
  }), w.rgb = g(function(e, t, n) {
    return "#" + (16777216 | n | t << 8 | e << 16).toString(16).slice(1);
  }), w.getColor = function(e) {
    var t = this.getColor.start = this.getColor.start || {
      h: 0,
      s: 1,
      b: e || .75
    }, n = this.hsb2rgb(t.h, t.s, t.b);
    t.h += .075, t.h > 1 && (t.h = 0, t.s -= .2, t.s <= 0 && (this.getColor.start = {
      h: 0,
      s: 1,
      b: t.b
    }));
    return n.hex;
  }, w.getColor.reset = function() {
    delete this.start;
  }, w.parsePathString = function(e) {
    if (!e) return null;
    var t = qt(e);
    if (t.arr) return Ut(t.arr);
    var n = {
      a: 7,
      c: 6,
      h: 1,
      l: 2,
      m: 2,
      r: 4,
      q: 4,
      s: 4,
      t: 2,
      v: 1,
      z: 0
    }, r = [];
    w.is(e, Q) && w.is(e[0], Q) && (r = Ut(e)), r.length || j(e).replace(gt, function(e, t, i) {
      var s = [], o = t.toLowerCase();
      i.replace(bt, function(e, t) {
        t && s.push(+t);
      }), o == "m" && s.length > 2 && (r.push([ t ][D](s.splice(0, 2))), o = "l", t = t == "m" ? "l" : "L");
      if (o == "r") r.push([ t ][D](s)); else while (s.length >= n[o]) {
        r.push([ t ][D](s.splice(0, n[o])));
        if (!n[o]) break;
      }
    }), r.toString = w._path2string, t.arr = Ut(r);
    return r;
  }, w.parseTransformString = g(function(e) {
    if (!e) return null;
    var t = {
      r: 3,
      s: 4,
      t: 2,
      m: 6
    }, n = [];
    w.is(e, Q) && w.is(e[0], Q) && (n = Ut(e)), n.length || j(e).replace(yt, function(e, t, r) {
      var i = [], s = R.call(t);
      r.replace(bt, function(e, t) {
        t && i.push(+t);
      }), n.push([ t ][D](i));
    }), n.toString = w._path2string;
    return n;
  });
  var qt = function(e) {
    var t = qt.ps = qt.ps || {};
    t[e] ? t[e].sleep = 100 : t[e] = {
      sleep: 100
    }, setTimeout(function() {
      for (var n in t) t[C](n) && n != e && (t[n].sleep--, !t[n].sleep && delete t[n]);
    });
    return t[e];
  };
  w.findDotsAtSegment = function(e, t, n, r, i, s, o, u, a) {
    var f = 1 - a, l = V(f, 3), c = V(f, 2), h = a * a, p = h * a, d = l * e + c * 3 * a * n + f * 3 * a * a * i + p * o, v = l * t + c * 3 * a * r + f * 3 * a * a * s + p * u, m = e + 2 * a * (n - e) + h * (i - 2 * n + e), g = t + 2 * a * (r - t) + h * (s - 2 * r + t), y = n + 2 * a * (i - n) + h * (o - 2 * i + n), b = r + 2 * a * (s - r) + h * (u - 2 * s + r), w = f * e + a * n, E = f * t + a * r, S = f * i + a * o, x = f * s + a * u, T = 90 - U.atan2(m - y, g - b) * 180 / $;
    (m > y || g < b) && (T += 180);
    return {
      x: d,
      y: v,
      m: {
        x: m,
        y: g
      },
      n: {
        x: y,
        y: b
      },
      start: {
        x: w,
        y: E
      },
      end: {
        x: S,
        y: x
      },
      alpha: T
    };
  }, w.bezierBBox = function(e, t, n, r, i, s, o, u) {
    w.is(e, "array") || (e = [ e, t, n, r, i, s, o, u ]);
    var a = Kt.apply(null, e);
    return {
      x: a.min.x,
      y: a.min.y,
      x2: a.max.x,
      y2: a.max.y,
      width: a.max.x - a.min.x,
      height: a.max.y - a.min.y
    };
  }, w.isPointInsideBBox = function(e, t, n) {
    return t >= e.x && t <= e.x2 && n >= e.y && n <= e.y2;
  }, w.isBBoxIntersect = function(e, t) {
    var n = w.isPointInsideBBox;
    return n(t, e.x, e.y) || n(t, e.x2, e.y) || n(t, e.x, e.y2) || n(t, e.x2, e.y2) || n(e, t.x, t.y) || n(e, t.x2, t.y) || n(e, t.x, t.y2) || n(e, t.x2, t.y2) || (e.x < t.x2 && e.x > t.x || t.x < e.x2 && t.x > e.x) && (e.y < t.y2 && e.y > t.y || t.y < e.y2 && t.y > e.y);
  }, w.pathIntersection = function(e, t) {
    return u(e, t);
  }, w.pathIntersectionNumber = function(e, t) {
    return u(e, t, 1);
  }, w.isPointInsidePath = function(e, t, n) {
    var r = w.pathBBox(e);
    return w.isPointInsideBBox(r, t, n) && u(e, [ [ "M", t, n ], [ "H", r.x2 + 10 ] ], 1) % 2 == 1;
  }, w._removedFactory = function(e) {
    return function() {
      eve("raphael.log", null, "Raphaël: you are calling to method “" + e + "” of removed object", e);
    };
  };
  var Rt = w.pathBBox = function(e) {
    var t = qt(e);
    if (t.bbox) return t.bbox;
    if (!e) return {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      x2: 0,
      y2: 0
    };
    e = Qt(e);
    var n = 0, r = 0, i = [], s = [], o;
    for (var u = 0, a = e.length; u < a; u++) {
      o = e[u];
      if (o[0] == "M") n = o[1], r = o[2], i.push(n), s.push(r); else {
        var f = Kt(n, r, o[1], o[2], o[3], o[4], o[5], o[6]);
        i = i[D](f.min.x, f.max.x), s = s[D](f.min.y, f.max.y), n = o[5], r = o[6];
      }
    }
    var l = W[_](0, i), c = W[_](0, s), h = z[_](0, i), p = z[_](0, s), d = {
      x: l,
      y: c,
      x2: h,
      y2: p,
      width: h - l,
      height: p - c
    };
    t.bbox = b(d);
    return d;
  }, Ut = function(e) {
    var t = b(e);
    t.toString = w._path2string;
    return t;
  }, zt = w._pathToRelative = function(e) {
    var t = qt(e);
    if (t.rel) return Ut(t.rel);
    if (!w.is(e, Q) || !w.is(e && e[0], Q)) e = w.parsePathString(e);
    var n = [], r = 0, i = 0, s = 0, o = 0, u = 0;
    e[0][0] == "M" && (r = e[0][1], i = e[0][2], s = r, o = i, u++, n.push([ "M", r, i ]));
    for (var a = u, f = e.length; a < f; a++) {
      var l = n[a] = [], c = e[a];
      if (c[0] != R.call(c[0])) {
        l[0] = R.call(c[0]);
        switch (l[0]) {
         case "a":
          l[1] = c[1], l[2] = c[2], l[3] = c[3], l[4] = c[4], l[5] = c[5], l[6] = +(c[6] - r).toFixed(3), l[7] = +(c[7] - i).toFixed(3);
          break;
         case "v":
          l[1] = +(c[1] - i).toFixed(3);
          break;
         case "m":
          s = c[1], o = c[2];
         default:
          for (var h = 1, p = c.length; h < p; h++) l[h] = +(c[h] - (h % 2 ? r : i)).toFixed(3);
        }
      } else {
        l = n[a] = [], c[0] == "m" && (s = c[1] + r, o = c[2] + i);
        for (var d = 0, v = c.length; d < v; d++) n[a][d] = c[d];
      }
      var m = n[a].length;
      switch (n[a][0]) {
       case "z":
        r = s, i = o;
        break;
       case "h":
        r += +n[a][m - 1];
        break;
       case "v":
        i += +n[a][m - 1];
        break;
       default:
        r += +n[a][m - 2], i += +n[a][m - 1];
      }
    }
    n.toString = w._path2string, t.rel = Ut(n);
    return n;
  }, Wt = w._pathToAbsolute = function(e) {
    var t = qt(e);
    if (t.abs) return Ut(t.abs);
    if (!w.is(e, Q) || !w.is(e && e[0], Q)) e = w.parsePathString(e);
    if (!e || !e.length) return [ [ "M", 0, 0 ] ];
    var n = [], r = 0, i = 0, s = 0, o = 0, u = 0;
    e[0][0] == "M" && (r = +e[0][1], i = +e[0][2], s = r, o = i, u++, n[0] = [ "M", r, i ]);
    var a = e.length == 3 && e[0][0] == "M" && e[1][0].toUpperCase() == "R" && e[2][0].toUpperCase() == "Z";
    for (var f, l, c = u, h = e.length; c < h; c++) {
      n.push(f = []), l = e[c];
      if (l[0] != lt.call(l[0])) {
        f[0] = lt.call(l[0]);
        switch (f[0]) {
         case "A":
          f[1] = l[1], f[2] = l[2], f[3] = l[3], f[4] = l[4], f[5] = l[5], f[6] = +(l[6] + r), f[7] = +(l[7] + i);
          break;
         case "V":
          f[1] = +l[1] + i;
          break;
         case "H":
          f[1] = +l[1] + r;
          break;
         case "R":
          var p = [ r, i ][D](l.slice(1));
          for (var d = 2, m = p.length; d < m; d++) p[d] = +p[d] + r, p[++d] = +p[d] + i;
          n.pop(), n = n[D](v(p, a));
          break;
         case "M":
          s = +l[1] + r, o = +l[2] + i;
         default:
          for (d = 1, m = l.length; d < m; d++) f[d] = +l[d] + (d % 2 ? r : i);
        }
      } else if (l[0] == "R") p = [ r, i ][D](l.slice(1)), n.pop(), n = n[D](v(p, a)), f = [ "R" ][D](l.slice(-2)); else for (var g = 0, y = l.length; g < y; g++) f[g] = l[g];
      switch (f[0]) {
       case "Z":
        r = s, i = o;
        break;
       case "H":
        r = f[1];
        break;
       case "V":
        i = f[1];
        break;
       case "M":
        s = f[f.length - 2], o = f[f.length - 1];
       default:
        r = f[f.length - 2], i = f[f.length - 1];
      }
    }
    n.toString = w._path2string, t.abs = Ut(n);
    return n;
  }, Xt = function(e, t, n, r) {
    return [ e, t, n, r, n, r ];
  }, Vt = function(e, t, n, r, i, s) {
    var o = 1 / 3, u = 2 / 3;
    return [ o * e + u * n, o * t + u * r, o * i + u * n, o * s + u * r, i, s ];
  }, $t = function(e, t, n, r, i, s, o, u, a, f) {
    var l = $ * 120 / 180, c = $ / 180 * (+i || 0), h = [], p, d = g(function(e, t, n) {
      var r = e * U.cos(n) - t * U.sin(n), i = e * U.sin(n) + t * U.cos(n);
      return {
        x: r,
        y: i
      };
    });
    if (!f) {
      p = d(e, t, -c), e = p.x, t = p.y, p = d(u, a, -c), u = p.x, a = p.y;
      var v = U.cos($ / 180 * i), m = U.sin($ / 180 * i), y = (e - u) / 2, b = (t - a) / 2, w = y * y / (n * n) + b * b / (r * r);
      w > 1 && (w = U.sqrt(w), n = w * n, r = w * r);
      var E = n * n, S = r * r, x = (s == o ? -1 : 1) * U.sqrt(X((E * S - E * b * b - S * y * y) / (E * b * b + S * y * y))), T = x * n * b / r + (e + u) / 2, N = x * -r * y / n + (t + a) / 2, C = U.asin(((t - N) / r).toFixed(9)), k = U.asin(((a - N) / r).toFixed(9));
      C = e < T ? $ - C : C, k = u < T ? $ - k : k, C < 0 && (C = $ * 2 + C), k < 0 && (k = $ * 2 + k), o && C > k && (C -= $ * 2), !o && k > C && (k -= $ * 2);
    } else C = f[0], k = f[1], T = f[2], N = f[3];
    var L = k - C;
    if (X(L) > l) {
      var A = k, O = u, M = a;
      k = C + l * (o && k > C ? 1 : -1), u = T + n * U.cos(k), a = N + r * U.sin(k), h = $t(u, a, n, r, i, 0, o, O, M, [ k, A, T, N ]);
    }
    L = k - C;
    var _ = U.cos(C), P = U.sin(C), H = U.cos(k), B = U.sin(k), j = U.tan(L / 4), I = 4 / 3 * n * j, q = 4 / 3 * r * j, R = [ e, t ], z = [ e + I * P, t - q * _ ], W = [ u + I * B, a - q * H ], V = [ u, a ];
    z[0] = 2 * R[0] - z[0], z[1] = 2 * R[1] - z[1];
    if (f) return [ z, W, V ][D](h);
    h = [ z, W, V ][D](h).join()[F](",");
    var J = [];
    for (var K = 0, Q = h.length; K < Q; K++) J[K] = K % 2 ? d(h[K - 1], h[K], c).y : d(h[K], h[K + 1], c).x;
    return J;
  }, Jt = function(e, t, n, r, i, s, o, u, a) {
    var f = 1 - a;
    return {
      x: V(f, 3) * e + V(f, 2) * 3 * a * n + f * 3 * a * a * i + V(a, 3) * o,
      y: V(f, 3) * t + V(f, 2) * 3 * a * r + f * 3 * a * a * s + V(a, 3) * u
    };
  }, Kt = g(function(e, t, n, r, i, s, o, u) {
    var a = i - 2 * n + e - (o - 2 * i + n), f = 2 * (n - e) - 2 * (i - n), l = e - n, c = (-f + U.sqrt(f * f - 4 * a * l)) / 2 / a, h = (-f - U.sqrt(f * f - 4 * a * l)) / 2 / a, p = [ t, u ], d = [ e, o ], v;
    X(c) > "1e12" && (c = .5), X(h) > "1e12" && (h = .5), c > 0 && c < 1 && (v = Jt(e, t, n, r, i, s, o, u, c), d.push(v.x), p.push(v.y)), h > 0 && h < 1 && (v = Jt(e, t, n, r, i, s, o, u, h), d.push(v.x), p.push(v.y)), a = s - 2 * r + t - (u - 2 * s + r), f = 2 * (r - t) - 2 * (s - r), l = t - r, c = (-f + U.sqrt(f * f - 4 * a * l)) / 2 / a, h = (-f - U.sqrt(f * f - 4 * a * l)) / 2 / a, X(c) > "1e12" && (c = .5), X(h) > "1e12" && (h = .5), c > 0 && c < 1 && (v = Jt(e, t, n, r, i, s, o, u, c), d.push(v.x), p.push(v.y)), h > 0 && h < 1 && (v = Jt(e, t, n, r, i, s, o, u, h), d.push(v.x), p.push(v.y));
    return {
      min: {
        x: W[_](0, d),
        y: W[_](0, p)
      },
      max: {
        x: z[_](0, d),
        y: z[_](0, p)
      }
    };
  }), Qt = w._path2curve = g(function(e, t) {
    var n = !t && qt(e);
    if (!t && n.curve) return Ut(n.curve);
    var r = Wt(e), i = t && Wt(t), s = {
      x: 0,
      y: 0,
      bx: 0,
      by: 0,
      X: 0,
      Y: 0,
      qx: null,
      qy: null
    }, o = {
      x: 0,
      y: 0,
      bx: 0,
      by: 0,
      X: 0,
      Y: 0,
      qx: null,
      qy: null
    }, u = function(e, t) {
      var n, r;
      if (!e) return [ "C", t.x, t.y, t.x, t.y, t.x, t.y ];
      !(e[0] in {
        T: 1,
        Q: 1
      }) && (t.qx = t.qy = null);
      switch (e[0]) {
       case "M":
        t.X = e[1], t.Y = e[2];
        break;
       case "A":
        e = [ "C" ][D]($t[_](0, [ t.x, t.y ][D](e.slice(1))));
        break;
       case "S":
        n = t.x + (t.x - (t.bx || t.x)), r = t.y + (t.y - (t.by || t.y)), e = [ "C", n, r ][D](e.slice(1));
        break;
       case "T":
        t.qx = t.x + (t.x - (t.qx || t.x)), t.qy = t.y + (t.y - (t.qy || t.y)), e = [ "C" ][D](Vt(t.x, t.y, t.qx, t.qy, e[1], e[2]));
        break;
       case "Q":
        t.qx = e[1], t.qy = e[2], e = [ "C" ][D](Vt(t.x, t.y, e[1], e[2], e[3], e[4]));
        break;
       case "L":
        e = [ "C" ][D](Xt(t.x, t.y, e[1], e[2]));
        break;
       case "H":
        e = [ "C" ][D](Xt(t.x, t.y, e[1], t.y));
        break;
       case "V":
        e = [ "C" ][D](Xt(t.x, t.y, t.x, e[1]));
        break;
       case "Z":
        e = [ "C" ][D](Xt(t.x, t.y, t.X, t.Y));
      }
      return e;
    }, a = function(e, t) {
      if (e[t].length > 7) {
        e[t].shift();
        var n = e[t];
        while (n.length) e.splice(t++, 0, [ "C" ][D](n.splice(0, 6)));
        e.splice(t, 1), c = z(r.length, i && i.length || 0);
      }
    }, f = function(e, t, n, s, o) {
      e && t && e[o][0] == "M" && t[o][0] != "M" && (t.splice(o, 0, [ "M", s.x, s.y ]), n.bx = 0, n.by = 0, n.x = e[o][1], n.y = e[o][2], c = z(r.length, i && i.length || 0));
    };
    for (var l = 0, c = z(r.length, i && i.length || 0); l < c; l++) {
      r[l] = u(r[l], s), a(r, l), i && (i[l] = u(i[l], o)), i && a(i, l), f(r, i, s, o, l), f(i, r, o, s, l);
      var h = r[l], p = i && i[l], d = h.length, v = i && p.length;
      s.x = h[d - 2], s.y = h[d - 1], s.bx = at(h[d - 4]) || s.x, s.by = at(h[d - 3]) || s.y, o.bx = i && (at(p[v - 4]) || o.x), o.by = i && (at(p[v - 3]) || o.y), o.x = i && p[v - 2], o.y = i && p[v - 1];
    }
    i || (n.curve = Ut(r));
    return i ? [ r, i ] : r;
  }, null, Ut), Gt = w._parseDots = g(function(e) {
    var t = [];
    for (var n = 0, r = e.length; n < r; n++) {
      var i = {}, s = e[n].match(/^([^:]*):?([\d\.]*)/);
      i.color = w.getRGB(s[1]);
      if (i.color.error) return null;
      i.color = i.color.hex, s[2] && (i.offset = s[2] + "%"), t.push(i);
    }
    for (n = 1, r = t.length - 1; n < r; n++) if (!t[n].offset) {
      var o = at(t[n - 1].offset || 0), u = 0;
      for (var a = n + 1; a < r; a++) if (t[a].offset) {
        u = t[a].offset;
        break;
      }
      u || (u = 100, a = r), u = at(u);
      var f = (u - o) / (a - n + 1);
      for (; n < a; n++) o += f, t[n].offset = o + "%";
    }
    return t;
  }), Yt = w._tear = function(e, t) {
    e == t.top && (t.top = e.prev), e == t.bottom && (t.bottom = e.next), e.next && (e.next.prev = e.prev), e.prev && (e.prev.next = e.next);
  }, Zt = w._tofront = function(e, t) {
    t.top !== e && (Yt(e, t), e.next = null, e.prev = t.top, t.top.next = e, t.top = e);
  }, en = w._toback = function(e, t) {
    t.bottom !== e && (Yt(e, t), e.next = t.bottom, e.prev = null, t.bottom.prev = e, t.bottom = e);
  }, tn = w._insertafter = function(e, t, n) {
    Yt(e, n), t == n.top && (n.top = e), t.next && (t.next.prev = e), e.next = t.next, e.prev = t, t.next = e;
  }, nn = w._insertbefore = function(e, t, n) {
    Yt(e, n), t == n.bottom && (n.bottom = e), t.prev && (t.prev.next = e), e.prev = t.prev, t.prev = e, e.next = t;
  }, rn = w.toMatrix = function(e, t) {
    var n = Rt(e), r = {
      _: {
        transform: H
      },
      getBBox: function() {
        return n;
      }
    };
    on(r, t);
    return r.matrix;
  }, sn = w.transformPath = function(e, t) {
    return At(e, rn(e, t));
  }, on = w._extractTransform = function(e, t) {
    if (t == null) return e._.transform;
    t = j(t).replace(/\.{3}|\u2026/g, e._.transform || H);
    var n = w.parseTransformString(t), r = 0, i = 0, s = 0, u = 1, a = 1, f = e._, l = new o;
    f.transform = n || [];
    if (n) for (var c = 0, h = n.length; c < h; c++) {
      var p = n[c], d = p.length, v = j(p[0]).toLowerCase(), m = p[0] != v, g = m ? l.invert() : 0, y, b, E, S, x;
      v == "t" && d == 3 ? m ? (y = g.x(0, 0), b = g.y(0, 0), E = g.x(p[1], p[2]), S = g.y(p[1], p[2]), l.translate(E - y, S - b)) : l.translate(p[1], p[2]) : v == "r" ? d == 2 ? (x = x || e.getBBox(1), l.rotate(p[1], x.x + x.width / 2, x.y + x.height / 2), r += p[1]) : d == 4 && (m ? (E = g.x(p[2], p[3]), S = g.y(p[2], p[3]), l.rotate(p[1], E, S)) : l.rotate(p[1], p[2], p[3]), r += p[1]) : v == "s" ? d == 2 || d == 3 ? (x = x || e.getBBox(1), l.scale(p[1], p[d - 1], x.x + x.width / 2, x.y + x.height / 2), u *= p[1], a *= p[d - 1]) : d == 5 && (m ? (E = g.x(p[3], p[4]), S = g.y(p[3], p[4]), l.scale(p[1], p[2], E, S)) : l.scale(p[1], p[2], p[3], p[4]), u *= p[1], a *= p[2]) : v == "m" && d == 7 && l.add(p[1], p[2], p[3], p[4], p[5], p[6]), f.dirtyT = 1, e.matrix = l;
    }
    e.matrix = l, f.sx = u, f.sy = a, f.deg = r, f.dx = i = l.e, f.dy = s = l.f, u == 1 && a == 1 && !r && f.bbox ? (f.bbox.x += +i, f.bbox.y += +s) : f.dirtyT = 1;
  }, un = function(e) {
    var t = e[0];
    switch (t.toLowerCase()) {
     case "t":
      return [ t, 0, 0 ];
     case "m":
      return [ t, 1, 0, 0, 1, 0, 0 ];
     case "r":
      return e.length == 4 ? [ t, 0, e[2], e[3] ] : [ t, 0 ];
     case "s":
      return e.length == 5 ? [ t, 1, 1, e[3], e[4] ] : e.length == 3 ? [ t, 1, 1 ] : [ t, 1 ];
    }
  }, an = w._equaliseTransform = function(e, t) {
    t = j(t).replace(/\.{3}|\u2026/g, e), e = w.parseTransformString(e) || [], t = w.parseTransformString(t) || [];
    var n = z(e.length, t.length), r = [], i = [], s = 0, o, u, a, f;
    for (; s < n; s++) {
      a = e[s] || un(t[s]), f = t[s] || un(a);
      if (a[0] != f[0] || a[0].toLowerCase() == "r" && (a[2] != f[2] || a[3] != f[3]) || a[0].toLowerCase() == "s" && (a[3] != f[3] || a[4] != f[4])) return;
      r[s] = [], i[s] = [];
      for (o = 0, u = z(a.length, f.length); o < u; o++) o in a && (r[s][o] = a[o]), o in f && (i[s][o] = f[o]);
    }
    return {
      from: r,
      to: i
    };
  };
  w._getContainer = function(e, t, n, r) {
    var i;
    i = r == null && !w.is(e, "object") ? k.doc.getElementById(e) : e;
    if (i != null) return i.tagName ? t == null ? {
      container: i,
      width: i.style.pixelWidth || i.offsetWidth,
      height: i.style.pixelHeight || i.offsetHeight
    } : {
      container: i,
      width: t,
      height: n
    } : {
      container: 1,
      x: e,
      y: t,
      width: n,
      height: r
    };
  }, w.pathToRelative = zt, w._engine = {}, w.path2curve = Qt, w.matrix = function(e, t, n, r, i, s) {
    return new o(e, t, n, r, i, s);
  }, function(e) {
    function t(e) {
      var t = U.sqrt(n(e));
      e[0] && (e[0] /= t), e[1] && (e[1] /= t);
    }
    function n(e) {
      return e[0] * e[0] + e[1] * e[1];
    }
    e.add = function(e, t, n, r, i, s) {
      var u = [ [], [], [] ], a = [ [ this.a, this.c, this.e ], [ this.b, this.d, this.f ], [ 0, 0, 1 ] ], f = [ [ e, n, i ], [ t, r, s ], [ 0, 0, 1 ] ], l, c, h, p;
      e && e instanceof o && (f = [ [ e.a, e.c, e.e ], [ e.b, e.d, e.f ], [ 0, 0, 1 ] ]);
      for (l = 0; l < 3; l++) for (c = 0; c < 3; c++) {
        p = 0;
        for (h = 0; h < 3; h++) p += a[l][h] * f[h][c];
        u[l][c] = p;
      }
      this.a = u[0][0], this.b = u[1][0], this.c = u[0][1], this.d = u[1][1], this.e = u[0][2], this.f = u[1][2];
    }, e.invert = function() {
      var e = this, t = e.a * e.d - e.b * e.c;
      return new o(e.d / t, -e.b / t, -e.c / t, e.a / t, (e.c * e.f - e.d * e.e) / t, (e.b * e.e - e.a * e.f) / t);
    }, e.clone = function() {
      return new o(this.a, this.b, this.c, this.d, this.e, this.f);
    }, e.translate = function(e, t) {
      this.add(1, 0, 0, 1, e, t);
    }, e.scale = function(e, t, n, r) {
      t == null && (t = e), (n || r) && this.add(1, 0, 0, 1, n, r), this.add(e, 0, 0, t, 0, 0), (n || r) && this.add(1, 0, 0, 1, -n, -r);
    }, e.rotate = function(e, t, n) {
      e = w.rad(e), t = t || 0, n = n || 0;
      var r = +U.cos(e).toFixed(9), i = +U.sin(e).toFixed(9);
      this.add(r, i, -i, r, t, n), this.add(1, 0, 0, 1, -t, -n);
    }, e.x = function(e, t) {
      return e * this.a + t * this.c + this.e;
    }, e.y = function(e, t) {
      return e * this.b + t * this.d + this.f;
    }, e.get = function(e) {
      return +this[j.fromCharCode(97 + e)].toFixed(4);
    }, e.toString = function() {
      return w.svg ? "matrix(" + [ this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5) ].join() + ")" : [ this.get(0), this.get(2), this.get(1), this.get(3), 0, 0 ].join();
    }, e.toFilter = function() {
      return "progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) + ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) + ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')";
    }, e.offset = function() {
      return [ this.e.toFixed(4), this.f.toFixed(4) ];
    }, e.split = function() {
      var e = {};
      e.dx = this.e, e.dy = this.f;
      var r = [ [ this.a, this.c ], [ this.b, this.d ] ];
      e.scalex = U.sqrt(n(r[0])), t(r[0]), e.shear = r[0][0] * r[1][0] + r[0][1] * r[1][1], r[1] = [ r[1][0] - r[0][0] * e.shear, r[1][1] - r[0][1] * e.shear ], e.scaley = U.sqrt(n(r[1])), t(r[1]), e.shear /= e.scaley;
      var i = -r[0][1], s = r[1][1];
      s < 0 ? (e.rotate = w.deg(U.acos(s)), i < 0 && (e.rotate = 360 - e.rotate)) : e.rotate = w.deg(U.asin(i)), e.isSimple = !+e.shear.toFixed(9) && (e.scalex.toFixed(9) == e.scaley.toFixed(9) || !e.rotate), e.isSuperSimple = !+e.shear.toFixed(9) && e.scalex.toFixed(9) == e.scaley.toFixed(9) && !e.rotate, e.noRotation = !+e.shear.toFixed(9) && !e.rotate;
      return e;
    }, e.toTransformString = function(e) {
      var t = e || this[F]();
      if (t.isSimple) {
        t.scalex = +t.scalex.toFixed(4), t.scaley = +t.scaley.toFixed(4), t.rotate = +t.rotate.toFixed(4);
        return (t.dx || t.dy ? "t" + [ t.dx, t.dy ] : H) + (t.scalex != 1 || t.scaley != 1 ? "s" + [ t.scalex, t.scaley, 0, 0 ] : H) + (t.rotate ? "r" + [ t.rotate, 0, 0 ] : H);
      }
      return "m" + [ this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5) ];
    };
  }(o.prototype);
  var fn = navigator.userAgent.match(/Version\/(.*?)\s/) || navigator.userAgent.match(/Chrome\/(\d+)/);
  navigator.vendor == "Apple Computer, Inc." && (fn && fn[1] < 4 || navigator.platform.slice(0, 2) == "iP") || navigator.vendor == "Google Inc." && fn && fn[1] < 8 ? O.safari = function() {
    var e = this.rect(-99, -99, this.width + 99, this.height + 99).attr({
      stroke: "none"
    });
    setTimeout(function() {
      e.remove();
    });
  } : O.safari = Tt;
  var ln = function() {
    this.returnValue = !1;
  }, cn = function() {
    return this.originalEvent.preventDefault();
  }, hn = function() {
    this.cancelBubble = !0;
  }, pn = function() {
    return this.originalEvent.stopPropagation();
  }, dn = function() {
    if (k.doc.addEventListener) return function(e, t, n, r) {
      var i = P && q[t] ? q[t] : t, s = function(i) {
        var s = k.doc.documentElement.scrollTop || k.doc.body.scrollTop, o = k.doc.documentElement.scrollLeft || k.doc.body.scrollLeft, u = i.clientX + o, a = i.clientY + s;
        if (P && q[C](t)) for (var f = 0, l = i.targetTouches && i.targetTouches.length; f < l; f++) if (i.targetTouches[f].target == e) {
          var c = i;
          i = i.targetTouches[f], i.originalEvent = c, i.preventDefault = cn, i.stopPropagation = pn;
          break;
        }
        return n.call(r, i, u, a);
      };
      e.addEventListener(i, s, !1);
      return function() {
        e.removeEventListener(i, s, !1);
        return !0;
      };
    };
    if (k.doc.attachEvent) return function(e, t, n, r) {
      var i = function(e) {
        e = e || k.win.event;
        var t = k.doc.documentElement.scrollTop || k.doc.body.scrollTop, i = k.doc.documentElement.scrollLeft || k.doc.body.scrollLeft, s = e.clientX + i, o = e.clientY + t;
        e.preventDefault = e.preventDefault || ln, e.stopPropagation = e.stopPropagation || hn;
        return n.call(r, e, s, o);
      };
      e.attachEvent("on" + t, i);
      var s = function() {
        e.detachEvent("on" + t, i);
        return !0;
      };
      return s;
    };
  }(), vn = [], mn = function(e) {
    var t = e.clientX, n = e.clientY, r = k.doc.documentElement.scrollTop || k.doc.body.scrollTop, i = k.doc.documentElement.scrollLeft || k.doc.body.scrollLeft, s, o = vn.length;
    while (o--) {
      s = vn[o];
      if (P) {
        var u = e.touches.length, a;
        while (u--) {
          a = e.touches[u];
          if (a.identifier == s.el._drag.id) {
            t = a.clientX, n = a.clientY, (e.originalEvent ? e.originalEvent : e).preventDefault();
            break;
          }
        }
      } else e.preventDefault();
      var f = s.el.node, l, c = f.nextSibling, h = f.parentNode, p = f.style.display;
      k.win.opera && h.removeChild(f), f.style.display = "none", l = s.el.paper.getElementByPoint(t, n), f.style.display = p, k.win.opera && (c ? h.insertBefore(f, c) : h.appendChild(f)), l && eve("raphael.drag.over." + s.el.id, s.el, l), t += i, n += r, eve("raphael.drag.move." + s.el.id, s.move_scope || s.el, t - s.el._drag.x, n - s.el._drag.y, t, n, e);
    }
  }, gn = function(e) {
    w.unmousemove(mn).unmouseup(gn);
    var t = vn.length, n;
    while (t--) n = vn[t], n.el._drag = {}, eve("raphael.drag.end." + n.el.id, n.end_scope || n.start_scope || n.move_scope || n.el, e);
    vn = [];
  }, yn = w.el = {};
  for (var bn = I.length; bn--; ) (function(e) {
    w[e] = yn[e] = function(t, n) {
      w.is(t, "function") && (this.events = this.events || [], this.events.push({
        name: e,
        f: t,
        unbind: dn(this.shape || this.node || k.doc, e, t, n || this)
      }));
      return this;
    }, w["un" + e] = yn["un" + e] = function(t) {
      var n = this.events || [], r = n.length;
      while (r--) if (n[r].name == e && n[r].f == t) {
        n[r].unbind(), n.splice(r, 1), !n.length && delete this.events;
        return this;
      }
      return this;
    };
  })(I[bn]);
  yn.data = function(e, t) {
    var n = Et[this.id] = Et[this.id] || {};
    if (arguments.length == 1) {
      if (w.is(e, "object")) {
        for (var r in e) e[C](r) && this.data(r, e[r]);
        return this;
      }
      eve("raphael.data.get." + this.id, this, n[e], e);
      return n[e];
    }
    n[e] = t, eve("raphael.data.set." + this.id, this, t, e);
    return this;
  }, yn.removeData = function(e) {
    e == null ? Et[this.id] = {} : Et[this.id] && delete Et[this.id][e];
    return this;
  }, yn.hover = function(e, t, n, r) {
    return this.mouseover(e, n).mouseout(t, r || n);
  }, yn.unhover = function(e, t) {
    return this.unmouseover(e).unmouseout(t);
  };
  var wn = [];
  yn.drag = function(e, t, n, r, i, s) {
    function o(o) {
      (o.originalEvent || o).preventDefault();
      var u = k.doc.documentElement.scrollTop || k.doc.body.scrollTop, a = k.doc.documentElement.scrollLeft || k.doc.body.scrollLeft;
      this._drag.x = o.clientX + a, this._drag.y = o.clientY + u, this._drag.id = o.identifier, !vn.length && w.mousemove(mn).mouseup(gn), vn.push({
        el: this,
        move_scope: r,
        start_scope: i,
        end_scope: s
      }), t && eve.on("raphael.drag.start." + this.id, t), e && eve.on("raphael.drag.move." + this.id, e), n && eve.on("raphael.drag.end." + this.id, n), eve("raphael.drag.start." + this.id, i || r || this, o.clientX + a, o.clientY + u, o);
    }
    this._drag = {}, wn.push({
      el: this,
      start: o
    }), this.mousedown(o);
    return this;
  }, yn.onDragOver = function(e) {
    e ? eve.on("raphael.drag.over." + this.id, e) : eve.unbind("raphael.drag.over." + this.id);
  }, yn.undrag = function() {
    var e = wn.length;
    while (e--) wn[e].el == this && (this.unmousedown(wn[e].start), wn.splice(e, 1), eve.unbind("raphael.drag.*." + this.id));
    !wn.length && w.unmousemove(mn).unmouseup(gn);
  }, O.circle = function(e, t, n) {
    var r = w._engine.circle(this, e || 0, t || 0, n || 0);
    this.__set__ && this.__set__.push(r);
    return r;
  }, O.rect = function(e, t, n, r, i) {
    var s = w._engine.rect(this, e || 0, t || 0, n || 0, r || 0, i || 0);
    this.__set__ && this.__set__.push(s);
    return s;
  }, O.ellipse = function(e, t, n, r) {
    var i = w._engine.ellipse(this, e || 0, t || 0, n || 0, r || 0);
    this.__set__ && this.__set__.push(i);
    return i;
  }, O.path = function(e) {
    e && !w.is(e, K) && !w.is(e[0], Q) && (e += H);
    var t = w._engine.path(w.format[_](w, arguments), this);
    this.__set__ && this.__set__.push(t);
    return t;
  }, O.image = function(e, t, n, r, i) {
    var s = w._engine.image(this, e || "about:blank", t || 0, n || 0, r || 0, i || 0);
    this.__set__ && this.__set__.push(s);
    return s;
  }, O.text = function(e, t, n) {
    var r = w._engine.text(this, e || 0, t || 0, j(n));
    this.__set__ && this.__set__.push(r);
    return r;
  }, O.set = function(e) {
    !w.is(e, "array") && (e = Array.prototype.splice.call(arguments, 0, arguments.length));
    var t = new Dn(e);
    this.__set__ && this.__set__.push(t);
    return t;
  }, O.setStart = function(e) {
    this.__set__ = e || this.set();
  }, O.setFinish = function(e) {
    var t = this.__set__;
    delete this.__set__;
    return t;
  }, O.setSize = function(e, t) {
    return w._engine.setSize.call(this, e, t);
  }, O.setViewBox = function(e, t, n, r, i) {
    return w._engine.setViewBox.call(this, e, t, n, r, i);
  }, O.top = O.bottom = null, O.raphael = w;
  var En = function(e) {
    var t = e.getBoundingClientRect(), n = e.ownerDocument, r = n.body, i = n.documentElement, s = i.clientTop || r.clientTop || 0, o = i.clientLeft || r.clientLeft || 0, u = t.top + (k.win.pageYOffset || i.scrollTop || r.scrollTop) - s, a = t.left + (k.win.pageXOffset || i.scrollLeft || r.scrollLeft) - o;
    return {
      y: u,
      x: a
    };
  };
  O.getElementByPoint = function(e, t) {
    var n = this, r = n.canvas, i = k.doc.elementFromPoint(e, t);
    if (k.win.opera && i.tagName == "svg") {
      var s = En(r), o = r.createSVGRect();
      o.x = e - s.x, o.y = t - s.y, o.width = o.height = 1;
      var u = r.getIntersectionList(o, null);
      u.length && (i = u[u.length - 1]);
    }
    if (!i) return null;
    while (i.parentNode && i != r.parentNode && !i.raphael) i = i.parentNode;
    i == n.canvas.parentNode && (i = r), i = i && i.raphael ? n.getById(i.raphaelid) : null;
    return i;
  }, O.getById = function(e) {
    var t = this.bottom;
    while (t) {
      if (t.id == e) return t;
      t = t.next;
    }
    return null;
  }, O.forEach = function(e, t) {
    var n = this.bottom;
    while (n) {
      if (e.call(t, n) === !1) return this;
      n = n.next;
    }
    return this;
  }, O.getElementsByPoint = function(e, t) {
    var n = this.set();
    this.forEach(function(r) {
      r.isPointInside(e, t) && n.push(r);
    });
    return n;
  }, yn.isPointInside = function(e, t) {
    var n = this.realPath = this.realPath || Lt[this.type](this);
    return w.isPointInsidePath(n, e, t);
  }, yn.getBBox = function(e) {
    if (this.removed) return {};
    var t = this._;
    if (e) {
      if (t.dirty || !t.bboxwt) this.realPath = Lt[this.type](this), t.bboxwt = Rt(this.realPath), t.bboxwt.toString = i, t.dirty = 0;
      return t.bboxwt;
    }
    if (t.dirty || t.dirtyT || !t.bbox) {
      if (t.dirty || !this.realPath) t.bboxwt = 0, this.realPath = Lt[this.type](this);
      t.bbox = Rt(At(this.realPath, this.matrix)), t.bbox.toString = i, t.dirty = t.dirtyT = 0;
    }
    return t.bbox;
  }, yn.clone = function() {
    if (this.removed) return null;
    var e = this.paper[this.type]().attr(this.attr());
    this.__set__ && this.__set__.push(e);
    return e;
  }, yn.glow = function(e) {
    if (this.type == "text") return null;
    e = e || {};
    var t = {
      width: (e.width || 10) + (+this.attr("stroke-width") || 1),
      fill: e.fill || !1,
      opacity: e.opacity || .5,
      offsetx: e.offsetx || 0,
      offsety: e.offsety || 0,
      color: e.color || "#000"
    }, n = t.width / 2, r = this.paper, i = r.set(), s = this.realPath || Lt[this.type](this);
    s = this.matrix ? At(s, this.matrix) : s;
    for (var o = 1; o < n + 1; o++) i.push(r.path(s).attr({
      stroke: t.color,
      fill: t.fill ? t.color : "none",
      "stroke-linejoin": "round",
      "stroke-linecap": "round",
      "stroke-width": +(t.width / n * o).toFixed(3),
      opacity: +(t.opacity / n).toFixed(3)
    }));
    return i.insertBefore(this).translate(t.offsetx, t.offsety);
  };
  var Sn = {}, xn = function(e, t, n, r, i, s, o, u, a) {
    return a == null ? p(e, t, n, r, i, s, o, u) : w.findDotsAtSegment(e, t, n, r, i, s, o, u, h(e, t, n, r, i, s, o, u, a));
  }, Tn = function(e, t) {
    return function(n, r, i) {
      n = Qt(n);
      var s, o, u, a, f = "", l = {}, c, h = 0;
      for (var p = 0, d = n.length; p < d; p++) {
        u = n[p];
        if (u[0] == "M") s = +u[1], o = +u[2]; else {
          a = xn(s, o, u[1], u[2], u[3], u[4], u[5], u[6]);
          if (h + a > r) {
            if (t && !l.start) {
              c = xn(s, o, u[1], u[2], u[3], u[4], u[5], u[6], r - h), f += [ "C" + c.start.x, c.start.y, c.m.x, c.m.y, c.x, c.y ];
              if (i) return f;
              l.start = f, f = [ "M" + c.x, c.y + "C" + c.n.x, c.n.y, c.end.x, c.end.y, u[5], u[6] ].join(), h += a, s = +u[5], o = +u[6];
              continue;
            }
            if (!e && !t) {
              c = xn(s, o, u[1], u[2], u[3], u[4], u[5], u[6], r - h);
              return {
                x: c.x,
                y: c.y,
                alpha: c.alpha
              };
            }
          }
          h += a, s = +u[5], o = +u[6];
        }
        f += u.shift() + u;
      }
      l.end = f, c = e ? h : t ? l : w.findDotsAtSegment(s, o, u[0], u[1], u[2], u[3], u[4], u[5], 1), c.alpha && (c = {
        x: c.x,
        y: c.y,
        alpha: c.alpha
      });
      return c;
    };
  }, Nn = Tn(1), Cn = Tn(), kn = Tn(0, 1);
  w.getTotalLength = Nn, w.getPointAtLength = Cn, w.getSubpath = function(e, t, n) {
    if (this.getTotalLength(e) - n < 1e-6) return kn(e, t).end;
    var r = kn(e, n, 1);
    return t ? kn(r, t).end : r;
  }, yn.getTotalLength = function() {
    if (this.type == "path") return this.node.getTotalLength ? this.node.getTotalLength() : Nn(this.attrs.path);
  }, yn.getPointAtLength = function(e) {
    if (this.type == "path") return Cn(this.attrs.path, e);
  }, yn.getSubpath = function(e, t) {
    if (this.type == "path") return w.getSubpath(this.attrs.path, e, t);
  };
  var Ln = w.easing_formulas = {
    linear: function(e) {
      return e;
    },
    "<": function(e) {
      return V(e, 1.7);
    },
    ">": function(e) {
      return V(e, .48);
    },
    "<>": function(e) {
      var t = .48 - e / 1.04, n = U.sqrt(.1734 + t * t), r = n - t, i = V(X(r), 1 / 3) * (r < 0 ? -1 : 1), s = -n - t, o = V(X(s), 1 / 3) * (s < 0 ? -1 : 1), u = i + o + .5;
      return (1 - u) * 3 * u * u + u * u * u;
    },
    backIn: function(e) {
      var t = 1.70158;
      return e * e * ((t + 1) * e - t);
    },
    backOut: function(e) {
      e -= 1;
      var t = 1.70158;
      return e * e * ((t + 1) * e + t) + 1;
    },
    elastic: function(e) {
      return e == !!e ? e : V(2, -10 * e) * U.sin((e - .075) * 2 * $ / .3) + 1;
    },
    bounce: function(e) {
      var t = 7.5625, n = 2.75, r;
      e < 1 / n ? r = t * e * e : e < 2 / n ? (e -= 1.5 / n, r = t * e * e + .75) : e < 2.5 / n ? (e -= 2.25 / n, r = t * e * e + .9375) : (e -= 2.625 / n, r = t * e * e + .984375);
      return r;
    }
  };
  Ln.easeIn = Ln["ease-in"] = Ln["<"], Ln.easeOut = Ln["ease-out"] = Ln[">"], Ln.easeInOut = Ln["ease-in-out"] = Ln["<>"], Ln["back-in"] = Ln.backIn, Ln["back-out"] = Ln.backOut;
  var An = [], On = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(e) {
    setTimeout(e, 16);
  }, Mn = function() {
    var e = +(new Date), n = 0;
    for (; n < An.length; n++) {
      var r = An[n];
      if (r.el.removed || r.paused) continue;
      var i = e - r.start, s = r.ms, o = r.easing, u = r.from, a = r.diff, f = r.to, l = r.t, c = r.el, h = {}, p, d = {}, v;
      r.initstatus ? (i = (r.initstatus * r.anim.top - r.prev) / (r.percent - r.prev) * s, r.status = r.initstatus, delete r.initstatus, r.stop && An.splice(n--, 1)) : r.status = (r.prev + (r.percent - r.prev) * (i / s)) / r.anim.top;
      if (i < 0) continue;
      if (i < s) {
        var m = o(i / s);
        for (var g in u) if (u[C](g)) {
          switch (ht[g]) {
           case J:
            p = +u[g] + m * s * a[g];
            break;
           case "colour":
            p = "rgb(" + [ _n(ot(u[g].r + m * s * a[g].r)), _n(ot(u[g].g + m * s * a[g].g)), _n(ot(u[g].b + m * s * a[g].b)) ].join(",") + ")";
            break;
           case "path":
            p = [];
            for (var y = 0, b = u[g].length; y < b; y++) {
              p[y] = [ u[g][y][0] ];
              for (var E = 1, S = u[g][y].length; E < S; E++) p[y][E] = +u[g][y][E] + m * s * a[g][y][E];
              p[y] = p[y].join(B);
            }
            p = p.join(B);
            break;
           case "transform":
            if (a[g].real) {
              p = [];
              for (y = 0, b = u[g].length; y < b; y++) {
                p[y] = [ u[g][y][0] ];
                for (E = 1, S = u[g][y].length; E < S; E++) p[y][E] = u[g][y][E] + m * s * a[g][y][E];
              }
            } else {
              var x = function(e) {
                return +u[g][e] + m * s * a[g][e];
              };
              p = [ [ "m", x(0), x(1), x(2), x(3), x(4), x(5) ] ];
            }
            break;
           case "csv":
            if (g == "clip-rect") {
              p = [], y = 4;
              while (y--) p[y] = +u[g][y] + m * s * a[g][y];
            }
            break;
           default:
            var T = [][D](u[g]);
            p = [], y = c.paper.customAttributes[g].length;
            while (y--) p[y] = +T[y] + m * s * a[g][y];
          }
          h[g] = p;
        }
        c.attr(h), function(e, t, n) {
          setTimeout(function() {
            eve("raphael.anim.frame." + e, t, n);
          });
        }(c.id, c, r.anim);
      } else {
        (function(e, t, n) {
          setTimeout(function() {
            eve("raphael.anim.frame." + t.id, t, n), eve("raphael.anim.finish." + t.id, t, n), w.is(e, "function") && e.call(t);
          });
        })(r.callback, c, r.anim), c.attr(f), An.splice(n--, 1);
        if (r.repeat > 1 && !r.next) {
          for (v in f) f[C](v) && (d[v] = r.totalOrigin[v]);
          r.el.attr(d), t(r.anim, r.el, r.anim.percents[0], null, r.totalOrigin, r.repeat - 1);
        }
        r.next && !r.stop && t(r.anim, r.el, r.next, null, r.totalOrigin, r.repeat);
      }
    }
    w.svg && c && c.paper && c.paper.safari(), An.length && On(Mn);
  }, _n = function(e) {
    return e > 255 ? 255 : e < 0 ? 0 : e;
  };
  yn.animateWith = function(e, r, i, s, o, u) {
    var a = this;
    if (a.removed) {
      u && u.call(a);
      return a;
    }
    var f = i instanceof n ? i : w.animation(i, s, o, u), l, c;
    t(f, a, f.percents[0], null, a.attr());
    for (var h = 0, p = An.length; h < p; h++) if (An[h].anim == r && An[h].el == e) {
      An[p - 1].start = An[h].start;
      break;
    }
    return a;
  }, yn.onAnimation = function(e) {
    e ? eve.on("raphael.anim.frame." + this.id, e) : eve.unbind("raphael.anim.frame." + this.id);
    return this;
  }, n.prototype.delay = function(e) {
    var t = new n(this.anim, this.ms);
    t.times = this.times, t.del = +e || 0;
    return t;
  }, n.prototype.repeat = function(e) {
    var t = new n(this.anim, this.ms);
    t.del = this.del, t.times = U.floor(z(e, 0)) || 1;
    return t;
  }, w.animation = function(e, t, r, i) {
    if (e instanceof n) return e;
    if (w.is(r, "function") || !r) i = i || r || null, r = null;
    e = Object(e), t = +t || 0;
    var s = {}, o, u;
    for (u in e) e[C](u) && at(u) != u && at(u) + "%" != u && (o = !0, s[u] = e[u]);
    if (!o) return new n(e, t);
    r && (s.easing = r), i && (s.callback = i);
    return new n({
      100: s
    }, t);
  }, yn.animate = function(e, r, i, s) {
    var o = this;
    if (o.removed) {
      s && s.call(o);
      return o;
    }
    var u = e instanceof n ? e : w.animation(e, r, i, s);
    t(u, o, u.percents[0], null, o.attr());
    return o;
  }, yn.setTime = function(e, t) {
    e && t != null && this.status(e, W(t, e.ms) / e.ms);
    return this;
  }, yn.status = function(e, n) {
    var r = [], i = 0, s, o;
    if (n != null) {
      t(e, this, -1, W(n, 1));
      return this;
    }
    s = An.length;
    for (; i < s; i++) {
      o = An[i];
      if (o.el.id == this.id && (!e || o.anim == e)) {
        if (e) return o.status;
        r.push({
          anim: o.anim,
          status: o.status
        });
      }
    }
    return e ? 0 : r;
  }, yn.pause = function(e) {
    for (var t = 0; t < An.length; t++) An[t].el.id == this.id && (!e || An[t].anim == e) && eve("raphael.anim.pause." + this.id, this, An[t].anim) !== !1 && (An[t].paused = !0);
    return this;
  }, yn.resume = function(e) {
    for (var t = 0; t < An.length; t++) if (An[t].el.id == this.id && (!e || An[t].anim == e)) {
      var n = An[t];
      eve("raphael.anim.resume." + this.id, this, n.anim) !== !1 && (delete n.paused, this.status(n.anim, n.status));
    }
    return this;
  }, yn.stop = function(e) {
    for (var t = 0; t < An.length; t++) An[t].el.id == this.id && (!e || An[t].anim == e) && eve("raphael.anim.stop." + this.id, this, An[t].anim) !== !1 && An.splice(t--, 1);
    return this;
  }, eve.on("raphael.remove", e), eve.on("raphael.clear", e), yn.toString = function() {
    return "Raphaël’s object";
  };
  var Dn = function(e) {
    this.items = [], this.length = 0, this.type = "set";
    if (e) for (var t = 0, n = e.length; t < n; t++) e[t] && (e[t].constructor == yn.constructor || e[t].constructor == Dn) && (this[this.items.length] = this.items[this.items.length] = e[t], this.length++);
  }, Pn = Dn.prototype;
  Pn.push = function() {
    var e, t;
    for (var n = 0, r = arguments.length; n < r; n++) e = arguments[n], e && (e.constructor == yn.constructor || e.constructor == Dn) && (t = this.items.length, this[t] = this.items[t] = e, this.length++);
    return this;
  }, Pn.pop = function() {
    this.length && delete this[this.length--];
    return this.items.pop();
  }, Pn.forEach = function(e, t) {
    for (var n = 0, r = this.items.length; n < r; n++) if (e.call(t, this.items[n], n) === !1) return this;
    return this;
  };
  for (var Hn in yn) yn[C](Hn) && (Pn[Hn] = function(e) {
    return function() {
      var t = arguments;
      return this.forEach(function(n) {
        n[e][_](n, t);
      });
    };
  }(Hn));
  Pn.attr = function(e, t) {
    if (e && w.is(e, Q) && w.is(e[0], "object")) for (var n = 0, r = e.length; n < r; n++) this.items[n].attr(e[n]); else for (var i = 0, s = this.items.length; i < s; i++) this.items[i].attr(e, t);
    return this;
  }, Pn.clear = function() {
    while (this.length) this.pop();
  }, Pn.splice = function(e, t, n) {
    e = e < 0 ? z(this.length + e, 0) : e, t = z(0, W(this.length - e, t));
    var r = [], i = [], s = [], o;
    for (o = 2; o < arguments.length; o++) s.push(arguments[o]);
    for (o = 0; o < t; o++) i.push(this[e + o]);
    for (; o < this.length - e; o++) r.push(this[e + o]);
    var u = s.length;
    for (o = 0; o < u + r.length; o++) this.items[e + o] = this[e + o] = o < u ? s[o] : r[o - u];
    o = this.items.length = this.length -= t - u;
    while (this[o]) delete this[o++];
    return new Dn(i);
  }, Pn.exclude = function(e) {
    for (var t = 0, n = this.length; t < n; t++) if (this[t] == e) {
      this.splice(t, 1);
      return !0;
    }
  }, Pn.animate = function(e, t, n, r) {
    (w.is(n, "function") || !n) && (r = n || null);
    var i = this.items.length, s = i, o, u = this, a;
    if (!i) return this;
    r && (a = function() {
      !--i && r.call(u);
    }), n = w.is(n, K) ? n : a;
    var f = w.animation(e, t, n, a);
    o = this.items[--s].animate(f);
    while (s--) this.items[s] && !this.items[s].removed && this.items[s].animateWith(o, f, f);
    return this;
  }, Pn.insertAfter = function(e) {
    var t = this.items.length;
    while (t--) this.items[t].insertAfter(e);
    return this;
  }, Pn.getBBox = function() {
    var e = [], t = [], n = [], r = [];
    for (var i = this.items.length; i--; ) if (!this.items[i].removed) {
      var s = this.items[i].getBBox();
      e.push(s.x), t.push(s.y), n.push(s.x + s.width), r.push(s.y + s.height);
    }
    e = W[_](0, e), t = W[_](0, t), n = z[_](0, n), r = z[_](0, r);
    return {
      x: e,
      y: t,
      x2: n,
      y2: r,
      width: n - e,
      height: r - t
    };
  }, Pn.clone = function(e) {
    e = new Dn;
    for (var t = 0, n = this.items.length; t < n; t++) e.push(this.items[t].clone());
    return e;
  }, Pn.toString = function() {
    return "Raphaël‘s set";
  }, w.registerFont = function(e) {
    if (!e.face) return e;
    this.fonts = this.fonts || {};
    var t = {
      w: e.w,
      face: {},
      glyphs: {}
    }, n = e.face["font-family"];
    for (var r in e.face) e.face[C](r) && (t.face[r] = e.face[r]);
    this.fonts[n] ? this.fonts[n].push(t) : this.fonts[n] = [ t ];
    if (!e.svg) {
      t.face["units-per-em"] = ft(e.face["units-per-em"], 10);
      for (var i in e.glyphs) if (e.glyphs[C](i)) {
        var s = e.glyphs[i];
        t.glyphs[i] = {
          w: s.w,
          k: {},
          d: s.d && "M" + s.d.replace(/[mlcxtrv]/g, function(e) {
            return {
              l: "L",
              c: "C",
              x: "z",
              t: "m",
              r: "l",
              v: "c"
            }[e] || "M";
          }) + "z"
        };
        if (s.k) for (var o in s.k) s[C](o) && (t.glyphs[i].k[o] = s.k[o]);
      }
    }
    return e;
  }, O.getFont = function(e, t, n, r) {
    r = r || "normal", n = n || "normal", t = +t || {
      normal: 400,
      bold: 700,
      lighter: 300,
      bolder: 800
    }[t] || 400;
    if (!!w.fonts) {
      var i = w.fonts[e];
      if (!i) {
        var s = new RegExp("(^|\\s)" + e.replace(/[^\w\d\s+!~.:_-]/g, H) + "(\\s|$)", "i");
        for (var o in w.fonts) if (w.fonts[C](o) && s.test(o)) {
          i = w.fonts[o];
          break;
        }
      }
      var u;
      if (i) for (var a = 0, f = i.length; a < f; a++) {
        u = i[a];
        if (u.face["font-weight"] == t && (u.face["font-style"] == n || !u.face["font-style"]) && u.face["font-stretch"] == r) break;
      }
      return u;
    }
  }, O.print = function(e, t, n, r, i, s, o) {
    s = s || "middle", o = z(W(o || 0, 1), -1);
    var u = j(n)[F](H), a = 0, f = 0, l = H, c;
    w.is(r, n) && (r = this.getFont(r));
    if (r) {
      c = (i || 16) / r.face["units-per-em"];
      var h = r.face.bbox[F](S), p = +h[0], d = h[3] - h[1], v = 0, m = +h[1] + (s == "baseline" ? d + +r.face.descent : d / 2);
      for (var g = 0, y = u.length; g < y; g++) {
        if (u[g] == "\n") a = 0, E = 0, f = 0, v += d; else {
          var b = f && r.glyphs[u[g - 1]] || {}, E = r.glyphs[u[g]];
          a += f ? (b.w || r.w) + (b.k && b.k[u[g]] || 0) + r.w * o : 0, f = 1;
        }
        E && E.d && (l += w.transformPath(E.d, [ "t", a * c, v * c, "s", c, c, p, m, "t", (e - p) / c, (t - m) / c ]));
      }
    }
    return this.path(l).attr({
      fill: "#000",
      stroke: "none"
    });
  }, O.add = function(e) {
    if (w.is(e, "array")) {
      var t = this.set(), n = 0, r = e.length, i;
      for (; n < r; n++) i = e[n] || {}, x[C](i.type) && t.push(this[i.type]().attr(i));
    }
    return t;
  }, w.format = function(e, t) {
    var n = w.is(t, Q) ? [ 0 ][D](t) : arguments;
    e && w.is(e, K) && n.length - 1 && (e = e.replace(T, function(e, t) {
      return n[++t] == null ? H : n[t];
    }));
    return e || H;
  }, w.fullfill = function() {
    var e = /\{([^\}]+)\}/g, t = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g, n = function(e, n, r) {
      var i = r;
      n.replace(t, function(e, t, n, r, s) {
        t = t || r, i && (t in i && (i = i[t]), typeof i == "function" && s && (i = i()));
      }), i = (i == null || i == r ? e : i) + "";
      return i;
    };
    return function(t, r) {
      return String(t).replace(e, function(e, t) {
        return n(e, t, r);
      });
    };
  }(), w.ninja = function() {
    L.was ? k.win.Raphael = L.is : delete Raphael;
    return w;
  }, w.st = Pn, function(e, t, n) {
    function r() {
      /in/.test(e.readyState) ? setTimeout(r, 9) : w.eve("raphael.DOMload");
    }
    e.readyState == null && e.addEventListener && (e.addEventListener(t, n = function() {
      e.removeEventListener(t, n, !1), e.readyState = "complete";
    }, !1), e.readyState = "loading"), r();
  }(document, "DOMContentLoaded"), L.was ? k.win.Raphael = w : Raphael = w, eve.on("raphael.DOMload", function() {
    E = !0;
  });
}(), window.Raphael.svg && function(e) {
  var t = "hasOwnProperty", n = String, r = parseFloat, i = parseInt, s = Math, o = s.max, u = s.abs, a = s.pow, f = /[, ]+/, l = e.eve, c = "", h = " ", p = "http://www.w3.org/1999/xlink", d = {
    block: "M5,0 0,2.5 5,5z",
    classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z",
    diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z",
    open: "M6,1 1,3.5 6,6",
    oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"
  }, v = {};
  e.toString = function() {
    return "Your browser supports SVG.\nYou are running Raphaël " + this.version;
  };
  var m = function(r, i) {
    if (i) {
      typeof r == "string" && (r = m(r));
      for (var s in i) i[t](s) && (s.substring(0, 6) == "xlink:" ? r.setAttributeNS(p, s.substring(6), n(i[s])) : r.setAttribute(s, n(i[s])));
    } else r = e._g.doc.createElementNS("http://www.w3.org/2000/svg", r), r.style && (r.style.webkitTapHighlightColor = "rgba(0,0,0,0)");
    return r;
  }, g = function(t, i) {
    var f = "linear", l = t.id + i, h = .5, p = .5, d = t.node, v = t.paper, g = d.style, y = e._g.doc.getElementById(l);
    if (!y) {
      i = n(i).replace(e._radial_gradient, function(e, t, n) {
        f = "radial";
        if (t && n) {
          h = r(t), p = r(n);
          var i = (p > .5) * 2 - 1;
          a(h - .5, 2) + a(p - .5, 2) > .25 && (p = s.sqrt(.25 - a(h - .5, 2)) * i + .5) && p != .5 && (p = p.toFixed(5) - 1e-5 * i);
        }
        return c;
      }), i = i.split(/\s*\-\s*/);
      if (f == "linear") {
        var b = i.shift();
        b = -r(b);
        if (isNaN(b)) return null;
        var w = [ 0, 0, s.cos(e.rad(b)), s.sin(e.rad(b)) ], E = 1 / (o(u(w[2]), u(w[3])) || 1);
        w[2] *= E, w[3] *= E, w[2] < 0 && (w[0] = -w[2], w[2] = 0), w[3] < 0 && (w[1] = -w[3], w[3] = 0);
      }
      var S = e._parseDots(i);
      if (!S) return null;
      l = l.replace(/[\(\)\s,\xb0#]/g, "_"), t.gradient && l != t.gradient.id && (v.defs.removeChild(t.gradient), delete t.gradient);
      if (!t.gradient) {
        y = m(f + "Gradient", {
          id: l
        }), t.gradient = y, m(y, f == "radial" ? {
          fx: h,
          fy: p
        } : {
          x1: w[0],
          y1: w[1],
          x2: w[2],
          y2: w[3],
          gradientTransform: t.matrix.invert()
        }), v.defs.appendChild(y);
        for (var x = 0, T = S.length; x < T; x++) y.appendChild(m("stop", {
          offset: S[x].offset ? S[x].offset : x ? "100%" : "0%",
          "stop-color": S[x].color || "#fff"
        }));
      }
    }
    m(d, {
      fill: "url(#" + l + ")",
      opacity: 1,
      "fill-opacity": 1
    }), g.fill = c, g.opacity = 1, g.fillOpacity = 1;
    return 1;
  }, y = function(e) {
    var t = e.getBBox(1);
    m(e.pattern, {
      patternTransform: e.matrix.invert() + " translate(" + t.x + "," + t.y + ")"
    });
  }, b = function(r, i, s) {
    if (r.type == "path") {
      var o = n(i).toLowerCase().split("-"), u = r.paper, a = s ? "end" : "start", f = r.node, l = r.attrs, h = l["stroke-width"], p = o.length, g = "classic", y, b, w, E, S, x = 3, T = 3, N = 5;
      while (p--) switch (o[p]) {
       case "block":
       case "classic":
       case "oval":
       case "diamond":
       case "open":
       case "none":
        g = o[p];
        break;
       case "wide":
        T = 5;
        break;
       case "narrow":
        T = 2;
        break;
       case "long":
        x = 5;
        break;
       case "short":
        x = 2;
      }
      g == "open" ? (x += 2, T += 2, N += 2, w = 1, E = s ? 4 : 1, S = {
        fill: "none",
        stroke: l.stroke
      }) : (E = w = x / 2, S = {
        fill: l.stroke,
        stroke: "none"
      }), r._.arrows ? s ? (r._.arrows.endPath && v[r._.arrows.endPath]--, r._.arrows.endMarker && v[r._.arrows.endMarker]--) : (r._.arrows.startPath && v[r._.arrows.startPath]--, r._.arrows.startMarker && v[r._.arrows.startMarker]--) : r._.arrows = {};
      if (g != "none") {
        var C = "raphael-marker-" + g, k = "raphael-marker-" + a + g + x + T;
        e._g.doc.getElementById(C) ? v[C]++ : (u.defs.appendChild(m(m("path"), {
          "stroke-linecap": "round",
          d: d[g],
          id: C
        })), v[C] = 1);
        var L = e._g.doc.getElementById(k), A;
        L ? (v[k]++, A = L.getElementsByTagName("use")[0]) : (L = m(m("marker"), {
          id: k,
          markerHeight: T,
          markerWidth: x,
          orient: "auto",
          refX: E,
          refY: T / 2
        }), A = m(m("use"), {
          "xlink:href": "#" + C,
          transform: (s ? "rotate(180 " + x / 2 + " " + T / 2 + ") " : c) + "scale(" + x / N + "," + T / N + ")",
          "stroke-width": (1 / ((x / N + T / N) / 2)).toFixed(4)
        }), L.appendChild(A), u.defs.appendChild(L), v[k] = 1), m(A, S);
        var O = w * (g != "diamond" && g != "oval");
        s ? (y = r._.arrows.startdx * h || 0, b = e.getTotalLength(l.path) - O * h) : (y = O * h, b = e.getTotalLength(l.path) - (r._.arrows.enddx * h || 0)), S = {}, S["marker-" + a] = "url(#" + k + ")";
        if (b || y) S.d = Raphael.getSubpath(l.path, y, b);
        m(f, S), r._.arrows[a + "Path"] = C, r._.arrows[a + "Marker"] = k, r._.arrows[a + "dx"] = O, r._.arrows[a + "Type"] = g, r._.arrows[a + "String"] = i;
      } else s ? (y = r._.arrows.startdx * h || 0, b = e.getTotalLength(l.path) - y) : (y = 0, b = e.getTotalLength(l.path) - (r._.arrows.enddx * h || 0)), r._.arrows[a + "Path"] && m(f, {
        d: Raphael.getSubpath(l.path, y, b)
      }), delete r._.arrows[a + "Path"], delete r._.arrows[a + "Marker"], delete r._.arrows[a + "dx"], delete r._.arrows[a + "Type"], delete r._.arrows[a + "String"];
      for (S in v) if (v[t](S) && !v[S]) {
        var M = e._g.doc.getElementById(S);
        M && M.parentNode.removeChild(M);
      }
    }
  }, w = {
    "": [ 0 ],
    none: [ 0 ],
    "-": [ 3, 1 ],
    ".": [ 1, 1 ],
    "-.": [ 3, 1, 1, 1 ],
    "-..": [ 3, 1, 1, 1, 1, 1 ],
    ". ": [ 1, 3 ],
    "- ": [ 4, 3 ],
    "--": [ 8, 3 ],
    "- .": [ 4, 3, 1, 3 ],
    "--.": [ 8, 3, 1, 3 ],
    "--..": [ 8, 3, 1, 3, 1, 3 ]
  }, E = function(e, t, r) {
    t = w[n(t).toLowerCase()];
    if (t) {
      var i = e.attrs["stroke-width"] || "1", s = {
        round: i,
        square: i,
        butt: 0
      }[e.attrs["stroke-linecap"] || r["stroke-linecap"]] || 0, o = [], u = t.length;
      while (u--) o[u] = t[u] * i + (u % 2 ? 1 : -1) * s;
      m(e.node, {
        "stroke-dasharray": o.join(",")
      });
    }
  }, S = function(r, s) {
    var a = r.node, l = r.attrs, h = a.style.visibility;
    a.style.visibility = "hidden";
    for (var d in s) if (s[t](d)) {
      if (!e._availableAttrs[t](d)) continue;
      var v = s[d];
      l[d] = v;
      switch (d) {
       case "blur":
        r.blur(v);
        break;
       case "href":
       case "title":
       case "target":
        var w = a.parentNode;
        if (w.tagName.toLowerCase() != "a") {
          var S = m("a");
          w.insertBefore(S, a), S.appendChild(a), w = S;
        }
        d == "target" ? w.setAttributeNS(p, "show", v == "blank" ? "new" : v) : w.setAttributeNS(p, d, v);
        break;
       case "cursor":
        a.style.cursor = v;
        break;
       case "transform":
        r.transform(v);
        break;
       case "arrow-start":
        b(r, v);
        break;
       case "arrow-end":
        b(r, v, 1);
        break;
       case "clip-rect":
        var x = n(v).split(f);
        if (x.length == 4) {
          r.clip && r.clip.parentNode.parentNode.removeChild(r.clip.parentNode);
          var N = m("clipPath"), C = m("rect");
          N.id = e.createUUID(), m(C, {
            x: x[0],
            y: x[1],
            width: x[2],
            height: x[3]
          }), N.appendChild(C), r.paper.defs.appendChild(N), m(a, {
            "clip-path": "url(#" + N.id + ")"
          }), r.clip = C;
        }
        if (!v) {
          var k = a.getAttribute("clip-path");
          if (k) {
            var L = e._g.doc.getElementById(k.replace(/(^url\(#|\)$)/g, c));
            L && L.parentNode.removeChild(L), m(a, {
              "clip-path": c
            }), delete r.clip;
          }
        }
        break;
       case "path":
        r.type == "path" && (m(a, {
          d: v ? l.path = e._pathToAbsolute(v) : "M0,0"
        }), r._.dirty = 1, r._.arrows && ("startString" in r._.arrows && b(r, r._.arrows.startString), "endString" in r._.arrows && b(r, r._.arrows.endString, 1)));
        break;
       case "width":
        a.setAttribute(d, v), r._.dirty = 1;
        if (!l.fx) break;
        d = "x", v = l.x;
       case "x":
        l.fx && (v = -l.x - (l.width || 0));
       case "rx":
        if (d == "rx" && r.type == "rect") break;
       case "cx":
        a.setAttribute(d, v), r.pattern && y(r), r._.dirty = 1;
        break;
       case "height":
        a.setAttribute(d, v), r._.dirty = 1;
        if (!l.fy) break;
        d = "y", v = l.y;
       case "y":
        l.fy && (v = -l.y - (l.height || 0));
       case "ry":
        if (d == "ry" && r.type == "rect") break;
       case "cy":
        a.setAttribute(d, v), r.pattern && y(r), r._.dirty = 1;
        break;
       case "r":
        r.type == "rect" ? m(a, {
          rx: v,
          ry: v
        }) : a.setAttribute(d, v), r._.dirty = 1;
        break;
       case "src":
        r.type == "image" && a.setAttributeNS(p, "href", v);
        break;
       case "stroke-width":
        if (r._.sx != 1 || r._.sy != 1) v /= o(u(r._.sx), u(r._.sy)) || 1;
        r.paper._vbSize && (v *= r.paper._vbSize), a.setAttribute(d, v), l["stroke-dasharray"] && E(r, l["stroke-dasharray"], s), r._.arrows && ("startString" in r._.arrows && b(r, r._.arrows.startString), "endString" in r._.arrows && b(r, r._.arrows.endString, 1));
        break;
       case "stroke-dasharray":
        E(r, v, s);
        break;
       case "fill":
        var A = n(v).match(e._ISURL);
        if (A) {
          N = m("pattern");
          var O = m("image");
          N.id = e.createUUID(), m(N, {
            x: 0,
            y: 0,
            patternUnits: "userSpaceOnUse",
            height: 1,
            width: 1
          }), m(O, {
            x: 0,
            y: 0,
            "xlink:href": A[1]
          }), N.appendChild(O), function(t) {
            e._preload(A[1], function() {
              var e = this.offsetWidth, n = this.offsetHeight;
              m(t, {
                width: e,
                height: n
              }), m(O, {
                width: e,
                height: n
              }), r.paper.safari();
            });
          }(N), r.paper.defs.appendChild(N), m(a, {
            fill: "url(#" + N.id + ")"
          }), r.pattern = N, r.pattern && y(r);
          break;
        }
        var M = e.getRGB(v);
        if (!M.error) delete s.gradient, delete l.gradient, !e.is(l.opacity, "undefined") && e.is(s.opacity, "undefined") && m(a, {
          opacity: l.opacity
        }), !e.is(l["fill-opacity"], "undefined") && e.is(s["fill-opacity"], "undefined") && m(a, {
          "fill-opacity": l["fill-opacity"]
        }); else if ((r.type == "circle" || r.type == "ellipse" || n(v).charAt() != "r") && g(r, v)) {
          if ("opacity" in l || "fill-opacity" in l) {
            var _ = e._g.doc.getElementById(a.getAttribute("fill").replace(/^url\(#|\)$/g, c));
            if (_) {
              var D = _.getElementsByTagName("stop");
              m(D[D.length - 1], {
                "stop-opacity": ("opacity" in l ? l.opacity : 1) * ("fill-opacity" in l ? l["fill-opacity"] : 1)
              });
            }
          }
          l.gradient = v, l.fill = "none";
          break;
        }
        M[t]("opacity") && m(a, {
          "fill-opacity": M.opacity > 1 ? M.opacity / 100 : M.opacity
        });
       case "stroke":
        M = e.getRGB(v), a.setAttribute(d, M.hex), d == "stroke" && M[t]("opacity") && m(a, {
          "stroke-opacity": M.opacity > 1 ? M.opacity / 100 : M.opacity
        }), d == "stroke" && r._.arrows && ("startString" in r._.arrows && b(r, r._.arrows.startString), "endString" in r._.arrows && b(r, r._.arrows.endString, 1));
        break;
       case "gradient":
        (r.type == "circle" || r.type == "ellipse" || n(v).charAt() != "r") && g(r, v);
        break;
       case "opacity":
        l.gradient && !l[t]("stroke-opacity") && m(a, {
          "stroke-opacity": v > 1 ? v / 100 : v
        });
       case "fill-opacity":
        if (l.gradient) {
          _ = e._g.doc.getElementById(a.getAttribute("fill").replace(/^url\(#|\)$/g, c)), _ && (D = _.getElementsByTagName("stop"), m(D[D.length - 1], {
            "stop-opacity": v
          }));
          break;
        }
       default:
        d == "font-size" && (v = i(v, 10) + "px");
        var P = d.replace(/(\-.)/g, function(e) {
          return e.substring(1).toUpperCase();
        });
        a.style[P] = v, r._.dirty = 1, a.setAttribute(d, v);
      }
    }
    T(r, s), a.style.visibility = h;
  }, x = 1.2, T = function(r, s) {
    if (r.type == "text" && !!(s[t]("text") || s[t]("font") || s[t]("font-size") || s[t]("x") || s[t]("y"))) {
      var o = r.attrs, u = r.node, a = u.firstChild ? i(e._g.doc.defaultView.getComputedStyle(u.firstChild, c).getPropertyValue("font-size"), 10) : 10;
      if (s[t]("text")) {
        o.text = s.text;
        while (u.firstChild) u.removeChild(u.firstChild);
        var f = n(s.text).split("\n"), l = [], h;
        for (var p = 0, d = f.length; p < d; p++) h = m("tspan"), p && m(h, {
          dy: a * x,
          x: o.x
        }), h.appendChild(e._g.doc.createTextNode(f[p])), u.appendChild(h), l[p] = h;
      } else {
        l = u.getElementsByTagName("tspan");
        for (p = 0, d = l.length; p < d; p++) p ? m(l[p], {
          dy: a * x,
          x: o.x
        }) : m(l[0], {
          dy: 0
        });
      }
      m(u, {
        x: o.x,
        y: o.y
      }), r._.dirty = 1;
      var v = r._getBBox(), g = o.y - (v.y + v.height / 2);
      g && e.is(g, "finite") && m(l[0], {
        dy: g
      });
    }
  }, N = function(t, n) {
    var r = 0, i = 0;
    this[0] = this.node = t, t.raphael = !0, this.id = e._oid++, t.raphaelid = this.id, this.matrix = e.matrix(), this.realPath = null, this.paper = n, this.attrs = this.attrs || {}, this._ = {
      transform: [],
      sx: 1,
      sy: 1,
      deg: 0,
      dx: 0,
      dy: 0,
      dirty: 1
    }, !n.bottom && (n.bottom = this), this.prev = n.top, n.top && (n.top.next = this), n.top = this, this.next = null;
  }, C = e.el;
  N.prototype = C, C.constructor = N, e._engine.path = function(e, t) {
    var n = m("path");
    t.canvas && t.canvas.appendChild(n);
    var r = new N(n, t);
    r.type = "path", S(r, {
      fill: "none",
      stroke: "#000",
      path: e
    });
    return r;
  }, C.rotate = function(e, t, i) {
    if (this.removed) return this;
    e = n(e).split(f), e.length - 1 && (t = r(e[1]), i = r(e[2])), e = r(e[0]), i == null && (t = i);
    if (t == null || i == null) {
      var s = this.getBBox(1);
      t = s.x + s.width / 2, i = s.y + s.height / 2;
    }
    this.transform(this._.transform.concat([ [ "r", e, t, i ] ]));
    return this;
  }, C.scale = function(e, t, i, s) {
    if (this.removed) return this;
    e = n(e).split(f), e.length - 1 && (t = r(e[1]), i = r(e[2]), s = r(e[3])), e = r(e[0]), t == null && (t = e), s == null && (i = s);
    if (i == null || s == null) var o = this.getBBox(1);
    i = i == null ? o.x + o.width / 2 : i, s = s == null ? o.y + o.height / 2 : s, this.transform(this._.transform.concat([ [ "s", e, t, i, s ] ]));
    return this;
  }, C.translate = function(e, t) {
    if (this.removed) return this;
    e = n(e).split(f), e.length - 1 && (t = r(e[1])), e = r(e[0]) || 0, t = +t || 0, this.transform(this._.transform.concat([ [ "t", e, t ] ]));
    return this;
  }, C.transform = function(n) {
    var r = this._;
    if (n == null) return r.transform;
    e._extractTransform(this, n), this.clip && m(this.clip, {
      transform: this.matrix.invert()
    }), this.pattern && y(this), this.node && m(this.node, {
      transform: this.matrix
    });
    if (r.sx != 1 || r.sy != 1) {
      var i = this.attrs[t]("stroke-width") ? this.attrs["stroke-width"] : 1;
      this.attr({
        "stroke-width": i
      });
    }
    return this;
  }, C.hide = function() {
    !this.removed && this.paper.safari(this.node.style.display = "none");
    return this;
  }, C.show = function() {
    !this.removed && this.paper.safari(this.node.style.display = "");
    return this;
  }, C.remove = function() {
    if (!this.removed && !!this.node.parentNode) {
      var t = this.paper;
      t.__set__ && t.__set__.exclude(this), l.unbind("raphael.*.*." + this.id), this.gradient && t.defs.removeChild(this.gradient), e._tear(this, t), this.node.parentNode.tagName.toLowerCase() == "a" ? this.node.parentNode.parentNode.removeChild(this.node.parentNode) : this.node.parentNode.removeChild(this.node);
      for (var n in this) this[n] = typeof this[n] == "function" ? e._removedFactory(n) : null;
      this.removed = !0;
    }
  }, C._getBBox = function() {
    if (this.node.style.display == "none") {
      this.show();
      var e = !0;
    }
    var t = {};
    try {
      t = this.node.getBBox();
    } catch (n) {} finally {
      t = t || {};
    }
    e && this.hide();
    return t;
  }, C.attr = function(n, r) {
    if (this.removed) return this;
    if (n == null) {
      var i = {};
      for (var s in this.attrs) this.attrs[t](s) && (i[s] = this.attrs[s]);
      i.gradient && i.fill == "none" && (i.fill = i.gradient) && delete i.gradient, i.transform = this._.transform;
      return i;
    }
    if (r == null && e.is(n, "string")) {
      if (n == "fill" && this.attrs.fill == "none" && this.attrs.gradient) return this.attrs.gradient;
      if (n == "transform") return this._.transform;
      var o = n.split(f), u = {};
      for (var a = 0, c = o.length; a < c; a++) n = o[a], n in this.attrs ? u[n] = this.attrs[n] : e.is(this.paper.customAttributes[n], "function") ? u[n] = this.paper.customAttributes[n].def : u[n] = e._availableAttrs[n];
      return c - 1 ? u : u[o[0]];
    }
    if (r == null && e.is(n, "array")) {
      u = {};
      for (a = 0, c = n.length; a < c; a++) u[n[a]] = this.attr(n[a]);
      return u;
    }
    if (r != null) {
      var h = {};
      h[n] = r;
    } else n != null && e.is(n, "object") && (h = n);
    for (var p in h) l("raphael.attr." + p + "." + this.id, this, h[p]);
    for (p in this.paper.customAttributes) if (this.paper.customAttributes[t](p) && h[t](p) && e.is(this.paper.customAttributes[p], "function")) {
      var d = this.paper.customAttributes[p].apply(this, [].concat(h[p]));
      this.attrs[p] = h[p];
      for (var v in d) d[t](v) && (h[v] = d[v]);
    }
    S(this, h);
    return this;
  }, C.toFront = function() {
    if (this.removed) return this;
    this.node.parentNode.tagName.toLowerCase() == "a" ? this.node.parentNode.parentNode.appendChild(this.node.parentNode) : this.node.parentNode.appendChild(this.node);
    var t = this.paper;
    t.top != this && e._tofront(this, t);
    return this;
  }, C.toBack = function() {
    if (this.removed) return this;
    var t = this.node.parentNode;
    t.tagName.toLowerCase() == "a" ? t.parentNode.insertBefore(this.node.parentNode, this.node.parentNode.parentNode.firstChild) : t.firstChild != this.node && t.insertBefore(this.node, this.node.parentNode.firstChild), e._toback(this, this.paper);
    var n = this.paper;
    return this;
  }, C.insertAfter = function(t) {
    if (this.removed) return this;
    var n = t.node || t[t.length - 1].node;
    n.nextSibling ? n.parentNode.insertBefore(this.node, n.nextSibling) : n.parentNode.appendChild(this.node), e._insertafter(this, t, this.paper);
    return this;
  }, C.insertBefore = function(t) {
    if (this.removed) return this;
    var n = t.node || t[0].node;
    n.parentNode.insertBefore(this.node, n), e._insertbefore(this, t, this.paper);
    return this;
  }, C.blur = function(t) {
    var n = this;
    if (+t !== 0) {
      var r = m("filter"), i = m("feGaussianBlur");
      n.attrs.blur = t, r.id = e.createUUID(), m(i, {
        stdDeviation: +t || 1.5
      }), r.appendChild(i), n.paper.defs.appendChild(r), n._blur = r, m(n.node, {
        filter: "url(#" + r.id + ")"
      });
    } else n._blur && (n._blur.parentNode.removeChild(n._blur), delete n._blur, delete n.attrs.blur), n.node.removeAttribute("filter");
  }, e._engine.circle = function(e, t, n, r) {
    var i = m("circle");
    e.canvas && e.canvas.appendChild(i);
    var s = new N(i, e);
    s.attrs = {
      cx: t,
      cy: n,
      r: r,
      fill: "none",
      stroke: "#000"
    }, s.type = "circle", m(i, s.attrs);
    return s;
  }, e._engine.rect = function(e, t, n, r, i, s) {
    var o = m("rect");
    e.canvas && e.canvas.appendChild(o);
    var u = new N(o, e);
    u.attrs = {
      x: t,
      y: n,
      width: r,
      height: i,
      r: s || 0,
      rx: s || 0,
      ry: s || 0,
      fill: "none",
      stroke: "#000"
    }, u.type = "rect", m(o, u.attrs);
    return u;
  }, e._engine.ellipse = function(e, t, n, r, i) {
    var s = m("ellipse");
    e.canvas && e.canvas.appendChild(s);
    var o = new N(s, e);
    o.attrs = {
      cx: t,
      cy: n,
      rx: r,
      ry: i,
      fill: "none",
      stroke: "#000"
    }, o.type = "ellipse", m(s, o.attrs);
    return o;
  }, e._engine.image = function(e, t, n, r, i, s) {
    var o = m("image");
    m(o, {
      x: n,
      y: r,
      width: i,
      height: s,
      preserveAspectRatio: "none"
    }), o.setAttributeNS(p, "href", t), e.canvas && e.canvas.appendChild(o);
    var u = new N(o, e);
    u.attrs = {
      x: n,
      y: r,
      width: i,
      height: s,
      src: t
    }, u.type = "image";
    return u;
  }, e._engine.text = function(t, n, r, i) {
    var s = m("text");
    t.canvas && t.canvas.appendChild(s);
    var o = new N(s, t);
    o.attrs = {
      x: n,
      y: r,
      "text-anchor": "middle",
      text: i,
      font: e._availableAttrs.font,
      stroke: "none",
      fill: "#000"
    }, o.type = "text", S(o, o.attrs);
    return o;
  }, e._engine.setSize = function(e, t) {
    this.width = e || this.width, this.height = t || this.height, this.canvas.setAttribute("width", this.width), this.canvas.setAttribute("height", this.height), this._viewBox && this.setViewBox.apply(this, this._viewBox);
    return this;
  }, e._engine.create = function() {
    var t = e._getContainer.apply(0, arguments), n = t && t.container, r = t.x, i = t.y, s = t.width, o = t.height;
    if (!n) throw new Error("SVG container not found.");
    var u = m("svg"), a = "overflow:hidden;", f;
    r = r || 0, i = i || 0, s = s || 512, o = o || 342, m(u, {
      height: o,
      version: 1.1,
      width: s,
      xmlns: "http://www.w3.org/2000/svg"
    }), n == 1 ? (u.style.cssText = a + "position:absolute;left:" + r + "px;top:" + i + "px", e._g.doc.body.appendChild(u), f = 1) : (u.style.cssText = a + "position:relative", n.firstChild ? n.insertBefore(u, n.firstChild) : n.appendChild(u)), n = new e._Paper, n.width = s, n.height = o, n.canvas = u, n.clear(), n._left = n._top = 0, f && (n.renderfix = function() {}), n.renderfix();
    return n;
  }, e._engine.setViewBox = function(e, t, n, r, i) {
    l("raphael.setViewBox", this, this._viewBox, [ e, t, n, r, i ]);
    var s = o(n / this.width, r / this.height), u = this.top, a = i ? "meet" : "xMinYMin", f, c;
    e == null ? (this._vbSize && (s = 1), delete this._vbSize, f = "0 0 " + this.width + h + this.height) : (this._vbSize = s, f = e + h + t + h + n + h + r), m(this.canvas, {
      viewBox: f,
      preserveAspectRatio: a
    });
    while (s && u) c = "stroke-width" in u.attrs ? u.attrs["stroke-width"] : 1, u.attr({
      "stroke-width": c
    }), u._.dirty = 1, u._.dirtyT = 1, u = u.prev;
    this._viewBox = [ e, t, n, r, !!i ];
    return this;
  }, e.prototype.renderfix = function() {
    var e = this.canvas, t = e.style, n;
    try {
      n = e.getScreenCTM() || e.createSVGMatrix();
    } catch (r) {
      n = e.createSVGMatrix();
    }
    var i = -n.e % 1, s = -n.f % 1;
    if (i || s) i && (this._left = (this._left + i) % 1, t.left = this._left + "px"), s && (this._top = (this._top + s) % 1, t.top = this._top + "px");
  }, e.prototype.clear = function() {
    e.eve("raphael.clear", this);
    var t = this.canvas;
    while (t.firstChild) t.removeChild(t.firstChild);
    this.bottom = this.top = null, (this.desc = m("desc")).appendChild(e._g.doc.createTextNode("Created with Raphaël " + e.version)), t.appendChild(this.desc), t.appendChild(this.defs = m("defs"));
  }, e.prototype.remove = function() {
    l("raphael.remove", this), this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
    for (var t in this) this[t] = typeof this[t] == "function" ? e._removedFactory(t) : null;
  };
  var k = e.st;
  for (var L in C) C[t](L) && !k[t](L) && (k[L] = function(e) {
    return function() {
      var t = arguments;
      return this.forEach(function(n) {
        n[e].apply(n, t);
      });
    };
  }(L));
}(window.Raphael), window.Raphael.vml && function(e) {
  var t = "hasOwnProperty", n = String, r = parseFloat, i = Math, s = i.round, o = i.max, u = i.min, a = i.abs, f = "fill", l = /[, ]+/, c = e.eve, h = " progid:DXImageTransform.Microsoft", p = " ", d = "", v = {
    M: "m",
    L: "l",
    C: "c",
    Z: "x",
    m: "t",
    l: "r",
    c: "v",
    z: "x"
  }, m = /([clmz]),?([^clmz]*)/gi, g = / progid:\S+Blur\([^\)]+\)/g, y = /-?[^,\s-]+/g, b = "position:absolute;left:0;top:0;width:1px;height:1px", w = 21600, E = {
    path: 1,
    rect: 1,
    image: 1
  }, S = {
    circle: 1,
    ellipse: 1
  }, x = function(t) {
    var r = /[ahqstv]/ig, i = e._pathToAbsolute;
    n(t).match(r) && (i = e._path2curve), r = /[clmz]/g;
    if (i == e._pathToAbsolute && !n(t).match(r)) {
      var o = n(t).replace(m, function(e, t, n) {
        var r = [], i = t.toLowerCase() == "m", o = v[t];
        n.replace(y, function(e) {
          i && r.length == 2 && (o += r + v[t == "m" ? "l" : "L"], r = []), r.push(s(e * w));
        });
        return o + r;
      });
      return o;
    }
    var u = i(t), a, f;
    o = [];
    for (var l = 0, c = u.length; l < c; l++) {
      a = u[l], f = u[l][0].toLowerCase(), f == "z" && (f = "x");
      for (var h = 1, g = a.length; h < g; h++) f += s(a[h] * w) + (h != g - 1 ? "," : d);
      o.push(f);
    }
    return o.join(p);
  }, T = function(t, n, r) {
    var i = e.matrix();
    i.rotate(-t, .5, .5);
    return {
      dx: i.x(n, r),
      dy: i.y(n, r)
    };
  }, N = function(e, t, n, r, i, s) {
    var o = e._, u = e.matrix, l = o.fillpos, c = e.node, h = c.style, d = 1, v = "", m, g = w / t, y = w / n;
    h.visibility = "hidden";
    if (!!t && !!n) {
      c.coordsize = a(g) + p + a(y), h.rotation = s * (t * n < 0 ? -1 : 1);
      if (s) {
        var b = T(s, r, i);
        r = b.dx, i = b.dy;
      }
      t < 0 && (v += "x"), n < 0 && (v += " y") && (d = -1), h.flip = v, c.coordorigin = r * -g + p + i * -y;
      if (l || o.fillsize) {
        var E = c.getElementsByTagName(f);
        E = E && E[0], c.removeChild(E), l && (b = T(s, u.x(l[0], l[1]), u.y(l[0], l[1])), E.position = b.dx * d + p + b.dy * d), o.fillsize && (E.size = o.fillsize[0] * a(t) + p + o.fillsize[1] * a(n)), c.appendChild(E);
      }
      h.visibility = "visible";
    }
  };
  e.toString = function() {
    return "Your browser doesn’t support SVG. Falling down to VML.\nYou are running Raphaël " + this.version;
  };
  var C = function(e, t, r) {
    var i = n(t).toLowerCase().split("-"), s = r ? "end" : "start", o = i.length, u = "classic", a = "medium", f = "medium";
    while (o--) switch (i[o]) {
     case "block":
     case "classic":
     case "oval":
     case "diamond":
     case "open":
     case "none":
      u = i[o];
      break;
     case "wide":
     case "narrow":
      f = i[o];
      break;
     case "long":
     case "short":
      a = i[o];
    }
    var l = e.node.getElementsByTagName("stroke")[0];
    l[s + "arrow"] = u, l[s + "arrowlength"] = a, l[s + "arrowwidth"] = f;
  }, k = function(i, a) {
    i.attrs = i.attrs || {};
    var c = i.node, h = i.attrs, v = c.style, m, g = E[i.type] && (a.x != h.x || a.y != h.y || a.width != h.width || a.height != h.height || a.cx != h.cx || a.cy != h.cy || a.rx != h.rx || a.ry != h.ry || a.r != h.r), y = S[i.type] && (h.cx != a.cx || h.cy != a.cy || h.r != a.r || h.rx != a.rx || h.ry != a.ry), b = i;
    for (var T in a) a[t](T) && (h[T] = a[T]);
    g && (h.path = e._getPath[i.type](i), i._.dirty = 1), a.href && (c.href = a.href), a.title && (c.title = a.title), a.target && (c.target = a.target), a.cursor && (v.cursor = a.cursor), "blur" in a && i.blur(a.blur);
    if (a.path && i.type == "path" || g) c.path = x(~n(h.path).toLowerCase().indexOf("r") ? e._pathToAbsolute(h.path) : h.path), i.type == "image" && (i._.fillpos = [ h.x, h.y ], i._.fillsize = [ h.width, h.height ], N(i, 1, 1, 0, 0, 0));
    "transform" in a && i.transform(a.transform);
    if (y) {
      var k = +h.cx, A = +h.cy, O = +h.rx || +h.r || 0, _ = +h.ry || +h.r || 0;
      c.path = e.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", s((k - O) * w), s((A - _) * w), s((k + O) * w), s((A + _) * w), s(k * w));
    }
    if ("clip-rect" in a) {
      var D = n(a["clip-rect"]).split(l);
      if (D.length == 4) {
        D[2] = +D[2] + +D[0], D[3] = +D[3] + +D[1];
        var P = c.clipRect || e._g.doc.createElement("div"), H = P.style;
        H.clip = e.format("rect({1}px {2}px {3}px {0}px)", D), c.clipRect || (H.position = "absolute", H.top = 0, H.left = 0, H.width = i.paper.width + "px", H.height = i.paper.height + "px", c.parentNode.insertBefore(P, c), P.appendChild(c), c.clipRect = P);
      }
      a["clip-rect"] || c.clipRect && (c.clipRect.style.clip = "auto");
    }
    if (i.textpath) {
      var B = i.textpath.style;
      a.font && (B.font = a.font), a["font-family"] && (B.fontFamily = '"' + a["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, d) + '"'), a["font-size"] && (B.fontSize = a["font-size"]), a["font-weight"] && (B.fontWeight = a["font-weight"]), a["font-style"] && (B.fontStyle = a["font-style"]);
    }
    "arrow-start" in a && C(b, a["arrow-start"]), "arrow-end" in a && C(b, a["arrow-end"], 1);
    if (a.opacity != null || a["stroke-width"] != null || a.fill != null || a.src != null || a.stroke != null || a["stroke-width"] != null || a["stroke-opacity"] != null || a["fill-opacity"] != null || a["stroke-dasharray"] != null || a["stroke-miterlimit"] != null || a["stroke-linejoin"] != null || a["stroke-linecap"] != null) {
      var I = c.getElementsByTagName(f), q = !1;
      I = I && I[0], !I && (q = I = M(f)), i.type == "image" && a.src && (I.src = a.src), a.fill && (I.on = !0);
      if (I.on == null || a.fill == "none" || a.fill === null) I.on = !1;
      if (I.on && a.fill) {
        var R = n(a.fill).match(e._ISURL);
        if (R) {
          I.parentNode == c && c.removeChild(I), I.rotate = !0, I.src = R[1], I.type = "tile";
          var U = i.getBBox(1);
          I.position = U.x + p + U.y, i._.fillpos = [ U.x, U.y ], e._preload(R[1], function() {
            i._.fillsize = [ this.offsetWidth, this.offsetHeight ];
          });
        } else I.color = e.getRGB(a.fill).hex, I.src = d, I.type = "solid", e.getRGB(a.fill).error && (b.type in {
          circle: 1,
          ellipse: 1
        } || n(a.fill).charAt() != "r") && L(b, a.fill, I) && (h.fill = "none", h.gradient = a.fill, I.rotate = !1);
      }
      if ("fill-opacity" in a || "opacity" in a) {
        var W = ((+h["fill-opacity"] + 1 || 2) - 1) * ((+h.opacity + 1 || 2) - 1) * ((+e.getRGB(a.fill).o + 1 || 2) - 1);
        W = u(o(W, 0), 1), I.opacity = W, I.src && (I.color = "none");
      }
      c.appendChild(I);
      var X = c.getElementsByTagName("stroke") && c.getElementsByTagName("stroke")[0], V = !1;
      !X && (V = X = M("stroke"));
      if (a.stroke && a.stroke != "none" || a["stroke-width"] || a["stroke-opacity"] != null || a["stroke-dasharray"] || a["stroke-miterlimit"] || a["stroke-linejoin"] || a["stroke-linecap"]) X.on = !0;
      (a.stroke == "none" || a.stroke === null || X.on == null || a.stroke == 0 || a["stroke-width"] == 0) && (X.on = !1);
      var $ = e.getRGB(a.stroke);
      X.on && a.stroke && (X.color = $.hex), W = ((+h["stroke-opacity"] + 1 || 2) - 1) * ((+h.opacity + 1 || 2) - 1) * ((+$.o + 1 || 2) - 1);
      var J = (r(a["stroke-width"]) || 1) * .75;
      W = u(o(W, 0), 1), a["stroke-width"] == null && (J = h["stroke-width"]), a["stroke-width"] && (X.weight = J), J && J < 1 && (W *= J) && (X.weight = 1), X.opacity = W, a["stroke-linejoin"] && (X.joinstyle = a["stroke-linejoin"] || "miter"), X.miterlimit = a["stroke-miterlimit"] || 8, a["stroke-linecap"] && (X.endcap = a["stroke-linecap"] == "butt" ? "flat" : a["stroke-linecap"] == "square" ? "square" : "round");
      if (a["stroke-dasharray"]) {
        var K = {
          "-": "shortdash",
          ".": "shortdot",
          "-.": "shortdashdot",
          "-..": "shortdashdotdot",
          ". ": "dot",
          "- ": "dash",
          "--": "longdash",
          "- .": "dashdot",
          "--.": "longdashdot",
          "--..": "longdashdotdot"
        };
        X.dashstyle = K[t](a["stroke-dasharray"]) ? K[a["stroke-dasharray"]] : d;
      }
      V && c.appendChild(X);
    }
    if (b.type == "text") {
      b.paper.canvas.style.display = d;
      var Q = b.paper.span, G = 100, Y = h.font && h.font.match(/\d+(?:\.\d*)?(?=px)/);
      v = Q.style, h.font && (v.font = h.font), h["font-family"] && (v.fontFamily = h["font-family"]), h["font-weight"] && (v.fontWeight = h["font-weight"]), h["font-style"] && (v.fontStyle = h["font-style"]), Y = r(h["font-size"] || Y && Y[0]) || 10, v.fontSize = Y * G + "px", b.textpath.string && (Q.innerHTML = n(b.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
      var Z = Q.getBoundingClientRect();
      b.W = h.w = (Z.right - Z.left) / G, b.H = h.h = (Z.bottom - Z.top) / G, b.X = h.x, b.Y = h.y + b.H / 2, ("x" in a || "y" in a) && (b.path.v = e.format("m{0},{1}l{2},{1}", s(h.x * w), s(h.y * w), s(h.x * w) + 1));
      var et = [ "x", "y", "text", "font", "font-family", "font-weight", "font-style", "font-size" ];
      for (var tt = 0, nt = et.length; tt < nt; tt++) if (et[tt] in a) {
        b._.dirty = 1;
        break;
      }
      switch (h["text-anchor"]) {
       case "start":
        b.textpath.style["v-text-align"] = "left", b.bbx = b.W / 2;
        break;
       case "end":
        b.textpath.style["v-text-align"] = "right", b.bbx = -b.W / 2;
        break;
       default:
        b.textpath.style["v-text-align"] = "center", b.bbx = 0;
      }
      b.textpath.style["v-text-kern"] = !0;
    }
  }, L = function(t, s, o) {
    t.attrs = t.attrs || {};
    var u = t.attrs, a = Math.pow, f, l, c = "linear", h = ".5 .5";
    t.attrs.gradient = s, s = n(s).replace(e._radial_gradient, function(e, t, n) {
      c = "radial", t && n && (t = r(t), n = r(n), a(t - .5, 2) + a(n - .5, 2) > .25 && (n = i.sqrt(.25 - a(t - .5, 2)) * ((n > .5) * 2 - 1) + .5), h = t + p + n);
      return d;
    }), s = s.split(/\s*\-\s*/);
    if (c == "linear") {
      var v = s.shift();
      v = -r(v);
      if (isNaN(v)) return null;
    }
    var m = e._parseDots(s);
    if (!m) return null;
    t = t.shape || t.node;
    if (m.length) {
      t.removeChild(o), o.on = !0, o.method = "none", o.color = m[0].color, o.color2 = m[m.length - 1].color;
      var g = [];
      for (var y = 0, b = m.length; y < b; y++) m[y].offset && g.push(m[y].offset + p + m[y].color);
      o.colors = g.length ? g.join() : "0% " + o.color, c == "radial" ? (o.type = "gradientTitle", o.focus = "100%", o.focussize = "0 0", o.focusposition = h, o.angle = 0) : (o.type = "gradient", o.angle = (270 - v) % 360), t.appendChild(o);
    }
    return 1;
  }, A = function(t, n) {
    this[0] = this.node = t, t.raphael = !0, this.id = e._oid++, t.raphaelid = this.id, this.X = 0, this.Y = 0, this.attrs = {}, this.paper = n, this.matrix = e.matrix(), this._ = {
      transform: [],
      sx: 1,
      sy: 1,
      dx: 0,
      dy: 0,
      deg: 0,
      dirty: 1,
      dirtyT: 1
    }, !n.bottom && (n.bottom = this), this.prev = n.top, n.top && (n.top.next = this), n.top = this, this.next = null;
  }, O = e.el;
  A.prototype = O, O.constructor = A, O.transform = function(t) {
    if (t == null) return this._.transform;
    var r = this.paper._viewBoxShift, i = r ? "s" + [ r.scale, r.scale ] + "-1-1t" + [ r.dx, r.dy ] : d, s;
    r && (s = t = n(t).replace(/\.{3}|\u2026/g, this._.transform || d)), e._extractTransform(this, i + t);
    var o = this.matrix.clone(), u = this.skew, a = this.node, f, l = ~n(this.attrs.fill).indexOf("-"), c = !n(this.attrs.fill).indexOf("url(");
    o.translate(-0.5, -0.5);
    if (c || l || this.type == "image") {
      u.matrix = "1 0 0 1", u.offset = "0 0", f = o.split();
      if (l && f.noRotation || !f.isSimple) {
        a.style.filter = o.toFilter();
        var h = this.getBBox(), v = this.getBBox(1), m = h.x - v.x, g = h.y - v.y;
        a.coordorigin = m * -w + p + g * -w, N(this, 1, 1, m, g, 0);
      } else a.style.filter = d, N(this, f.scalex, f.scaley, f.dx, f.dy, f.rotate);
    } else a.style.filter = d, u.matrix = n(o), u.offset = o.offset();
    s && (this._.transform = s);
    return this;
  }, O.rotate = function(e, t, i) {
    if (this.removed) return this;
    if (e != null) {
      e = n(e).split(l), e.length - 1 && (t = r(e[1]), i = r(e[2])), e = r(e[0]), i == null && (t = i);
      if (t == null || i == null) {
        var s = this.getBBox(1);
        t = s.x + s.width / 2, i = s.y + s.height / 2;
      }
      this._.dirtyT = 1, this.transform(this._.transform.concat([ [ "r", e, t, i ] ]));
      return this;
    }
  }, O.translate = function(e, t) {
    if (this.removed) return this;
    e = n(e).split(l), e.length - 1 && (t = r(e[1])), e = r(e[0]) || 0, t = +t || 0, this._.bbox && (this._.bbox.x += e, this._.bbox.y += t), this.transform(this._.transform.concat([ [ "t", e, t ] ]));
    return this;
  }, O.scale = function(e, t, i, s) {
    if (this.removed) return this;
    e = n(e).split(l), e.length - 1 && (t = r(e[1]), i = r(e[2]), s = r(e[3]), isNaN(i) && (i = null), isNaN(s) && (s = null)), e = r(e[0]), t == null && (t = e), s == null && (i = s);
    if (i == null || s == null) var o = this.getBBox(1);
    i = i == null ? o.x + o.width / 2 : i, s = s == null ? o.y + o.height / 2 : s, this.transform(this._.transform.concat([ [ "s", e, t, i, s ] ])), this._.dirtyT = 1;
    return this;
  }, O.hide = function() {
    !this.removed && (this.node.style.display = "none");
    return this;
  }, O.show = function() {
    !this.removed && (this.node.style.display = d);
    return this;
  }, O._getBBox = function() {
    return this.removed ? {} : {
      x: this.X + (this.bbx || 0) - this.W / 2,
      y: this.Y - this.H,
      width: this.W,
      height: this.H
    };
  }, O.remove = function() {
    if (!this.removed && !!this.node.parentNode) {
      this.paper.__set__ && this.paper.__set__.exclude(this), e.eve.unbind("raphael.*.*." + this.id), e._tear(this, this.paper), this.node.parentNode.removeChild(this.node), this.shape && this.shape.parentNode.removeChild(this.shape);
      for (var t in this) this[t] = typeof this[t] == "function" ? e._removedFactory(t) : null;
      this.removed = !0;
    }
  }, O.attr = function(n, r) {
    if (this.removed) return this;
    if (n == null) {
      var i = {};
      for (var s in this.attrs) this.attrs[t](s) && (i[s] = this.attrs[s]);
      i.gradient && i.fill == "none" && (i.fill = i.gradient) && delete i.gradient, i.transform = this._.transform;
      return i;
    }
    if (r == null && e.is(n, "string")) {
      if (n == f && this.attrs.fill == "none" && this.attrs.gradient) return this.attrs.gradient;
      var o = n.split(l), u = {};
      for (var a = 0, h = o.length; a < h; a++) n = o[a], n in this.attrs ? u[n] = this.attrs[n] : e.is(this.paper.customAttributes[n], "function") ? u[n] = this.paper.customAttributes[n].def : u[n] = e._availableAttrs[n];
      return h - 1 ? u : u[o[0]];
    }
    if (this.attrs && r == null && e.is(n, "array")) {
      u = {};
      for (a = 0, h = n.length; a < h; a++) u[n[a]] = this.attr(n[a]);
      return u;
    }
    var p;
    r != null && (p = {}, p[n] = r), r == null && e.is(n, "object") && (p = n);
    for (var d in p) c("raphael.attr." + d + "." + this.id, this, p[d]);
    if (p) {
      for (d in this.paper.customAttributes) if (this.paper.customAttributes[t](d) && p[t](d) && e.is(this.paper.customAttributes[d], "function")) {
        var v = this.paper.customAttributes[d].apply(this, [].concat(p[d]));
        this.attrs[d] = p[d];
        for (var m in v) v[t](m) && (p[m] = v[m]);
      }
      p.text && this.type == "text" && (this.textpath.string = p.text), k(this, p);
    }
    return this;
  }, O.toFront = function() {
    !this.removed && this.node.parentNode.appendChild(this.node), this.paper && this.paper.top != this && e._tofront(this, this.paper);
    return this;
  }, O.toBack = function() {
    if (this.removed) return this;
    this.node.parentNode.firstChild != this.node && (this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild), e._toback(this, this.paper));
    return this;
  }, O.insertAfter = function(t) {
    if (this.removed) return this;
    t.constructor == e.st.constructor && (t = t[t.length - 1]), t.node.nextSibling ? t.node.parentNode.insertBefore(this.node, t.node.nextSibling) : t.node.parentNode.appendChild(this.node), e._insertafter(this, t, this.paper);
    return this;
  }, O.insertBefore = function(t) {
    if (this.removed) return this;
    t.constructor == e.st.constructor && (t = t[0]), t.node.parentNode.insertBefore(this.node, t.node), e._insertbefore(this, t, this.paper);
    return this;
  }, O.blur = function(t) {
    var n = this.node.runtimeStyle, r = n.filter;
    r = r.replace(g, d), +t !== 0 ? (this.attrs.blur = t, n.filter = r + p + h + ".Blur(pixelradius=" + (+t || 1.5) + ")", n.margin = e.format("-{0}px 0 0 -{0}px", s(+t || 1.5))) : (n.filter = r, n.margin = 0, delete this.attrs.blur);
  }, e._engine.path = function(e, t) {
    var n = M("shape");
    n.style.cssText = b, n.coordsize = w + p + w, n.coordorigin = t.coordorigin;
    var r = new A(n, t), i = {
      fill: "none",
      stroke: "#000"
    };
    e && (i.path = e), r.type = "path", r.path = [], r.Path = d, k(r, i), t.canvas.appendChild(n);
    var s = M("skew");
    s.on = !0, n.appendChild(s), r.skew = s, r.transform(d);
    return r;
  }, e._engine.rect = function(t, n, r, i, s, o) {
    var u = e._rectPath(n, r, i, s, o), a = t.path(u), f = a.attrs;
    a.X = f.x = n, a.Y = f.y = r, a.W = f.width = i, a.H = f.height = s, f.r = o, f.path = u, a.type = "rect";
    return a;
  }, e._engine.ellipse = function(e, t, n, r, i) {
    var s = e.path(), o = s.attrs;
    s.X = t - r, s.Y = n - i, s.W = r * 2, s.H = i * 2, s.type = "ellipse", k(s, {
      cx: t,
      cy: n,
      rx: r,
      ry: i
    });
    return s;
  }, e._engine.circle = function(e, t, n, r) {
    var i = e.path(), s = i.attrs;
    i.X = t - r, i.Y = n - r, i.W = i.H = r * 2, i.type = "circle", k(i, {
      cx: t,
      cy: n,
      r: r
    });
    return i;
  }, e._engine.image = function(t, n, r, i, s, o) {
    var u = e._rectPath(r, i, s, o), a = t.path(u).attr({
      stroke: "none"
    }), l = a.attrs, c = a.node, h = c.getElementsByTagName(f)[0];
    l.src = n, a.X = l.x = r, a.Y = l.y = i, a.W = l.width = s, a.H = l.height = o, l.path = u, a.type = "image", h.parentNode == c && c.removeChild(h), h.rotate = !0, h.src = n, h.type = "tile", a._.fillpos = [ r, i ], a._.fillsize = [ s, o ], c.appendChild(h), N(a, 1, 1, 0, 0, 0);
    return a;
  }, e._engine.text = function(t, r, i, o) {
    var u = M("shape"), a = M("path"), f = M("textpath");
    r = r || 0, i = i || 0, o = o || "", a.v = e.format("m{0},{1}l{2},{1}", s(r * w), s(i * w), s(r * w) + 1), a.textpathok = !0, f.string = n(o), f.on = !0, u.style.cssText = b, u.coordsize = w + p + w, u.coordorigin = "0 0";
    var l = new A(u, t), c = {
      fill: "#000",
      stroke: "none",
      font: e._availableAttrs.font,
      text: o
    };
    l.shape = u, l.path = a, l.textpath = f, l.type = "text", l.attrs.text = n(o), l.attrs.x = r, l.attrs.y = i, l.attrs.w = 1, l.attrs.h = 1, k(l, c), u.appendChild(f), u.appendChild(a), t.canvas.appendChild(u);
    var h = M("skew");
    h.on = !0, u.appendChild(h), l.skew = h, l.transform(d);
    return l;
  }, e._engine.setSize = function(t, n) {
    var r = this.canvas.style;
    this.width = t, this.height = n, t == +t && (t += "px"), n == +n && (n += "px"), r.width = t, r.height = n, r.clip = "rect(0 " + t + " " + n + " 0)", this._viewBox && e._engine.setViewBox.apply(this, this._viewBox);
    return this;
  }, e._engine.setViewBox = function(t, n, r, i, s) {
    e.eve("raphael.setViewBox", this, this._viewBox, [ t, n, r, i, s ]);
    var u = this.width, a = this.height, f = 1 / o(r / u, i / a), l, c;
    s && (l = a / i, c = u / r, r * l < u && (t -= (u - r * l) / 2 / l), i * c < a && (n -= (a - i * c) / 2 / c)), this._viewBox = [ t, n, r, i, !!s ], this._viewBoxShift = {
      dx: -t,
      dy: -n,
      scale: f
    }, this.forEach(function(e) {
      e.transform("...");
    });
    return this;
  };
  var M;
  e._engine.initWin = function(e) {
    var t = e.document;
    t.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
    try {
      !t.namespaces.rvml && t.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"), M = function(e) {
        return t.createElement("<rvml:" + e + ' class="rvml">');
      };
    } catch (n) {
      M = function(e) {
        return t.createElement("<" + e + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
      };
    }
  }, e._engine.initWin(e._g.win), e._engine.create = function() {
    var t = e._getContainer.apply(0, arguments), n = t.container, r = t.height, i, s = t.width, o = t.x, u = t.y;
    if (!n) throw new Error("VML container not found.");
    var a = new e._Paper, f = a.canvas = e._g.doc.createElement("div"), l = f.style;
    o = o || 0, u = u || 0, s = s || 512, r = r || 342, a.width = s, a.height = r, s == +s && (s += "px"), r == +r && (r += "px"), a.coordsize = w * 1e3 + p + w * 1e3, a.coordorigin = "0 0", a.span = e._g.doc.createElement("span"), a.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;", f.appendChild(a.span), l.cssText = e.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", s, r), n == 1 ? (e._g.doc.body.appendChild(f), l.left = o + "px", l.top = u + "px", l.position = "absolute") : n.firstChild ? n.insertBefore(f, n.firstChild) : n.appendChild(f), a.renderfix = function() {};
    return a;
  }, e.prototype.clear = function() {
    e.eve("raphael.clear", this), this.canvas.innerHTML = d, this.span = e._g.doc.createElement("span"), this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;", this.canvas.appendChild(this.span), this.bottom = this.top = null;
  }, e.prototype.remove = function() {
    e.eve("raphael.remove", this), this.canvas.parentNode.removeChild(this.canvas);
    for (var t in this) this[t] = typeof this[t] == "function" ? e._removedFactory(t) : null;
    return !0;
  };
  var _ = e.st;
  for (var D in O) O[t](D) && !_[t](D) && (_[D] = function(e) {
    return function() {
      var t = arguments;
      return this.forEach(function(n) {
        n[e].apply(n, t);
      });
    };
  }(D));
}(window.Raphael);