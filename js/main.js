'use strict';

(function () {
  var PIN_X_GAP = 50 / 2;
  var PIN_Y_GAP = 70;
  var PIN_MAIN_X_GAP = 65 / 2;
  var PIN_MAIN_Y_GAP = 87;
  var NUMBER_OF_ARRAY_ITEMS = 8;

  var TYPES_OF_RESIDENCE = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKIN_TIMES = ['12: 00', '13: 00', '14: 00'];
  var ADVERT_TITLES = [
    'Уютное гнездышко для молодоженов',
    'Маленькая квартирка рядом с парком',
    'Небольшая лавочка в парке',
    'Императорский дворец в центре Токио',
    'Милейший чердачок',
    'Наркоманский притон',
    'Чёткая хата',
    'Стандартная квартира в центре',
    'Тихая квартирка недалеко от метро',
    'Милое гнездышко для фанатов Анимэ',
  ];
  var ADVERT_DESCRIPTIONS = [
    'Великолепный таун-хауз в центре Токио. Подходит как туристам, так и бизнесменам. Дом полностью укомплектован и имеет свежий ремонт.',
    'Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.',
    'Великолепная лавочка прямо в центре парка. Подходит для всех кто любит спать на свежем воздухе.',
    'Замечательный дворец в старинном центре города. Только для тех кто может себе позволить дворец. Лакеев и прочих жокеев просим не беспокоить.',
    'Маленькая квартирка на чердаке. Для самых не требовательных.',
    'У нас есть всё! Шприцы, интернет, кофе. Для всех кто знает толк в отдыхе. Полицию просим не беспокоить.',
    'У нас тут все ништяк. Ларек за углом. Шава 24 часа. Приезжайте! Интернетов нет!',
    'Тут красиво, светло и уютно. Есть где разместиться компании из 5 человек. Кофе и печеньки бесплатно.',
    'Квартира на первом этаже. Соседи тихие. Для всех, кто терпеть не может шума и суеты.',
    'Азиатов просьба не беспокоить.'
  ];
  var ADVERT_FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var ADVERT_PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var mapContainer = document.querySelector('.map');
  var mapPinsContainer = mapContainer.querySelector('.map__pins');
  // var mapFilterContainer = mapContainer.querySelector('.map__filters-container');
  var templatePin = document.querySelector('#pin').content.children[0];
  // var templateCard = document.querySelector('#card').content.children[0];

  // var popupAvatar = templateCard.querySelector('.popup__avatar');
  // var popupClose = templateCard.querySelector('.popup__close');
  // var popupTitle = templateCard.querySelector('.popup__title');
  // var popupAddress = templateCard.querySelector('.popup__text--address');
  // var popupPrice = templateCard.querySelector('.popup__text--price');
  // var popupPriceUnit = popupPrice.children[0];
  // var popupType = templateCard.querySelector('.popup__type');
  // var popupCapacity = templateCard.querySelector('.popup__text--capacity');
  // var popupTime = templateCard.querySelector('.popup__text--time');
  // var popupFeaturesContainer = templateCard
  //     .querySelector('.popup__features').cloneNode(false);

  // var popupFeatureWifi = templateCard
  //     .querySelector('.popup__feature--wifi');
  // var popupFeatureDishwasher = templateCard
  //     .querySelector('.popup__feature--dishwasher');
  // var popupFeatureParking = templateCard
  //     .querySelector('.popup__feature--parking');
  // var popupFeatureWasher = templateCard
  //     .querySelector('.popup__feature--washer');
  // var popupFeatureElevator = templateCard
  //     .querySelector('.popup__feature--elevator');
  // var popupFeatureConditioner = templateCard
  //     .querySelector('.popup__feature--conditioner');

  // var popupDescription = templateCard.querySelector('.popup__description');
  // var popupPhotosContainer = templateCard
  //     .querySelector('.popup__photos').cloneNode(false);
  // var popupPhoto = templateCard.querySelector('.popup__photo');

  /**
   * @param {Number} numberOfItems
   * @param {Array} setOfValues
   * @param {Boolean} isUnique - [true] returned array must contain not duplicated items
   */

  var generateUniqueArrayFromSet = function (numberOfItems, setOfValues, isUnique) {
    var copySetOfValues = setOfValues.slice();
    var uniqueItems = [];

    for (var index = 0; index < numberOfItems; index++) {
      var randomIndex = window
        .util
        .getRandomInteger(0, copySetOfValues.length - 1);
      var itemOfSet = copySetOfValues[randomIndex];

      uniqueItems.push(itemOfSet);

      if (isUnique) {
        copySetOfValues.splice(randomIndex, 1);
      }
    }

    return uniqueItems;
  };

  /**
   * @param {Number} numberOfItems
   * @param {Number} minimum
   * @param {Number} maximum
   */

  var generateUniqueArrayOfInteger = function (numberOfItems, minimum, maximum) {
    var arrayOfIntegers = [];
    var index = 0;

    while (index < numberOfItems) {
      var randomInteger = window.util.getRandomInteger(minimum, maximum);

      if (arrayOfIntegers.indexOf(randomInteger) === -1) {
        arrayOfIntegers.push(randomInteger);

        index++;
      }
    }

    return arrayOfIntegers;
  };

  var generateMokiItem = function (avatarID, xPosition, yPosition) {
    var descriptionID = window
      .util
      .getRandomInteger(0, ADVERT_DESCRIPTIONS.length - 1);

    var item = {
      'author': {
        'avatar': 'img/avatars/user' + avatarID + '.png',
      },
      'offer': {
        'title': ADVERT_TITLES[descriptionID],
        'address': xPosition + ', ' + yPosition,
        'price': window.util.getRandomInteger(200, 3000),
        'type': TYPES_OF_RESIDENCE[window.util.getRandomInteger(0, 3)],
        'rooms': window.util.getRandomInteger(1, 5),
        'guests': window.util.getRandomInteger(1, 5),
        'checkin': CHECKIN_TIMES[window.util.getRandomInteger(0, 2)],
        'checkout': CHECKIN_TIMES[window.util.getRandomInteger(0, 2)],
        'features': generateUniqueArrayFromSet(
            window.util.getRandomInteger(0, ADVERT_FEATURES.length),
            ADVERT_FEATURES,
            true
        ),
        'description': ADVERT_DESCRIPTIONS[descriptionID],
        'photos': generateUniqueArrayFromSet(
            window.util.getRandomInteger(1, 3),
            ADVERT_PHOTOS,
            true
        ),
      },
      'location': {
        'x': xPosition,
        'y': yPosition,
      }
    };

    return item;
  };

  var generateMapPin = function (template, mockiItem) {
    var mapPin = template.cloneNode(true);

    mapPin.style.left = mockiItem.location.x - PIN_X_GAP + 'px';
    mapPin.style.top = mockiItem.location.y - PIN_Y_GAP + 'px';
    mapPin.children[0].src = mockiItem.author.avatar;
    mapPin.children[0].alt = mockiItem.offer.title;

    return mapPin;
  };

  var generateMocki = function () {
    var mockiData = [];

    var avatarIDArray = generateUniqueArrayOfInteger(
        NUMBER_OF_ARRAY_ITEMS,
        1,
        8
    );

    var offsetWidth = mapPinsContainer.offsetWidth;

    for (var index = 0; index < NUMBER_OF_ARRAY_ITEMS; index++) {
      var avatarID = ('0' + avatarIDArray[index]).slice(-2);
      var xPosition = window.util.getRandomInteger(
          0,
          offsetWidth
      );
      var yPosition = window.util.getRandomInteger(130, 630);

      mockiData.push(generateMokiItem(avatarID, xPosition, yPosition));
    }

    return mockiData;
  };

  var renderMapPins = function (mockiData) {
    var fragment = document.createDocumentFragment();

    mockiData.forEach(function (mockiItem) {
      fragment.appendChild(generateMapPin(templatePin, mockiItem));
    });

    mapPinsContainer.appendChild(fragment);
  };

  // var getTypeOfResidence = function (residenceType) {
  //   switch (residenceType) {
  //     case 'palace':
  //       residenceType = 'Дворец';
  //       break;
  //     case 'flat':
  //       residenceType = 'Квартира';
  //       break;
  //     case 'house':
  //       residenceType = 'Дом';
  //       break;
  //     case 'bungalo':
  //       residenceType = 'Бунгало';
  //       break;
  //     default:
  //       residenceType = 'Квартира';
  //       break;
  //   }
  //   return residenceType;
  // };

  // var getFeature = function (feature) {
  //   switch (feature) {
  //     case 'wifi':
  //       feature = popupFeatureWifi;
  //       break;
  //     case 'dishwasher':
  //       feature = popupFeatureDishwasher;
  //       break;
  //     case 'parking':
  //       feature = popupFeatureParking;
  //       break;
  //     case 'washer':
  //       feature = popupFeatureWasher;
  //       break;
  //     case 'elevator':
  //       feature = popupFeatureElevator;
  //       break;
  //     case 'conditioner':
  //       feature = popupFeatureConditioner;
  //       break;
  //     default:
  //       break;
  //   }
  //   return feature;

  // };

  /* ----------------------- pin's card block generators ---------------------- */
  // var addCardAvatar = function (mapCard, mockiItem) {
  //   if (mockiItem.author.avatar) {
  //     popupAvatar.src = mockiItem.author.avatar;
  //     mapCard.appendChild(popupAvatar);
  //   }
  // };

  // var addCardClose = function (mapCard) {
  //   mapCard.appendChild(popupClose);
  // };

  // var addCardTitle = function (mapCard, mockiItem) {
  //   if (mockiItem.offer.title) {
  //     popupTitle.textContent = mockiItem.offer.title;
  //     mapCard.appendChild(popupTitle);
  //   }
  // };

  // var addCardAddress = function (mapCard, mockiItem) {
  //   if (mockiItem.offer.address) {
  //     popupAddress.textContent = mockiItem.offer.address;
  //     mapCard.appendChild(popupAddress);
  //   }
  // };

  // var addCardPrice = function (mapCard, mockiItem) {
  //   if (mockiItem.offer.price) {
  //     popupPrice.innerHTML = Number(mockiItem.offer.price) + '&#x20bd;';
  //     popupPriceUnit.textContent = '/ночь';
  //     popupPrice.appendChild(popupPriceUnit);
  //     mapCard.appendChild(popupPrice);
  //   }
  // };

  // var addCardType = function (mapCard, mockiItem) {
  //   if (mockiItem.offer.type) {
  //     popupType.textContent = getTypeOfResidence(mockiItem.offer.type);
  //     mapCard.appendChild(popupType);
  //   }
  // };

  // var addCardCapacity = function (mapCard, mockiItem) {
  //   if (mockiItem.offer.rooms && mockiItem.offer.guests) {
  //     popupCapacity.textContent = mockiItem.offer.rooms + ' комнаты для '
  //     + mockiItem.offer.guests + ' гостей.';
  //     mapCard.appendChild(popupCapacity);
  //   }
  // };

  // var addCardTime = function (mapCard, mockiItem) {
  //   if (mockiItem.offer.checkin && mockiItem.offer.checkout) {
  //     popupTime.textContent = 'Заезд после ' + mockiItem.offer.checkin
  //     + ', выезд до ' + mockiItem.offer.checkout + '.';
  //     mapCard.appendChild(popupTime);
  //   }
  // };

  // var addCardFeatures = function (mapCard, mockiItem) {
  //   if (mockiItem.offer.features.length) {
  //     mockiItem.offer.features.forEach(function (feature) {
  //       popupFeaturesContainer.appendChild(getFeature(feature).cloneNode(true));
  //     });

  //     mapCard.appendChild(popupFeaturesContainer);
  //   }
  // };

  // var addCardDescription = function (mapCard, mockiItem) {
  //   if (mockiItem.offer.description) {
  //     popupDescription.textContent = mockiItem.offer.description;
  //     mapCard.appendChild(popupDescription);
  //   }
  // };

  // var addCardPhotos = function (mapCard, mockiItem) {
  //   if (mockiItem.offer.photos.length) {
  //     mockiItem.offer.photos.forEach(function (photoSrc) {
  //       popupPhoto.src = photoSrc;
  //       popupPhotosContainer.appendChild(popupPhoto.cloneNode(true));
  //     });

  //     mapCard.appendChild(popupPhotosContainer);
  //   }
  // };

  // var renderMapCard = function (mockiItem) {
  //   var mapCard = templateCard.cloneNode(false);

  //   addCardAvatar(mapCard, mockiItem);
  //   addCardClose(mapCard);
  //   addCardTitle(mapCard, mockiItem);
  //   addCardAddress(mapCard, mockiItem);
  //   addCardPrice(mapCard, mockiItem);
  //   addCardType(mapCard, mockiItem);
  //   addCardCapacity(mapCard, mockiItem);
  //   addCardTime(mapCard, mockiItem);
  //   addCardFeatures(mapCard, mockiItem);
  //   addCardDescription(mapCard, mockiItem);
  //   addCardPhotos(mapCard, mockiItem);

  //   mapContainer.insertBefore(
  //       mapCard,
  //       mapFilterContainer
  //   );
  // };

  var mockiData = generateMocki();

  // renderMapCard(mockiData[0]);

  var advertForm = document.querySelector('.ad-form');
  var advertFields = advertForm.querySelectorAll('.ad-form__element');

  var advertAvatar = advertForm.querySelector('#avatar');
  var advertTitle = advertForm.querySelector('#title');
  var advertAddress = advertForm.querySelector('#address');
  var advertPrice = advertForm.querySelector('#price');
  var advertCheckin = document.querySelector('#timein');
  var advertCheckout = document.querySelector('#timeout');
  var advertRoomsCount = document.querySelector('#room_number');
  var advertGuestsCount = document.querySelector('#capacity');
  var advertType = document.querySelector('#type');
  var advertImages = advertForm.querySelector('#images');

  var mapFilerForm = document.querySelector('.map__filters');
  var mapFilters = mapFilerForm.querySelectorAll('.map__filter');
  var mapFeatures = mapFilerForm.querySelector('.map__features');

  var mapPinMain = document.querySelector('.map__pin--main');

  var ADVERT_SETTINGS = {
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
    minPriceType: {
      bungalo: 0,
      house: 5000,
      flat: 1000,
      palace: 10000,
    },
  };

  var ConformityRoomsGuests = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0'],
  };

  var MOUSE_LEFT_BUTTON = 0;

  var EventKeyCode = {
    ENTER: 'Enter',
    NUMPAD_ENTER: 'NumpadEnter',
    ESCAPE: 'Escape',
  };

  var setFormFieldsDisable = function (fields, state) {
    fields.forEach(function (field) {
      field.disabled = state;
    });
  };

  var setAdvertFiltersDisabled = function () {
    advertForm.classList.add('ad-form--disabled');
    advertAvatar.disabled = true;
    setFormFieldsDisable(advertFields, true);
  };

  var setAdvertFiltersEnabled = function () {
    advertForm.classList.remove('ad-form--disabled');
    advertAvatar.disabled = false;
    setFormFieldsDisable(advertFields, false);
  };

  var setMapDisbled = function () {
    mapContainer.classList.add('map--faded');
    mapFilerForm.classList.add('ad-form--disabled');
    mapFeatures.disabled = true;
    setFormFieldsDisable(mapFilters, true);

  };

  var setMapEnabled = function () {
    mapContainer.classList.remove('map--faded');
    mapFilerForm.classList.remove('ad-form--disabled');
    mapFeatures.disabled = false;
    setFormFieldsDisable(mapFilters, false);

    renderMapPins(mockiData);

    setAdvertFiltersEnabled();

    mapPinMain.removeEventListener('mousedown', onMapPinMainMousedown);
    mapPinMain.removeEventListener('keydown', onMapPinMainKeydown);
  };

  var isEnterEvent = function (evt) {
    return evt.code === EventKeyCode.ENTER
        || evt.code === EventKeyCode.NUMPAD_ENTER;
  };

  var onMapPinMainMousedown = function (evt) {
    if (evt.button === MOUSE_LEFT_BUTTON) {
      setMapEnabled();
    }
  };

  var onMapPinMainKeydown = function (evt) {
    if (isEnterEvent(evt)) {
      setMapEnabled();
    }
  };

  var configureAdvertFields = function () {
    advertForm.action = ADVERT_SETTINGS.form.action;

    advertAvatar.accept = ADVERT_SETTINGS.avatar.accept;

    advertTitle.required = ADVERT_SETTINGS.title.required;
    advertTitle.minLength = ADVERT_SETTINGS.title.minLength;
    advertTitle.maxLength = ADVERT_SETTINGS.title.maxLength;

    advertPrice.required = ADVERT_SETTINGS.price.required;
    advertPrice.max = ADVERT_SETTINGS.price.maxValue;

    advertAddress.readOnly = ADVERT_SETTINGS.address.readOnly;

    advertGuestsCount.required = ADVERT_SETTINGS.guestsCount.required;

    advertImages.accept = ADVERT_SETTINGS.avatar.images;
  };

  var setPinMainAddress = function () {
    var pinX = Math.round(parseInt(mapPinMain.style.left, 10) + PIN_MAIN_X_GAP);
    var pinY = Math.round(parseInt(mapPinMain.style.top, 10) + PIN_MAIN_Y_GAP);

    advertAddress.value = pinX + ', ' + pinY;
  };

  var validateGuestsCount = function () {
    var validGuestsOptions = ConformityRoomsGuests[advertRoomsCount.value];
    var guests = advertGuestsCount.value;
    var errorMessage = '';

    if (validGuestsOptions.indexOf(guests) === -1) {
      switch (advertRoomsCount.value) {
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
    advertGuestsCount.setCustomValidity(errorMessage);
  };

  var setMinPriceForApartment = function () {
    advertPrice.min = advertPrice.placeholder =
      ADVERT_SETTINGS.minPriceType[advertType.value];
  };

  var onAdvertRoomsCountChange = function () {
    validateGuestsCount();
  };

  var onAdvertGuestCountChange = function () {
    validateGuestsCount();
  };

  var onAdvertTypeChange = function () {
    setMinPriceForApartment();
  };

  var onAdvertCheckinChange = function () {
    advertCheckout.value = advertCheckin.value;
  };

  var onAdvertCheckoutChange = function () {
    advertCheckin.value = advertCheckout.value;
  };

  configureAdvertFields();

  setAdvertFiltersDisabled();
  setMapDisbled();
  setPinMainAddress();
  setMinPriceForApartment();
  validateGuestsCount();

  mapPinMain.addEventListener('mousedown', onMapPinMainMousedown);
  mapPinMain.addEventListener('keydown', onMapPinMainKeydown);

  advertRoomsCount.addEventListener('change', onAdvertRoomsCountChange);
  advertGuestsCount.addEventListener('change', onAdvertGuestCountChange);
  advertType.addEventListener('change', onAdvertTypeChange);
  advertCheckin.addEventListener('change', onAdvertCheckinChange);
  advertCheckout.addEventListener('change', onAdvertCheckoutChange);
})();
