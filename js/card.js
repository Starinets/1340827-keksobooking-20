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
    var avatarNode = avatar.cloneNode();

    avatarNode.src = advert.author.avatar;
    card.appendChild(avatarNode);
  };

  var addCardClose = function () {
    var closeNode = close.cloneNode();

    card.appendChild(closeNode);

    closeNode.addEventListener('mousedown', onCloseMousedown);
    closeNode.addEventListener('keydown', onCloseKeydown);
  };

  var addCardTitle = function (advert) {
    var titleNode = title.cloneNode();

    titleNode.textContent = advert.offer.title;
    card.appendChild(titleNode);
  };

  var addCardAddress = function (advert) {
    if (!window.util.isEmptyString(advert.offer.address)) {
      var addressNode = address.cloneNode();

      addressNode.textContent = advert.offer.address;
      card.appendChild(addressNode);
    }
  };

  var addCardPrice = function (advert) {
    if (!window.util.isEmptyString(advert.offer.price)) {
      var priceNode = price.cloneNode(false);
      var priceUnitNode = priceUnit.cloneNode();

      priceNode.innerHTML = Number(advert.offer.price) + '&#x20bd;';
      priceUnitNode.textContent = '/ночь';
      priceNode.appendChild(priceUnitNode);
      card.appendChild(priceNode);
    }
  };

  var addCardType = function (advert) {
    if (!window.util.isEmptyString(advert.offer.type)) {
      var typeNode = type.cloneNode();

      typeNode.textContent = typeEnToRu[advert.offer.type];
      card.appendChild(typeNode);
    }
  };

  var addCardCapacity = function (advert) {
    if (!window.util.isEmptyString(advert.offer.rooms)
      && !window.util.isEmptyString(advert.offer.guests)) {
      var capacityNode = capacity.cloneNode();

      capacityNode.textContent = advert.offer.rooms + ' комнаты для '
      + advert.offer.guests + ' гостей.';

      card.appendChild(capacityNode);
    }
  };

  var addCardTime = function (advert) {
    if (!window.util.isEmptyString(advert.offer.checkin)
      && !window.util.isEmptyString(advert.offer.checkout)) {
      var timeNode = time.cloneNode();

      timeNode.textContent = 'Заезд после ' + advert.offer.checkin
      + ', выезд до ' + advert.offer.checkout + '.';

      card.appendChild(timeNode);
    }
  };

  var addCardFeatures = function (advert) {
    if (advert.offer.features.length > 0) {
      var featuresContainerNode = featuresContainer.cloneNode(false);

      advert.offer.features.forEach(function (feature) {
        featuresContainerNode.appendChild(
            featureNameToHandle[feature].cloneNode()
        );
      });

      card.appendChild(featuresContainerNode);
    }
  };

  var addCardDescription = function (advert) {
    if (!window.util.isEmptyString(advert.offer.description)) {
      var descriptionNode = description.cloneNode();

      descriptionNode.textContent = advert.offer.description;
      card.appendChild(descriptionNode);
    }
  };

  var addCardPhotos = function (advert) {
    if (advert.offer.photos.length > 0) {
      var photosContainerNode = photosContainer.cloneNode(false);

      advert.offer.photos.forEach(function (photoSrc) {
        photo.src = photoSrc;
        photosContainerNode.appendChild(photo.cloneNode());
      });

      card.appendChild(photosContainerNode);
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
