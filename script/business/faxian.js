window.addEventListener('load', function () {
  if (checkLogin()) faxianInit();
})

function faxianInit() {
  var Newdate = new Date();
  $api.text('date', Newdate.getMonth() * 1 + 1);
  setMoney();
}

function setMoney(income, pay) {
  var pay = User.pay * 1;
  var income = User.income * 1;
  $api.text('income', income);
  $api.text('pay', pay);
  $api.text('count', income - pay);
}