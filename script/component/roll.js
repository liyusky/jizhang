function Roll (content) {
  var thisDom = this;
  this.inputListDom = null;
  this.phoneInputDom = null;

  this.step = null;
  this.currentHeight = null;
  this.inputListHeight = null;
  this.phoneInputHeight = null;

  this.initDoms = function () {
    this.inputListDom = $api.byId('input-list');
    this.phoneInputDom = $api.byId('phone-input');
  };

  this.initParam = function () {
    this.step = 3;
    this.inputListHeight = $api.offset(this.inputListDom).h;
    this.phoneInputHeight = $api.offset(this.phoneInputDom).h;
    this.currentHeight = this.inputListHeight;
  };

  this.animation = function () {
    try {
      content.start();
    } catch (e) {}
    this.rollUp();
  }

  this.rollUp = function () {
    thisDom.currentHeight -= thisDom.step;
    if (thisDom.currentHeight > 0) {
      $api.attr(thisDom.inputListDom, 'style', 'height: ' + thisDom.currentHeight + 'px;');
      setTimeout(thisDom.rollUp, 12);
    }
    else {
      $api.attr(thisDom.inputListDom, 'style', 'height: 0px;');
      try {
        content.rollUpFinish();
      } catch (e) {}
      thisDom.rollDown();
    }
  };

  this.rollDown = function () {
    thisDom.currentHeight += thisDom.step;
    if (thisDom.currentHeight < thisDom.inputListHeight) {
      $api.attr(thisDom.inputListDom, 'style', 'height: ' + thisDom.currentHeight + 'px;');
      setTimeout(thisDom.rollDown, 12);
    }
    else {
      $api.attr(thisDom.inputListDom, 'style', 'height: ' + this.inputListHeight + 'px;');
      try {
        content.finish();
      } catch (e) {}
    }
  };

  this.setHeight = function (type) {
    switch (type) {
      case 'login':
        this.inputListHeight = this.phoneInputHeight * 2;
        break;
      default:
        this.inputListHeight = this.phoneInputHeight * 2;
    }
  };

  this.main = function () {
    this.initDoms();
    this.initParam();
  }

  this.main();
}
