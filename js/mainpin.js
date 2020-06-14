'use strict';

(function () {
  var setFormAddress = window.form.setAddress;
  var setMapEnabled = window.map.setEnabled;
  var isEnterEvent = window.util.isEnterEvent;
  var isMouseLeftButtonEvent = window.util.isMouseLeftButtonEvent;

  var X_GAP = 65 / 2;
  var Y_GAP = 87;

  var pin = document.querySelector('.map__pin--main');

  var setAddress = function () {
    var pinX = Math.round(parseInt(pin.style.left, 10) + X_GAP);
    var pinY = Math.round(parseInt(pin.style.top, 10) + Y_GAP);

    setFormAddress(pinX + ', ' + pinY);
  };

  var enableMap = function () {
    pin.removeEventListener('mousedown', onPinMousedown);
    pin.removeEventListener('keydown', onPinKeydown);

    setMapEnabled();
  };

  var onPinMousedown = function (evt) {
    if (isMouseLeftButtonEvent(evt)) {

      enableMap();
    }
  };

  var onPinKeydown = function (evt) {
    if (isEnterEvent(evt)) {
      enableMap();
    }
  };

  setAddress();

  pin.addEventListener('mousedown', onPinMousedown);
  pin.addEventListener('keydown', onPinKeydown);
})();
