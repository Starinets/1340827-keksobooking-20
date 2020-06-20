'use strict';

(function () {
  var main = document.querySelector('main');
  var successMessage = document.querySelector('#success').content
      .querySelector('.success').cloneNode(true);
  var errorMessage = document.querySelector('#error').content
      .querySelector('.error').cloneNode(true);

  var showLoadSuccess = function () {
    main.appendChild(successMessage);

    document.addEventListener('keydown', onEscapeKeydown);
    successMessage.addEventListener('click', onSuccessMessageClick);
  };

  var hideLoadSuccess = function () {
    successMessage.remove();

    document.removeEventListener('keydown', onEscapeKeydown);
  };

  var showLoadError = function () {
    main.appendChild(errorMessage);

    document.addEventListener('keydown', onEscapeKeydown);
    document.addEventListener('click', onClick);
  };

  var hideLoadError = function () {
    errorMessage.remove();

    document.removeEventListener('keydown', onEscapeKeydown);
    document.removeEventListener('click', onClick);
  };

  var onEscapeKeydown = function (evt) {
    if (window.util.isEscapeEvent(evt)) {
      hideLoadSuccess();
      hideLoadError();
    }
  };

  var onSuccessMessageClick = function (evt) {
    if (window.util.isMouseLeftButtonEvent(evt)) {
      hideLoadSuccess();
    }
  };

  var onClick = function (evt) {
    if (window.util.isMouseLeftButtonEvent(evt)) {
      hideLoadError();
    }
  };

  window.message = {
    showLoadSuccess: showLoadSuccess,
    showLoadError: showLoadError,
  };
})();
