'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout = 0;

  var debounce = function (onTimeout) {
    if (lastTimeout !== 0) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(function () {
      lastTimeout = 0;
      onTimeout();
    }, DEBOUNCE_INTERVAL);
  };

  window.debounce = debounce;
})();
