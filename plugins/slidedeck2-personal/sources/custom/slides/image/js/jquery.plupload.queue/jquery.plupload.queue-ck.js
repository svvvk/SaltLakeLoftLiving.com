(function(e) {
  function n(e) {
    return plupload.translate(e) || e;
  }
  function r(t, r) {
    r.contents().each(function(t, n) {
      n = e(n);
      n.is(".plupload") || n.remove();
    });
    r.prepend('<div class="plupload_wrapper plupload_scroll"><div id="' + t + '_container" class="plupload_container"><div class="plupload"><div class="plupload_header"><div class="plupload_header_content"><div class="plupload_header_title">' + n("Select files") + '</div><div class="plupload_header_text">' + n("Add files to the upload queue and click the start button.") + '</div></div></div><div class="plupload_content"><div class="plupload_filelist_header"><div class="plupload_file_name">' + n("Filename") + '</div><div class="plupload_file_action">&nbsp;</div><div class="plupload_file_status"><span>' + n("Status") + '</span></div><div class="plupload_file_size">' + n("Size") + '</div><div class="plupload_clearer">&nbsp;</div></div><ul id="' + t + '_filelist" class="plupload_filelist"></ul><div class="plupload_filelist_footer"><div class="plupload_file_name"><div class="plupload_buttons"><a href="#" class="plupload_button plupload_add">' + n("Add files") + '</a><a href="#" class="plupload_button plupload_start">' + n("Start upload") + '</a></div><span class="plupload_upload_status"></span></div><div class="plupload_file_action"></div><div class="plupload_file_status"><span class="plupload_total_status">0%</span></div><div class="plupload_file_size"><span class="plupload_total_file_size">0 b</span></div><div class="plupload_progress"><div class="plupload_progress_container"><div class="plupload_progress_bar"></div></div></div><div class="plupload_clearer">&nbsp;</div></div></div></div></div><input type="hidden" id="' + t + '_count" name="' + t + '_count" value="0" /></div>');
  }
  var t = {};
  e.fn.pluploadQueue = function(i) {
    if (i) {
      this.each(function() {
        function f(t) {
          var n;
          t.status == plupload.DONE && (n = "plupload_done");
          t.status == plupload.FAILED && (n = "plupload_failed");
          t.status == plupload.QUEUED && (n = "plupload_delete");
          t.status == plupload.UPLOADING && (n = "plupload_uploading");
          var r = e("#" + t.id).attr("class", n).find("a").css("display", "block");
          t.hint && r.attr("title", t.hint);
        }
        function l() {
          e("span.plupload_total_status", o).html(s.total.percent + "%");
          e("div.plupload_progress_bar", o).css("width", s.total.percent + "%");
          e("span.plupload_upload_status", o).text(n("Uploaded %d/%d files").replace(/%d\/%d/, s.total.uploaded + "/" + s.files.length));
        }
        function h() {
          var t = e("ul.plupload_filelist", o).html(""), r = 0, i;
          e.each(s.files, function(n, o) {
            i = "";
            if (o.status == plupload.DONE) {
              o.target_name && (i += '<input type="hidden" name="' + u + "_" + r + '_tmpname" value="' + plupload.xmlEncode(o.target_name) + '" />');
              i += '<input type="hidden" name="' + u + "_" + r + '_name" value="' + plupload.xmlEncode(o.name) + '" />';
              i += '<input type="hidden" name="' + u + "_" + r + '_status" value="' + (o.status == plupload.DONE ? "done" : "failed") + '" />';
              r++;
              e("#" + u + "_count").val(r);
            }
            t.append('<li id="' + o.id + '"><div class="plupload_file_name"><span>' + o.name + '</span></div><div class="plupload_file_action"><a href="#"></a></div><div class="plupload_file_status">' + o.percent + '%</div><div class="plupload_file_size">' + plupload.formatSize(o.size) + '</div><div class="plupload_clearer">&nbsp;</div>' + i + "</li>");
            f(o);
            e("#" + o.id + ".plupload_delete a").click(function(t) {
              e("#" + o.id).remove();
              s.removeFile(o);
              t.preventDefault();
            });
          });
          e("span.plupload_total_file_size", o).html(plupload.formatSize(s.total.size));
          s.total.queued === 0 ? e("span.plupload_add_text", o).text(n("Add files.")) : e("span.plupload_add_text", o).text(s.total.queued + " files queued.");
          e("a.plupload_start", o).toggleClass("plupload_disabled", s.files.length == s.total.uploaded + s.total.failed);
          t[0].scrollTop = t[0].scrollHeight;
          l();
          !s.files.length && s.features.dragdrop && s.settings.dragdrop && e("#" + u + "_filelist").append('<li class="plupload_droptext">' + n("Drag files here.") + "</li>");
        }
        var s, o, u;
        o = e(this);
        u = o.attr("id");
        if (!u) {
          u = plupload.guid();
          o.attr("id", u);
        }
        s = new plupload.Uploader(e.extend({
          dragdrop: !0,
          container: u
        }, i));
        t[u] = s;
        s.bind("UploadFile", function(t, n) {
          e("#" + n.id).addClass("plupload_current_file");
        });
        s.bind("Init", function(t, f) {
          r(u, o);
          !i.unique_names && i.rename && e("#" + u + "_filelist div.plupload_file_name span", o).delegate("", "click", function(n) {
            var r = e(n.target), i, s, o, u = "";
            i = t.getFile(r.parents("li")[0].id);
            o = i.name;
            s = /^(.+)(\.[^.]+)$/.exec(o);
            if (s) {
              o = s[1];
              u = s[2];
            }
            r.hide().after('<input type="text" />');
            r.next().val(o).focus().blur(function() {
              r.show().next().remove();
            }).keydown(function(t) {
              var n = e(this);
              if (t.keyCode == 13) {
                t.preventDefault();
                i.name = n.val() + u;
                r.text(i.name);
                n.blur();
              }
            });
          });
          e("a.plupload_add", o).attr("id", u + "_browse");
          t.settings.browse_button = u + "_browse";
          if (t.features.dragdrop && t.settings.dragdrop) {
            t.settings.drop_element = u + "_filelist";
            e("#" + u + "_filelist").append('<li class="plupload_droptext">' + n("Drag files here.") + "</li>");
          }
          e("#" + u + "_container").attr("title", "Using runtime: " + f.runtime);
          e("a.plupload_start", o).click(function(t) {
            e(this).hasClass("plupload_disabled") || s.start();
            t.preventDefault();
          });
          e("a.plupload_stop", o).click(function(e) {
            e.preventDefault();
            s.stop();
          });
          e("a.plupload_start", o).addClass("plupload_disabled");
        });
        s.init();
        s.bind("Error", function(t, r) {
          var i = r.file, s;
          if (i) {
            s = r.message;
            r.details && (s += " (" + r.details + ")");
            r.code == plupload.FILE_SIZE_ERROR && alert(n("Error: File too large: ") + i.name);
            r.code == plupload.FILE_EXTENSION_ERROR && alert(n("Error: Invalid file extension: ") + i.name);
            i.hint = s;
            e("#" + i.id).attr("class", "plupload_failed").find("a").css("display", "block").attr("title", s);
          }
        });
        s.bind("StateChanged", function() {
          if (s.state === plupload.STARTED) {
            e("li.plupload_delete a,div.plupload_buttons", o).hide();
            e("span.plupload_upload_status,div.plupload_progress,a.plupload_stop", o).css("display", "block");
            e("span.plupload_upload_status", o).text("Uploaded " + s.total.uploaded + "/" + s.files.length + " files");
            i.multiple_queues && e("span.plupload_total_status,span.plupload_total_file_size", o).show();
          } else {
            h();
            e("a.plupload_stop,div.plupload_progress", o).hide();
            e("a.plupload_delete", o).css("display", "block");
          }
        });
        s.bind("QueueChanged", h);
        s.bind("FileUploaded", function(e, t) {
          f(t);
        });
        s.bind("UploadProgress", function(t, n) {
          e("#" + n.id + " div.plupload_file_status", o).html(n.percent + "%");
          f(n);
          l();
          if (i.multiple_queues && s.total.uploaded + s.total.failed == s.files.length) {
            e(".plupload_buttons,.plupload_upload_status", o).css("display", "inline");
            e(".plupload_start", o).addClass("plupload_disabled");
            e("span.plupload_total_status,span.plupload_total_file_size", o).hide();
          }
        });
        i.setup && i.setup(s);
      });
      return this;
    }
    return t[e(this[0]).attr("id")];
  };
})(jQuery);