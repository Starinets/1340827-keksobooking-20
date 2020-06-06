'use strict';

(function () {
  var PIN_X_GAP = 50 / 2;
  var PIN_Y_GAP = 70;
  var NUMBER_OF_ARRAY_ITEMS = 8;
  var TYPE_OF_RESIDENCE = ['palace', 'flat', 'house', 'bungalo'];
  var CHEKING_TIME = ['12: 00', '13: 00', '14: 00'];
  var TITLES = [
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
  var DESCRIPTIONS = [
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
  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var MAP = document.querySelector('.map');
  var MAP_PINS = document.querySelector('.map__pins');
  var MAP_FILTERS_CONTAINER = document.querySelector('.map__filters-container');
  var TEMPLATE_PIN = document.querySelector('#pin').content
    .querySelector('.map__pin');

  var TEMPLATE_CARD = document.querySelector('#card').content
    .querySelector('.map__card');

  var POPUP_AVATAR = TEMPLATE_CARD.querySelector('.popup__avatar');
  var POPUP_CLOSE = TEMPLATE_CARD.querySelector('.popup__close');
  var POPUP_TITLE = TEMPLATE_CARD.querySelector('.popup__title');
  var POPUP_ADDRESS = TEMPLATE_CARD.querySelector('.popup__text--address');
  var POPUP_PRICE = TEMPLATE_CARD.querySelector('.popup__text--price');
  var POPUP_PRICE_UNIT = POPUP_PRICE.querySelector('span');
  var POPUP_TYPE = TEMPLATE_CARD.querySelector('.popup__type');
  var POPUP_CAPACITY = TEMPLATE_CARD.querySelector('.popup__text--capacity');
  var POPUP_TIME = TEMPLATE_CARD.querySelector('.popup__text--time');
  var POPUP_FEATURES = TEMPLATE_CARD
      .querySelector('.popup__features').cloneNode(false);

  var POPUP_FEATURE_WIFI = TEMPLATE_CARD
      .querySelector('.popup__feature--wifi');
  var POPUP_FEATURE_DISHWASHER = TEMPLATE_CARD
      .querySelector('.popup__feature--dishwasher');
  var POPUP_FEATURE_PARKING = TEMPLATE_CARD
      .querySelector('.popup__feature--parking');
  var POPUP_FEATURE_WASHER = TEMPLATE_CARD
      .querySelector('.popup__feature--washer');
  var POPUP_FEATURE_ELEVATOR = TEMPLATE_CARD
      .querySelector('.popup__feature--elevator');
  var POPUP_FEATURE_CONDITIONER = TEMPLATE_CARD
      .querySelector('.popup__feature--conditioner');

  var POPUP_DESCRIPTION = TEMPLATE_CARD.querySelector('.popup__description');
  var POPUP_PHOTOS = TEMPLATE_CARD
      .querySelector('.popup__photos').cloneNode(false);
  var POPUP_PHOTO = TEMPLATE_CARD.querySelector('.popup__photo');

  /**
   * @param {Number} numberOfItems
   * @param {Array} setOfValues
   * @param {Boolean} isUnique - [true] returned array must contain not duplicated items
   */

  var generateUniqueArrayFromSet = function (numberOfItems, setOfValues, isUnique) {
    var copySetOfValues = setOfValues.slice();
    var uniqueItems = [];

    for (var index = 0; index < numberOfItems; index++) {
      var randomIndex = window.util.getRandomInteger(0, copySetOfValues.length - 1);
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
    var item = {
      'author': {
        'avatar': 'img/avatars/user' + avatarID + '.png',
      },
      'offer': {
        'title': 'заголовок предложения',
        'address': xPosition + ', ' + yPosition,
        'price': window.util.getRandomInteger(200, 3000),
        'type': TYPE_OF_RESIDENCE[window.util.getRandomInteger(0, 3)],
        'rooms': window.util.getRandomInteger(1, 5),
        'guests': window.util.getRandomInteger(1, 5),
        'checkin': CHEKING_TIME[window.util.getRandomInteger(0, 2)],
        'checkout': CHEKING_TIME[window.util.getRandomInteger(0, 2)],
        'features': generateUniqueArrayFromSet(
            window.util.getRandomInteger(0, FEATURES.length),
            FEATURES,
            true
        ),
        'description': 'Описание для объявления',
        'photos': generateUniqueArrayFromSet(
            window.util.getRandomInteger(1, 3),
            PHOTOS,
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

    var offsetWidth = MAP_PINS.offsetWidth;

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

  var rendeerMapPins = function (mockiData) {
    var fragment = document.createDocumentFragment();

    MAP.classList.remove('map--faded');

    mockiData.forEach(function (mockiItem) {
      fragment.appendChild(generateMapPin(TEMPLATE_PIN, mockiItem));
    });

    MAP_PINS.appendChild(fragment);
  };

  var getTypeOfResidence = function (residenceType) {
    switch (residenceType) {
      case 'palace':
        residenceType = 'Дворец';
        break;
      case 'flat':
        residenceType = 'Квартира';
        break;
      case 'house':
        residenceType = 'Дом';
        break;
      case 'bungalo':
        residenceType = 'Бунгало';
        break;
      default:
        residenceType = 'Квартира';
        break;
    }
    return residenceType;
  };

  var getFeature = function (feature) {
    switch (feature) {
      case 'wifi':
        feature = POPUP_FEATURE_WIFI;
        break;
      case 'dishwasher':
        feature = POPUP_FEATURE_DISHWASHER;
        break;
      case 'parking':
        feature = POPUP_FEATURE_PARKING;
        break;
      case 'washer':
        feature = POPUP_FEATURE_WASHER;
        break;
      case 'elevator':
        feature = POPUP_FEATURE_ELEVATOR;
        break;
      case 'conditioner':
        feature = POPUP_FEATURE_CONDITIONER;
        break;
      default:
        break;
    }
    return feature;

  };

  /* ----------------------- pin's card block generators ---------------------- */
  var addCardAvatar = function (mapCard, mockiItem) {
    if (mockiItem.author.avatar) {
      POPUP_AVATAR.src = mockiItem.author.avatar;
      mapCard.appendChild(POPUP_AVATAR);
    }
  };

  var addCardClose = function (mapCard) {
    mapCard.appendChild(POPUP_CLOSE);
  };

  var addCardTitle = function (mapCard, mockiItem, descriptionID) {
    if (mockiItem.offer.title) {
      POPUP_TITLE.textContent = TITLES[descriptionID];
      mapCard.appendChild(POPUP_TITLE);
    }
  };

  var addCardAddress = function (mapCard, mockiItem) {
    if (mockiItem.offer.address) {
      POPUP_ADDRESS.textContent = mockiItem.offer.address;
      mapCard.appendChild(POPUP_ADDRESS);
    }
  };

  var addCardPrice = function (mapCard, mockiItem) {
    if (mockiItem.offer.price) {
      POPUP_PRICE.innerHTML = Number(mockiItem.offer.price) + '&#x20bd;';
      POPUP_PRICE_UNIT.textContent = '/ночь';
      POPUP_PRICE.appendChild(POPUP_PRICE_UNIT);
      mapCard.appendChild(POPUP_PRICE);
    }
  };

  var addCardType = function (mapCard, mockiItem) {
    if (mockiItem.offer.type) {
      POPUP_TYPE.textContent = getTypeOfResidence(mockiItem.offer.type);
      mapCard.appendChild(POPUP_TYPE);
    }
  };

  var addCardCapacity = function (mapCard, mockiItem) {
    if (mockiItem.offer.rooms && mockiItem.offer.guests) {
      POPUP_CAPACITY.textContent = mockiItem.offer.rooms + ' комнаты для '
      + mockiItem.offer.guests + ' гостей.';
      mapCard.appendChild(POPUP_CAPACITY);
    }
  };

  var addCardTime = function (mapCard, mockiItem) {
    if (mockiItem.offer.checkin && mockiItem.offer.checkout) {
      POPUP_TIME.textContent = 'Заезд после ' + mockiItem.offer.checkin
      + ', выезд до ' + mockiItem.offer.checkout + '.';
      mapCard.appendChild(POPUP_TIME);
    }
  };

  var addCardFeatures = function (mapCard, mockiItem) {
    if (mockiItem.offer.features.length) {
      mockiItem.offer.features.forEach(function (feature) {
        POPUP_FEATURES.appendChild(getFeature(feature).cloneNode(true));
      });

      mapCard.appendChild(POPUP_FEATURES);
    }
  };

  var addCardDescription = function (mapCard, mockiItem, descriptionID) {
    if (mockiItem.offer.description) {
      POPUP_DESCRIPTION.textContent = DESCRIPTIONS[descriptionID];
      mapCard.appendChild(POPUP_DESCRIPTION);
    }
  };

  var addCardPhotos = function (mapCard, mockiItem) {
    if (mockiItem.offer.photos.length) {
      mockiItem.offer.photos.forEach(function (photoSrc) {
        POPUP_PHOTO.src = photoSrc;
        POPUP_PHOTOS.appendChild(POPUP_PHOTO.cloneNode(true));
      });

      mapCard.appendChild(POPUP_PHOTOS);
    }
  };

  var renderMapCard = function (mockiItem) {
    var mapCard = TEMPLATE_CARD.cloneNode(false);
    var descriptionID = window.util.getRandomInteger(0, DESCRIPTIONS.length - 1);

    addCardAvatar(mapCard, mockiItem);
    addCardClose(mapCard);
    addCardTitle(mapCard, mockiItem, descriptionID);
    addCardAddress(mapCard, mockiItem);
    addCardPrice(mapCard, mockiItem);
    addCardType(mapCard, mockiItem);
    addCardCapacity(mapCard, mockiItem);
    addCardTime(mapCard, mockiItem);
    addCardFeatures(mapCard, mockiItem);
    addCardDescription(mapCard, mockiItem, descriptionID);
    addCardPhotos(mapCard, mockiItem);

    MAP.insertBefore(
        mapCard,
        MAP_FILTERS_CONTAINER
    );
  };

  var mockiData = generateMocki();

  rendeerMapPins(mockiData);

  renderMapCard(mockiData[0]);

})();
