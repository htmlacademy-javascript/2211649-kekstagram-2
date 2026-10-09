import { openBigPicture } from './full-photo.js';

const picturesContainer = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');

const renderPictures = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const element = template.cloneNode(true);

    const img = element.querySelector('.picture__img');
    const likesCount = element.querySelector('.picture__likes');
    const commentsCount = element.querySelector('.picture__comments');

    img.src = photo.url;
    img.alt = photo.description;
    likesCount.textContent = photo.likes;
    commentsCount.textContent = photo.comments.length;

    element.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPicture(photo);
    });

    fragment.appendChild(element);
  });

  picturesContainer.appendChild(fragment);
};

export {renderPictures};
