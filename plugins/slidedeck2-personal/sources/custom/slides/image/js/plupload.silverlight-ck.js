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