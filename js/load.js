'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_AVATAR_SRC = 'img/muffin-grey.svg';

  var stylesToPreview = {
    avatar: {
      default: '',
      edited: 'width: 70px; height: 70px; border-radius: 5px; margin-left: -15px',
    },
    images: {
      edited: 'width: 70px; height: 70px; border-radius: 5px',
    }
  };

  var form = document.querySelector('.ad-form');

  var avatarFileName = form.querySelector('#avatar');
  var avatarPreview = form.querySelector('.ad-form-header__preview img');

  var imagesFileName = form.querySelector('#images');
  var imageContainer = form.querySelector('.ad-form__photo');

  var fileChooser = function (file, onLoad) {
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        onLoad(reader.result);
      });

      reader.readAsDataURL(file);
    }
  };

  var renderAvatar = function (imageSrc) {
    avatarPreview.style = stylesToPreview.avatar.edited;
    avatarPreview.src = imageSrc;
  };

  var renderImages = function (imageSrc) {
    var fragment = document.createElement('img');

    imageContainer.innerHTML = '';
    fragment.style = stylesToPreview.images.edited;
    fragment.src = imageSrc;
    imageContainer.appendChild(fragment);
  };

  var onAvatarFileNameChange = function () {
    fileChooser(avatarFileName.files[0], renderAvatar);
  };

  var onImagesFileNameChange = function () {
    fileChooser(imagesFileName.files[0], renderImages);
  };

  var setEnabled = function () {
    avatarFileName.addEventListener('change', onAvatarFileNameChange);
    imagesFileName.addEventListener('change', onImagesFileNameChange);
  };

  var setDisabled = function () {
    avatarPreview.src = DEFAULT_AVATAR_SRC;
    avatarPreview.style = stylesToPreview.avatar.default;

    imageContainer.innerHTML = '';

    avatarFileName.removeEventListener('change', onAvatarFileNameChange);
    imagesFileName.removeEventListener('change', onImagesFileNameChange);
  };

  window.load = {
    setDisabled: setDisabled,
    setEnabled: setEnabled,
  };
})();
