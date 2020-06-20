'use strict';

(function () {
  var setFormAddress = window.form.setAddress;
  var setMapEnabled = window.map.setEnabled;
  var isEnterEvent = window.util.isEnterEvent;
  var isMouseLeftButtonEvent = window.util.isMouseLeftButtonEvent;

  var DEFAULT_LEFT = 602;
  var DEFAULT_TOP = 407;
  var X_GAP = 65 / 2;
  var Y_GAP = 82;
  var map = document.querySelector('.map__pins');
  var pin = document.querySelector('.map__pin--main');

  var offset = {
    map: {
      minX: 0,
      maxX: map.offsetWidth,
      minY: 130,
      maxY: 630,
    },
    mouse: {},
  };

  var setAddress = function () {
    var pinX;
    var pinY;

    if (window.map.disabled) {
      pinX = Math.floor(pin.offsetLeft + pin.offsetWidth / 2);
      pinY = Math.floor(pin.offsetTop + pin.offsetHeight / 2);
    } else {
      pinX = Math.floor(pin.offsetLeft + X_GAP);
      pinY = Math.floor(pin.offsetTop + Y_GAP);
    }
    setFormAddress(pinX + ', ' + pinY);
  };

  var enableMap = function () {
    pin.removeEventListener('keydown', onPinKeydown);

    setMapEnabled();
  };

  var movePin = function (evt) {
    var pinCoords = {
      x: evt.clientX - offset.map.x - offset.mouse.x,
      y: evt.clientY - offset.map.y - offset.mouse.y,
    };

    if (pinCoords.y + Y_GAP <= offset.map.minY) {
      pin.style.top = offset.map.minY - Y_GAP + 'px';
    } else if (pinCoords.y + Y_GAP >= offset.map.maxY) {
      pin.style.top = offset.map.maxY - Y_GAP + 'px';
    } else {
      pin.style.top = pinCoords.y + 'px';
    }

    if (pinCoords.x + X_GAP <= offset.map.minX) {
      pin.style.left = offset.map.minX - X_GAP + 'px';
    } else if (pinCoords.x + X_GAP >= offset.map.maxX) {
      pin.style.left = offset.map.maxX - X_GAP + 'px';
    } else {
      pin.style.left = pinCoords.x + 'px';
    }

    setAddress();
  };

  var onPinMousedown = function (evt) {
    if (isMouseLeftButtonEvent(evt)) {
      if (window.map.disabled) {
        enableMap();
        setAddress();
      }

      offset.map.x = map.offsetLeft;
      offset.map.y = map.offsetTop;
      offset.map.maxX = map.offsetWidth;

      offset.mouse.x = evt.clientX - offset.map.x - pin.offsetLeft;
      offset.mouse.y = evt.clientY - offset.map.y - pin.offsetTop;

      document.addEventListener('mousemove', onPinMousemove);
      document.addEventListener('mouseup', onPinMouseup);

      window.addEventListener('blur', onBlur);
    }
  };

  var onPinMousemove = function (evt) {
    movePin(evt);
  };

  var onPinMouseup = function (evt) {
    movePin(evt);

    document.removeEventListener('mousemove', onPinMousemove);
    document.removeEventListener('mouseup', onPinMouseup);

    window.removeEventListener('blur', onBlur);
  };

  var onPinKeydown = function (evt) {
    if (isEnterEvent(evt)) {
      enableMap();
      pin.removeEventListener('keydown', onPinKeydown);
    }
  };

  var onBlur = function () {
    document.removeEventListener('mousemove', onPinMousemove);
    document.removeEventListener('mouseup', onPinMouseup);

    window.removeEventListener('blur', onBlur);

    setAddress();
  };

  var setDefault = function () {
    pin.addEventListener('mousedown', onPinMousedown);
    pin.addEventListener('keydown', onPinKeydown);

    pin.style.left = DEFAULT_LEFT - pin.offsetWidth / 2 + 'px';
    pin.style.top = DEFAULT_TOP - pin.offsetHeight / 2 + 'px';

    setAddress();
  };

  window.mainPin = {
    reset: setDefault,
    setAddress: setAddress,
  };
})();
