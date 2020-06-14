'use strict';

(function () {
  var setFormDisable = window.form.setDisable;
  var renderPins = window.pin.render;

  var container = document.querySelector('.map');

  var filerForm = document.querySelector('.map__filters');
  var filters = filerForm.querySelectorAll('.map__filter');
  var features = filerForm.querySelector('.map__features');

  var setDisabled = function () {
    container.classList.add('map--faded');
    filerForm.classList.add('ad-form--disabled');

    filters.forEach(function (field) {
      field.disabled = true;
    });

    features.disabled = true;
    setFormDisable(true);
  };

  var setEnabled = function () {
    container.classList.remove('map--faded');
    filerForm.classList.remove('ad-form--disabled');

    filters.forEach(function (field) {
      field.disabled = false;
    });

    features.disabled = false;

    renderPins(window.main.pinsData);

    setFormDisable(false);
  };

  window.map = {
    setDisabled: setDisabled,
    setEnabled: setEnabled,
  };
})();
