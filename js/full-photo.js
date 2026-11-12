import {isEscapeKey} from './util.js';

const COMMENTS_STEP = 5;
const AVATAR_SIZE = 35;

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCloseElement = bigPictureElement.querySelector('.big-picture__cancel');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const commentsContainerElement = bigPictureElement.querySelector('.social__comments');
const commentsShownCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const commentsTotalCountElement = bigPictureElement.querySelector('.social__comment-total-count');

let currentComments = [];
let shownCommentsCount = 0;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const renderComment = ({avatar, name, message}) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const avatarElement = document.createElement('img');
  avatarElement.classList.add('social__picture');
  avatarElement.src = avatar;
  avatarElement.alt = name;
  avatarElement.width = AVATAR_SIZE;
  avatarElement.height = AVATAR_SIZE;

  const textElement = document.createElement('p');
  textElement.classList.add('social__text');
  textElement.textContent = message;

  commentElement.appendChild(avatarElement);
  commentElement.appendChild(textElement);

  return commentElement;
};

const updateCommentsCounter = () => {
  commentsShownCountElement.textContent = shownCommentsCount;
  commentsTotalCountElement.textContent = currentComments.length;
};

const updateLoaderVisibility = () => {
  if (shownCommentsCount >= currentComments.length) {
    commentsLoaderElement.classList.add('hidden');
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }
};

const renderNextComments = () => {
  const nextComments = currentComments.slice(shownCommentsCount, shownCommentsCount + COMMENTS_STEP);

  const commentsFragment = document.createDocumentFragment();
  nextComments.forEach((comment) => {
    commentsFragment.appendChild(renderComment(comment));
  });
  commentsContainerElement.appendChild(commentsFragment);

  shownCommentsCount += nextComments.length;

  updateCommentsCounter();
  updateLoaderVisibility();
};

const onCommentsLoaderClick = () => {
  renderNextComments();
};

const fillBigPicture = (photo) => {
  const {url, likes, comments, description} = photo;

  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;

  commentsContainerElement.innerHTML = '';
  currentComments = comments;
  shownCommentsCount = 0;

  renderNextComments();
};

const openBigPicture = (photo) => {
  fillBigPicture(photo);

  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);
};

function closeBigPicture () {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoaderElement.removeEventListener('click', onCommentsLoaderClick);
}

bigPictureCloseElement.addEventListener('click', () => {
  closeBigPicture();
});

export {openBigPicture};
