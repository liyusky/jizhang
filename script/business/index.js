const Doms = {
  mingxi: $api.byId('mingxi'),
  jizhang: $api.byId('jizhang'),
  faxian: $api.byId('faxian'),
  wode: $api.byId('wode'),
  bangzhu: $api.byId('bangzhu'),
  dingshitixing: $api.byId('dingshitixing'),
  guanyulanqian: $api.byId('guanyulanqian'),
  yijianfankui: $api.byId('yijianfankui'),
  empower: $api.byId('empower'),
}


const Pages = [
  $api.byId('mingxi'),
  $api.byId('jizhang'),
  $api.byId('faxian'),
  $api.byId('wode'),
  $api.byId('bangzhu'),
  $api.byId('dingshitixing'),
  $api.byId('guanyulanqian'),
  $api.byId('yijianfankui'),
  $api.byId('empower'),
  $api.byId('ershoujiaoyi'),
  $api.byId('kuaidi100'),
  $api.byId('sourcedb'),
  $api.byId('weizhang'),
]

const Footer_Btns = [
  $api.byId('footer-home'),
  $api.byId('footer-jizhang'),
  $api.byId('footer-faxian'),
  $api.byId('footer-wode')
]

var User = {
  Status: false,
  pay: 0,
  income: 0,
  count: 0,
  recordCount: 0,
  remindCount: 0,
  Phone: null
};
var Log = [];
var remark = {};
var remarkNum = 0;

var page = {
  previous: 1,  //前一个点击的页面标记
  current: 1,  //当前点击的页面标记
  RenZhengStatus: false // 是否打开认证页面模板中的frame
};

//设置tab切换
var tab = new auiTab(
  {
    element: $api.byId('footer'),
    index: 1,
    repeatClick: true
  },
  function (ret) {
    if (page.current != ret.index) {
      page.previous = page.current;
      page.current = ret.index;
      openPage(ret.index);
    }
  }
);

var mySchedule = new Schedule({
  el: '#schedule-box',
  //date: '2018-9-20',
  clickCb: function (y, m, d) {
  },
  nextMonthCb: function (y, m, d) {
  },
  nextYeayCb: function (y, m, d) {
  },
  prevMonthCb: function (y, m, d) {
  },
  prevYearCb: function (y, m, d) {
  }
});

function openPage(i) {
  Pages.forEach((item, index) => {
    if (index == i - 1) {
      if ($api.hasCls(item, 'aui-hide')) $api.removeCls(item, 'aui-hide');
    }
    else {
      if (!$api.hasCls(item, 'aui-hide')) $api.addCls(item, 'aui-hide');
    }
  });
}

checkLogin();

function checkLogin(content) {
  var flag = true;
  var openLogin = true;
  try {
    if (typeof content.openLogin === 'boolean') openLogin = content.openLogin;
  } catch (e) {}

  if (User.Status) {
    try {
      content.success(flag);
    } catch (e) { }
  }
  else {
    flag = false;
    if (openLogin) {
      openPage(9);
    }
    try {
      content.fail(flag);
    } catch (e) { }
  }

  try {
    content.default(flag);
  } catch (e) { }

  return flag;
}

function closeBtnClick(btnId) {
  $api.attr(btnId, 'disabled', 'disabled');
}

function openBtnClick(btnId) {
  $api.removeAttr(btnId, 'disabled');
}