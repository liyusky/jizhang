var index = 0;
window.onload = function () {
  init();
}

function init() {
  setCurrentTime();
  getCountRow();
  setListContent();
  setMoneyCount();

  function setCurrentTime() {
    var date = new Date();
    $api.text('title-year', date.getFullYear());
    $api.text('title-month', date.getMonth() * 1 + 1);
  }

  function getCountRow() {
    index = index;
  }
}

function setListContent() {
  addAllTip(Log);
}

function setTipHtml(content) {
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
  for (var i = 0; i < content.length; i++) {
    htmlStr += setTipHtml(content[i]);
  }
  $api.html('container-list', '');
  $api.html('container-list', htmlStr);
}

function setMoneyCount() {
  var pay = User.pay;
  var income = User.income;
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


  //Login
  init();


  //Logout
  init();
}

function setCurrentMonth() {
  api.openPicker({
    type: 'date',
    title: '选择/时间'
  },
    function (ret, err) {
      if (ret) {
        $api.html('title-year', ret.year);
        $api.html('title-month', ret.month);
        setListContent();
      }
      else {
        console.log(JSON.stringify(err));
      }
    }
  );
}

function removeTip(dom) {
  var id = $api.attr(dom, 'data-id');
  var pay = $api.attr(dom, 'data-pay');
  var income = $api.attr(dom, 'data-income');
}

function addSingleTip(content) {
  var htmlStr = setTipHtml(content);
  $api.append('container-list', htmlStr);
}





