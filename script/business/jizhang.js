$(function () {
  var Newdate = new Date();
  var DateYmd = Newdate.getFullYear() + "-" + (Newdate.getMonth() + 1) + "-" + Newdate.getDate();

  $(".remark-date").html(DateYmd);
  $(".shade").on("click", function () {
    $(".slide-wrap").hide();
    $(this).hide();
  })
  $(".slide-expend").on("click", function () {
    $(".slide-expend-R img,.expend-content").css("display", "block");
    $(".slide-income-R img,.income-content").css("display", "none");
    $(".record-hd-title-M span").html("支出");
    $(".slide-wrap,.shade,.remark-wrap").hide();
    $(".record-wrap").css('padding-bottom', 40 / 75 + 'rem');
  })
  $(".slide-income").on("click", function () {
    $(".slide-expend-R img,.expend-content").css("display", "none");
    $(".slide-income-R img,.income-content").css("display", "block");
    $(".record-hd-title-M span").html("收入");
    $(".slide-wrap,.shade,.remark-wrap").hide();
    $(".record-wrap").css('padding-bottom', 40 / 75 + 'rem');
  })
  $(".record-hd-title-M").on("click", function () {
    $(".slide-wrap,.shade").show();
  })
  $(".record-bd-li").on("click", function () {
    $(".remark-wrap").show();
    $(".record-wrap").css('padding-bottom', 410 / 75 + 'rem');
    $(".record-bd-li").find('.record-img').css('background-color', '#f5f5f5');
    $('.record-img').removeClass('vavava');
    $(this).find('.record-img').addClass('vavava');
    $(this).find('.record-img').css('background-color', '#6fb7f9');
  })
})
window.onload = function () {
  //打开时间选择器
  $api.addEvt($api.dom('.remark-date'), 'click', function () {
    if ($api.hasCls('schedule-box', 'aui-hide')) {
      mySchedule = new Schedule({
        el: '#schedule-box',
        //date: '2018-9-20',
        clickCb: function (y, m, d) {
          $api.addCls('schedule-box', 'aui-hide');
        },
      });
      $api.removeCls('schedule-box', 'aui-hide');
    }
    else {
      $api.addCls('schedule-box', 'aui-hide');
    }
  });
}



function jizhangSetItems() {
  var moneyOld = $api.val($api.dom('.remark-money-input'));
  var vava = $api.dom('.vavava');
  var vavaI = $api.first(vava, 'i');
  var iClass = $api.attr(vavaI, 'class');
  var remark = $api.val($api.dom('.remark-input'));
  var date = $api.html($api.dom('.remark-date'));
  var recordName = $api.html($api.dom('.record-hd-name'));
  var typeDiv = $api.next(vava);
  var typeW = $api.first(typeDiv, 'span');
  var type = $api.html(typeW);
  var pay = 0;
  var income = 0;

  switch (recordName) {
    case '支出':
      pay = moneyOld;
      income = 0;
      break;
    case '收入':
      pay = 0;
      income = moneyOld;
      break;
  }
  User.pay += pay * 1;
  User.income += income * 1;
  User.count++;

  setMoneyCount();
  setMoney();

  if (moneyOld == '') {
    alert("请填写金额");
    return;
  }

  User.recordCount++;
  wodeInit();

  Log.push({
    rowid: rowId,
    remark: remark,
    date: date,
    pay: pay,
    income: income,
    type: type,
    phone: User.Phone,
    month: date.split('-')[1]
  });

  mingxiInit();
  $(".remark-wrap").hide();
  Footer_Btns[0].click();
}