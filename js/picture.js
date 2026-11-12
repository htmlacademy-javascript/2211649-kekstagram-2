import { openBigPicture } from './full-photo.js';

const picturesContainerElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

const renderPictures = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const pictureElement = pictureTemplateElement.cloneNode(true);

    const imageElement = pictureElement.querySelector('.picture__img');
    const likesCountElement = pictureElement.querySelector('.picture__likes');
    const commentsCountElement = pictureElement.querySelector('.picture__comments');

    imageElement.src = photo.url;
    imageElement.alt = photo.description;
    likesCountElement.textContent = photo.likes;
    commentsCountElement.textContent = photo.comments.length;

    pictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPicture(photo);
    });

    fragment.appendChild(pictureElement);
  });

  picturesContainerElement.appendChild(fragment);
};

const clearPictures = () => {
  picturesContainerElement.querySelectorAll('.picture').forEach((pictureElement) => {
    pictureElement.remove();
  });
};

export {renderPictures, clearPictures};
