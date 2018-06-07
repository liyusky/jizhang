window.addEventListener('load',function () {
  if (checkLogin()) wodeInit();
});

function wodeInit() {
  $api.text('count-record', User.recordCount);
  $api.text('count-remind', User.remindCount);
}

function setListener() {
  //Login
  init();
}

function logout() {
  User.Status = false;
  openPage(9);
  wodeInit();
  mingxiInit();
  faxianInit();
}