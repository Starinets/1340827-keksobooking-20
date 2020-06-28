'use strict';

(function () {
  var container = document.querySelector('.map');

  var setDisabled = function () {
    window.map.disabled = true;
    window.filter.setDisabled();

    container.classList.add('map--faded');
  };

  var setEnabled = function () {
    window.map.disabled = false;

    container.classList.remove('map--faded');

    window.data.generate(window.filter.setToAdverts);

    window.form.setDisable(false);
  };

  window.map = {
    disabled: true,
    setDisabled: setDisabled,
    setEnabled: setEnabled,
  };
})();
