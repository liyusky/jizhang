var index = 0;
window.onload = function () {
  init();
}

function addTag (date) {
  setTimeUIModule({
    success: function (data) {
      init();
    }
  });
}

function init() {
  setAllReminder(data);
}

function deleteTip(dom) {
  init();
}

function setAllReminder(content) {
  var htmlStr = '';
  for (var i = 0; i < content.length; i++) {
    htmlStr += setReminderHtml(content[i]);
  }
  $api.html('list', '');
  $api.html('list', htmlStr);
}

function setReminderHtml(content) {
  var htmlStr = '<li class="remind-list-item">' +
    '<span>提醒时间</span>' +
    '<span>' + content.date + '</span>' +
    '<i class="aui-iconfont aui-icon-close text-45" data-id="' + content.rowid + '" onclick="javascript: deleteTip(this);"></i>' +
    '</li>';
  return htmlStr;
}

function setTimeUIModule(content) {
  api.openPicker(
    {
      type: 'time',
      title: '选择时间'
    },
    function (ret, err) {
      if (ret) {
        var date = ret.year + '-' + ret.month + '-' + ret.day + ' ' + ret.hour + '-' + ret.minute;
        try {
          content.success(date);
        } catch (e) { }
      }
      if (err) {
        alert(JSON.stringify(err));
      }
    }
  );
}