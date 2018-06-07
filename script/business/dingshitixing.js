window.addEventListener('load', function () {
  setAllReminder();
})

function addTag() {
  if ($api.hasCls('schedule-box', 'aui-hide')) {
    window.mySchedule = null;
    mySchedule = new Schedule({
      el: '#schedule-box',
      //date: '2018-9-20',
      clickCb: function (y, m, d) {
        var date = y + '-' + m + '-' + d;
        remark.push({
          date: date,
          phone: User.Phone,
          rowid: User.remindCount
        });
        $api.html('list', '');
        setAllReminder();
        $api.addCls('schedule-box', 'aui-hide');
        wodeInit();
      },
    });
    window.mySchedule = null;
    $api.removeCls('schedule-box', 'aui-hide');
  } else {
    $api.addCls('schedule-box', 'aui-hide');
  }
}

function deleteTip(dom) {
  var id = $api.attr(dom, 'data-id');
  remark[id] = null;
  setAllReminder(remark);
  User.remindCount--;
  wodeInit();
}

function setAllReminder() {
  var htmlStr = '';
  User.remindCount = 0;
  for (var i = remark.length; i > 0; i--) {
    if (!!remark[i - 1] && User.Phone == remark[i - 1].phone) htmlStr += setReminderHtml(remark[i - 1]);
  }
  $api.html('list', '');
  $api.html('list', htmlStr);
}

function setReminderHtml(content) {
  User.remindCount++;
  var htmlStr = '<li class="remind-list-item">' +
    '<span>提醒时间</span>' +
    '<span>' + content.date + '</span>' +
    '<i class="aui-iconfont aui-icon-close text-45" data-id="' + content.rowid + '" onclick="javascript: deleteTip(this);"></i>' +
    '</li>';
  return htmlStr;
}