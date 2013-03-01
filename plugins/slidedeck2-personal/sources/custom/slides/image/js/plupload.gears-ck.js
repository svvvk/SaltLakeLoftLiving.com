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