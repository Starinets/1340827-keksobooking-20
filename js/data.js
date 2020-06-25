'use strict';

(function () {
  var DEFAULT_AVATAR_SRC = 'img/avatars/default.png';

  var DEFAULT_PIN_X = 130;
  var DEFAULT_PIN_Y = 0;

  var adverts = [];

  var parseAuthor = function (item) {
    if (!item.hasOwnProperty('author')) {
      item.author = {};
    }

    if (!item.author.hasOwnProperty('avatar')) {
      item.author.avatar = DEFAULT_AVATAR_SRC;
    }

    return item;
  };

  var parseOffer = function (item) {
    if (!item.hasOwnProperty('offer')) {
      item.offer = {};
    }

    if (!item.offer.hasOwnProperty('title')) {
      item.offer.title = '';
    }
    if (!item.offer.hasOwnProperty('address')) {
      item.offer.address = '';
    }
    if (!item.offer.hasOwnProperty('price')) {
      item.offer.price = '';
    }
    if (!item.offer.hasOwnProperty('type')) {
      item.offer.type = '';
    }
    if (!item.offer.hasOwnProperty('rooms')) {
      item.offer.rooms = '';
    }
    if (!item.offer.hasOwnProperty('guests')) {
      item.offer.guests = '';
    }
    if (!item.offer.hasOwnProperty('checkin')) {
      item.offer.checkin = '';
    }
    if (!item.offer.hasOwnProperty('checkout')) {
      item.offer.checkout = '';
    }
    if (!item.offer.hasOwnProperty('features')) {
      item.offer.features = [];
    }
    if (!item.offer.hasOwnProperty('description')) {
      item.offer.description = '';
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
    if (!Array.isArray(data)) {
      data = [];
    }

    var parsedData = data.map(function (item) {
      item = parseAuthor(item);
      item = parseOffer(item);
      item = parseLocation(item);

      return item;
    });

    return parsedData;
  };

  var generate = function (cb) {
    var onSuccess = function (data) {
      data = parse(data);
      window.data.adverts = data;
      cb(data);
    };

    var onError = function () {

    };

    window.backend.load(onSuccess, onError);
  };

  window.data = {
    generate: generate,
    adverts: adverts,
  };
})();
