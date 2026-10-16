const FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

const previewImageElement = document.querySelector('.img-upload__preview img');
const effectsPreviewElements = document.querySelectorAll('.effects__preview');

const DEFAULT_PREVIEW_SRC = previewImageElement.getAttribute('src');

let currentUrl = null;

const isValidFile = (file) => {
  const fileName = file.name.toLowerCase();

  return FILE_TYPES.some((type) => fileName.endsWith(`.${type}`));
};

const revokeCurrentUrl = () => {
  if (currentUrl) {
    URL.revokeObjectURL(currentUrl);
    currentUrl = null;
  }
};

const setPreview = (file) => {
  revokeCurrentUrl();
  currentUrl = URL.createObjectURL(file);

  previewImageElement.src = currentUrl;
  effectsPreviewElements.forEach((element) => {
    element.style.backgroundImage = `url('${currentUrl}')`;
  });
};

const resetPreview = () => {
  revokeCurrentUrl();

  previewImageElement.src = DEFAULT_PREVIEW_SRC;
  effectsPreviewElements.forEach((element) => {
    element.style.backgroundImage = '';
  });
};

export {isValidFile, setPreview, resetPreview};
