function count(dom) {
  $api.text('count', dom.value.length);
}

function submit() {
  alert('正在提交...');
  setTimeout(function () {
    $api.val('question-textarea', '');
    alert('提交成功');
  }, 1500);
}