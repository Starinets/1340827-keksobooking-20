'use strict';

(function () {
  var getRandomInteger = function (min, max) {
    return min + Math.floor(Math.random() * Math.floor(max - min + 1));
  };

  window.util = {
    getRandomInteger: getRandomInteger,
  };
})();

