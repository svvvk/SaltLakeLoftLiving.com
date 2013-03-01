/*1.5.4*/(function() {
  function l() {
    this.returnValue = !1;
  }
  function c() {
    this.cancelBubble = !0;
  }
  var e = 0, t = [], n = {}, r = {}, i = {
    "<": "lt",
    ">": "gt",
    "&": "amp",
    '"': "quot",
    "'": "#39"
  }, s = /[<>&\"\']/g, o, u = window.setTimeout, a = {}, f;
  (function(e) {
    var t = e.split(/,/), n, i, s;
    for (n = 0; n < t.length; n += 2) {
      s = t[n + 1].split(/ /);
      for (i = 0; i < s.length; i++) r[s[i]] = t[n];
    }
  })("application/msword,doc dot,application/pdf,pdf,application/pgp-signature,pgp,application/postscript,ps ai eps,application/rtf,rtf,application/vnd.ms-excel,xls xlb,application/vnd.ms-powerpoint,ppt pps pot,application/zip,zip,application/x-shockwave-flash,swf swfl,application/vnd.openxmlformats-officedocument.wordprocessingml.document,docx,application/vnd.openxmlformats-officedocument.wordprocessingml.template,dotx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,xlsx,application/vnd.openxmlformats-officedocument.presentationml.presentation,pptx,application/vnd.openxmlformats-officedocument.presentationml.template,potx,application/vnd.openxmlformats-officedocument.presentationml.slideshow,ppsx,application/x-javascript,js,application/json,json,audio/mpeg,mpga mpega mp2 mp3,audio/x-wav,wav,audio/mp4,m4a,image/bmp,bmp,image/gif,gif,image/jpeg,jpeg jpg jpe,image/photoshop,psd,image/png,png,image/svg+xml,svg svgz,image/tiff,tiff tif,text/plain,asc txt text diff log,text/html,htm html xhtml,text/css,css,text/csv,csv,text/rtf,rtf,video/mpeg,mpeg mpg mpe,video/quicktime,qt mov,video/mp4,mp4,video/x-m4v,m4v,video/x-flv,flv,video/x-ms-wmv,wmv,video/avi,avi,video/webm,webm,video/vnd.rn-realvideo,rv,application/vnd.oasis.opendocument.formula-template,otf,application/octet-stream,exe");
  var h = {
    VERSION: "1.5.4",
    STOPPED: 1,
    STARTED: 2,
    QUEUED: 1,
    UPLOADING: 2,
    FAILED: 4,
    DONE: 5,
    GENERIC_ERROR: -100,
    HTTP_ERROR: -200,
    IO_ERROR: -300,
    SECURITY_ERROR: -400,
    INIT_ERROR: -500,
    FILE_SIZE_ERROR: -600,
    FILE_EXTENSION_ERROR: -601,
    IMAGE_FORMAT_ERROR: -700,
    IMAGE_MEMORY_ERROR: -701,
    IMAGE_DIMENSIONS_ERROR: -702,
    mimeTypes: r,
    ua: function() {
      var e = navigator, t = e.userAgent, n = e.vendor, r, i, s;
      r = /WebKit/.test(t);
      s = r && n.indexOf("Apple") !== -1;
      i = window.opera && window.opera.buildNumber;
      return {
        windows: navigator.platform.indexOf("Win") !== -1,
        ie: !r && !i && /MSIE/gi.test(t) && /Explorer/gi.test(e.appName),
        webkit: r,
        gecko: !r && /Gecko/.test(t),
        safari: s,
        opera: !!i
      };
    }(),
    typeOf: function(e) {
      return {}.toString.call(e).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
    },
    extend: function(e) {
      h.each(arguments, function(t, n) {
        n > 0 && h.each(t, function(t, n) {
          e[n] = t;
        });
      });
      return e;
    },
    cleanName: function(e) {
      var t, n;
      n = [ /[\300-\306]/g, "A", /[\340-\346]/g, "a", /\307/g, "C", /\347/g, "c", /[\310-\313]/g, "E", /[\350-\353]/g, "e", /[\314-\317]/g, "I", /[\354-\357]/g, "i", /\321/g, "N", /\361/g, "n", /[\322-\330]/g, "O", /[\362-\370]/g, "o", /[\331-\334]/g, "U", /[\371-\374]/g, "u" ];
      for (t = 0; t < n.length; t += 2) e = e.replace(n[t], n[t + 1]);
      e = e.replace(/\s+/g, "_");
      e = e.replace(/[^a-z0-9_\-\.]+/gi, "");
      return e;
    },
    addRuntime: function(e, n) {
      n.name = e;
      t[e] = n;
      t.push(n);
      return n;
    },
    guid: function() {
      var t = (new Date).getTime().toString(32), n;
      for (n = 0; n < 5; n++) t += Math.floor(Math.random() * 65535).toString(32);
      return (h.guidPrefix || "p") + t + (e++).toString(32);
    },
    buildUrl: function(e, t) {
      var n = "";
      h.each(t, function(e, t) {
        n += (n ? "&" : "") + encodeURIComponent(t) + "=" + encodeURIComponent(e);
      });
      n && (e += (e.indexOf("?") > 0 ? "&" : "?") + n);
      return e;
    },
    each: function(e, t) {
      var n, r, i;
      if (e) {
        n = e.length;
        if (n === o) {
          for (r in e) if (e.hasOwnProperty(r) && t(e[r], r) === !1) return;
        } else for (i = 0; i < n; i++) if (t(e[i], i) === !1) return;
      }
    },
    formatSize: function(e) {
      return e === o || /\D/.test(e) ? h.translate("N/A") : e > 1073741824 ? Math.round(e / 1073741824, 1) + " GB" : e > 1048576 ? Math.round(e / 1048576, 1) + " MB" : e > 1024 ? Math.round(e / 1024, 1) + " KB" : e + " b";
    },
    getPos: function(e, t) {
      function a(e) {
        var t, n, r = 0, i = 0;
        if (e) {
          n = e.getBoundingClientRect();
          t = s.compatMode === "CSS1Compat" ? s.documentElement : s.body;
          r = n.left + t.scrollLeft;
          i = n.top + t.scrollTop;
        }
        return {
          x: r,
          y: i
        };
      }
      var n = 0, r = 0, i, s = document, o, u;
      e = e;
      t = t || s.body;
      if (e && e.getBoundingClientRect && navigator.userAgent.indexOf("MSIE") > 0 && s.documentMode < 8) {
        o = a(e);
        u = a(t);
        return {
          x: o.x - u.x,
          y: o.y - u.y
        };
      }
      i = e;
      while (i && i != t && i.nodeType) {
        n += i.offsetLeft || 0;
        r += i.offsetTop || 0;
        i = i.offsetParent;
      }
      i = e.parentNode;
      while (i && i != t && i.nodeType) {
        n -= i.scrollLeft || 0;
        r -= i.scrollTop || 0;
        i = i.parentNode;
      }
      return {
        x: n,
        y: r
      };
    },
    getSize: function(e) {
      return {
        w: e.offsetWidth || e.clientWidth,
        h: e.offsetHeight || e.clientHeight
      };
    },
    parseSize: function(e) {
      var t;
      if (typeof e == "string") {
        e = /^([0-9]+)([mgk]?)$/.exec(e.toLowerCase().replace(/[^0-9mkg]/g, ""));
        t = e[2];
        e = +e[1];
        t == "g" && (e *= 1073741824);
        t == "m" && (e *= 1048576);
        t == "k" && (e *= 1024);
      }
      return e;
    },
    xmlEncode: function(e) {
      return e ? ("" + e).replace(s, function(e) {
        return i[e] ? "&" + i[e] + ";" : e;
      }) : e;
    },
    toArray: function(e) {
      var t, n = [];
      for (t = 0; t < e.length; t++) n[t] = e[t];
      return n;
    },
    inArray: function(e, t) {
      if (t) {
        if (Array.prototype.indexOf) return Array.prototype.indexOf.call(t, e);
        for (var n = 0, r = t.length; n < r; n++) if (t[n] === e) return n;
      }
      return -1;
    },
    addI18n: function(e) {
      return h.extend(n, e);
    },
    translate: function(e) {
      return n[e] || e;
    },
    isEmptyObj: function(e) {
      if (e === o) return !0;
      for (var t in e) return !1;
      return !0;
    },
    hasClass: function(e, t) {
      var n;
      if (e.className == "") return !1;
      n = new RegExp("(^|\\s+)" + t + "(\\s+|$)");
      return n.test(e.className);
    },
    addClass: function(e, t) {
      h.hasClass(e, t) || (e.className = e.className == "" ? t : e.className.replace(/\s+$/, "") + " " + t);
    },
    removeClass: function(e, t) {
      var n = new RegExp("(^|\\s+)" + t + "(\\s+|$)");
      e.className = e.className.replace(n, function(e, t, n) {
        return t === " " && n === " " ? " " : "";
      });
    },
    getStyle: function(e, t) {
      if (e.currentStyle) return e.currentStyle[t];
      if (window.getComputedStyle) return window.getComputedStyle(e, null)[t];
    },
    addEvent: function(e, t, n) {
      var r, i, s, u;
      u = arguments[3];
      t = t.toLowerCase();
      f === o && (f = "Plupload_" + h.guid());
      if (e.addEventListener) {
        r = n;
        e.addEventListener(t, r, !1);
      } else if (e.attachEvent) {
        r = function() {
          var e = window.event;
          e.target || (e.target = e.srcElement);
          e.preventDefault = l;
          e.stopPropagation = c;
          n(e);
        };
        e.attachEvent("on" + t, r);
      }
      e[f] === o && (e[f] = h.guid());
      a.hasOwnProperty(e[f]) || (a[e[f]] = {});
      i = a[e[f]];
      i.hasOwnProperty(t) || (i[t] = []);
      i[t].push({
        func: r,
        orig: n,
        key: u
      });
    },
    removeEvent: function(e, t) {
      var n, r, i;
      typeof arguments[2] == "function" ? r = arguments[2] : i = arguments[2];
      t = t.toLowerCase();
      if (!(e[f] && a[e[f]] && a[e[f]][t])) return;
      n = a[e[f]][t];
      for (var s = n.length - 1; s >= 0; s--) if (n[s].key === i || n[s].orig === r) {
        e.removeEventListener ? e.removeEventListener(t, n[s].func, !1) : e.detachEvent && e.detachEvent("on" + t, n[s].func);
        n[s].orig = null;
        n[s].func = null;
        n.splice(s, 1);
        if (r !== o) break;
      }
      n.length || delete a[e[f]][t];
      if (h.isEmptyObj(a[e[f]])) {
        delete a[e[f]];
        try {
          delete e[f];
        } catch (u) {
          e[f] = o;
        }
      }
    },
    removeAllEvents: function(e) {
      var t = arguments[1];
      if (e[f] === o || !e[f]) return;
      h.each(a[e[f]], function(n, r) {
        h.removeEvent(e, r, t);
      });
    }
  };
  h.Uploader = function(e) {
    function f() {
      var e, t = 0, n;
      if (this.state == h.STARTED) {
        for (n = 0; n < i.length; n++) if (!e && i[n].status == h.QUEUED) {
          e = i[n];
          e.status = h.UPLOADING;
          this.trigger("BeforeUpload", e) && this.trigger("UploadFile", e);
        } else t++;
        if (t == i.length) {
          this.stop();
          this.trigger("UploadComplete", i);
        }
      }
    }
    function l() {
      var e, t;
      r.reset();
      for (e = 0; e < i.length; e++) {
        t = i[e];
        if (t.size !== o) {
          r.size += t.size;
          r.loaded += t.loaded;
        } else r.size = o;
        t.status == h.DONE ? r.uploaded++ : t.status == h.FAILED ? r.failed++ : r.queued++;
      }
      if (r.size === o) r.percent = i.length > 0 ? Math.ceil(r.uploaded / i.length * 100) : 0; else {
        r.bytesPerSec = Math.ceil(r.loaded / ((+(new Date) - s || 1) / 1e3));
        r.percent = r.size > 0 ? Math.ceil(r.loaded / r.size * 100) : 0;
      }
    }
    var n = {}, r, i = [], s, a = !1;
    r = new h.QueueProgress;
    e = h.extend({
      chunk_size: 0,
      multipart: !0,
      multi_selection: !0,
      file_data_name: "file",
      filters: []
    }, e);
    h.extend(this, {
      state: h.STOPPED,
      runtime: "",
      features: {},
      files: i,
      settings: e,
      total: r,
      id: h.guid(),
      init: function() {
        function v() {
          var e = a[p++], t, r, i;
          if (e) {
            t = e.getFeatures();
            r = n.settings.required_features;
            if (r) {
              r = r.split(",");
              for (i = 0; i < r.length; i++) if (!t[r[i]]) {
                v();
                return;
              }
            }
            e.init(n, function(r) {
              if (r && r.success) {
                n.features = t;
                n.runtime = e.name;
                n.trigger("Init", {
                  runtime: e.name
                });
                n.trigger("PostInit");
                n.refresh();
              } else v();
            });
          } else n.trigger("Error", {
            code: h.INIT_ERROR,
            message: h.translate("Init error.")
          });
        }
        var n = this, r, a, c, p = 0, d;
        typeof e.preinit == "function" ? e.preinit(n) : h.each(e.preinit, function(e, t) {
          n.bind(t, e);
        });
        e.page_url = e.page_url || document.location.pathname.replace(/\/[^\/]+$/g, "/");
        /^(\w+:\/\/|\/)/.test(e.url) || (e.url = e.page_url + e.url);
        e.chunk_size = h.parseSize(e.chunk_size);
        e.max_file_size = h.parseSize(e.max_file_size);
        n.bind("FilesAdded", function(t, r) {
          var s, a, f = 0, l, c = e.filters;
          if (c && c.length) {
            l = [];
            h.each(c, function(e) {
              h.each(e.extensions.split(/,/), function(e) {
                /^\s*\*\s*$/.test(e) ? l.push("\\.*") : l.push("\\." + e.replace(new RegExp("[" + "/^$.*+?|()[]{}\\".replace(/./g, "\\$&") + "]", "g"), "\\$&"));
              });
            });
            l = new RegExp(l.join("|") + "$", "i");
          }
          for (s = 0; s < r.length; s++) {
            a = r[s];
            a.loaded = 0;
            a.percent = 0;
            a.status = h.QUEUED;
            if (l && !l.test(a.name)) {
              t.trigger("Error", {
                code: h.FILE_EXTENSION_ERROR,
                message: h.translate("File extension error."),
                file: a
              });
              continue;
            }
            if (a.size !== o && a.size > e.max_file_size) {
              t.trigger("Error", {
                code: h.FILE_SIZE_ERROR,
                message: h.translate("File size error."),
                file: a
              });
              continue;
            }
            i.push(a);
            f++;
          }
          if (!f) return !1;
          u(function() {
            n.trigger("QueueChanged");
            n.refresh();
          }, 1);
        });
        e.unique_names && n.bind("UploadFile", function(e, t) {
          var n = t.name.match(/\.([^.]+)$/), r = "tmp";
          n && (r = n[1]);
          t.target_name = t.id + "." + r;
        });
        n.bind("UploadProgress", function(e, t) {
          t.percent = t.size > 0 ? Math.ceil(t.loaded / t.size * 100) : 100;
          l();
        });
        n.bind("StateChanged", function(e) {
          if (e.state == h.STARTED) s = +(new Date); else if (e.state == h.STOPPED) for (r = e.files.length - 1; r >= 0; r--) if (e.files[r].status == h.UPLOADING) {
            e.files[r].status = h.QUEUED;
            l();
          }
        });
        n.bind("QueueChanged", l);
        n.bind("Error", function(e, t) {
          if (t.file) {
            t.file.status = h.FAILED;
            l();
            e.state == h.STARTED && u(function() {
              f.call(n);
            }, 1);
          }
        });
        n.bind("FileUploaded", function(e, t) {
          t.status = h.DONE;
          t.loaded = t.size;
          e.trigger("UploadProgress", t);
          u(function() {
            f.call(n);
          }, 1);
        });
        if (e.runtimes) {
          a = [];
          d = e.runtimes.split(/\s?,\s?/);
          for (r = 0; r < d.length; r++) t[d[r]] && a.push(t[d[r]]);
        } else a = t;
        v();
        typeof e.init == "function" ? e.init(n) : h.each(e.init, function(e, t) {
          n.bind(t, e);
        });
      },
      refresh: function() {
        this.trigger("Refresh");
      },
      start: function() {
        if (i.length && this.state != h.STARTED) {
          this.state = h.STARTED;
          this.trigger("StateChanged");
          f.call(this);
        }
      },
      stop: function() {
        if (this.state != h.STOPPED) {
          this.state = h.STOPPED;
          this.trigger("CancelUpload");
          this.trigger("StateChanged");
        }
      },
      disableBrowse: function() {
        a = arguments[0] !== o ? arguments[0] : !0;
        this.trigger("DisableBrowse", a);
      },
      getFile: function(e) {
        var t;
        for (t = i.length - 1; t >= 0; t--) if (i[t].id === e) return i[t];
      },
      removeFile: function(e) {
        var t;
        for (t = i.length - 1; t >= 0; t--) if (i[t].id === e.id) return this.splice(t, 1)[0];
      },
      splice: function(e, t) {
        var n;
        n = i.splice(e === o ? 0 : e, t === o ? i.length : t);
        this.trigger("FilesRemoved", n);
        this.trigger("QueueChanged");
        return n;
      },
      trigger: function(e) {
        var t = n[e.toLowerCase()], r, i;
        if (t) {
          i = Array.prototype.slice.call(arguments);
          i[0] = this;
          for (r = 0; r < t.length; r++) if (t[r].func.apply(t[r].scope, i) === !1) return !1;
        }
        return !0;
      },
      hasEventListener: function(e) {
        return !!n[e.toLowerCase()];
      },
      bind: function(e, t, r) {
        var i;
        e = e.toLowerCase();
        i = n[e] || [];
        i.push({
          func: t,
          scope: r || this
        });
        n[e] = i;
      },
      unbind: function(e) {
        e = e.toLowerCase();
        var t = n[e], r, i = arguments[1];
        if (t) {
          if (i !== o) {
            for (r = t.length - 1; r >= 0; r--) if (t[r].func === i) {
              t.splice(r, 1);
              break;
            }
          } else t = [];
          t.length || delete n[e];
        }
      },
      unbindAll: function() {
        var e = this;
        h.each(n, function(t, n) {
          e.unbind(n);
        });
      },
      destroy: function() {
        this.stop();
        this.trigger("Destroy");
        this.unbindAll();
      }
    });
  };
  h.File = function(e, t, n) {
    var r = this;
    r.id = e;
    r.name = t;
    r.size = n;
    r.loaded = 0;
    r.percent = 0;
    r.status = 0;
  };
  h.Runtime = function() {
    this.getFeatures = function() {};
    this.init = function(e, t) {};
  };
  h.QueueProgress = function() {
    var e = this;
    e.size = 0;
    e.loaded = 0;
    e.uploaded = 0;
    e.failed = 0;
    e.queued = 0;
    e.percent = 0;
    e.bytesPerSec = 0;
    e.reset = function() {
      e.size = e.loaded = e.uploaded = e.failed = e.queued = e.percent = e.bytesPerSec = 0;
    };
  };
  h.runtimes = {};
  window.plupload = h;
})();