'use strict';

(function () {
  var COUNT_PINS_ON_MAP = 5;

  var X_GAP = 50 / 2;
  var Y_GAP = 70;

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
    var mapCardsCount = adverts.length < COUNT_PINS_ON_MAP
      ? adverts.length : COUNT_PINS_ON_MAP;

    for (var index = 0; index < mapCardsCount; index++) {
      var pin = generate(adverts[index], index);

      fragment.appendChild(pin);
    }

    container.insertBefore(fragment, mainPin);

    container.addEventListener('mousedown', onContainerMousedown);
    container.addEventListener('keydown', onContainerKeydown);

    window.filter.setEnabled();
  };

  var showCardForPin = function (evt) {
    var pin = evt.target.closest('.map__pin:not(.map__pin--main)');
    if (pin !== null && !pin.classList.contains('map__pin--active')) {
      window.card.render(window.filter.adverts[pin.dataset.offerId]);
      pin.classList.add('map__pin--active');

      window.card.setOnRemove(function () {
        pin.classList.remove('map__pin--active');
      });
    }
  };

  var onContainerMousedown = function (evt) {
    if (window.util.isMouseLeftButtonEvent(evt)) {
      showCardForPin(evt);
    }
  };

  var onContainerKeydown = function (evt) {
    if (window.util.isEnterEvent(evt)) {
      showCardForPin(evt);
    }
  };

  window.pin = {
    remove: remove,
    render: render,
  };
})();

