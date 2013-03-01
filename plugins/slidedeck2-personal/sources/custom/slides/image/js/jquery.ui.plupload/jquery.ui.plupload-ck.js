(function(e, t, n, r, i) {
  function o(e) {
    return n.translate(e) || e;
  }
  function u(e) {
    e.html('<div class="plupload_wrapper"><div class="ui-widget-content plupload_container"><div class="plupload"><div class="ui-state-default ui-widget-header plupload_header"><div class="plupload_header_content"><div class="plupload_header_title">' + o("Select files") + '</div><div class="plupload_header_text">' + o("Add files to the upload queue and click the start button.") + '</div></div></div><div class="plupload_content"><table class="plupload_filelist"><tr class="ui-widget-header plupload_filelist_header"><td class="plupload_cell plupload_file_name">' + o("Filename") + '</td><td class="plupload_cell plupload_file_status">' + o("Status") + '</td><td class="plupload_cell plupload_file_size">' + o("Size") + '</td><td class="plupload_cell plupload_file_action">&nbsp;</td></tr></table><div class="plupload_scroll"><table class="plupload_filelist_content"></table></div><table class="plupload_filelist"><tr class="ui-widget-header ui-widget-content plupload_filelist_footer"><td class="plupload_cell plupload_file_name"><div class="plupload_buttons"><!-- Visible --><a class="plupload_button plupload_add">' + o("Add Files") + '</a>&nbsp;<a class="plupload_button plupload_start">' + o("Start Upload") + '</a>&nbsp;<a class="plupload_button plupload_stop plupload_hidden">' + o("Stop Upload") + '</a>&nbsp;</div><div class="plupload_started plupload_hidden"><!-- Hidden --><div class="plupload_progress plupload_right"><div class="plupload_progress_container"></div></div><div class="plupload_cell plupload_upload_status"></div><div class="plupload_clearer">&nbsp;</div></div></td><td class="plupload_file_status"><span class="plupload_total_status">0%</span></td><td class="plupload_file_size"><span class="plupload_total_file_size">0 kb</span></td><td class="plupload_file_action"></td></tr></table></div></div></div><input class="plupload_count" value="0" type="hidden"></div>');
  }
  var s = {};
  r.widget("ui.plupload", {
    contents_bak: "",
    runtime: null,
    options: {
      browse_button_hover: "ui-state-hover",
      browse_button_active: "ui-state-active",
      dragdrop: !0,
      multiple_queues: !0,
      buttons: {
        browse: !0,
        start: !0,
        stop: !0
      },
      autostart: !1,
      sortable: !1,
      rename: !1,
      max_file_count: 0
    },
    FILE_COUNT_ERROR: -9001,
    _create: function() {
      var e = this, t, i;
      t = this.element.attr("id");
      if (!t) {
        t = n.guid();
        this.element.attr("id", t);
      }
      this.id = t;
      this.contents_bak = this.element.html();
      u(this.element);
      this.container = r(".plupload_container", this.element).attr("id", t + "_container");
      this.filelist = r(".plupload_filelist_content", this.container).attr({
        id: t + "_filelist",
        unselectable: "on"
      });
      this.browse_button = r(".plupload_add", this.container).attr("id", t + "_browse");
      this.start_button = r(".plupload_start", this.container).attr("id", t + "_start");
      this.stop_button = r(".plupload_stop", this.container).attr("id", t + "_stop");
      if (r.ui.button) {
        this.browse_button.button({
          icons: {
            primary: "ui-icon-circle-plus"
          }
        });
        this.start_button.button({
          icons: {
            primary: "ui-icon-circle-arrow-e"
          },
          disabled: !0
        });
        this.stop_button.button({
          icons: {
            primary: "ui-icon-circle-close"
          }
        });
      }
      this.progressbar = r(".plupload_progress_container", this.container);
      r.ui.progressbar && this.progressbar.progressbar();
      this.counter = r(".plupload_count", this.element).attr({
        id: t + "_count",
        name: t + "_count"
      });
      i = this.uploader = s[t] = new n.Uploader(r.extend({
        container: t,
        browse_button: t + "_browse"
      }, this.options));
      i.bind("Error", function(t, r) {
        r.code === n.INIT_ERROR && e.destroy();
      });
      i.bind("Init", function(t, n) {
        if (!e.options.buttons.browse) {
          e.browse_button.button("disable").hide();
          t.disableBrowse(!0);
        }
        e.options.buttons.start || e.start_button.button("disable").hide();
        e.options.buttons.stop || e.stop_button.button("disable").hide();
        !e.options.unique_names && e.options.rename && e._enableRenaming();
        i.features.dragdrop && e.options.dragdrop && e._enableDragAndDrop();
        e.container.attr("title", o("Using runtime: ") + (e.runtime = n.runtime));
        e.start_button.click(function(t) {
          r(this).button("option", "disabled") || e.start();
          t.preventDefault();
        });
        e.stop_button.click(function(t) {
          e.stop();
          t.preventDefault();
        });
      });
      e.options.max_file_count && i.bind("FilesAdded", function(t, n) {
        var r = [], i = n.length, s = t.files.length + i - e.options.max_file_count;
        if (s > 0) {
          r = n.splice(i - s, s);
          t.trigger("Error", {
            code: e.FILE_COUNT_ERROR,
            message: o("File count error."),
            file: r
          });
        }
      });
      i.init();
      i.bind("FilesAdded", function(t, n) {
        e._trigger("selected", null, {
          up: t,
          files: n
        });
        e.options.autostart && setTimeout(function() {
          e.start();
        }, 10);
      });
      i.bind("FilesRemoved", function(t, n) {
        e._trigger("removed", null, {
          up: t,
          files: n
        });
      });
      i.bind("QueueChanged", function() {
        e._updateFileList();
      });
      i.bind("StateChanged", function() {
        e._handleState();
      });
      i.bind("UploadFile", function(t, n) {
        e._handleFileStatus(n);
      });
      i.bind("FileUploaded", function(t, n) {
        e._handleFileStatus(n);
        e._trigger("uploaded", null, {
          up: t,
          file: n
        });
      });
      i.bind("UploadProgress", function(t, i) {
        r("#" + i.id).find(".plupload_file_status").html(i.percent + "%").end().find(".plupload_file_size").html(n.formatSize(i.size));
        e._handleFileStatus(i);
        e._updateTotalProgress();
        e._trigger("progress", null, {
          up: t,
          file: i
        });
      });
      i.bind("UploadComplete", function(t, n) {
        e._trigger("complete", null, {
          up: t,
          files: n
        });
      });
      i.bind("Error", function(t, r) {
        var i = r.file, s, u;
        if (i) {
          s = "<strong>" + r.message + "</strong>";
          u = r.details;
          if (u) s += " <br /><i>" + r.details + "</i>"; else {
            switch (r.code) {
             case n.FILE_EXTENSION_ERROR:
              u = o("File: %s").replace("%s", i.name);
              break;
             case n.FILE_SIZE_ERROR:
              u = o("File: %f, size: %s, max file size: %m").replace(/%([fsm])/g, function(t, r) {
                switch (r) {
                 case "f":
                  return i.name;
                 case "s":
                  return i.size;
                 case "m":
                  return n.parseSize(e.options.max_file_size);
                }
              });
              break;
             case e.FILE_COUNT_ERROR:
              u = o("Upload element accepts only %d file(s) at a time. Extra files were stripped.").replace("%d", e.options.max_file_count);
              break;
             case n.IMAGE_FORMAT_ERROR:
              u = n.translate("Image format either wrong or not supported.");
              break;
             case n.IMAGE_MEMORY_ERROR:
              u = n.translate("Runtime ran out of available memory.");
              break;
             case n.IMAGE_DIMENSIONS_ERROR:
              u = n.translate("Resoultion out of boundaries! <b>%s</b> runtime supports images only up to %wx%hpx.").replace(/%([swh])/g, function(e, n) {
                switch (n) {
                 case "s":
                  return t.runtime;
                 case "w":
                  return t.features.maxWidth;
                 case "h":
                  return t.features.maxHeight;
                }
              });
              break;
             case n.HTTP_ERROR:
              u = o("Upload URL might be wrong or doesn't exist");
            }
            s += " <br /><i>" + u + "</i>";
          }
          e.notify("error", s);
          e._trigger("error", null, {
            up: t,
            file: i,
            error: s
          });
        }
      });
    },
    _setOption: function(e, t) {
      var n = this;
      if (e == "buttons" && typeof t == "object") {
        t = r.extend(n.options.buttons, t);
        if (!t.browse) {
          n.browse_button.button("disable").hide();
          up.disableBrowse(!0);
        } else {
          n.browse_button.button("enable").show();
          up.disableBrowse(!1);
        }
        t.start ? n.start_button.button("enable").show() : n.start_button.button("disable").hide();
        t.stop ? n.start_button.button("enable").show() : n.stop_button.button("disable").hide();
      }
      n.uploader.settings[e] = t;
    },
    start: function() {
      this.uploader.start();
      this._trigger("start", null);
    },
    stop: function() {
      this.uploader.stop();
      this._trigger("stop", null);
    },
    getFile: function(e) {
      var t;
      typeof e == "number" ? t = this.uploader.files[e] : t = this.uploader.getFile(e);
      return t;
    },
    removeFile: function(e) {
      var t = this.getFile(e);
      t && this.uploader.removeFile(t);
    },
    clearQueue: function() {
      this.uploader.splice();
    },
    getUploader: function() {
      return this.uploader;
    },
    refresh: function() {
      this.uploader.refresh();
    },
    _handleState: function() {
      var e = this, t = this.uploader;
      if (t.state === n.STARTED) {
        r(e.start_button).button("disable");
        r([]).add(e.stop_button).add(".plupload_started").removeClass("plupload_hidden");
        r(".plupload_upload_status", e.element).text(o("Uploaded %d/%d files").replace("%d/%d", t.total.uploaded + "/" + t.files.length));
        r(".plupload_header_content", e.element).addClass("plupload_header_content_bw");
      } else {
        r([]).add(e.stop_button).add(".plupload_started").addClass("plupload_hidden");
        if (e.options.multiple_queues) {
          r(e.start_button).button("enable");
          r(".plupload_header_content", e.element).removeClass("plupload_header_content_bw");
        }
        e._updateFileList();
      }
    },
    _handleFileStatus: function(e) {
      var t, i;
      if (!r("#" + e.id).length) return;
      switch (e.status) {
       case n.DONE:
        t = "plupload_done";
        i = "ui-icon ui-icon-circle-check";
        break;
       case n.FAILED:
        t = "ui-state-error plupload_failed";
        i = "ui-icon ui-icon-alert";
        break;
       case n.QUEUED:
        t = "plupload_delete";
        i = "ui-icon ui-icon-circle-minus";
        break;
       case n.UPLOADING:
        t = "ui-state-highlight plupload_uploading";
        i = "ui-icon ui-icon-circle-arrow-w";
        var s = r(".plupload_scroll", this.container), o = s.scrollTop(), u = s.height(), a = r("#" + e.id).position().top + r("#" + e.id).height();
        u < a && s.scrollTop(o + a - u);
      }
      t += " ui-state-default plupload_file";
      r("#" + e.id).attr("class", t).find(".ui-icon").attr("class", i);
    },
    _updateTotalProgress: function() {
      var e = this.uploader;
      this.progressbar.progressbar("value", e.total.percent);
      this.element.find(".plupload_total_status").html(e.total.percent + "%").end().find(".plupload_total_file_size").html(n.formatSize(e.total.size)).end().find(".plupload_upload_status").text(o("Uploaded %d/%d files").replace("%d/%d", e.total.uploaded + "/" + e.files.length));
    },
    _updateFileList: function() {
      var e = this, t = this.uploader, i = this.filelist, s = 0, u, a = this.id + "_", f;
      r.ui.sortable && this.options.sortable && r("tbody.ui-sortable", i).sortable("destroy");
      i.empty();
      r.each(t.files, function(o, h) {
        f = "";
        u = a + s;
        if (h.status === n.DONE) {
          h.target_name && (f += '<input type="hidden" name="' + u + '_tmpname" value="' + n.xmlEncode(h.target_name) + '" />');
          f += '<input type="hidden" name="' + u + '_name" value="' + n.xmlEncode(h.name) + '" />';
          f += '<input type="hidden" name="' + u + '_status" value="' + (h.status === n.DONE ? "done" : "failed") + '" />';
          s++;
          e.counter.val(s);
        }
        i.append('<tr class="ui-state-default plupload_file" id="' + h.id + '"><td class="plupload_cell plupload_file_name"><span>' + h.name + '</span></td><td class="plupload_cell plupload_file_status">' + h.percent + '%</td><td class="plupload_cell plupload_file_size">' + n.formatSize(h.size) + '</td><td class="plupload_cell plupload_file_action"><div class="ui-icon"></div>' + f + "</td></tr>");
        e._handleFileStatus(h);
        r("#" + h.id + ".plupload_delete .ui-icon, #" + h.id + ".plupload_done .ui-icon").click(function(e) {
          r("#" + h.id).remove();
          t.removeFile(h);
          e.preventDefault();
        });
        e._trigger("updatelist", null, i);
      });
      t.total.queued === 0 ? r(".ui-button-text", e.browse_button).text(o("Add Files")) : r(".ui-button-text", e.browse_button).text(o("%d files queued").replace("%d", t.total.queued));
      t.files.length === t.total.uploaded + t.total.failed ? e.start_button.button("disable") : e.start_button.button("enable");
      i[0].scrollTop = i[0].scrollHeight;
      e._updateTotalProgress();
      !t.files.length && t.features.dragdrop && t.settings.dragdrop ? r("#" + u + "_filelist").append('<tr><td class="plupload_droptext">' + o("Drag files here.") + "</td></tr>") : e.options.sortable && r.ui.sortable && e._enableSortingList();
    },
    _enableRenaming: function() {
      var e = this;
      r(".plupload_delete .plupload_file_name span", this.filelist).live("click", function(t) {
        var n = r(t.target), i, s, o, u = "";
        i = e.uploader.getFile(n.parents("tr")[0].id);
        o = i.name;
        s = /^(.+)(\.[^.]+)$/.exec(o);
        if (s) {
          o = s[1];
          u = s[2];
        }
        n.hide().after('<input class="plupload_file_rename" type="text" />');
        n.next().val(o).focus().blur(function() {
          n.show().next().remove();
        }).keydown(function(e) {
          var t = r(this);
          if (r.inArray(e.keyCode, [ 13, 27 ]) !== -1) {
            e.preventDefault();
            if (e.keyCode === 13) {
              i.name = t.val() + u;
              n.text(i.name);
            }
            t.blur();
          }
        });
      });
    },
    _enableDragAndDrop: function() {
      this.filelist.append('<tr><td class="plupload_droptext">' + o("Drag files here.") + "</td></tr>");
      this.filelist.parent().attr("id", this.id + "_dropbox");
      this.uploader.settings.drop_element = this.options.drop_element = this.id + "_dropbox";
    },
    _enableSortingList: function() {
      var e, t = this;
      if (r("tbody tr", this.filelist).length < 2) return;
      r("tbody", this.filelist).sortable({
        containment: "parent",
        items: ".plupload_delete",
        helper: function(e, t) {
          return t.clone(!0).find("td:not(.plupload_file_name)").remove().end().css("width", "100%");
        },
        stop: function(e, n) {
          var i, s, o, u = [];
          r.each(r(this).sortable("toArray"), function(e, n) {
            u[u.length] = t.uploader.getFile(n);
          });
          u.unshift(u.length);
          u.unshift(0);
          Array.prototype.splice.apply(t.uploader.files, u);
        }
      });
    },
    notify: function(e, t) {
      var n = r('<div class="plupload_message"><span class="plupload_message_close ui-icon ui-icon-circle-close" title="' + o("Close") + '"></span><p><span class="ui-icon"></span>' + t + "</p></div>");
      n.addClass("ui-state-" + (e === "error" ? "error" : "highlight")).find("p .ui-icon").addClass("ui-icon-" + (e === "error" ? "alert" : "info")).end().find(".plupload_message_close").click(function() {
        n.remove();
      }).end();
      r(".plupload_header_content", this.container).append(n);
    },
    destroy: function() {
      r(".plupload_button", this.element).unbind();
      r.ui.button && r(".plupload_add, .plupload_start, .plupload_stop", this.container).button("destroy");
      r.ui.progressbar && this.progressbar.progressbar("destroy");
      r.ui.sortable && this.options.sortable && r("tbody", this.filelist).sortable("destroy");
      this.uploader.destroy();
      this.element.empty().html(this.contents_bak);
      this.contents_bak = "";
      r.Widget.prototype.destroy.apply(this);
    }
  });
})(window, document, plupload, jQuery);