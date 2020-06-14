'use strict';

(function () {
  var isEnterEvent = window.util.isEnterEvent;
  var renderCard = window.card.render;
  var isMouseLeftButtonEvent = window.util.isMouseLeftButtonEvent;

  var X_GAP = 50 / 2;
  var Y_GAP = 70;

  var container = document.querySelector('.map__pins');
  var template = document.querySelector('#pin').content.children[0];

  var generate = function (item, offerId) {
    var pin = template.cloneNode(true);

    pin.style.left = item.location.x - X_GAP + 'px';
    pin.style.top = item.location.y - Y_GAP + 'px';
    pin.children[0].src = item.author.avatar;
    pin.children[0].alt = item.offer.title;

    pin.dataset.offerId = offerId;

    return pin;
  };

  var render = function (mapCardsData) {
    var fragment = document.createDocumentFragment();
    var mapCardsDataLength = mapCardsData.length;

    for (var index = 0; index < mapCardsDataLength; index++) {
      var pin = generate(mapCardsData[index], index);
      fragment.appendChild(pin);
    }

    container.appendChild(fragment);

    container.addEventListener('mousedown', onContainerMousedown);
    container.addEventListener('keydown', onContainerKeydown);
  };

  var getCurrentPinID = function (evt) {
    var mapPin = evt.target.closest('.map__pin:not(.map__pin--main)');
    return mapPin ? mapPin.dataset.offerId : null;
  };

  var onContainerMousedown = function (evt) {
    if (isMouseLeftButtonEvent(evt)) {
      renderCard(getCurrentPinID(evt));
    }
  };

  var onContainerKeydown = function (evt) {
    if (isEnterEvent(evt)) {
      renderCard(getCurrentPinID(evt));
    }
  };

  window.pin = {
    render: render,
  };
})();

