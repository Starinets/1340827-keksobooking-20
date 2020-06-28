'use strict';

(function () {
  var DEFAULT_FILTER_VALUE = 'any';

  var filterForm = document.querySelector('.map__filters');
  var filters = filterForm.querySelectorAll('.map__filter');
  var features = filterForm.querySelector('.map__features');

  var housingType = filterForm.querySelector('#housing-type');

  var setFiltersToAdverts = function () {
    window.card.remove();

    var adverts = window.data.adverts.filter(function (advert) {
      if (housingType.value !== DEFAULT_FILTER_VALUE) {
        return (advert.offer.type === housingType.value) ? true : false;
      }

      return true;
    });

    window.filter.adverts = adverts;
    window.pin.remove();
    window.pin.render(adverts);
  };

  var onFieldChange = function () {
    setFiltersToAdverts();
  };

  var setDisabled = function () {
    filters.forEach(function (field) {
      field.disabled = true;
      field.value = DEFAULT_FILTER_VALUE;
    });

    features.disabled = true;
  };

  var setEnabled = function () {
    filters.forEach(function (field) {
      field.disabled = false;
      field.addEventListener('change', onFieldChange);
    });

    features.disabled = false;
  };

  window.filter = {
    setDisabled: setDisabled,
    setEnabled: setEnabled,
    setToAdverts: setFiltersToAdverts,
  };
})();
