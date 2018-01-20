window.onload = function () {
  init();
}

function init() {
  var Newdate = new Date();
  $api.text('date', Newdate.getMonth() * 1 + 1);
  setMoney();
}

function setMoney(income, pay) {
  var pay = User.pay;
  var income = User.income;
  $api.text('income', income);
  $api.text('pay', pay);
  $api.text('count', income - pay);
}