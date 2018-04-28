function yijianfankuiCount(dom) {
  $api.text('yijianfankui-count', dom.value.length);
}

function yijianfankuisubmit() {
  alert('正在提交...');
  setTimeout(function () {
    $api.val('question-textarea', '');
    alert('提交成功');
  }, 1500);
}