'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_AVATAR_SRC = 'img/muffin-grey.svg';

  var stylesToPreview = {
    avatar: {
      default: {
        width: '40px',
        height: '44px',
        borderRadius: '0',
        marginLeft: '0',
      },
      edited: {
        width: '70px',
        height: '70px',
        borderRadius: '5px',
        marginLeft: '-15px',
      },
    },
    images: {
      edited: {
        width: '70px',
        height: '70px',
        borderRadius: '5px',
      },
    }
  };

  var form = document.querySelector('.ad-form');

  var avatarFileName = form.querySelector('#avatar');
  var avatarPreview = form.querySelector('.ad-form-header__preview img');

  var imagesFileName = form.querySelector('#images');
  var imageContainer = form.querySelector('.ad-form__photo');

  var fileChooser = function (file, onCheckPassed) {
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      onCheckPassed(file);
    }
  };

  var loadAvatar = function (fileName) {
    var editedStyle = stylesToPreview.avatar.edited;

    var onAvatarLoad = function () {
      URL.revokeObjectURL(avatarPreview.src);
      avatarPreview.removeEventListener('load', onAvatarLoad);
    };

    avatarPreview.addEventListener('load', onAvatarLoad);
    avatarPreview.src = URL.createObjectURL(fileName);

    avatarPreview.style.width = editedStyle.width;
    avatarPreview.style.height = editedStyle.height;
    avatarPreview.style.borderRadius = editedStyle.borderRadius;
    avatarPreview.style.marginLeft = editedStyle.marginLeft;
  };

  var loadImage = function (fileName) {
    var imageElement = document.createElement('img');
    var editedStyle = stylesToPreview.avatar.edited;

    var onImageLoad = function () {
      URL.revokeObjectURL(imageElement.src);
      imageElement.removeEventListener('load', onImageLoad);
    };

    imageElement.addEventListener('load', onImageLoad);
    imageElement.src = URL.createObjectURL(fileName);

    imageContainer.innerHTML = '';
    imageElement.style.width = editedStyle.width;
    imageElement.style.height = editedStyle.height;
    imageElement.style.borderRadius = editedStyle.borderRadius;

    imageContainer.appendChild(imageElement);
  };

  var onAvatarFileNameChange = function () {
    fileChooser(avatarFileName.files[0], loadAvatar);
  };

  var onImagesFileNameChange = function () {
    fileChooser(imagesFileName.files[0], loadImage);
  };

  var setEnabled = function () {
    avatarFileName.addEventListener('change', onAvatarFileNameChange);
    imagesFileName.addEventListener('change', onImagesFileNameChange);
  };

  var setDisabled = function () {
    var defaultStyle = stylesToPreview.avatar.default;

    avatarPreview.style.width = defaultStyle.width;
    avatarPreview.style.height = defaultStyle.height;
    avatarPreview.style.borderRadius = defaultStyle.borderRadius;
    avatarPreview.style.marginLeft = defaultStyle.marginLeft;
    avatarPreview.src = DEFAULT_AVATAR_SRC;

    imageContainer.innerHTML = '';

    avatarFileName.removeEventListener('change', onAvatarFileNameChange);
    imagesFileName.removeEventListener('change', onImagesFileNameChange);
  };

  window.load = {
    setDisabled: setDisabled,
    setEnabled: setEnabled,
  };
})();
