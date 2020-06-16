'use strict';

(function () {
  var setFormDisable = window.form.setDisable;
  var renderPins = window.pin.render;

  var container = document.querySelector('.map');

  var filterForm = document.querySelector('.map__filters');
  var filters = filterForm.querySelectorAll('.map__filter');
  var features = filterForm.querySelector('.map__features');

  var setDisabled = function () {
    container.classList.add('map--faded');
    filterForm.classList.add('ad-form--disabled');

    filters.forEach(function (field) {
      field.disabled = true;
    });

    features.disabled = true;
    setFormDisable(true);
  };

  var setEnabled = function () {
    container.classList.remove('map--faded');
    filterForm.classList.remove('ad-form--disabled');

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
