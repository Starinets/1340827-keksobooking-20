'use strict';

(function () {
  var getRandomInteger = window.util.getRandomInteger;
  var getUniqueArrayOfInteger = window.util.getUniqueArrayOfInteger;
  var getUniqueArrayFromSet = window.util.getUniqueArrayFromSet;

  var NUMBER_OF_ARRAY_ITEMS = 8;

  var TYPES_OF_RESIDENCE = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKIN_TIMES = ['12: 00', '13: 00', '14: 00'];
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

  var mapPinsContainer = document.querySelector('.map__pins');

  var generateItem = function (avatarID, xPosition, yPosition) {
    var descriptionID = getRandomInteger(0, DESCRIPTIONS.length - 1);

    var item = {
      'author': {
        'avatar': 'img/avatars/user' + avatarID + '.png',
      },
      'offer': {
        'title': TITLES[descriptionID],
        'address': xPosition + ', ' + yPosition,
        'price': getRandomInteger(200, 3000),
        'type': TYPES_OF_RESIDENCE[getRandomInteger(0, 3)],
        'rooms': getRandomInteger(1, 5),
        'guests': getRandomInteger(1, 5),
        'checkin': CHECKIN_TIMES[getRandomInteger(0, 2)],
        'checkout': CHECKIN_TIMES[getRandomInteger(0, 2)],
        'features': getUniqueArrayFromSet(
            getRandomInteger(0, FEATURES.length),
            FEATURES,
            true
        ),
        'description': DESCRIPTIONS[descriptionID],
        'photos': getUniqueArrayFromSet(
            getRandomInteger(1, 3),
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

  var generate = function () {
    var mockData = [];

    var avatarsID = getUniqueArrayOfInteger(NUMBER_OF_ARRAY_ITEMS, 1, 8);

    var offsetWidth = mapPinsContainer.offsetWidth;

    for (var index = 0; index < NUMBER_OF_ARRAY_ITEMS; index++) {
      var avatarID = ('0' + avatarsID[index]).slice(-2);
      var xPosition = getRandomInteger(0, offsetWidth);
      var yPosition = getRandomInteger(130, 630);

      mockData.push(generateItem(avatarID, xPosition, yPosition));
    }

    return mockData;
  };

  window.data = {
    generate: generate,
  };
})();
