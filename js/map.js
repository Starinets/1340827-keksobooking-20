'use strict';

(function () {
  var DEFAULT_FILTER_VALUE = 'any';

  var container = document.querySelector('.map');

  var filterForm = document.querySelector('.map__filters');
  var filters = filterForm.querySelectorAll('.map__filter');
  var features = filterForm.querySelector('.map__features');
  var checkboxFields = features.querySelectorAll('input[type="checkbox"]');

  var setDisabled = function () {
    window.map.disabled = true;

    container.classList.add('map--faded');

    features.disabled = true;

    filters.forEach(function (field) {
      field.disabled = true;
      field.value = DEFAULT_FILTER_VALUE;
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

    features.disabled = false;
  };

  var setEnabled = function () {
    window.map.disabled = false;

    container.classList.remove('map--faded');

    window.data.generate(window.pin.render);

    window.form.setDisable(false);
  };

  window.map = {
    disabled: true,
    setDisabled: setDisabled,
    setEnabled: setEnabled,
    setFiltersEnabled: setFiltersEnabled,
  };
})();
