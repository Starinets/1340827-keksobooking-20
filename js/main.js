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
    var copyArrayOfSet = setOfValues.slice();
    var arrayFromSet = [];

    for (var index = 0; index < numberOfItems; index++) {
      var randomIndex = window.util.getRandomInteger(0, copyArrayOfSet.length - 1);
      var itemOfSet = copyArrayOfSet[randomIndex];

      arrayFromSet.push(itemOfSet);

      if (isUnique) {
        copyArrayOfSet.splice(randomIndex, 1);
      }
    }

    return arrayFromSet;
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
    var mockiArray = [];

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

      mockiArray.push(generateMokiItem(avatarID, xPosition, yPosition));
    }

    return mockiArray;
  };

  var mockiArray = generateMocki();

  document.querySelector('.map').classList.remove('map--faded');

  var fragment = document.createDocumentFragment();
  var template = document.querySelector('#pin').content.querySelector('.map__pin');

  mockiArray.forEach(function (mockiItem) {
    fragment.appendChild(generateMapPin(template, mockiItem));
  });

  document.querySelector('.map__pins').appendChild(fragment);
})();
