import { photosData } from './data.js';
import { openBigPicture } from './full-photo.js';

const picturesContainer = document.querySelector('.pictures');
const templateFragment = document.querySelector('#picture').content;
const template = templateFragment.querySelector('.picture');
const fragment = document.createDocumentFragment();

photosData.forEach((photo) => {
  const element = template.cloneNode(true);

  const img = element.querySelector('.picture__img');
  const likesCount = element.querySelector('.picture__likes');
  const commentsCount = element.querySelector('.picture__comments');

  if (img) {
    img.src = photo.url;
    img.alt = photo.description;
  }

  if (likesCount) {
    likesCount.textContent = photo.likes;
  }

  if (commentsCount) {
    commentsCount.textContent = photo.comments.length;
  }

  element.addEventListener('click', () => {
    openBigPicture(photo);
  });

  fragment.appendChild(element);
});

picturesContainer.appendChild(fragment);
