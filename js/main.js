'use strict';

(function () {
  var setMapDisabled = window.map.setDisabled;
  var generateData = window.data.generate;

  setMapDisabled();

  var pinsData = generateData();

  window.main = {
    pinsData: pinsData,
  };
})();
