var page = {
  previous: 1,  //前一个点击的页面标记
  current: 1,  //当前点击的页面标记
  RenZhengStatus: false // 是否打开认证页面模板中的frame
};

const ORM = {
  index: 'index',
  faxian: 'faxian',
  mingxi: 'mingxi',
  wode: 'wode'
}

var DomsJson = {};
var DomsArr = {};
var User = {
  pay: 0,
  income: 0
};
var Log = [];

//初始化dom
for (let key in ORM) {
  let dom = $api.byId(ORM[key])
  DomsJson[key] = dom;
  DomsArr.push(dom);
}

//设置标题
const headerTitle = {
  index: {
    title: '',
    leftTextShow: false,
    bgColor: false,
    textColor: false
  },
  index: 'index',
  faxian: 'faxian',
  mingxi: 'mingxi',
  wode: 'wode'
};

//设置tab切换
var tab = new auiTab(
  {
    element: $api.byId('footer'),
    index: index,
    repeatClick: true
  },
  function (ret) {
    if (page.current != index) {
      page.previous = page.current;
      page.current = index;
      DomsArr.forEach((item, index) => {
        if (index == page.current) {
          item.className = ''
        }
        else {
          item.className = 'aui-hide'
        }
      });
      setHeaderTitle()
    }
  }
);

//设置头部
function setHeaderTitle(params) {
  $api.text('title', params.title);
  var textMark = $api.hasCls('back-text', 'aui-hide');
  if (params.leftTextShow && textMark) {
    $api.removeCls('back-text', 'aui-hide');
  }
  else if (!(params.leftTextShow || textMark)) {
    $api.addCls('back-text', 'aui-hide');
  }
  if (params.bgColor) {
    $api.css('header-wrap', 'background-color: ' + params.bgColor + ' !important;');
  }
  if (params.textColor) {
    $api.css('header-wrap', 'color: ' + params.textColor + ' !important;');
  }
}