'use strict';

(function () {
  var mapState = window.main.mapState;
  var setFormAddress = window.form.setAddress;
  var setMapEnabled = window.map.setEnabled;
  var isEnterEvent = window.util.isEnterEvent;
  var isMouseLeftButtonEvent = window.util.isMouseLeftButtonEvent;

  var X_GAP = 65 / 2;
  var Y_GAP = 87;

  var pin = document.querySelector('.map__pin--main');

  var setAddress = function () {
    var pinX;
    var pinY;

    if (mapState.disabled) {
      pinX = Math.floor(pin.offsetLeft + pin.offsetWidth / 2);
      pinY = Math.floor(pin.offsetTop + pin.offsetHeight / 2);
    } else {
      pinX = Math.floor(pin.offsetLeft + X_GAP);
      pinY = Math.floor(pin.offsetTop + Y_GAP);
    }
    setFormAddress(pinX + ', ' + pinY);
  };

  var enableMap = function () {
    pin.removeEventListener('mousedown', onPinMousedown);
    pin.removeEventListener('keydown', onPinKeydown);

    setMapEnabled();

    mapState.disabled = false;
  };

  var onPinMousedown = function (evt) {
    if (isMouseLeftButtonEvent(evt)) {
      enableMap();
      setAddress();
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
