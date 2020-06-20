'use strict';

(function () {
  var generatePinData = window.data.generate;
  var setFormDisable = window.form.setDisable;
  var renderPins = window.pin.render;

  var container = document.querySelector('.map');

  var filterForm = document.querySelector('.map__filters');
  var filters = filterForm.querySelectorAll('.map__filter');
  var features = filterForm.querySelector('.map__features');

  var setDisabled = function () {
    window.map.disabled = true;

    container.classList.add('map--faded');
    filterForm.classList.add('ad-form--disabled');

    filters.forEach(function (field) {
      field.disabled = true;
    });

    features.disabled = true;

    setFormDisable(true);
    window.card.remove();
    window.pin.remove();
    window.mainPin.reset();
  };

  var setEnabled = function () {
    window.map.disabled = false;

    container.classList.remove('map--faded');
    filterForm.classList.remove('ad-form--disabled');

    filters.forEach(function (field) {
      field.disabled = false;
    });

    features.disabled = false;

    generatePinData(renderPins);

    setFormDisable(false);
  };

  window.map = {
    disabled: true,
    setDisabled: setDisabled,
    setEnabled: setEnabled,
  };
})();
