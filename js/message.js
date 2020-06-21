'use strict';

(function () {
  var main = document.querySelector('main');
  var successPopup = document.querySelector('#success').content
      .querySelector('.success');
  var errorPopup = document.querySelector('#error').content
      .querySelector('.error');
  var showLoadSuccess = function () {
    main.appendChild(successPopup);

    document.addEventListener('keydown', onEscapeKeydown);
    successPopup.addEventListener('click', onSuccessPopupClick);
  };

  var hideLoadSuccess = function () {
    successPopup.remove();

    document.removeEventListener('keydown', onEscapeKeydown);
  };

  var showLoadError = function () {
    main.appendChild(errorPopup);

    document.addEventListener('keydown', onEscapeKeydown);
    errorPopup.addEventListener('click', onErrorPopupClick);
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

  window.message = {
    showLoadSuccess: showLoadSuccess,
    showLoadError: showLoadError,
  };
})();
