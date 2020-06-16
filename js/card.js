'use strict';

(function () {
  var isEnterEvent = window.util.isEnterEvent;
  var isEscapeEvent = window.util.isEscapeEvent;
  var isMouseLeftButtonEvent = window.util.isMouseLeftButtonEvent;

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

  var getTypeOfResidence = function (residenceType) {
    switch (residenceType) {
      case 'palace':
        residenceType = 'Дворец';
        break;
      case 'flat':
        residenceType = 'Квартира';
        break;
      case 'house':
        residenceType = 'Дом';
        break;
      case 'bungalo':
        residenceType = 'Бунгало';
        break;
      default:
        residenceType = 'Квартира';
        break;
    }
    return residenceType;
  };

  var getFeature = function (feature) {
    switch (feature) {
      case 'wifi':
        feature = featureWifi;
        break;
      case 'dishwasher':
        feature = featureDishwasher;
        break;
      case 'parking':
        feature = featureParking;
        break;
      case 'washer':
        feature = featureWasher;
        break;
      case 'elevator':
        feature = featureElevator;
        break;
      case 'conditioner':
        feature = featureConditioner;
        break;
      default:
        break;
    }

    return feature;
  };

  var onCloseMousedown = function (evt) {
    if (isMouseLeftButtonEvent(evt)) {
      deleteCard();
    }
  };

  var onCloseKeydown = function (evt) {
    if (isEnterEvent(evt)) {
      deleteCard();
    }
  };

  /* ----------------------- pin's card block generators ---------------------- */
  var addCardAvatar = function (card, cardData) {
    if (cardData.author.avatar) {
      avatar.src = cardData.author.avatar;
      card.appendChild(avatar);
    }
  };

  var addCardClose = function (card) {
    card.appendChild(close);

    close.addEventListener('mousedown', onCloseMousedown);
    close.addEventListener('keydown', onCloseKeydown);
  };

  var addCardTitle = function (card, cardData) {
    if (cardData.offer.title) {
      title.textContent = cardData.offer.title;
      card.appendChild(title);
    }
  };

  var addCardAddress = function (card, cardData) {
    if (cardData.offer.address) {
      address.textContent = cardData.offer.address;
      card.appendChild(address);
    }
  };

  var addCardPrice = function (card, cardData) {
    if (cardData.offer.price) {
      price.innerHTML = Number(cardData.offer.price) + '&#x20bd;';
      priceUnit.textContent = '/ночь';
      price.appendChild(priceUnit);
      card.appendChild(price);
    }
  };

  var addCardType = function (card, cardData) {
    if (cardData.offer.type) {
      type.textContent = getTypeOfResidence(cardData.offer.type);
      card.appendChild(type);
    }
  };

  var addCardCapacity = function (card, cardData) {
    if (cardData.offer.rooms && cardData.offer.guests) {
      capacity.textContent = cardData.offer.rooms + ' комнаты для '
      + cardData.offer.guests + ' гостей.';

      card.appendChild(capacity);
    }
  };

  var addCardTime = function (card, cardData) {
    if (cardData.offer.checkin && cardData.offer.checkout) {
      time.textContent = 'Заезд после ' + cardData.offer.checkin
      + ', выезд до ' + cardData.offer.checkout + '.';

      card.appendChild(time);
    }
  };

  var addCardFeatures = function (card, cardData) {
    featuresContainer.innerHTML = '';
    if (cardData.offer.features.length) {
      cardData.offer.features.forEach(function (feature) {
        featuresContainer.appendChild(getFeature(feature).cloneNode(true));
      });

      card.appendChild(featuresContainer);
    }
  };

  var addCardDescription = function (card, cardData) {
    if (cardData.offer.description) {
      description.textContent = cardData.offer.description;
      card.appendChild(description);
    }
  };

  var addCardPhotos = function (card, cardData) {
    photosContainer.innerHTML = '';
    if (cardData.offer.photos.length) {
      cardData.offer.photos.forEach(function (photoSrc) {
        photo.src = photoSrc;
        photosContainer.appendChild(photo.cloneNode(true));
      });

      card.appendChild(photosContainer);
    }
  };

  var deleteCard = function () {
    var card = mapContainer.querySelector('.map__card');
    if (card !== null) {
      card.remove();

      window.pin.setCurrentPin(null);

      document.removeEventListener('keydown', onEscapeKeydown);

      close.removeEventListener('mousedown', onCloseMousedown);
      close.removeEventListener('keydown', onCloseKeydown);
    }
  };

  var onEscapeKeydown = function (evt) {
    if (isEscapeEvent(evt)) {
      deleteCard();
    }
  };

  var render = function (offerID) {
    if (offerID === null) {
      return;
    }

    var cardData = window.main.pinsData[offerID];
    var card = template.cloneNode(false);

    deleteCard();

    addCardAvatar(card, cardData);
    addCardClose(card);
    addCardTitle(card, cardData);
    addCardAddress(card, cardData);
    addCardPrice(card, cardData);
    addCardType(card, cardData);
    addCardCapacity(card, cardData);
    addCardTime(card, cardData);
    addCardFeatures(card, cardData);
    addCardDescription(card, cardData);
    addCardPhotos(card, cardData);

    mapContainer.insertBefore(
        card,
        mapFilterContainer
    );

    document.addEventListener('keydown', onEscapeKeydown);
  };

  window.card = {
    render: render,
  };
})();
