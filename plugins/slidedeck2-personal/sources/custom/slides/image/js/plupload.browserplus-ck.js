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