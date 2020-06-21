'use strict';

(function () {
  var isEnterEvent = window.util.isEnterEvent;
  var renderCard = window.card.render;
  var isMouseLeftButtonEvent = window.util.isMouseLeftButtonEvent;

  var COUNT_PINS_ON_MAP = 5;

  var X_GAP = 50 / 2;
  var Y_GAP = 70;

  var oldPinID = null;

  var container = document.querySelector('.map__pins');
  var mainPin = container.querySelector('.map__pin--main');
  var template = document.querySelector('#pin').content.querySelector('.map__pin');

  var generate = function (item, offerId) {
    var pin = template.cloneNode(true);

    pin.style.left = item.location.x - X_GAP + 'px';
    pin.style.top = item.location.y - Y_GAP + 'px';
    var image = pin.querySelector('img');
    image.src = item.author.avatar;
    image.alt = item.offer.title;

    pin.dataset.offerId = offerId;

    return pin;
  };

  var remove = function () {
    var pins = container.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (item) {
      item.remove();
    });
  };

  var render = function (adverts) {
    var fragment = document.createDocumentFragment();
    var mapCardsDataLength = Math.min(adverts.length, COUNT_PINS_ON_MAP);

    for (var index = 0; index < mapCardsDataLength; index++) {
      var pin = generate(adverts[index], index);
      fragment.appendChild(pin);
    }

    container.insertBefore(fragment, mainPin);

    container.addEventListener('mousedown', onContainerMousedown);
    container.addEventListener('keydown', onContainerKeydown);

    window.map.setFiltersEnabled();
  };

  var getCurrentPinID = function (evt) {
    var mapPin = evt.target.closest('.map__pin:not(.map__pin--main)');
    return mapPin ? mapPin.dataset.offerId : null;
  };

  var setCurrent = function (currentPinID) {
    if (oldPinID !== null) {
      container.querySelector('button[data-offer-id="' + oldPinID + '"]')
        .classList.remove('map__pin--active');
      oldPinID = null;
    }
    if (currentPinID !== null) {
      container.querySelector('button[data-offer-id="' + currentPinID + '"]')
        .classList.add('map__pin--active');
      oldPinID = currentPinID;
    }
  };

  var showCardForPin = function (evt) {
    var currentPinID = getCurrentPinID(evt);
    if (currentPinID !== null) {
      renderCard(window.data.adverts[currentPinID]);
      setCurrent(currentPinID);
    }
  };

  var onContainerMousedown = function (evt) {
    if (isMouseLeftButtonEvent(evt)) {
      showCardForPin(evt);
    }
  };

  var onContainerKeydown = function (evt) {
    if (isEnterEvent(evt)) {
      showCardForPin(evt);
    }
  };

  window.pin = {
    remove: remove,
    render: render,
    setCurrent: setCurrent,
  };
})();

