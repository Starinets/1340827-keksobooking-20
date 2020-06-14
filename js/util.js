'use strict';

(function () {
  var EventKeyCode = {
    ENTER: 'Enter',
    NUMPAD_ENTER: 'NumpadEnter',
    ESCAPE: 'Escape',
  };

  var MOUSE_LEFT_BUTTON = 0;

  var isEnterEvent = function (evt) {
    return evt.code === EventKeyCode.ENTER
        || evt.code === EventKeyCode.NUMPAD_ENTER;
  };

  var isMouseLeftButtonEvent = function (evt) {
    return evt.button === MOUSE_LEFT_BUTTON;
  };

  var isEscapeEvent = function (evt) {
    return evt.code === EventKeyCode.ESCAPE;
  };

  var getRandomInteger = function (min, max) {
    return min + Math.floor(Math.random() * Math.floor(max - min + 1));
  };

  var getUniqueArrayOfInteger = function (numberOfItems, minimum, maximum) {
    var arrayOfIntegers = [];
    var index = 0;

    while (index < numberOfItems) {
      var randomInteger = getRandomInteger(minimum, maximum);

      if (arrayOfIntegers.indexOf(randomInteger) === -1) {
        arrayOfIntegers.push(randomInteger);

        index++;
      }
    }

    return arrayOfIntegers;
  };

  var getUniqueArrayFromSet = function (numberOfItems, setOfValues, isUnique) {
    var copySetOfValues = setOfValues.slice();
    var uniqueItems = [];

    for (var index = 0; index < numberOfItems; index++) {
      var randomIndex = getRandomInteger(0, copySetOfValues.length - 1);
      var itemOfSet = copySetOfValues[randomIndex];

      uniqueItems.push(itemOfSet);

      if (isUnique) {
        copySetOfValues.splice(randomIndex, 1);
      }
    }

    return uniqueItems;
  };

  window.util = {
    getRandomInteger: getRandomInteger,
    getUniqueArrayOfInteger: getUniqueArrayOfInteger,
    getUniqueArrayFromSet: getUniqueArrayFromSet,
    isEnterEvent: isEnterEvent,
    isEscapeEvent: isEscapeEvent,
    isMouseLeftButtonEvent: isMouseLeftButtonEvent,
  };
})();

