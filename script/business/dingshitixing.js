window.onload = function () {
  setAllReminder();
}

function addTag () {
  if ($api.hasCls('schedule-box', 'aui-hide')) {
    window.mySchedule = null;
    mySchedule = new Schedule({
      el: '#schedule-box',
      //date: '2018-9-20',
      clickCb: function (y, m, d) {
        let date = y + '-' + m + '-' + d;
        remark[remarkNum] = {
          date: date,
          rowid: remarkNum
        };
        ++remarkNum;
        setAllReminder();
        $api.addCls('schedule-box', 'aui-hide');
        User.remindCount++;
        wodeInit();
      },
    });
    window.mySchedule = null;
    $api.removeCls('schedule-box', 'aui-hide');
  }
  else {
    $api.addCls('schedule-box', 'aui-hide');
  }
}

function deleteTip(dom) {
  var mark = $api.attr(dom, 'data-id');
  delete remark[mark];
  setAllReminder(remark);
  User.remindCount--;
  wodeInit();
}

function setAllReminder() {
  var htmlStr = '';
  for (let key in remark) {
    htmlStr += setReminderHtml(remark[key]);
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