'use strict';

(function () {
  var main = document.querySelector('main');
  var successPopup = document.querySelector('#success').content
      .querySelector('.success');
  var errorPopup = document.querySelector('#error').content
      .querySelector('.error');
  var errorPopupButton = errorPopup.querySelector('.error__button');

  var showLoadSuccess = function () {
    main.appendChild(successPopup);

    successPopup.focus();

    document.addEventListener('keydown', onEscapeKeydown);
    successPopup.addEventListener('click', onSuccessPopupClick);
  };

  var hideLoadSuccess = function () {
    successPopup.remove();

    document.removeEventListener('keydown', onEscapeKeydown);
  };

  var showLoadError = function () {
    main.appendChild(errorPopup);

    errorPopupButton.focus();

    document.addEventListener('keydown', onEscapeKeydown);
    errorPopup.addEventListener('click', onErrorPopupClick);
    errorPopupButton.addEventListener('click', onErrorPopupButtonClick);
  };

  var hideLoadError = function () {
    errorPopup.remove();

    document.removeEventListener('keydown', onEscapeKeydown);
    document.removeEventListener('click', onErrorPopupClick);
  };

  var onEscapeKeydown = function (evt) {
    if (window.util.isEscapeEvent(evt)) {
      hideLoadSuccess();
      hideLoadError();
    }
  };

  var onSuccessPopupClick = function (evt) {
    if (window.util.isMouseLeftButtonEvent(evt)
      && evt.target === successPopup) {
      hideLoadSuccess();
    }
  };

  var onErrorPopupClick = function (evt) {
    if (window.util.isMouseLeftButtonEvent(evt)
      && evt.target === errorPopup) {
      hideLoadError();
    }
  };

  var onErrorPopupButtonClick = function (evt) {
    if (window.util.isMouseLeftButtonEvent(evt)) {
      hideLoadError();
    }
  };

  successPopup.tabIndex = '1';

  window.message = {
    showLoadSuccess: showLoadSuccess,
    showLoadError: showLoadError,
  };
})();
