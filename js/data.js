'use strict';

(function () {
  var loadPinsData = window.backend.load;

  var DEFAULT_PIN_X = 130;
  var DEFAULT_PIN_Y = 0;

  var parseAuthor = function (item) {
    if (!item.hasOwnProperty('author')) {
      item.author = {};
    }

    if (!item.author.hasOwnProperty('avatar')) {
      item.author.avatar = null;
    }

    return item;
  };

  var parseOffer = function (item) {
    if (!item.hasOwnProperty('offer')) {
      item.offer = {};
    }

    if (!item.offer.hasOwnProperty('title')) {
      item.offer.title = null;
    }
    if (!item.offer.hasOwnProperty('address')) {
      item.offer.address = null;
    }
    if (!item.offer.hasOwnProperty('price')) {
      item.offer.price = null;
    }
    if (!item.offer.hasOwnProperty('type')) {
      item.offer.type = null;
    }
    if (!item.offer.hasOwnProperty('rooms')) {
      item.offer.rooms = null;
    }
    if (!item.offer.hasOwnProperty('guests')) {
      item.offer.guests = null;
    }
    if (!item.offer.hasOwnProperty('checkin')) {
      item.offer.checkin = null;
    }
    if (!item.offer.hasOwnProperty('checkout')) {
      item.offer.checkout = null;
    }
    if (!item.offer.hasOwnProperty('features')) {
      item.offer.features = [];
    }
    if (!item.offer.hasOwnProperty('description')) {
      item.offer.description = null;
    }
    if (!item.offer.hasOwnProperty('photos')) {
      item.offer.photos = [];
    }

    return item;
  };

  var parseLocation = function (item) {
    if (!item.hasOwnProperty('location')) {
      item.location = {};
    }

    if (!item.location.hasOwnProperty('x')) {
      item.location.x = DEFAULT_PIN_X;
    }
    if (!item.location.hasOwnProperty('y')) {
      item.location.y = DEFAULT_PIN_Y;
    }

    return item;
  };

  var parse = function (data) {
    var parsedData = [];

    if (!Array.isArray(data)) {
      data = [];
    }

    data.forEach(function (item) {
      item = parseAuthor(item);
      item = parseOffer(item);
      item = parseLocation(item);

      parsedData.push(item);
    });

    return parsedData;
  };

  var generate = function (cb) {
    var onSuccess = function (data) {
      data = parse(data);
      window.main.pinsData = data;
      cb(data);
    };

    var onError = function () {

    };

    loadPinsData(onSuccess, onError);
  };

  window.data = {
    generate: generate,
  };
})();
