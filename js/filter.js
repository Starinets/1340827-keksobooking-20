'use strict';

(function () {
  var DEFAULT_FILTER_VALUE = 'any';
  var COUNT_PINS_ON_MAP = 5;

  var filterForm = document.querySelector('.map__filters');
  var filters = filterForm.querySelectorAll('.map__filter');
  var featuresContainer = filterForm.querySelector('.map__features');

  var housingType = filterForm.querySelector('#housing-type');
  var housingPrice = filterForm.querySelector('#housing-price');
  var housingRooms = filterForm.querySelector('#housing-rooms');
  var housingGuests = filterForm.querySelector('#housing-guests');

  var priceRange = {
    'low': {
      from: 0,
      to: 9999,
    },
    'middle': {
      from: 10000,
      to: 50000,
    },
    'high': {
      from: 50001,
      to: 1000000,
    }
  };

  var filterByType = function (advert) {
    return housingType.value === DEFAULT_FILTER_VALUE
        || housingType.value === advert.offer.type;
  };

  var filterByPrice = function (advert) {
    return housingPrice.value === DEFAULT_FILTER_VALUE
        || advert.offer.price >= priceRange[housingPrice.value].from
            && advert.offer.price <= priceRange[housingPrice.value].to;
  };

  var filterByRooms = function (advert) {
    return housingRooms.value === DEFAULT_FILTER_VALUE
        || Number(housingRooms.value) === advert.offer.rooms;
  };

  var filterByGuests = function (advert) {
    return housingGuests.value === DEFAULT_FILTER_VALUE
        || Number(housingGuests.value) === advert.offer.guests;
  };

  var filterByFeatures = function (advert, features) {
    return features.every(function (feature) {
      return advert.offer.features.includes(feature);
    });
  };


  var setFiltersToAdverts = function () {
    window.card.remove();

    var adverts = [];

    var features = Array.from(
        featuresContainer.querySelectorAll('input:checked'))
        .map(function (feature) {
          return feature.value;
        });

    for (var index = 0; index < window.data.adverts.length; index++) {
      var advert = window.data.adverts[index];
      if (filterByType(advert)
        && filterByPrice(advert)
        && filterByRooms(advert)
        && filterByGuests(advert)
        && filterByFeatures(advert, features)
      ) {
        adverts.push(index);
      }

      if (adverts.length === COUNT_PINS_ON_MAP) {
        break;
      }
    }

    window.pin.render(adverts);
  };

  var onFilterFormChange = function () {
    window.debounce(setFiltersToAdverts);
  };

  var setDisabled = function () {
    filterForm.reset();

    filters.forEach(function (field) {
      field.disabled = true;
    });

    featuresContainer.disabled = true;

    filterForm.removeEventListener('change', onFilterFormChange);
  };

  var setEnabled = function () {
    filters.forEach(function (field) {
      field.disabled = false;
    });

    featuresContainer.disabled = false;

    filterForm.addEventListener('change', onFilterFormChange);
  };

  window.filter = {
    setDisabled: setDisabled,
    setEnabled: setEnabled,
    setToAdverts: setFiltersToAdverts,
  };
})();
