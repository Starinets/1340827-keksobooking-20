'use strict';

(function () {
  var generatePinData = window.data.generate;
  var renderPins = window.pin.render;

  var container = document.querySelector('.map');

  var filterForm = document.querySelector('.map__filters');
  var filters = filterForm.querySelectorAll('.map__filter');
  var features = filterForm.querySelector('.map__features');
  var checkboxFields = features.querySelectorAll('input[type="checkbox"]');

  var DEFAULT_FILTERS_VALUE = 'any';

  var setDisabled = function () {
    window.map.disabled = true;

    container.classList.add('map--faded');

    features.disabled = true;

    filters.forEach(function (field) {
      field.disabled = true;
      field.value = DEFAULT_FILTERS_VALUE;
    });

    features.disabled = true;

    checkboxFields.forEach(function (field) {
      field.checked = false;
    });

  };

  var setFiltersEnabled = function () {
    filters.forEach(function (field) {
      field.disabled = false;
    });
  };

  var setEnabled = function () {
    window.map.disabled = false;

    container.classList.remove('map--faded');

    features.disabled = false;

    generatePinData(renderPins);

    window.form.setDisable(false);
  };

  window.map = {
    disabled: true,
    setDisabled: setDisabled,
    setEnabled: setEnabled,
    setFiltersEnabled: setFiltersEnabled,
  };
})();
