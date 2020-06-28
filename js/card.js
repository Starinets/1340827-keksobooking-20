'use strict';

(function () {
  var mapContainer = document.querySelector('.map');
  var mapFilterContainer = mapContainer.querySelector('.map__filters-container');

  var template = document.querySelector('#card').content.querySelector('.map__card');

  var avatar = template.querySelector('.popup__avatar');
  var close = template.querySelector('.popup__close');
  var title = template.querySelector('.popup__title');
  var address = template.querySelector('.popup__text--address');
  var price = template.querySelector('.popup__text--price');
  var priceUnit = price.querySelector('span');
  var type = template.querySelector('.popup__type');
  var capacity = template.querySelector('.popup__text--capacity');
  var time = template.querySelector('.popup__text--time');
  var featuresContainer = template
      .querySelector('.popup__features').cloneNode(false);

  var featureWifi = template.querySelector('.popup__feature--wifi');
  var featureDishwasher = template.querySelector('.popup__feature--dishwasher');
  var featureParking = template.querySelector('.popup__feature--parking');
  var featureWasher = template.querySelector('.popup__feature--washer');
  var featureElevator = template.querySelector('.popup__feature--elevator');
  var featureConditioner = template.querySelector('.popup__feature--conditioner');

  var description = template.querySelector('.popup__description');
  var photosContainer = template.querySelector('.popup__photos').cloneNode(false);
  var photo = template.querySelector('.popup__photo');

  var card = null;
  var onCardRemove = null;

  var typeEnToRu = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало',
  };

  var featureNameToHandle = {
    'wifi': featureWifi,
    'dishwasher': featureDishwasher,
    'parking': featureParking,
    'washer': featureWasher,
    'elevator': featureElevator,
    'conditioner': featureConditioner,
  };

  var onCloseMousedown = function (evt) {
    if (window.util.isMouseLeftButtonEvent(evt)) {
      deleteCard();
    }
  };

  var onCloseKeydown = function (evt) {
    if (window.util.isEnterEvent(evt)) {
      deleteCard();
    }
  };

  /* ----------------------- pin's card block generators ---------------------- */
  var addCardAvatar = function (advert) {
    avatar.src = advert.author.avatar;
    card.appendChild(avatar);
  };

  var addCardClose = function () {
    card.appendChild(close);

    close.addEventListener('mousedown', onCloseMousedown);
    close.addEventListener('keydown', onCloseKeydown);
  };

  var addCardTitle = function (advert) {
    title.textContent = advert.offer.title;
    card.appendChild(title);
  };

  var addCardAddress = function (advert) {
    if (advert.offer.address !== '') {
      address.textContent = advert.offer.address;
      card.appendChild(address);
    }
  };

  var addCardPrice = function (advert) {
    if (advert.offer.price !== '') {
      price.innerHTML = Number(advert.offer.price) + '&#x20bd;';
      priceUnit.textContent = '/ночь';
      price.appendChild(priceUnit);
      card.appendChild(price);
    }
  };

  var addCardType = function (advert) {
    if (advert.offer.type !== '') {
      type.textContent = typeEnToRu[advert.offer.type];
      card.appendChild(type);
    }
  };

  var addCardCapacity = function (advert) {
    if (advert.offer.rooms !== '' && advert.offer.guests !== '') {
      capacity.textContent = advert.offer.rooms + ' комнаты для '
      + advert.offer.guests + ' гостей.';

      card.appendChild(capacity);
    }
  };

  var addCardTime = function (advert) {
    if (advert.offer.checkin !== '' && advert.offer.checkout !== '') {
      time.textContent = 'Заезд после ' + advert.offer.checkin
      + ', выезд до ' + advert.offer.checkout + '.';

      card.appendChild(time);
    }
  };

  var addCardFeatures = function (advert) {
    featuresContainer.innerHTML = '';
    if (advert.offer.features.length > 0) {
      advert.offer.features.forEach(function (feature) {
        featuresContainer.appendChild(
            featureNameToHandle[feature].cloneNode(true)
        );
      });

      card.appendChild(featuresContainer);
    }
  };

  var addCardDescription = function (advert) {
    if (advert.offer.description !== '') {
      description.textContent = advert.offer.description;
      card.appendChild(description);
    }
  };

  var addCardPhotos = function (advert) {
    photosContainer.innerHTML = '';
    if (advert.offer.photos.length > 0) {
      advert.offer.photos.forEach(function (photoSrc) {
        photo.src = photoSrc;
        photosContainer.appendChild(photo.cloneNode(true));
      });

      card.appendChild(photosContainer);
    }
  };

  var deleteCard = function () {
    if (card !== null) {
      card.remove();
      card = null;

      if (typeof onCardRemove === 'function') {
        onCardRemove();
        onCardRemove = null;
      }

      document.removeEventListener('keydown', onEscapeKeydown);
    }
  };

  var onEscapeKeydown = function (evt) {
    if (window.util.isEscapeEvent(evt)) {
      deleteCard();
    }
  };

  var render = function (advert) {
    deleteCard();

    card = template.cloneNode(false);

    addCardAvatar(advert);
    addCardClose();
    addCardTitle(advert);
    addCardAddress(advert);
    addCardPrice(advert);
    addCardType(advert);
    addCardCapacity(advert);
    addCardTime(advert);
    addCardFeatures(advert);
    addCardDescription(advert);
    addCardPhotos(advert);

    mapContainer.insertBefore(
        card,
        mapFilterContainer
    );

    document.addEventListener('keydown', onEscapeKeydown);
  };

  var setOnCardRemove = function (onRemove) {
    onCardRemove = onRemove;
  };

  window.card = {
    remove: deleteCard,
    render: render,
    setOnRemove: setOnCardRemove,
  };
})();
