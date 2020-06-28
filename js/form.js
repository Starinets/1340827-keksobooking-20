'use strict';

(function () {
  var SETTING = {
    form: {
      action: 'https://javascript.pages.academy/keksobooking'
    },
    avatar: {
      accept: 'image/png, image/jpeg',
    },
    title: {
      minLength: 30,
      maxLength: 100,
    },
    price: {
      maxValue: 1000000,
    },
    address: {
      readOnly: true,
    },
    images: {
      accept: 'image/png, image/jpeg',
    },
  };

  var DefaultValue = {
    TYPE: 'flat',
    ROOMS: 1,
    GUESTS: 3,
    TIMEIN: '12:00',
    TIMEOUT: '12:00',
  };

  var typeToMinPrice = {
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

  var form = document.querySelector('.ad-form');
  var fields = form.querySelectorAll('.ad-form__element');
  var inputFields = form.querySelectorAll('input[type="text"], input[type="number"], textarea');
  var checkboxFields = form.querySelectorAll('input[type="checkbox"]');

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

  var resetFields = function () {
    inputFields.forEach(function (field) {
      field.value = '';
    });

    checkboxFields.forEach(function (field) {
      field.checked = false;
    });

    type.value = DefaultValue.TYPE;
    price.min = price.placeholder = typeToMinPrice[type.value];
    roomsCount.value = DefaultValue.ROOMS;
    guestsCount.value = DefaultValue.GUESTS;
    checkin.value = DefaultValue.TIMEIN;
    checkout.value = DefaultValue.TIMEOUT;
  };

  var removeEventListeners = function () {
    form.removeEventListener('submit', onFormSubmit);
    form.removeEventListener('reset', onFormReset);
    title.removeEventListener('change', onTitleChange);
    price.removeEventListener('change', onPriceChange);
    roomsCount.removeEventListener('change', onRoomsCountChange);
    guestsCount.removeEventListener('change', onGuestCountChange);
    type.removeEventListener('change', onTypeChange);
    checkin.removeEventListener('change', onCheckinChange);
    checkout.removeEventListener('change', onCheckoutChange);
  };

  var addEventListeners = function () {
    form.addEventListener('submit', onFormSubmit);
    form.addEventListener('reset', onFormReset);
    title.addEventListener('change', onTitleChange);
    price.addEventListener('change', onPriceChange);
    roomsCount.addEventListener('change', onRoomsCountChange);
    guestsCount.addEventListener('change', onGuestCountChange);
    type.addEventListener('change', onTypeChange);
    checkin.addEventListener('change', onCheckinChange);
    checkout.addEventListener('change', onCheckoutChange);
  };

  var setFieldsDisable = function (disabled) {
    avatar.disabled = disabled;

    fields.forEach(function (field) {
      field.disabled = disabled;
    });

    if (disabled) {
      form.classList.add('ad-form--disabled');
      removeEventListeners();
      resetFields();
    } else {
      form.classList.remove('ad-form--disabled');
      addEventListeners();

      configureFields();
    }
  };

  var configureFields = function () {
    form.action = SETTING.form.action;
    avatar.accept = SETTING.avatar.accept;
    price.max = SETTING.price.maxValue;
    address.readOnly = SETTING.address.readOnly;
    images.accept = SETTING.images.accept;

    setMinPriceForApartment();
    validateTitle();
    validatePrice();
    validateGuestsCount();
  };

  var validateTitle = function () {
    var errorMessage = '';

    if (title.value.length < SETTING.title.minLength
      || title.value.length > SETTING.title.maxLength) {
      errorMessage = 'Минимальная длина — 30 символов, максимальная длина — 100 символов';
    }
    title.setCustomValidity(errorMessage);
  };

  var validatePrice = function () {
    var errorMessage = '';

    if (price.value < price.min || price.value > price.max) {
      errorMessage = 'Стоимость должна быть не менее ' + price.min
          + ' и не более ' + price.max;
    }
    price.setCustomValidity(errorMessage);
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
    price.min = price.placeholder = typeToMinPrice[type.value];
  };

  var onTitleChange = function () {
    validateTitle();
  };

  var onPriceChange = function () {
    validatePrice();
  };

  var onRoomsCountChange = function () {
    validateGuestsCount();
  };

  var onGuestCountChange = function () {
    validateGuestsCount();
  };

  var onTypeChange = function () {
    setMinPriceForApartment();
    validatePrice();
  };

  var onCheckinChange = function () {
    checkout.value = checkin.value;
  };

  var onCheckoutChange = function () {
    checkin.value = checkout.value;
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();

    var onLoad = function (response) {
      window.map.setDisabled();
      setFieldsDisable(true);
      window.card.remove();
      window.pin.remove();
      window.mainPin.reset();
      window.mainPin.setAddress();

      window.message.showLoadSuccess(response);
    };

    var onError = function (error) {
      window.message.showLoadError(error);
    };

    var data = new FormData(form);

    window.backend.save(data, onLoad, onError);
  };

  var onFormReset = function (evt) {
    evt.preventDefault();

    window.map.setDisabled();
    setFieldsDisable(true);
    window.card.remove();
    window.pin.remove();
    window.mainPin.reset();
    window.mainPin.setAddress();
    window.data.adverts = [];
  };

  configureFields();

  window.form = {
    setDisable: setFieldsDisable,
    setAddress: setAddress,
  };
})();
