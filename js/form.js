'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var fields = form.querySelectorAll('.ad-form__element');

  var avatar = form.querySelector('#avatar');
  var title = form.querySelector('#title');
  var address = form.querySelector('#address');
  var price = form.querySelector('#price');
  var checkin = form.querySelector('#timein');
  var checkout = form.querySelector('#timeout');
  var roomsCount = form.querySelector('#room_number');
  var guestsCount = form.querySelector('#capacity');
  var type = form.querySelector('#type');
  var images = form.querySelector('#images');

  var SETTINGS = {
    form: {
      action: 'https://javascript.pages.academy/keksobooking'
    },
    avatar: {
      accept: 'image/png, image/jpeg',
    },
    title: {
      required: true,
      minLength: 30,
      maxLength: 100,
    },
    price: {
      required: true,
      maxValue: 1000000,
    },
    address: {
      readOnly: true,
    },
    guestsCount: {
      required: true,
    },
    images: {
      accept: 'image/png, image/jpeg',
    },
  };

  var typesToMinPrice = {
    bungalo: 0,
    house: 5000,
    flat: 1000,
    palace: 10000,
  };

  var roomsToGuests = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0'],
  };

  var setFieldsDisable = function (disabled) {
    avatar.disabled = disabled;

    fields.forEach(function (field) {
      field.disabled = disabled;
    });

    if (disabled) {
      form.classList.add('ad-form--disabled');
    } else {
      form.classList.remove('ad-form--disabled');
    }
  };

  var configureFields = function () {
    form.action = SETTINGS.form.action;

    avatar.accept = SETTINGS.avatar.accept;

    title.required = SETTINGS.title.required;
    title.minLength = SETTINGS.title.minLength;
    title.maxLength = SETTINGS.title.maxLength;

    price.required = SETTINGS.price.required;
    price.max = SETTINGS.price.maxValue;

    address.readOnly = SETTINGS.address.readOnly;

    guestsCount.required = SETTINGS.guestsCount.required;

    images.accept = SETTINGS.images.accept;
  };

  var validateGuestsCount = function () {
    var validGuestsOptions = roomsToGuests[roomsCount.value];
    var errorMessage = '';

    if (validGuestsOptions.indexOf(guestsCount.value) === -1) {
      switch (roomsCount.value) {
        case '1':
          errorMessage = 'Можно выбрать только 1го гостя';
          break;
        case '2':
          errorMessage = 'Можно выбрать 2х или 1го гостя';
          break;
        case '3':
          errorMessage = 'Можно выбрать 3х, 2х или 1го гостя';
          break;
        case '100':
          errorMessage = 'Не для гостей';
          break;
        default:
          errorMessage = 'Не верно заполнено поле';
          break;
      }
    }
    guestsCount.setCustomValidity(errorMessage);
  };

  var setAddress = function (value) {
    address.value = value;
  };

  var setMinPriceForApartment = function () {
    price.min = price.placeholder = typesToMinPrice[type.value];
  };

  var onRoomsCountChange = function () {
    validateGuestsCount();
  };

  var onGuestCountChange = function () {
    validateGuestsCount();
  };

  var onTypeChange = function () {
    setMinPriceForApartment();
  };

  var onCheckinChange = function () {
    checkout.value = checkin.value;
  };

  var onCheckoutChange = function () {
    checkin.value = checkout.value;
  };

  configureFields();

  setFieldsDisable(true);

  setMinPriceForApartment();
  validateGuestsCount();

  roomsCount.addEventListener('change', onRoomsCountChange);
  guestsCount.addEventListener('change', onGuestCountChange);
  type.addEventListener('change', onTypeChange);
  checkin.addEventListener('change', onCheckinChange);
  checkout.addEventListener('change', onCheckoutChange);

  window.form = {
    setDisable: setFieldsDisable,
    setAddress: setAddress,
  };
})();
