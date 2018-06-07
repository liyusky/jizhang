var currentEmpower = 'login';
var roll = null;

window.addEventListener('load', function () {
  roll = new Roll({
    start: function () {
      closeBtnClick('register-btn');
      closeBtnClick('modify-btn');
      closeBtnClick('other-btn');
    },
    rollUpFinish: function () {
      roll.setHeight(currentEmpower);
      setLayout(currentEmpower);
    },
    finish: function () {
      openBtnClick('register-btn');
      openBtnClick('modify-btn');
      openBtnClick('other-btn');
    }
  });
})

function switchEmpower(type) {
  if (currentEmpower !== type) {
    currentEmpower = type;
    roll.animation();
  }
}

function setLayout(type) {
  var text = null;
  switch (type) {
    case 'login':
      text = '登陆';
      if ($api.hasCls('register-btn', 'selected')) {
        $api.removeCls('register-btn', 'selected');
        $api.addCls('other-btn', 'selected');
      }
      if ($api.hasCls('modify-btn', 'aui-hide')) $api.removeCls('modify-btn', 'aui-hide');
      $api.text('modify-btn', '忘记密码');
      $api.attr('modify-btn', 'onclick', 'javascript: switchEmpower("modify");');
      $api.attr('other-btn', 'onclick', 'javascript: switchEmpower("login");');
      if (!$api.hasCls('validate-btn', 'aui-hide')) $api.addCls('validate-btn', 'aui-hide');
      if (!$api.hasCls('note', 'aui-hide')) $api.addCls('note', 'aui-hide');
      $api.text('other-btn', text);
      break;
    case 'register':
      text = '注册';
      if ($api.hasCls('other-btn', 'selected')) {
        $api.removeCls('other-btn', 'selected');
        $api.addCls('register-btn', 'selected');
      }
      if (!$api.hasCls('modify-btn', 'aui-hide')) $api.addCls('modify-btn', 'aui-hide');
      if ($api.hasCls('validate-btn', 'aui-hide')) $api.removeCls('validate-btn', 'aui-hide');
      if ($api.hasCls('note', 'aui-hide')) $api.removeCls('note', 'aui-hide');
      break;
    case 'modify':
      text = '确认修改';
      if ($api.hasCls('register-btn', 'selected')) {
        $api.removeCls('register-btn', 'selected');
        $api.addCls('other-btn', 'selected');
      }
      if ($api.hasCls('modify-btn', 'aui-hide')) $api.removeCls('modify-btn', 'aui-hide');
      if ($api.hasCls('validate-btn', 'aui-hide')) $api.removeCls('validate-btn', 'aui-hide');
      if (!$api.hasCls('note', 'aui-hide')) $api.addCls('note', 'aui-hide');
      $api.text('modify-btn', '返回登录');
      $api.attr('modify-btn', 'onclick', 'javascript: switchEmpower("login");');
      $api.attr('other-btn', 'onclick', 'javascript: switchEmpower("modify");');
      $api.text('other-btn', '忘记密码');
      break;
  }
  $api.text('empower-submit-btn', text);
}

function submit() {
  var phone = $api.val('empower-phone'); //帐号
  var password = $api.val('empower-password'); //密码
  var url = null;
  var data = null;
  var values = null;
  var execute = null;
  switch (currentEmpower) {
    case 'login':
      url = 'UserLogin';
      data = {
        page: 'login',
        phone: phone,
        password: password
      };
      execute = function () {
        if (!ACCOUNT[phone]) {
          $('body').toast({
            position: 'fixed',
            content: '用户名或者密码错误',
            duration: 2000,
            isCenter: true,
            animateIn: 'bounceIn-hastrans',
            animateOut: 'bounceOut-hastrans',
          });
          openBtnClick('empower-submit-btn');
          return;
        }

        if (ACCOUNT[phone] == password) {
          setUserParam(phone);
          wodeInit();
          mingxiInit();
          faxianInit();
          openPage(1);
        }
        else {
          $('body').toast({
            position: 'fixed',
            content: '用户名或者密码错误',
            duration: 2000,
            isCenter: true,
            animateIn: 'bounceIn-hastrans',
            animateOut: 'bounceOut-hastrans',
          });
        }
        openBtnClick('empower-submit-btn');
      }
      break;
    case 'register':
      url = 'UserRegister';
      data = {
        page: 'register',
        phone: phone,
        password: password
      };
      execute = function () {
        if (!ACCOUNT[phone]) {
          ACCOUNT[phone] = password;
          setUserParam(phone);
          wodeInit();
          mingxiInit();
          faxianInit();
          openPage(1);
        }
        else {
          $('body').toast({
            position: 'fixed',
            content: '该用户已注册',
            duration: 2000,
            isCenter: true,
            animateIn: 'bounceIn-hastrans',
            animateOut: 'bounceOut-hastrans',
          });
        }
        openBtnClick('empower-submit-btn');
      }
      break;
    case 'modify':
      url = 'FindPass';
      data = {
        page: 'modify',
        phone: phone,
        password: password,
      };
      execute = function () {
      }
      break;
  }
  closeBtnClick('empower-submit-btn');
  execute();
}

function setUserParam (phone) {
  User.Status = true;
  User.Phone = phone;
  $api.text('phone', phone);
}