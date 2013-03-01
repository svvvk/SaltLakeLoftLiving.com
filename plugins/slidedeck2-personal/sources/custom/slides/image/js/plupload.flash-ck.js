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