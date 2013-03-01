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