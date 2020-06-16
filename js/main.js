'use strict';

(function () {
  var setMapDisabled = window.map.setDisabled;
  var generateData = window.data.generate;

  var mapState = {
    disabled: true,
  };

  setMapDisabled();

  var pinsData = generateData();

  window.main = {
    mapState: mapState,
    pinsData: pinsData,
  };
})();
