'use strict';

(function () {
  var EventKeyCode = {
    ENTER: 'Enter',
    NUMPAD_ENTER: 'NumpadEnter',
    ESCAPE: 'Escape',
  };

  var MOUSE_LEFT_BUTTON = 0;

  var isEnterEvent = function (evt) {
    return evt.code === EventKeyCode.ENTER
        || evt.code === EventKeyCode.NUMPAD_ENTER;
  };

  var isMouseLeftButtonEvent = function (evt) {
    return evt.button === MOUSE_LEFT_BUTTON;
  };

  var isEscapeEvent = function (evt) {
    return evt.code === EventKeyCode.ESCAPE;
  };

  window.util = {
    isEnterEvent: isEnterEvent,
    isEscapeEvent: isEscapeEvent,
    isMouseLeftButtonEvent: isMouseLeftButtonEvent,
  };
})();

