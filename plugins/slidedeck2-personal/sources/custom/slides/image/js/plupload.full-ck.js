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

(function() {
  if (window.google && google.gears) return;
  var e = null;
  if (typeof GearsFactory != "undefined") e = new GearsFactory; else try {
    e = new ActiveXObject("Gears.Factory");
    e.getBuildInfo().indexOf("ie_mobile") != -1 && e.privateSetGlobalObject(this);
  } catch (t) {
    if (typeof navigator.mimeTypes != "undefined" && navigator.mimeTypes["application/x-googlegears"]) {
      e = document.createElement("object");
      e.style.display = "none";
      e.width = 0;
      e.height = 0;
      e.type = "application/x-googlegears";
      document.documentElement.appendChild(e);
    }
  }
  if (!e) return;
  window.google || (window.google = {});
  google.gears || (google.gears = {
    factory: e
  });
})();

(function(e, t, n, r) {
  function s(e, t, n) {
    var r, i, s, o;
    i = google.gears.factory.create("beta.canvas");
    try {
      i.decode(e);
      t.width || (t.width = i.width);
      t.height || (t.height = i.height);
      o = Math.min(width / i.width, height / i.height);
      if (o < 1 || o === 1 && n === "image/jpeg") {
        i.resize(Math.round(i.width * o), Math.round(i.height * o));
        return t.quality ? i.encode(n, {
          quality: t.quality / 100
        }) : i.encode(n);
      }
    } catch (u) {}
    return e;
  }
  var i = {};
  n.runtimes.Gears = n.addRuntime("gears", {
    getFeatures: function() {
      return {
        dragdrop: !0,
        jpgresize: !0,
        pngresize: !0,
        chunks: !0,
        progress: !0,
        multipart: !0,
        multi_selection: !0
      };
    },
    init: function(r, o) {
      function d(e) {
        var t, s, o = [], u;
        for (s = 0; s < e.length; s++) {
          t = e[s];
          u = n.guid();
          i[u] = t.blob;
          o.push(new n.File(u, t.name, t.blob.length));
        }
        r.trigger("FilesAdded", o);
      }
      var u, l, h = !1;
      if (!e.google || !google.gears) return o({
        success: !1
      });
      try {
        u = google.gears.factory.create("beta.desktop");
      } catch (p) {
        return o({
          success: !1
        });
      }
      r.bind("PostInit", function() {
        var e = r.settings, i = t.getElementById(e.drop_element);
        if (i) {
          n.addEvent(i, "dragover", function(e) {
            u.setDropEffect(e, "copy");
            e.preventDefault();
          }, r.id);
          n.addEvent(i, "drop", function(e) {
            var t = u.getDragData(e, "application/x-gears-files");
            t && d(t.files);
            e.preventDefault();
          }, r.id);
          i = 0;
        }
        n.addEvent(t.getElementById(e.browse_button), "click", function(t) {
          var n = [], r, i, s;
          t.preventDefault();
          if (h) return;
          e : for (r = 0; r < e.filters.length; r++) {
            s = e.filters[r].extensions.split(",");
            for (i = 0; i < s.length; i++) {
              if (s[i] === "*") {
                n = [];
                break e;
              }
              n.push("." + s[i]);
            }
          }
          u.openFiles(d, {
            singleFile: !e.multi_selection,
            filter: n
          });
        }, r.id);
      });
      r.bind("CancelUpload", function() {
        l.abort && l.abort();
      });
      r.bind("UploadFile", function(e, t) {
        function v() {
          function y(r) {
            var i, s = "----pluploadboundary" + n.guid(), o = "--", u = "\r\n", f, h;
            if (a) {
              l.setRequestHeader("Content-Type", "multipart/form-data; boundary=" + s);
              i = google.gears.factory.create("beta.blobbuilder");
              n.each(n.extend(m, e.settings.multipart_params), function(e, t) {
                i.append(o + s + u + 'Content-Disposition: form-data; name="' + t + '"' + u + u);
                i.append(e + u);
              });
              h = n.mimeTypes[t.name.replace(/^.+\.([^.]+)/, "$1").toLowerCase()] || "application/octet-stream";
              i.append(o + s + u + 'Content-Disposition: form-data; name="' + e.settings.file_data_name + '"; filename="' + t.name + '"' + u + "Content-Type: " + h + u + u);
              i.append(r);
              i.append(u + o + s + o + u);
              f = i.getAsBlob();
              p = f.length - r.length;
              r = f;
            }
            l.send(r);
          }
          var s, a = e.settings.multipart, p = 0, m = {
            name: t.target_name || t.name
          }, g = e.settings.url;
          if (t.status == n.DONE || t.status == n.FAILED || e.state == n.STOPPED) return;
          if (d) {
            m.chunk = r;
            m.chunks = o;
          }
          s = Math.min(u, t.size - r * u);
          a || (g = n.buildUrl(e.settings.url, m));
          l = google.gears.factory.create("beta.httprequest");
          l.open("POST", g);
          if (!a) {
            l.setRequestHeader("Content-Disposition", 'attachment; filename="' + t.name + '"');
            l.setRequestHeader("Content-Type", "application/octet-stream");
          }
          n.each(e.settings.headers, function(e, t) {
            l.setRequestHeader(t, e);
          });
          l.upload.onprogress = function(n) {
            t.loaded = h + n.loaded - p;
            e.trigger("UploadProgress", t);
          };
          l.onreadystatechange = function() {
            var i;
            if (l.readyState == 4 && e.state !== n.STOPPED) if (l.status == 200) {
              i = {
                chunk: r,
                chunks: o,
                response: l.responseText,
                status: l.status
              };
              e.trigger("ChunkUploaded", t, i);
              if (i.cancelled) {
                t.status = n.FAILED;
                return;
              }
              h += s;
              if (++r >= o) {
                t.status = n.DONE;
                e.trigger("FileUploaded", t, {
                  response: l.responseText,
                  status: l.status
                });
              } else v();
            } else e.trigger("Error", {
              code: n.HTTP_ERROR,
              message: n.translate("HTTP Error."),
              file: t,
              chunk: r,
              chunks: o,
              status: l.status
            });
          };
          r < o && y(i[t.id].slice(r * u, s));
        }
        var r = 0, o, u, h = 0, p = e.settings.resize, d;
        p && /\.(png|jpg|jpeg)$/i.test(t.name) && (i[t.id] = s(i[t.id], p, /\.png$/i.test(t.name) ? "image/png" : "image/jpeg"));
        t.size = i[t.id].length;
        u = e.settings.chunk_size;
        d = u > 0;
        o = Math.ceil(t.size / u);
        if (!d) {
          u = t.size;
          o = 1;
        }
        v();
      });
      r.bind("DisableBrowse", function(e, t) {
        h = t;
      });
      r.bind("Destroy", function(e) {
        var r, i, s = {
          browseButton: e.settings.browse_button,
          dropElm: e.settings.drop_element
        };
        for (r in s) {
          i = t.getElementById(s[r]);
          i && n.removeAllEvents(i, e.id);
        }
      });
      o({
        success: !0
      });
    }
  });
})(window, document, plupload);

(function(e, t, n, r) {
  function o(e) {
    var t, n = typeof e, i, s, u;
    if (e === r || e === null) return "null";
    if (n === "string") {
      t = "\bb	t\nn\ff\rr\"\"''\\\\";
      return '"' + e.replace(/([\u0080-\uFFFF\x00-\x1f\"])/g, function(e, n) {
        var r = t.indexOf(n);
        if (r + 1) return "\\" + t.charAt(r + 1);
        e = n.charCodeAt().toString(16);
        return "\\u" + "0000".substring(e.length) + e;
      }) + '"';
    }
    if (n == "object") {
      i = e.length !== r;
      t = "";
      if (i) {
        for (s = 0; s < e.length; s++) {
          t && (t += ",");
          t += o(e[s]);
        }
        t = "[" + t + "]";
      } else {
        for (u in e) if (e.hasOwnProperty(u)) {
          t && (t += ",");
          t += o(u) + ":" + o(e[u]);
        }
        t = "{" + t + "}";
      }
      return t;
    }
    return "" + e;
  }
  function u(e) {
    var t = !1, n = null, r = null, i, s, o, u, a, f = 0;
    try {
      try {
        r = new ActiveXObject("AgControl.AgControl");
        r.IsVersionSupported(e) && (t = !0);
        r = null;
      } catch (l) {
        var c = navigator.plugins["Silverlight Plug-In"];
        if (c) {
          i = c.description;
          i === "1.0.30226.2" && (i = "2.0.30226.2");
          s = i.split(".");
          while (s.length > 3) s.pop();
          while (s.length < 4) s.push(0);
          o = e.split(".");
          while (o.length > 4) o.pop();
          do {
            u = parseInt(o[f], 10);
            a = parseInt(s[f], 10);
            f++;
          } while (f < o.length && u === a);
          u <= a && !isNaN(u) && (t = !0);
        }
      }
    } catch (h) {
      t = !1;
    }
    return t;
  }
  var i = {}, s = {};
  n.silverlight = {
    trigger: function(e, t) {
      var r = i[e], s, o;
      if (r) {
        o = n.toArray(arguments).slice(1);
        o[0] = "Silverlight:" + t;
        setTimeout(function() {
          r.trigger.apply(r, o);
        }, 0);
      }
    }
  };
  n.runtimes.Silverlight = n.addRuntime("silverlight", {
    getFeatures: function() {
      return {
        jpgresize: !0,
        pngresize: !0,
        chunks: !0,
        progress: !0,
        multipart: !0,
        multi_selection: !0
      };
    },
    init: function(r, l) {
      function E() {
        return t.getElementById(r.id + "_silverlight").content.Upload;
      }
      var p, v = "", m = r.settings.filters, y, w = t.body;
      if (!u("2.0.31005.0") || e.opera && e.opera.buildNumber) {
        l({
          success: !1
        });
        return;
      }
      s[r.id] = !1;
      i[r.id] = r;
      p = t.createElement("div");
      p.id = r.id + "_silverlight_container";
      n.extend(p.style, {
        position: "absolute",
        top: "0px",
        background: r.settings.shim_bgcolor || "transparent",
        zIndex: 99999,
        width: "100px",
        height: "100px",
        overflow: "hidden",
        opacity: r.settings.shim_bgcolor || t.documentMode > 8 ? "" : .01
      });
      p.className = "plupload silverlight";
      if (r.settings.container) {
        w = t.getElementById(r.settings.container);
        n.getStyle(w, "position") === "static" && (w.style.position = "relative");
      }
      w.appendChild(p);
      for (y = 0; y < m.length; y++) v += (v != "" ? "|" : "") + m[y].title + " | *." + m[y].extensions.replace(/,/g, ";*.");
      p.innerHTML = '<object id="' + r.id + '_silverlight" data="data:application/x-silverlight," type="application/x-silverlight-2" style="outline:none;" width="1024" height="1024"><param name="source" value="' + r.settings.silverlight_xap_url + '"/><param name="background" value="Transparent"/><param name="windowless" value="true"/><param name="enablehtmlaccess" value="true"/><param name="initParams" value="id=' + r.id + ",filter=" + v + ",multiselect=" + r.settings.multi_selection + '"/></object>';
      r.bind("Silverlight:Init", function() {
        var e, u = {};
        if (s[r.id]) return;
        s[r.id] = !0;
        r.bind("Silverlight:StartSelectFiles", function(t) {
          e = [];
        });
        r.bind("Silverlight:SelectFile", function(t, r, i, s) {
          var o;
          o = n.guid();
          u[o] = r;
          u[r] = o;
          e.push(new n.File(o, i, s));
        });
        r.bind("Silverlight:SelectSuccessful", function() {
          e.length && r.trigger("FilesAdded", e);
        });
        r.bind("Silverlight:UploadChunkError", function(e, t, i, s, o) {
          r.trigger("Error", {
            code: n.IO_ERROR,
            message: "IO Error.",
            details: o,
            file: e.getFile(u[t])
          });
        });
        r.bind("Silverlight:UploadFileProgress", function(e, t, r, i) {
          var s = e.getFile(u[t]);
          if (s.status != n.FAILED) {
            s.size = i;
            s.loaded = r;
            e.trigger("UploadProgress", s);
          }
        });
        r.bind("Refresh", function(e) {
          var r, i, s;
          r = t.getElementById(e.settings.browse_button);
          if (r) {
            i = n.getPos(r, t.getElementById(e.settings.container));
            s = n.getSize(r);
            n.extend(t.getElementById(e.id + "_silverlight_container").style, {
              top: i.y + "px",
              left: i.x + "px",
              width: s.w + "px",
              height: s.h + "px"
            });
          }
        });
        r.bind("Silverlight:UploadChunkSuccessful", function(e, t, r, i, s) {
          var o, a = e.getFile(u[t]);
          o = {
            chunk: r,
            chunks: i,
            response: s
          };
          e.trigger("ChunkUploaded", a, o);
          a.status != n.FAILED && e.state !== n.STOPPED && E().UploadNextChunk();
          if (r == i - 1) {
            a.status = n.DONE;
            e.trigger("FileUploaded", a, {
              response: s
            });
          }
        });
        r.bind("Silverlight:UploadSuccessful", function(e, t, r) {
          var i = e.getFile(u[t]);
          i.status = n.DONE;
          e.trigger("FileUploaded", i, {
            response: r
          });
        });
        r.bind("FilesRemoved", function(e, t) {
          var n;
          for (n = 0; n < t.length; n++) E().RemoveFile(u[t[n].id]);
        });
        r.bind("UploadFile", function(e, t) {
          var r = e.settings, i = r.resize || {};
          E().UploadFile(u[t.id], e.settings.url, o({
            name: t.target_name || t.name,
            mime: n.mimeTypes[t.name.replace(/^.+\.([^.]+)/, "$1").toLowerCase()] || "application/octet-stream",
            chunk_size: r.chunk_size,
            image_width: i.width,
            image_height: i.height,
            image_quality: i.quality || 90,
            multipart: !!r.multipart,
            multipart_params: r.multipart_params || {},
            file_data_name: r.file_data_name,
            headers: r.headers
          }));
        });
        r.bind("CancelUpload", function() {
          E().CancelUpload();
        });
        r.bind("Silverlight:MouseEnter", function(e) {
          var i, s;
          i = t.getElementById(r.settings.browse_button);
          s = e.settings.browse_button_hover;
          i && s && n.addClass(i, s);
        });
        r.bind("Silverlight:MouseLeave", function(e) {
          var i, s;
          i = t.getElementById(r.settings.browse_button);
          s = e.settings.browse_button_hover;
          i && s && n.removeClass(i, s);
        });
        r.bind("Silverlight:MouseLeftButtonDown", function(e) {
          var i, s;
          i = t.getElementById(r.settings.browse_button);
          s = e.settings.browse_button_active;
          if (i && s) {
            n.addClass(i, s);
            n.addEvent(t.body, "mouseup", function() {
              n.removeClass(i, s);
            });
          }
        });
        r.bind("Sliverlight:StartSelectFiles", function(e) {
          var i, s;
          i = t.getElementById(r.settings.browse_button);
          s = e.settings.browse_button_active;
          i && s && n.removeClass(i, s);
        });
        r.bind("DisableBrowse", function(e, t) {
          E().DisableBrowse(t);
        });
        r.bind("Destroy", function(e) {
          var r;
          n.removeAllEvents(t.body, e.id);
          delete s[e.id];
          delete i[e.id];
          r = t.getElementById(e.id + "_silverlight_container");
          r && w.removeChild(r);
        });
        l({
          success: !0
        });
      });
    }
  });
})(window, document, plupload);

(function(e, t, n, r) {
  function o() {
    var e;
    try {
      e = navigator.plugins["Shockwave Flash"];
      e = e.description;
    } catch (t) {
      try {
        e = (new ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version");
      } catch (n) {
        e = "0.0";
      }
    }
    e = e.match(/\d+/g);
    return parseFloat(e[0] + "." + e[1]);
  }
  var i = {}, s = {};
  n.flash = {
    trigger: function(e, t, n) {
      setTimeout(function() {
        var r = i[e], s, o;
        r && r.trigger("Flash:" + t, n);
      }, 0);
    }
  };
  n.runtimes.Flash = n.addRuntime("flash", {
    getFeatures: function() {
      return {
        jpgresize: !0,
        pngresize: !0,
        maxWidth: 8091,
        maxHeight: 8091,
        chunks: !0,
        progress: !0,
        multipart: !0,
        multi_selection: !0
      };
    },
    init: function(e, r) {
      function p() {
        return t.getElementById(e.id + "_flash");
      }
      function v() {
        if (l++ > 5e3) {
          r({
            success: !1
          });
          return;
        }
        s[e.id] === !1 && setTimeout(v, 1);
      }
      var u, f, l = 0, h = t.body;
      if (o() < 10) {
        r({
          success: !1
        });
        return;
      }
      s[e.id] = !1;
      i[e.id] = e;
      u = t.getElementById(e.settings.browse_button);
      f = t.createElement("div");
      f.id = e.id + "_flash_container";
      n.extend(f.style, {
        position: "absolute",
        top: "0px",
        background: e.settings.shim_bgcolor || "transparent",
        zIndex: 99999,
        width: "100%",
        height: "100%"
      });
      f.className = "plupload flash";
      if (e.settings.container) {
        h = t.getElementById(e.settings.container);
        n.getStyle(h, "position") === "static" && (h.style.position = "relative");
      }
      h.appendChild(f);
      (function() {
        var r, i;
        r = '<object id="' + e.id + '_flash" type="application/x-shockwave-flash" data="' + e.settings.flash_swf_url + '" ';
        n.ua.ie && (r += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ');
        r += 'width="100%" height="100%" style="outline:0"><param name="movie" value="' + e.settings.flash_swf_url + '" /><param name="flashvars" value="id=' + escape(e.id) + '" /><param name="wmode" value="transparent" /><param name="allowscriptaccess" value="always" /></object>';
        if (n.ua.ie) {
          i = t.createElement("div");
          f.appendChild(i);
          i.outerHTML = r;
          i = null;
        } else f.innerHTML = r;
      })();
      v();
      u = f = null;
      e.bind("Destroy", function(e) {
        var r;
        n.removeAllEvents(t.body, e.id);
        delete s[e.id];
        delete i[e.id];
        r = t.getElementById(e.id + "_flash_container");
        r && h.removeChild(r);
      });
      e.bind("Flash:Init", function() {
        var i = {}, o;
        try {
          p().setFileFilters(e.settings.filters, e.settings.multi_selection);
        } catch (u) {
          r({
            success: !1
          });
          return;
        }
        if (s[e.id]) return;
        s[e.id] = !0;
        e.bind("UploadFile", function(t, r) {
          var s = t.settings, o = e.settings.resize || {};
          p().uploadFile(i[r.id], s.url, {
            name: r.target_name || r.name,
            mime: n.mimeTypes[r.name.replace(/^.+\.([^.]+)/, "$1").toLowerCase()] || "application/octet-stream",
            chunk_size: s.chunk_size,
            width: o.width,
            height: o.height,
            quality: o.quality,
            multipart: s.multipart,
            multipart_params: s.multipart_params || {},
            file_data_name: s.file_data_name,
            format: /\.(jpg|jpeg)$/i.test(r.name) ? "jpg" : "png",
            headers: s.headers,
            urlstream_upload: s.urlstream_upload
          });
        });
        e.bind("CancelUpload", function() {
          p().cancelUpload();
        });
        e.bind("Flash:UploadProcess", function(e, t) {
          var r = e.getFile(i[t.id]);
          if (r.status != n.FAILED) {
            r.loaded = t.loaded;
            r.size = t.size;
            e.trigger("UploadProgress", r);
          }
        });
        e.bind("Flash:UploadChunkComplete", function(e, t) {
          var r, s = e.getFile(i[t.id]);
          r = {
            chunk: t.chunk,
            chunks: t.chunks,
            response: t.text
          };
          e.trigger("ChunkUploaded", s, r);
          s.status !== n.FAILED && e.state !== n.STOPPED && p().uploadNextChunk();
          if (t.chunk == t.chunks - 1) {
            s.status = n.DONE;
            e.trigger("FileUploaded", s, {
              response: t.text
            });
          }
        });
        e.bind("Flash:SelectFiles", function(t, r) {
          var s, o, u = [], a;
          for (o = 0; o < r.length; o++) {
            s = r[o];
            a = n.guid();
            i[a] = s.id;
            i[s.id] = a;
            u.push(new n.File(a, s.name, s.size));
          }
          u.length && e.trigger("FilesAdded", u);
        });
        e.bind("Flash:SecurityError", function(t, r) {
          e.trigger("Error", {
            code: n.SECURITY_ERROR,
            message: n.translate("Security error."),
            details: r.message,
            file: e.getFile(i[r.id])
          });
        });
        e.bind("Flash:GenericError", function(t, r) {
          e.trigger("Error", {
            code: n.GENERIC_ERROR,
            message: n.translate("Generic error."),
            details: r.message,
            file: e.getFile(i[r.id])
          });
        });
        e.bind("Flash:IOError", function(t, r) {
          e.trigger("Error", {
            code: n.IO_ERROR,
            message: n.translate("IO error."),
            details: r.message,
            file: e.getFile(i[r.id])
          });
        });
        e.bind("Flash:ImageError", function(t, r) {
          e.trigger("Error", {
            code: parseInt(r.code, 10),
            message: n.translate("Image error."),
            file: e.getFile(i[r.id])
          });
        });
        e.bind("Flash:StageEvent:rollOver", function(r) {
          var i, s;
          i = t.getElementById(e.settings.browse_button);
          s = r.settings.browse_button_hover;
          i && s && n.addClass(i, s);
        });
        e.bind("Flash:StageEvent:rollOut", function(r) {
          var i, s;
          i = t.getElementById(e.settings.browse_button);
          s = r.settings.browse_button_hover;
          i && s && n.removeClass(i, s);
        });
        e.bind("Flash:StageEvent:mouseDown", function(r) {
          var i, s;
          i = t.getElementById(e.settings.browse_button);
          s = r.settings.browse_button_active;
          if (i && s) {
            n.addClass(i, s);
            n.addEvent(t.body, "mouseup", function() {
              n.removeClass(i, s);
            }, r.id);
          }
        });
        e.bind("Flash:StageEvent:mouseUp", function(r) {
          var i, s;
          i = t.getElementById(e.settings.browse_button);
          s = r.settings.browse_button_active;
          i && s && n.removeClass(i, s);
        });
        e.bind("Flash:ExifData", function(t, n) {
          e.trigger("ExifData", e.getFile(i[n.id]), n.data);
        });
        e.bind("Flash:GpsData", function(t, n) {
          e.trigger("GpsData", e.getFile(i[n.id]), n.data);
        });
        e.bind("QueueChanged", function(t) {
          e.refresh();
        });
        e.bind("FilesRemoved", function(e, t) {
          var n;
          for (n = 0; n < t.length; n++) p().removeFile(i[t[n].id]);
        });
        e.bind("StateChanged", function(t) {
          e.refresh();
        });
        e.bind("Refresh", function(r) {
          var i, s, o;
          p().setFileFilters(e.settings.filters, e.settings.multi_selection);
          i = t.getElementById(r.settings.browse_button);
          if (i) {
            s = n.getPos(i, t.getElementById(r.settings.container));
            o = n.getSize(i);
            n.extend(t.getElementById(r.id + "_flash_container").style, {
              top: s.y + "px",
              left: s.x + "px",
              width: o.w + "px",
              height: o.h + "px"
            });
          }
        });
        e.bind("DisableBrowse", function(e, t) {
          p().disableBrowse(t);
        });
        r({
          success: !0
        });
      });
    }
  });
})(window, document, plupload);

(function(e) {
  e.runtimes.BrowserPlus = e.addRuntime("browserplus", {
    getFeatures: function() {
      return {
        dragdrop: !0,
        jpgresize: !0,
        pngresize: !0,
        chunks: !0,
        progress: !0,
        multipart: !0,
        multi_selection: !0
      };
    },
    init: function(t, n) {
      function u(n) {
        var r, s, o = [], u, f;
        for (s = 0; s < n.length; s++) {
          u = n[s];
          f = e.guid();
          i[f] = u;
          o.push(new e.File(f, u.name, u.size));
        }
        s && t.trigger("FilesAdded", o);
      }
      function f() {
        var f = !1;
        t.bind("PostInit", function() {
          function h(e, t) {
            r.DragAndDrop.AddDropTarget({
              id: e
            }, function(n) {
              r.DragAndDrop.AttachCallbacks({
                id: e,
                hover: function(e) {
                  !e && t && t();
                },
                drop: function(e) {
                  t && t();
                  u(e);
                }
              }, function() {});
            });
          }
          function p() {
            document.getElementById(o).style.top = "-1000px";
          }
          var n, i = s.drop_element, o = t.id + "_droptarget", l = document.getElementById(i), c;
          if (l) if (document.attachEvent && /MSIE/gi.test(navigator.userAgent)) {
            n = document.createElement("div");
            n.setAttribute("id", o);
            e.extend(n.style, {
              position: "absolute",
              top: "-1000px",
              background: "red",
              filter: "alpha(opacity=0)",
              opacity: 0
            });
            document.body.appendChild(n);
            e.addEvent(l, "dragenter", function(t) {
              var n, r;
              n = document.getElementById(i);
              r = e.getPos(n);
              e.extend(document.getElementById(o).style, {
                top: r.y + "px",
                left: r.x + "px",
                width: n.offsetWidth + "px",
                height: n.offsetHeight + "px"
              });
            });
            h(o, p);
          } else h(i);
          e.addEvent(document.getElementById(s.browse_button), "click", function(t) {
            var n = [], i, o, l = s.filters, c, h;
            t.preventDefault();
            if (f) return;
            e : for (i = 0; i < l.length; i++) {
              c = l[i].extensions.split(",");
              for (o = 0; o < c.length; o++) {
                if (c[o] === "*") {
                  n = [];
                  break e;
                }
                h = e.mimeTypes[c[o]];
                h && e.inArray(h, n) === -1 && n.push(e.mimeTypes[c[o]]);
              }
            }
            r.FileBrowse.OpenBrowseDialog({
              mimeTypes: n
            }, function(e) {
              e.success && u(e.value);
            });
          });
          l = n = null;
        });
        t.bind("CancelUpload", function() {
          r.Uploader.cancel({}, function() {});
        });
        t.bind("DisableBrowse", function(e, t) {
          f = t;
        });
        t.bind("UploadFile", function(t, n) {
          function d(i, s) {
            var o;
            if (n.status == e.FAILED) return;
            u.name = n.target_name || n.name;
            if (f) {
              u.chunk = "" + i;
              u.chunks = "" + s;
            }
            o = p.shift();
            r.Uploader.upload({
              url: t.settings.url,
              files: {
                file: o
              },
              cookies: document.cookies,
              postvars: e.extend(u, t.settings.multipart_params),
              progressCallback: function(e) {
                var r, s = 0;
                l[i] = parseInt(e.filePercent * o.size / 100, 10);
                for (r = 0; r < l.length; r++) s += l[r];
                n.loaded = s;
                t.trigger("UploadProgress", n);
              }
            }, function(r) {
              var o, u;
              if (r.success) {
                o = r.value.statusCode;
                f && t.trigger("ChunkUploaded", n, {
                  chunk: i,
                  chunks: s,
                  response: r.value.body,
                  status: o
                });
                if (p.length > 0) d(++i, s); else {
                  n.status = e.DONE;
                  t.trigger("FileUploaded", n, {
                    response: r.value.body,
                    status: o
                  });
                  o >= 400 && t.trigger("Error", {
                    code: e.HTTP_ERROR,
                    message: e.translate("HTTP Error."),
                    file: n,
                    status: o
                  });
                }
              } else t.trigger("Error", {
                code: e.GENERIC_ERROR,
                message: e.translate("Generic Error."),
                file: n,
                details: r.error
              });
            });
          }
          function v(e) {
            n.size = e.size;
            if (f) r.FileAccess.chunk({
              file: e,
              chunkSize: f
            }, function(e) {
              if (e.success) {
                var t = e.value, n = t.length;
                l = Array(n);
                for (var r = 0; r < n; r++) {
                  l[r] = 0;
                  p.push(t[r]);
                }
                d(0, n);
              }
            }); else {
              l = Array(1);
              p.push(e);
              d(0, 1);
            }
          }
          var s = i[n.id], u = {}, f = t.settings.chunk_size, l, p = [];
          o && /\.(png|jpg|jpeg)$/i.test(n.name) ? BrowserPlus.ImageAlter.transform({
            file: s,
            quality: o.quality || 90,
            actions: [ {
              scale: {
                maxwidth: o.width,
                maxheight: o.height
              }
            } ]
          }, function(e) {
            e.success && v(e.value.file);
          }) : v(s);
        });
        n({
          success: !0
        });
      }
      var r = window.BrowserPlus, i = {}, s = t.settings, o = s.resize;
      r ? r.init(function(e) {
        var t = [ {
          service: "Uploader",
          version: "3"
        }, {
          service: "DragAndDrop",
          version: "1"
        }, {
          service: "FileBrowse",
          version: "1"
        }, {
          service: "FileAccess",
          version: "2"
        } ];
        o && t.push({
          service: "ImageAlter",
          version: "4"
        });
        e.success ? r.require({
          services: t
        }, function(e) {
          e.success ? f() : n();
        }) : n();
      }) : n();
    }
  });
})(plupload);

(function(e, t, n, r) {
  function u(t, n) {
    var r;
    if (!("FileReader" in e)) return n(t.getAsDataURL());
    r = new FileReader;
    r.readAsDataURL(t);
    r.onload = function() {
      n(r.result);
    };
  }
  function a(t, n) {
    var r;
    if (!("FileReader" in e)) return n(t.getAsBinary());
    r = new FileReader;
    r.readAsBinaryString(t);
    r.onload = function() {
      n(r.result);
    };
  }
  function f(e, n, r, i) {
    var o, a, f, l, p = this;
    u(s[e.id], function(s) {
      o = t.createElement("canvas");
      o.style.display = "none";
      t.body.appendChild(o);
      a = o.getContext("2d");
      f = new Image;
      f.onerror = f.onabort = function() {
        i({
          success: !1
        });
      };
      f.onload = function() {
        var t, u, d, m, g;
        n.width || (n.width = f.width);
        n.height || (n.height = f.height);
        l = Math.min(n.width / f.width, n.height / f.height);
        if (l < 1 || l === 1 && r === "image/jpeg") {
          t = Math.round(f.width * l);
          u = Math.round(f.height * l);
          o.width = t;
          o.height = u;
          a.drawImage(f, 0, 0, t, u);
          if (r === "image/jpeg") {
            m = new c(atob(s.substring(s.indexOf("base64,") + 7)));
            if (m.headers && m.headers.length) {
              g = new h;
              if (g.init(m.get("exif")[0])) {
                g.setExif("PixelXDimension", t);
                g.setExif("PixelYDimension", u);
                m.set("exif", g.getBinary());
                p.hasEventListener("ExifData") && p.trigger("ExifData", e, g.EXIF());
                p.hasEventListener("GpsData") && p.trigger("GpsData", e, g.GPS());
              }
            }
            if (n.quality) try {
              s = o.toDataURL(r, n.quality / 100);
            } catch (y) {
              s = o.toDataURL(r);
            }
          } else s = o.toDataURL(r);
          s = s.substring(s.indexOf("base64,") + 7);
          s = atob(s);
          if (m && m.headers && m.headers.length) {
            s = m.restore(s);
            m.purge();
          }
          o.parentNode.removeChild(o);
          i({
            success: !0,
            data: s
          });
        } else i({
          success: !1
        });
      };
      f.src = s;
    });
  }
  function l() {
    function n(n, r) {
      var i = e ? 0 : -8 * (r - 1), s = 0, o;
      for (o = 0; o < r; o++) s |= t.charCodeAt(n + o) << Math.abs(i + o * 8);
      return s;
    }
    function i(e, n, r) {
      var r = arguments.length === 3 ? r : t.length - n - 1;
      t = t.substr(0, n) + e + t.substr(r + n);
    }
    function s(t, n, r) {
      var s = "", o = e ? 0 : -8 * (r - 1), u;
      for (u = 0; u < r; u++) s += String.fromCharCode(n >> Math.abs(o + u * 8) & 255);
      i(s, t, r);
    }
    var e = !1, t;
    return {
      II: function(t) {
        if (t === r) return e;
        e = t;
      },
      init: function(n) {
        e = !1;
        t = n;
      },
      SEGMENT: function(e, n, r) {
        switch (arguments.length) {
         case 1:
          return t.substr(e, t.length - e - 1);
         case 2:
          return t.substr(e, n);
         case 3:
          i(r, e, n);
          break;
         default:
          return t;
        }
      },
      BYTE: function(e) {
        return n(e, 1);
      },
      SHORT: function(e) {
        return n(e, 2);
      },
      LONG: function(e, t) {
        if (t === r) return n(e, 4);
        s(e, t, 4);
      },
      SLONG: function(e) {
        var t = n(e, 4);
        return t > 2147483647 ? t - 4294967296 : t;
      },
      STRING: function(e, t) {
        var r = "";
        for (t += e; e < t; e++) r += String.fromCharCode(n(e, 1));
        return r;
      }
    };
  }
  function c(e) {
    var t = {
      65505: {
        app: "EXIF",
        name: "APP1",
        signature: "Exif\0"
      },
      65506: {
        app: "ICC",
        name: "APP2",
        signature: "ICC_PROFILE\0"
      },
      65517: {
        app: "IPTC",
        name: "APP13",
        signature: "Photoshop 3.0\0"
      }
    }, n = [], i, s, o = r, u = 0, a;
    i = new l;
    i.init(e);
    if (i.SHORT(0) !== 65496) return;
    s = 2;
    a = Math.min(1048576, e.length);
    while (s <= a) {
      o = i.SHORT(s);
      if (o >= 65488 && o <= 65495) {
        s += 2;
        continue;
      }
      if (o === 65498 || o === 65497) break;
      u = i.SHORT(s + 2) + 2;
      t[o] && i.STRING(s + 4, t[o].signature.length) === t[o].signature && n.push({
        hex: o,
        app: t[o].app.toUpperCase(),
        name: t[o].name.toUpperCase(),
        start: s,
        length: u,
        segment: i.SEGMENT(s, u)
      });
      s += u;
    }
    i.init(null);
    return {
      headers: n,
      restore: function(e) {
        i.init(e);
        var t = new c(e);
        if (!t.headers) return !1;
        for (var r = t.headers.length; r > 0; r--) {
          var o = t.headers[r - 1];
          i.SEGMENT(o.start, o.length, "");
        }
        t.purge();
        s = i.SHORT(2) == 65504 ? 4 + i.SHORT(4) : 2;
        for (var r = 0, u = n.length; r < u; r++) {
          i.SEGMENT(s, 0, n[r].segment);
          s += n[r].length;
        }
        return i.SEGMENT();
      },
      get: function(e) {
        var t = [];
        for (var r = 0, i = n.length; r < i; r++) n[r].app === e.toUpperCase() && t.push(n[r].segment);
        return t;
      },
      set: function(e, t) {
        var r = [];
        typeof t == "string" ? r.push(t) : r = t;
        for (var i = ii = 0, s = n.length; i < s; i++) {
          if (n[i].app === e.toUpperCase()) {
            n[i].segment = r[ii];
            n[i].length = r[ii].length;
            ii++;
          }
          if (ii >= r.length) break;
        }
      },
      purge: function() {
        n = [];
        i.init(null);
      }
    };
  }
  function h() {
    function u(t, n) {
      var i = e.SHORT(t), u, a, f, l, c, h, p, d, v = [], m = {};
      for (u = 0; u < i; u++) {
        p = h = t + 12 * u + 2;
        f = n[e.SHORT(p)];
        if (f === r) continue;
        l = e.SHORT(p += 2);
        c = e.LONG(p += 2);
        p += 4;
        v = [];
        switch (l) {
         case 1:
         case 7:
          c > 4 && (p = e.LONG(p) + s.tiffHeader);
          for (a = 0; a < c; a++) v[a] = e.BYTE(p + a);
          break;
         case 2:
          c > 4 && (p = e.LONG(p) + s.tiffHeader);
          m[f] = e.STRING(p, c - 1);
          continue;
         case 3:
          c > 2 && (p = e.LONG(p) + s.tiffHeader);
          for (a = 0; a < c; a++) v[a] = e.SHORT(p + a * 2);
          break;
         case 4:
          c > 1 && (p = e.LONG(p) + s.tiffHeader);
          for (a = 0; a < c; a++) v[a] = e.LONG(p + a * 4);
          break;
         case 5:
          p = e.LONG(p) + s.tiffHeader;
          for (a = 0; a < c; a++) v[a] = e.LONG(p + a * 4) / e.LONG(p + a * 4 + 4);
          break;
         case 9:
          p = e.LONG(p) + s.tiffHeader;
          for (a = 0; a < c; a++) v[a] = e.SLONG(p + a * 4);
          break;
         case 10:
          p = e.LONG(p) + s.tiffHeader;
          for (a = 0; a < c; a++) v[a] = e.SLONG(p + a * 4) / e.SLONG(p + a * 4 + 4);
          break;
         default:
          continue;
        }
        d = c == 1 ? v[0] : v;
        o.hasOwnProperty(f) && typeof d != "object" ? m[f] = o[f][d] : m[f] = d;
      }
      return m;
    }
    function a() {
      var n = r, i = s.tiffHeader;
      e.II(e.SHORT(i) == 18761);
      if (e.SHORT(i += 2) !== 42) return !1;
      s.IFD0 = s.tiffHeader + e.LONG(i += 2);
      n = u(s.IFD0, t.tiff);
      s.exifIFD = "ExifIFDPointer" in n ? s.tiffHeader + n.ExifIFDPointer : r;
      s.gpsIFD = "GPSInfoIFDPointer" in n ? s.tiffHeader + n.GPSInfoIFDPointer : r;
      return !0;
    }
    function f(n, r, o) {
      var u, a, f, l = 0;
      if (typeof r == "string") {
        var c = t[n.toLowerCase()];
        for (hex in c) if (c[hex] === r) {
          r = hex;
          break;
        }
      }
      u = s[n.toLowerCase() + "IFD"];
      a = e.SHORT(u);
      for (i = 0; i < a; i++) {
        f = u + 12 * i + 2;
        if (e.SHORT(f) == r) {
          l = f + 8;
          break;
        }
      }
      if (!l) return !1;
      e.LONG(l, o);
      return !0;
    }
    var e, t, s = {}, o;
    e = new l;
    t = {
      tiff: {
        274: "Orientation",
        34665: "ExifIFDPointer",
        34853: "GPSInfoIFDPointer"
      },
      exif: {
        36864: "ExifVersion",
        40961: "ColorSpace",
        40962: "PixelXDimension",
        40963: "PixelYDimension",
        36867: "DateTimeOriginal",
        33434: "ExposureTime",
        33437: "FNumber",
        34855: "ISOSpeedRatings",
        37377: "ShutterSpeedValue",
        37378: "ApertureValue",
        37383: "MeteringMode",
        37384: "LightSource",
        37385: "Flash",
        41986: "ExposureMode",
        41987: "WhiteBalance",
        41990: "SceneCaptureType",
        41988: "DigitalZoomRatio",
        41992: "Contrast",
        41993: "Saturation",
        41994: "Sharpness"
      },
      gps: {
        0: "GPSVersionID",
        1: "GPSLatitudeRef",
        2: "GPSLatitude",
        3: "GPSLongitudeRef",
        4: "GPSLongitude"
      }
    };
    o = {
      ColorSpace: {
        1: "sRGB",
        0: "Uncalibrated"
      },
      MeteringMode: {
        0: "Unknown",
        1: "Average",
        2: "CenterWeightedAverage",
        3: "Spot",
        4: "MultiSpot",
        5: "Pattern",
        6: "Partial",
        255: "Other"
      },
      LightSource: {
        1: "Daylight",
        2: "Fliorescent",
        3: "Tungsten",
        4: "Flash",
        9: "Fine weather",
        10: "Cloudy weather",
        11: "Shade",
        12: "Daylight fluorescent (D 5700 - 7100K)",
        13: "Day white fluorescent (N 4600 -5400K)",
        14: "Cool white fluorescent (W 3900 - 4500K)",
        15: "White fluorescent (WW 3200 - 3700K)",
        17: "Standard light A",
        18: "Standard light B",
        19: "Standard light C",
        20: "D55",
        21: "D65",
        22: "D75",
        23: "D50",
        24: "ISO studio tungsten",
        255: "Other"
      },
      Flash: {
        0: "Flash did not fire.",
        1: "Flash fired.",
        5: "Strobe return light not detected.",
        7: "Strobe return light detected.",
        9: "Flash fired, compulsory flash mode",
        13: "Flash fired, compulsory flash mode, return light not detected",
        15: "Flash fired, compulsory flash mode, return light detected",
        16: "Flash did not fire, compulsory flash mode",
        24: "Flash did not fire, auto mode",
        25: "Flash fired, auto mode",
        29: "Flash fired, auto mode, return light not detected",
        31: "Flash fired, auto mode, return light detected",
        32: "No flash function",
        65: "Flash fired, red-eye reduction mode",
        69: "Flash fired, red-eye reduction mode, return light not detected",
        71: "Flash fired, red-eye reduction mode, return light detected",
        73: "Flash fired, compulsory flash mode, red-eye reduction mode",
        77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
        79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
        89: "Flash fired, auto mode, red-eye reduction mode",
        93: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
        95: "Flash fired, auto mode, return light detected, red-eye reduction mode"
      },
      ExposureMode: {
        0: "Auto exposure",
        1: "Manual exposure",
        2: "Auto bracket"
      },
      WhiteBalance: {
        0: "Auto white balance",
        1: "Manual white balance"
      },
      SceneCaptureType: {
        0: "Standard",
        1: "Landscape",
        2: "Portrait",
        3: "Night scene"
      },
      Contrast: {
        0: "Normal",
        1: "Soft",
        2: "Hard"
      },
      Saturation: {
        0: "Normal",
        1: "Low saturation",
        2: "High saturation"
      },
      Sharpness: {
        0: "Normal",
        1: "Soft",
        2: "Hard"
      },
      GPSLatitudeRef: {
        N: "North latitude",
        S: "South latitude"
      },
      GPSLongitudeRef: {
        E: "East longitude",
        W: "West longitude"
      }
    };
    return {
      init: function(t) {
        s = {
          tiffHeader: 10
        };
        if (t === r || !t.length) return !1;
        e.init(t);
        return e.SHORT(0) === 65505 && e.STRING(4, 5).toUpperCase() === "EXIF\0" ? a() : !1;
      },
      EXIF: function() {
        var e;
        e = u(s.exifIFD, t.exif);
        if (e.ExifVersion && n.typeOf(e.ExifVersion) === "array") {
          for (var r = 0, i = ""; r < e.ExifVersion.length; r++) i += String.fromCharCode(e.ExifVersion[r]);
          e.ExifVersion = i;
        }
        return e;
      },
      GPS: function() {
        var e;
        e = u(s.gpsIFD, t.gps);
        e.GPSVersionID && (e.GPSVersionID = e.GPSVersionID.join("."));
        return e;
      },
      setExif: function(e, t) {
        return e !== "PixelXDimension" && e !== "PixelYDimension" ? !1 : f("exif", e, t);
      },
      getBinary: function() {
        return e.SEGMENT();
      }
    };
  }
  var s = {}, o;
  n.runtimes.Html5 = n.addRuntime("html5", {
    getFeatures: function() {
      var r, i, s, u, a, f;
      i = s = a = f = !1;
      if (e.XMLHttpRequest) {
        r = new XMLHttpRequest;
        s = !!r.upload;
        i = !!r.sendAsBinary || !!r.upload;
      }
      if (i) {
        u = !!(r.sendAsBinary || e.Uint8Array && e.ArrayBuffer);
        a = !(!File || !File.prototype.getAsDataURL && !e.FileReader || !u);
        f = !!File && !!(File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice);
      }
      o = n.ua.safari && n.ua.windows;
      return {
        html5: i,
        dragdrop: function() {
          var e = t.createElement("div");
          return "draggable" in e || "ondragstart" in e && "ondrop" in e;
        }(),
        jpgresize: a,
        pngresize: a,
        multipart: a || !!e.FileReader || !!e.FormData,
        canSendBinary: u,
        cantSendBlobInFormData: !!(n.ua.gecko && e.FormData && e.FileReader && !FileReader.prototype.readAsArrayBuffer),
        progress: s,
        chunks: f,
        multi_selection: !n.ua.safari || !n.ua.windows,
        triggerDialog: n.ua.gecko && e.FormData || n.ua.webkit
      };
    },
    init: function(r, i) {
      function c(e) {
        var t, i, o = [], u, a = {};
        for (i = 0; i < e.length; i++) {
          t = e[i];
          if (a[t.name]) continue;
          a[t.name] = !0;
          u = n.guid();
          s[u] = t;
          o.push(new n.File(u, t.fileName || t.name, t.fileSize || t.size));
        }
        o.length && r.trigger("FilesAdded", o);
      }
      var u, l;
      u = this.getFeatures();
      if (!u.html5) {
        i({
          success: !1
        });
        return;
      }
      r.bind("Init", function(e) {
        var i, s, o = [], u, a, f = e.settings.filters, l, h, d = t.body, v;
        i = t.createElement("div");
        i.id = e.id + "_html5_container";
        n.extend(i.style, {
          position: "absolute",
          background: r.settings.shim_bgcolor || "transparent",
          width: "100px",
          height: "100px",
          overflow: "hidden",
          zIndex: 99999,
          opacity: r.settings.shim_bgcolor ? "" : 0
        });
        i.className = "plupload html5";
        if (r.settings.container) {
          d = t.getElementById(r.settings.container);
          n.getStyle(d, "position") === "static" && (d.style.position = "relative");
        }
        d.appendChild(i);
        e : for (u = 0; u < f.length; u++) {
          l = f[u].extensions.split(/,/);
          for (a = 0; a < l.length; a++) {
            if (l[a] === "*") {
              o = [];
              break e;
            }
            h = n.mimeTypes[l[a]];
            h && n.inArray(h, o) === -1 && o.push(h);
          }
        }
        i.innerHTML = '<input id="' + r.id + '_html5"  style="font-size:999px" type="file" accept="' + o.join(",") + '" ' + (r.settings.multi_selection && r.features.multi_selection ? 'multiple="multiple"' : "") + " />";
        i.scrollTop = 100;
        v = t.getElementById(r.id + "_html5");
        e.features.triggerDialog ? n.extend(v.style, {
          position: "absolute",
          width: "100%",
          height: "100%"
        }) : n.extend(v.style, {
          cssFloat: "right",
          styleFloat: "right"
        });
        v.onchange = function() {
          c(this.files);
          this.value = "";
        };
        s = t.getElementById(e.settings.browse_button);
        if (s) {
          var m = e.settings.browse_button_hover, g = e.settings.browse_button_active, y = e.features.triggerDialog ? s : i;
          if (m) {
            n.addEvent(y, "mouseover", function() {
              n.addClass(s, m);
            }, e.id);
            n.addEvent(y, "mouseout", function() {
              n.removeClass(s, m);
            }, e.id);
          }
          if (g) {
            n.addEvent(y, "mousedown", function() {
              n.addClass(s, g);
            }, e.id);
            n.addEvent(t.body, "mouseup", function() {
              n.removeClass(s, g);
            }, e.id);
          }
          e.features.triggerDialog && n.addEvent(s, "click", function(n) {
            var r = t.getElementById(e.id + "_html5");
            r && !r.disabled && r.click();
            n.preventDefault();
          }, e.id);
        }
      });
      r.bind("PostInit", function() {
        var e = t.getElementById(r.settings.drop_element);
        if (e) {
          if (o) {
            n.addEvent(e, "dragenter", function(i) {
              var s, o, u;
              s = t.getElementById(r.id + "_drop");
              if (!s) {
                s = t.createElement("input");
                s.setAttribute("type", "file");
                s.setAttribute("id", r.id + "_drop");
                s.setAttribute("multiple", "multiple");
                n.addEvent(s, "change", function() {
                  c(this.files);
                  n.removeEvent(s, "change", r.id);
                  s.parentNode.removeChild(s);
                }, r.id);
                e.appendChild(s);
              }
              o = n.getPos(e, t.getElementById(r.settings.container));
              u = n.getSize(e);
              n.getStyle(e, "position") === "static" && n.extend(e.style, {
                position: "relative"
              });
              n.extend(s.style, {
                position: "absolute",
                display: "block",
                top: 0,
                left: 0,
                width: u.w + "px",
                height: u.h + "px",
                opacity: 0
              });
            }, r.id);
            return;
          }
          n.addEvent(e, "dragover", function(e) {
            e.preventDefault();
          }, r.id);
          n.addEvent(e, "drop", function(e) {
            var t = e.dataTransfer;
            t && t.files && c(t.files);
            e.preventDefault();
          }, r.id);
        }
      });
      r.bind("Refresh", function(e) {
        var i, s, o, u, a;
        i = t.getElementById(r.settings.browse_button);
        if (i) {
          s = n.getPos(i, t.getElementById(e.settings.container));
          o = n.getSize(i);
          u = t.getElementById(r.id + "_html5_container");
          n.extend(u.style, {
            top: s.y + "px",
            left: s.x + "px",
            width: o.w + "px",
            height: o.h + "px"
          });
          if (r.features.triggerDialog) {
            n.getStyle(i, "position") === "static" && n.extend(i.style, {
              position: "relative"
            });
            a = parseInt(n.getStyle(i, "z-index"), 10);
            isNaN(a) && (a = 0);
            n.extend(i.style, {
              zIndex: a
            });
            n.extend(u.style, {
              zIndex: a - 1
            });
          }
        }
      });
      r.bind("DisableBrowse", function(e, n) {
        var r = t.getElementById(e.id + "_html5");
        r && (r.disabled = n);
      });
      r.bind("CancelUpload", function() {
        l && l.abort && l.abort();
      });
      r.bind("UploadFile", function(t, r) {
        function h(e, t, n) {
          var r;
          if (!File.prototype.slice) return (r = File.prototype.webkitSlice || File.prototype.mozSlice) ? r.call(e, t, n) : null;
          try {
            e.slice();
            return e.slice(t, n);
          } catch (i) {
            return e.slice(t, n - t);
          }
        }
        function p(s) {
          function c() {
            function S(i) {
              var s = 0, f = "----pluploadboundary" + n.guid(), h, d = "--", v = "\r\n", S = "";
              l = new XMLHttpRequest;
              l.upload && (l.upload.onprogress = function(e) {
                r.loaded = Math.min(r.size, a + e.loaded - s);
                t.trigger("UploadProgress", r);
              });
              l.onreadystatechange = function() {
                var e, s;
                if (l.readyState == 4 && t.state !== n.STOPPED) {
                  try {
                    e = l.status;
                  } catch (u) {
                    e = 0;
                  }
                  if (e >= 400) t.trigger("Error", {
                    code: n.HTTP_ERROR,
                    message: n.translate("HTTP Error."),
                    file: r,
                    status: e
                  }); else {
                    if (m) {
                      s = {
                        chunk: o,
                        chunks: m,
                        response: l.responseText,
                        status: e
                      };
                      t.trigger("ChunkUploaded", r, s);
                      a += b;
                      if (s.cancelled) {
                        r.status = n.FAILED;
                        return;
                      }
                      r.loaded = Math.min(r.size, (o + 1) * y);
                    } else r.loaded = r.size;
                    t.trigger("UploadProgress", r);
                    i = p = h = S = null;
                    if (!m || ++o >= m) {
                      r.status = n.DONE;
                      t.trigger("FileUploaded", r, {
                        response: l.responseText,
                        status: e
                      });
                    } else c();
                  }
                }
              };
              if (t.settings.multipart && u.multipart) {
                g.name = r.target_name || r.name;
                l.open("post", E, !0);
                n.each(t.settings.headers, function(e, t) {
                  l.setRequestHeader(t, e);
                });
                if (typeof i != "string" && !!e.FormData) {
                  h = new FormData;
                  n.each(n.extend(g, t.settings.multipart_params), function(e, t) {
                    h.append(t, e);
                  });
                  h.append(t.settings.file_data_name, i);
                  l.send(h);
                  return;
                }
                if (typeof i == "string") {
                  l.setRequestHeader("Content-Type", "multipart/form-data; boundary=" + f);
                  n.each(n.extend(g, t.settings.multipart_params), function(e, t) {
                    S += d + f + v + 'Content-Disposition: form-data; name="' + t + '"' + v + v;
                    S += unescape(encodeURIComponent(e)) + v;
                  });
                  w = n.mimeTypes[r.name.replace(/^.+\.([^.]+)/, "$1").toLowerCase()] || "application/octet-stream";
                  S += d + f + v + 'Content-Disposition: form-data; name="' + t.settings.file_data_name + '"; filename="' + unescape(encodeURIComponent(r.name)) + '"' + v + "Content-Type: " + w + v + v + i + v + d + f + d + v;
                  s = S.length - i.length;
                  i = S;
                  if (l.sendAsBinary) l.sendAsBinary(i); else if (u.canSendBinary) {
                    var x = new Uint8Array(i.length);
                    for (var T = 0; T < i.length; T++) x[T] = i.charCodeAt(T) & 255;
                    l.send(x.buffer);
                  }
                  return;
                }
              }
              E = n.buildUrl(t.settings.url, n.extend(g, t.settings.multipart_params));
              l.open("post", E, !0);
              l.setRequestHeader("Content-Type", "application/octet-stream");
              n.each(t.settings.headers, function(e, t) {
                l.setRequestHeader(t, e);
              });
              l.send(i);
            }
            var p, d, m, g, y, b, w, E = t.settings.url;
            if (r.status == n.DONE || r.status == n.FAILED || t.state == n.STOPPED) return;
            g = {
              name: r.target_name || r.name
            };
            if (i.chunk_size && r.size > i.chunk_size && (u.chunks || typeof s == "string")) {
              y = i.chunk_size;
              m = Math.ceil(r.size / y);
              b = Math.min(y, r.size - o * y);
              typeof s == "string" ? p = s.substring(o * y, o * y + b) : p = h(s, o * y, o * y + b);
              g.chunk = o;
              g.chunks = m;
            } else {
              b = r.size;
              p = s;
            }
            if (t.settings.multipart && u.multipart && typeof p != "string" && f && u.cantSendBlobInFormData && u.chunks && t.settings.chunk_size) {
              f.onload = function() {
                S(f.result);
              };
              f.readAsBinaryString(p);
            } else S(p);
          }
          var o = 0, a = 0, f = "FileReader" in e ? new FileReader : null;
          c();
        }
        var i = t.settings, o, c;
        o = s[r.id];
        u.jpgresize && t.settings.resize && /\.(png|jpg|jpeg)$/i.test(r.name) ? f.call(t, r, t.settings.resize, /\.png$/i.test(r.name) ? "image/png" : "image/jpeg", function(e) {
          if (e.success) {
            r.size = e.data.length;
            p(e.data);
          } else u.chunks ? p(o) : a(o, p);
        }) : !u.chunks && u.jpgresize ? a(o, p) : p(o);
      });
      r.bind("Destroy", function(e) {
        var r, i, s = t.body, o = {
          inputContainer: e.id + "_html5_container",
          inputFile: e.id + "_html5",
          browseButton: e.settings.browse_button,
          dropElm: e.settings.drop_element
        };
        for (r in o) {
          i = t.getElementById(o[r]);
          i && n.removeAllEvents(i, e.id);
        }
        n.removeAllEvents(t.body, e.id);
        e.settings.container && (s = t.getElementById(e.settings.container));
        s.removeChild(t.getElementById(o.inputContainer));
      });
      i({
        success: !0
      });
    }
  });
})(window, document, plupload);

(function(e, t, n, r) {
  function i(e) {
    return t.getElementById(e);
  }
  n.runtimes.Html4 = n.addRuntime("html4", {
    getFeatures: function() {
      return {
        multipart: !0,
        triggerDialog: n.ua.gecko && e.FormData || n.ua.webkit
      };
    },
    init: function(r, s) {
      r.bind("Init", function(s) {
        function T() {
          var e, u, l, c;
          p = n.guid();
          v.push(p);
          e = t.createElement("form");
          e.setAttribute("id", "form_" + p);
          e.setAttribute("method", "post");
          e.setAttribute("enctype", "multipart/form-data");
          e.setAttribute("encoding", "multipart/form-data");
          e.setAttribute("target", s.id + "_iframe");
          e.style.position = "absolute";
          u = t.createElement("input");
          u.setAttribute("id", "input_" + p);
          u.setAttribute("type", "file");
          u.setAttribute("accept", g);
          u.setAttribute("size", 1);
          c = i(s.settings.browse_button);
          s.features.triggerDialog && c && n.addEvent(i(s.settings.browse_button), "click", function(e) {
            u.disabled || u.click();
            e.preventDefault();
          }, s.id);
          n.extend(u.style, {
            width: "100%",
            height: "100%",
            opacity: 0,
            fontSize: "99px",
            cursor: "pointer"
          });
          n.extend(e.style, {
            overflow: "hidden"
          });
          l = s.settings.shim_bgcolor;
          l && (e.style.background = l);
          m && n.extend(u.style, {
            filter: "alpha(opacity=0)"
          });
          n.addEvent(u, "change", function(t) {
            var o = t.target, a, l = [], h;
            if (o.value) {
              i("form_" + p).style.top = "-1048575px";
              a = o.value.replace(/\\/g, "/");
              a = a.substring(a.length, a.lastIndexOf("/") + 1);
              l.push(new n.File(p, a));
              s.features.triggerDialog ? n.removeEvent(c, "click", s.id) : n.removeAllEvents(e, s.id);
              n.removeEvent(u, "change", s.id);
              T();
              l.length && r.trigger("FilesAdded", l);
            }
          }, s.id);
          e.appendChild(u);
          o.appendChild(e);
          s.refresh();
        }
        function N() {
          var r = t.createElement("div");
          r.innerHTML = '<iframe id="' + s.id + '_iframe" name="' + s.id + '_iframe" src="' + l + ':&quot;&quot;" style="display:none"></iframe>';
          u = r.firstChild;
          o.appendChild(u);
          n.addEvent(u, "load", function(t) {
            var r = t.target, i, o;
            if (!c) return;
            try {
              i = r.contentWindow.document || r.contentDocument || e.frames[r.id].document;
            } catch (u) {
              s.trigger("Error", {
                code: n.SECURITY_ERROR,
                message: n.translate("Security error."),
                file: c
              });
              return;
            }
            o = i.body.innerHTML;
            if (o) {
              c.status = n.DONE;
              c.loaded = 1025;
              c.percent = 100;
              s.trigger("UploadProgress", c);
              s.trigger("FileUploaded", c, {
                response: o
              });
            }
          }, s.id);
        }
        var o = t.body, u, l = "javascript", c, h, p, v = [], m = /MSIE/.test(navigator.userAgent), g = [], y = s.settings.filters, w, E, S, x;
        e : for (w = 0; w < y.length; w++) {
          E = y[w].extensions.split(/,/);
          for (x = 0; x < E.length; x++) {
            if (E[x] === "*") {
              g = [];
              break e;
            }
            S = n.mimeTypes[E[x]];
            S && n.inArray(S, g) === -1 && g.push(S);
          }
        }
        g = g.join(",");
        if (s.settings.container) {
          o = i(s.settings.container);
          n.getStyle(o, "position") === "static" && (o.style.position = "relative");
        }
        s.bind("UploadFile", function(e, r) {
          var s, o;
          if (r.status == n.DONE || r.status == n.FAILED || e.state == n.STOPPED) return;
          s = i("form_" + r.id);
          o = i("input_" + r.id);
          o.setAttribute("name", e.settings.file_data_name);
          s.setAttribute("action", e.settings.url);
          n.each(n.extend({
            name: r.target_name || r.name
          }, e.settings.multipart_params), function(e, r) {
            var i = t.createElement("input");
            n.extend(i, {
              type: "hidden",
              name: r,
              value: e
            });
            s.insertBefore(i, s.firstChild);
          });
          c = r;
          i("form_" + p).style.top = "-1048575px";
          s.submit();
        });
        s.bind("FileUploaded", function(e) {
          e.refresh();
        });
        s.bind("StateChanged", function(t) {
          t.state == n.STARTED ? N() : t.state == n.STOPPED && e.setTimeout(function() {
            n.removeEvent(u, "load", t.id);
            u.parentNode && u.parentNode.removeChild(u);
          }, 0);
          n.each(t.files, function(e, t) {
            if (e.status === n.DONE || e.status === n.FAILED) {
              var r = i("form_" + e.id);
              r && r.parentNode.removeChild(r);
            }
          });
        });
        s.bind("Refresh", function(e) {
          var r, s, o, u, f, l, c, h, d;
          r = i(e.settings.browse_button);
          if (r) {
            f = n.getPos(r, i(e.settings.container));
            l = n.getSize(r);
            c = i("form_" + p);
            h = i("input_" + p);
            n.extend(c.style, {
              top: f.y + "px",
              left: f.x + "px",
              width: l.w + "px",
              height: l.h + "px"
            });
            if (e.features.triggerDialog) {
              n.getStyle(r, "position") === "static" && n.extend(r.style, {
                position: "relative"
              });
              d = parseInt(r.style.zIndex, 10);
              isNaN(d) && (d = 0);
              n.extend(r.style, {
                zIndex: d
              });
              n.extend(c.style, {
                zIndex: d - 1
              });
            }
            o = e.settings.browse_button_hover;
            u = e.settings.browse_button_active;
            s = e.features.triggerDialog ? r : c;
            if (o) {
              n.addEvent(s, "mouseover", function() {
                n.addClass(r, o);
              }, e.id);
              n.addEvent(s, "mouseout", function() {
                n.removeClass(r, o);
              }, e.id);
            }
            if (u) {
              n.addEvent(s, "mousedown", function() {
                n.addClass(r, u);
              }, e.id);
              n.addEvent(t.body, "mouseup", function() {
                n.removeClass(r, u);
              }, e.id);
            }
          }
        });
        r.bind("FilesRemoved", function(e, t) {
          var n, r;
          for (n = 0; n < t.length; n++) {
            r = i("form_" + t[n].id);
            r && r.parentNode.removeChild(r);
          }
        });
        r.bind("DisableBrowse", function(e, n) {
          var r = t.getElementById("input_" + p);
          r && (r.disabled = n);
        });
        r.bind("Destroy", function(e) {
          var r, s, u, f = {
            inputContainer: "form_" + p,
            inputFile: "input_" + p,
            browseButton: e.settings.browse_button
          };
          for (r in f) {
            s = i(f[r]);
            s && n.removeAllEvents(s, e.id);
          }
          n.removeAllEvents(t.body, e.id);
          n.each(v, function(e, t) {
            u = i("form_" + e);
            u && o.removeChild(u);
          });
        });
        T();
      });
      s({
        success: !0
      });
    }
  });
})(window, document, plupload);