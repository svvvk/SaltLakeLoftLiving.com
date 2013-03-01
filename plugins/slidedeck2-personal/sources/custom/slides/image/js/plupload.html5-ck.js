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