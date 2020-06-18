'use strict';

(function () {
  var setMapDisabled = window.map.setDisabled;

  var pinsData = [];

  var mapState = {
    disabled: true,
  };

  setMapDisabled();

  window.main = {
    mapState: mapState,
    pinsData: pinsData,
  };
})();
