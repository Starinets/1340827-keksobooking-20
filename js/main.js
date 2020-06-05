'use strict';

(function () {
  var PIN_X_GAP = 50 / 2;
  var PIN_Y_GAP = 70;
  var NUMBER_OF_ARRAY_ITEMS = 8;
  var TYPE_OF_RESIDENCE = ['palace', 'flat', 'house', 'bungalo'];
  var CHEKING_TIME = ['12: 00', '13: 00', '14: 00'];
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
            window.util.getRandomInteger(1, 10),
            PHOTOS,
            false
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
    var offsetWidth = document.querySelector('.map__pins').offsetWidth;

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

  var generateMapPins = function (mockiData) {
    var fragment = document.createDocumentFragment();
    var template = document.querySelector('#pin').content.querySelector('.map__pin');

    document.querySelector('.map').classList.remove('map--faded');

    mockiData.forEach(function (mockiItem) {
      fragment.appendChild(generateMapPin(template, mockiItem));
    });

    document.querySelector('.map__pins').appendChild(fragment);
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

  /* ----------------------- pin's card block generators ---------------------- */
  var addCardAvatar = function (mapCard, template, mockiItem) {
    if (mockiItem.author.avatar) {
      var popupAvatar = template.querySelector('.popup__avatar');
      popupAvatar.src = mockiItem.author.avatar;
      mapCard.appendChild(popupAvatar);
    }
  };

  var addCardClose = function (mapCard, template) {
    var popupClose = template.querySelector('.popup__close');
    mapCard.appendChild(popupClose);
  };

  var addCardTitle = function (mapCard, template, mockiItem) {
    if (mockiItem.offer.title) {
      var popupTitle = template.querySelector('.popup__title');
      // popupTitle.textContent = mockiItem.offer.title;
      mapCard.appendChild(popupTitle);
    }
  };

  var addCardAddress = function (mapCard, template, mockiItem) {
    if (mockiItem.offer.address) {
      var popupAddress = template.querySelector('.popup__text--address');
      popupAddress.textContent = mockiItem.offer.address;
      mapCard.appendChild(popupAddress);
    }
  };

  var addCardPrice = function (mapCard, template, mockiItem) {
    if (mockiItem.offer.price) {
      var popupPrice = template.querySelector('.popup__text--price');
      var popupPriceUnit = popupPrice.querySelector('span');
      popupPrice.innerHTML = mockiItem.offer.price + '&#x20bd;';
      popupPriceUnit.textContent = '/ночь';
      popupPrice.appendChild(popupPriceUnit);
      mapCard.appendChild(popupPrice);
    }
  };

  var addCardType = function (mapCard, template, mockiItem) {
    if (mockiItem.offer.type) {
      var popupType = template.querySelector('.popup__type');
      popupType.textContent = getTypeOfResidence(mockiItem.offer.type);
      mapCard.appendChild(popupType);
    }
  };

  var addCardCapacity = function (mapCard, template, mockiItem) {
    if (mockiItem.offer.rooms && mockiItem.offer.guests) {
      var popupCapacity = template.querySelector('.popup__text--capacity');
      popupCapacity.textContent = mockiItem.offer.rooms + ' комнаты для '
      + mockiItem.offer.guests + ' гостей.';
      mapCard.appendChild(popupCapacity);
    }
  };

  var addCardTime = function (mapCard, template, mockiItem) {
    if (mockiItem.offer.checkin && mockiItem.offer.checkout) {
      var popupTime = template.querySelector('.popup__text--time');
      popupTime.textContent = 'Заезд после ' + mockiItem.offer.checkin
      + ', выезд до ' + mockiItem.offer.checkout + '.';
      mapCard.appendChild(popupTime);
    }
  };

  var addCardFeatures = function (mapCard, template, mockiItem) {
    if (mockiItem.offer.features.length) {
      var popupFeatures = template.querySelector('.popup__features');

      popupFeatures = popupFeatures.cloneNode(false);

      mockiItem.offer.features.forEach(function (feature) {
        var popupFeature = template.querySelector('.popup__feature--' + feature);
        popupFeatures.appendChild(popupFeature.cloneNode(true));
      });

      mapCard.appendChild(popupFeatures);
    }
  };

  var addCardDescription = function (mapCard, template, mockiItem) {
    if (mockiItem.offer.description) {
      var popupDescription = template.querySelector('.popup__description');
      // popupDescription.textContent = getTypeOfResidence(mockiItem.offer.description);
      mapCard.appendChild(popupDescription);
    }
  };

  var addCardPhotos = function (mapCard, template, mockiItem) {
    if (mockiItem.offer.photos.length) {
      var popupPhotos = template.querySelector('.popup__photos');
      var popupPhoto = template.querySelector('.popup__photo');

      mockiItem.offer.photos.forEach(function (photoSrc) {
        popupPhoto.src = photoSrc;
        popupPhotos.appendChild(popupPhoto.cloneNode(true));
      });

      mapCard.appendChild(popupPhotos);
    }
  };

  var generateMapCard = function (mockiItem) {
    var fragment = document.createDocumentFragment();
    var template = document.querySelector('#card').content.querySelector('.map__card');
    var mapCard = template.cloneNode(false);

    addCardAvatar(mapCard, template, mockiItem);
    addCardClose(mapCard, template);
    addCardTitle(mapCard, template, mockiItem);
    addCardAddress(mapCard, template, mockiItem);
    addCardPrice(mapCard, template, mockiItem);
    addCardType(mapCard, template, mockiItem);
    addCardCapacity(mapCard, template, mockiItem);
    addCardTime(mapCard, template, mockiItem);
    addCardFeatures(mapCard, template, mockiItem);
    addCardDescription(mapCard, template, mockiItem);
    addCardPhotos(mapCard, template, mockiItem);

    fragment.appendChild(mapCard);

    document.querySelector('.map').insertBefore(
        fragment,
        document.querySelector('.map__filters-container')
    );

  };

  var mockiData = generateMocki();

  generateMapPins(mockiData);

  generateMapCard(mockiData[0]);

})();
