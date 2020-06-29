'use strict';

(function () {
  var DEFAULT_FILTER_VALUE = 'any';
  var COUNT_PINS_ON_MAP = 5;

  var filterForm = document.querySelector('.map__filters');
  var filters = filterForm.querySelectorAll('.map__filter');
  var features = filterForm.querySelector('.map__features');

  var housingType = filterForm.querySelector('#housing-type');

  var setFiltersToAdverts = function () {
    window.card.remove();

    var adverts = [];

    for (var index = 0; index < window.data.adverts.length; index++) {
      if (housingType.value === DEFAULT_FILTER_VALUE
        || window.data.adverts[index].offer.type === housingType.value) {
        adverts.push(index);
      }

      if (adverts.length === COUNT_PINS_ON_MAP) {
        break;
      }
    }

    window.pin.render(adverts);
  };

  var onFieldChange = function () {
    setFiltersToAdverts();
  };

  var setDisabled = function () {
    filterForm.reset();

    filters.forEach(function (field) {
      field.disabled = true;
    });

    features.disabled = true;

    filterForm.removeEventListener('change', onFieldChange);
  };

  var setEnabled = function () {
    filters.forEach(function (field) {
      field.disabled = false;
    });

    features.disabled = false;

    filterForm.addEventListener('change', onFieldChange);
  };

  window.filter = {
    setDisabled: setDisabled,
    setEnabled: setEnabled,
    setToAdverts: setFiltersToAdverts,
  };
})();
