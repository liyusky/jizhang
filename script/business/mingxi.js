var index = 0;
window.onload = function () {
  if (checkLogin()) mingxiInit();
}


//初始化
function mingxiInit() {
  setCurrentTime();
  getCountRow();
  addAllTip(Log);
  setMoneyCount();

  //设置当前时间
  function setCurrentTime() {
    var date = new Date();
    $api.text('title-year', date.getFullYear());
    $api.text('title-month', date.getMonth() * 1 + 1);
  }

  //todo  我也不知道
  function getCountRow() {
    index = index;
  }
}


//拼接字符串
function setTipHtml(content) {
  User.pay += content.pay * 1;
  User.income += content.income * 1;
  rowId += 1;
  var htmlStr = '<li class="containerLi" id="' + content.rowid + '">' +
    '<div class="container-li">' +
    '<div class="container-inner-wrap">' +
    '<div class="container-inner-L">' +
    '<i class="icon iconfont ' + iconClass[content.type] + '"></i>' +
    '</div>' +
    '<div class="container-inner-R">' +
    '<div class="container-inner-name one-txt-cut">' +
    '<span class="nameaddhtml">' + (content.remark ? content.remark : content.type) + '</span>' +
    '</div>' +
    '<div class="container-inner-num one-txt-cut">' +
    '<span class="moneyaddhtml">' + (content.pay * 1 ? content.pay * -1 : content.income) + '</span>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="container-delete" data-pay="' + content.pay + '" data-income="' + content.income + '" data-id="' + content.rowid + '" onclick="javascript: removeTip(this);">' +
    '<i class="aui-iconfont aui-icon-close text-30"></i>'
    '</div>' +
    '</div>' +
    '</li>';
  return htmlStr;
}

function addAllTip(content) {
  var htmlStr = '';
  rowId = 1;
  User.pay = 0;
  User.income = 0;
  for (var i = content.length; i > 0; i--) {
    if (!!content[i - 1]) htmlStr += setTipHtml(content[i - 1]);
  }
  $api.html('container-list', '');
  $api.html('container-list', htmlStr);
}

function setMoneyCount() {
  var pay = User.pay * 1;
  var income = User.income * 1;
  $api.text('count-income', income);
  $api.text('count-pay', pay);
}

function setListener() {
  addSingleTip({
    rowid: ++index,
    pay: ret.value.pay,
    income: ret.value.income,
    remark: ret.value.remark,
    type: ret.value.type
  });
  setMoneyCount();
}

function setCurrentMonth() {
  if ($api.hasCls('schedule-box', 'aui-hide')) {
    Schedule.prototype.clickCb = function (y, m, d) {
      $api.html('title-year', y);
      $api.html('title-month', m);
      $api.addCls('schedule-box', 'aui-hide');
    }
    $api.removeCls('schedule-box', 'aui-hide');
  }
  else {
    $api.addCls('schedule-box', 'aui-hide');
  }
}

function removeTip(dom) {
  var id = $api.attr(dom, 'data-id');
  var pay = $api.attr(dom, 'data-pay');
  var income = $api.attr(dom, 'data-income');
  User.recordCount--;
  Log[id - 1] = null;
  wodeInit();
  mingxiInit();
}

function addSingleTip(content) {
  var htmlStr = setTipHtml(content);
  $api.append('container-list', htmlStr);
}