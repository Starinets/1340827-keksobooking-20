'use strict';

(function () {
  var PIN_X_GAP = 50 / 2;
  var PIN_Y_GAP = 70;
  var NUMBER_OF_ARRAY_ITEMS = 8;

  var typesOfResidence = ['palace', 'flat', 'house', 'bungalo'];
  var checkinTimes = ['12: 00', '13: 00', '14: 00'];
  var avdertTitles = [
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
  var advertDescriptions = [
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
  var advertFeatures = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var advertPhotos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var mapContainer = document.querySelector('.map');
  var mapPinsContainer = mapContainer.querySelector('.map__pins');
  var mapFilterContainer = mapContainer.querySelector('.map__filters-container');
  var templatePin = document.querySelector('#pin').content.children[0];
  var templateCard = document.querySelector('#card').content.children[0];

  var popupAvatar = templateCard.querySelector('.popup__avatar');
  var popupClose = templateCard.querySelector('.popup__close');
  var popupTitle = templateCard.querySelector('.popup__title');
  var popupAddress = templateCard.querySelector('.popup__text--address');
  var popupPrice = templateCard.querySelector('.popup__text--price');
  var popupPriceUnit = popupPrice.children[0];
  var popupType = templateCard.querySelector('.popup__type');
  var popupCapacity = templateCard.querySelector('.popup__text--capacity');
  var popupTime = templateCard.querySelector('.popup__text--time');
  var popupFeaturesContainer = templateCard
      .querySelector('.popup__features').cloneNode(false);

  var popupFeatureWifi = templateCard
      .querySelector('.popup__feature--wifi');
  var popupFeatureDishwasher = templateCard
      .querySelector('.popup__feature--dishwasher');
  var popupFeatureParking = templateCard
      .querySelector('.popup__feature--parking');
  var popupFeatureWasher = templateCard
      .querySelector('.popup__feature--washer');
  var popupFeatureElevator = templateCard
      .querySelector('.popup__feature--elevator');
  var popupFeatureConditioner = templateCard
      .querySelector('.popup__feature--conditioner');

  var popupDescription = templateCard.querySelector('.popup__description');
  var popupPhotosContainer = templateCard
      .querySelector('.popup__photos').cloneNode(false);
  var popupPhoto = templateCard.querySelector('.popup__photo');

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
    var descriptionID = window.util.getRandomInteger(0, advertDescriptions.length - 1);

    var item = {
      'author': {
        'avatar': 'img/avatars/user' + avatarID + '.png',
      },
      'offer': {
        'title': avdertTitles[descriptionID],
        'address': xPosition + ', ' + yPosition,
        'price': window.util.getRandomInteger(200, 3000),
        'type': typesOfResidence[window.util.getRandomInteger(0, 3)],
        'rooms': window.util.getRandomInteger(1, 5),
        'guests': window.util.getRandomInteger(1, 5),
        'checkin': checkinTimes[window.util.getRandomInteger(0, 2)],
        'checkout': checkinTimes[window.util.getRandomInteger(0, 2)],
        'features': generateUniqueArrayFromSet(
            window.util.getRandomInteger(0, advertFeatures.length),
            advertFeatures,
            true
        ),
        'description': advertDescriptions[descriptionID],
        'photos': generateUniqueArrayFromSet(
            window.util.getRandomInteger(1, 3),
            advertPhotos,
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
        feature = popupFeatureWifi;
        break;
      case 'dishwasher':
        feature = popupFeatureDishwasher;
        break;
      case 'parking':
        feature = popupFeatureParking;
        break;
      case 'washer':
        feature = popupFeatureWasher;
        break;
      case 'elevator':
        feature = popupFeatureElevator;
        break;
      case 'conditioner':
        feature = popupFeatureConditioner;
        break;
      default:
        break;
    }
    return feature;

  };

  /* ----------------------- pin's card block generators ---------------------- */
  var addCardAvatar = function (mapCard, mockiItem) {
    if (mockiItem.author.avatar) {
      popupAvatar.src = mockiItem.author.avatar;
      mapCard.appendChild(popupAvatar);
    }
  };

  var addCardClose = function (mapCard) {
    mapCard.appendChild(popupClose);
  };

  var addCardTitle = function (mapCard, mockiItem) {
    if (mockiItem.offer.title) {
      popupTitle.textContent = mockiItem.offer.title;
      mapCard.appendChild(popupTitle);
    }
  };

  var addCardAddress = function (mapCard, mockiItem) {
    if (mockiItem.offer.address) {
      popupAddress.textContent = mockiItem.offer.address;
      mapCard.appendChild(popupAddress);
    }
  };

  var addCardPrice = function (mapCard, mockiItem) {
    if (mockiItem.offer.price) {
      popupPrice.innerHTML = Number(mockiItem.offer.price) + '&#x20bd;';
      popupPriceUnit.textContent = '/ночь';
      popupPrice.appendChild(popupPriceUnit);
      mapCard.appendChild(popupPrice);
    }
  };

  var addCardType = function (mapCard, mockiItem) {
    if (mockiItem.offer.type) {
      popupType.textContent = getTypeOfResidence(mockiItem.offer.type);
      mapCard.appendChild(popupType);
    }
  };

  var addCardCapacity = function (mapCard, mockiItem) {
    if (mockiItem.offer.rooms && mockiItem.offer.guests) {
      popupCapacity.textContent = mockiItem.offer.rooms + ' комнаты для '
      + mockiItem.offer.guests + ' гостей.';
      mapCard.appendChild(popupCapacity);
    }
  };

  var addCardTime = function (mapCard, mockiItem) {
    if (mockiItem.offer.checkin && mockiItem.offer.checkout) {
      popupTime.textContent = 'Заезд после ' + mockiItem.offer.checkin
      + ', выезд до ' + mockiItem.offer.checkout + '.';
      mapCard.appendChild(popupTime);
    }
  };

  var addCardFeatures = function (mapCard, mockiItem) {
    if (mockiItem.offer.features.length) {
      mockiItem.offer.features.forEach(function (feature) {
        popupFeaturesContainer.appendChild(getFeature(feature).cloneNode(true));
      });

      mapCard.appendChild(popupFeaturesContainer);
    }
  };

  var addCardDescription = function (mapCard, mockiItem) {
    if (mockiItem.offer.description) {
      popupDescription.textContent = mockiItem.offer.description;
      mapCard.appendChild(popupDescription);
    }
  };

  var addCardPhotos = function (mapCard, mockiItem) {
    if (mockiItem.offer.photos.length) {
      mockiItem.offer.photos.forEach(function (photoSrc) {
        popupPhoto.src = photoSrc;
        popupPhotosContainer.appendChild(popupPhoto.cloneNode(true));
      });

      mapCard.appendChild(popupPhotosContainer);
    }
  };

  var renderMapCard = function (mockiItem) {
    var mapCard = templateCard.cloneNode(false);

    addCardAvatar(mapCard, mockiItem);
    addCardClose(mapCard);
    addCardTitle(mapCard, mockiItem);
    addCardAddress(mapCard, mockiItem);
    addCardPrice(mapCard, mockiItem);
    addCardType(mapCard, mockiItem);
    addCardCapacity(mapCard, mockiItem);
    addCardTime(mapCard, mockiItem);
    addCardFeatures(mapCard, mockiItem);
    addCardDescription(mapCard, mockiItem);
    addCardPhotos(mapCard, mockiItem);

    mapContainer.insertBefore(
        mapCard,
        mapFilterContainer
    );
  };

  var mockiData = generateMocki();
  mapContainer.classList.remove('map--faded');

  renderMapPins(mockiData);
  renderMapCard(mockiData[0]);

})();
