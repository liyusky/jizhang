window.onload = function () {
  setListener();
  init();
}

function init() {
  $api.text('count-record', User.recordCount);
  $api.text('count-remind', User.remindCount);
}

function setListener() {
  //Login
  init();
}

function logout() {
  User.Status = false;
  LogoutEvent();
}