'use strict';

(function () {
  var EventKeyCode = {
    ENTER: 'Enter',
    NUMPAD_ENTER: 'NumpadEnter',
    ESCAPE: 'Escape',
  };

  var MOUSE_LEFT_BUTTON = 0;

  var isEnterEvent = function (evt) {
    return evt.key === EventKeyCode.ENTER;
  };

  var isMouseLeftButtonEvent = function (evt) {
    return evt.button === MOUSE_LEFT_BUTTON;
  };

  var isEscapeEvent = function (evt) {
    return evt.key === EventKeyCode.ESCAPE;
  };

  var isEmptyString = function (checkedString) {
    return checkedString === '';
  };

  window.util = {
    isEnterEvent: isEnterEvent,
    isEscapeEvent: isEscapeEvent,
    isMouseLeftButtonEvent: isMouseLeftButtonEvent,
    isEmptyString: isEmptyString,
  };
})();

