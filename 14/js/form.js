const MAX_HASHTAGS_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;

const uploadFormElement = document.querySelector('.img-upload__form');
const uploadInputElement = uploadFormElement.querySelector('.img-upload__input');
const uploadOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const uploadCancelElement = uploadFormElement.querySelector('.img-upload__cancel');
const hashtagsInputElement = uploadFormElement.querySelector('.text__hashtags');
const commentInputElement = uploadFormElement.querySelector('.text__description');

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error',
});

const getHashtagsList = (value) => value.trim().split(/\s+/).filter((tag) => tag.length > 0);

const validateHashtagsFormat = (value) => {
  const hashtags = getHashtagsList(value);
  return hashtags.every((tag) => HASHTAG_PATTERN.test(tag));
};

const validateHashtagsCount = (value) => {
  const hashtags = getHashtagsList(value);
  return hashtags.length <= MAX_HASHTAGS_COUNT;
};

const validateHashtagsUnique = (value) => {
  const hashtags = getHashtagsList(value).map((tag) => tag.toLowerCase());
  return new Set(hashtags).size === hashtags.length;
};

pristine.addValidator(
  hashtagsInputElement,
  validateHashtagsFormat,
  `Хэштег должен начинаться с # и состоять из букв и цифр, длина до ${MAX_HASHTAG_LENGTH} символов`
);

pristine.addValidator(
  hashtagsInputElement,
  validateHashtagsCount,
  `Нельзя указать больше ${MAX_HASHTAGS_COUNT} хэштегов`
);

pristine.addValidator(
  hashtagsInputElement,
  validateHashtagsUnique,
  'Хэштеги не должны повторяться'
);

pristine.addValidator(
  commentInputElement,
  (value) => value.length <= MAX_COMMENT_LENGTH,
  `Комментарий не может быть длиннее ${MAX_COMMENT_LENGTH} символов`
);

const isTextFieldFocused = () =>
  document.activeElement === hashtagsInputElement || document.activeElement === commentInputElement;

const isEscapeKey = (evt) => evt.key === 'Escape';

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    closeUploadForm();
  }
};

function openUploadForm () {
  uploadOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeUploadForm () {
  uploadFormElement.reset();
  pristine.reset();

  uploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
}

uploadInputElement.addEventListener('change', () => {
  openUploadForm();
});

uploadCancelElement.addEventListener('click', () => {
  closeUploadForm();
});

uploadFormElement.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
