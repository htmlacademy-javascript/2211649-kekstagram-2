import {renderPictures, clearPictures} from './picture.js';
import {debounce} from './util.js';

const RANDOM_PHOTOS_COUNT = 10;
const RERENDER_DELAY = 500;
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filtersElement = document.querySelector('.img-filters');
const filtersFormElement = filtersElement.querySelector('.img-filters__form');

let currentFilter = Filter.DEFAULT;
let photos = [];

const getRandomPhotos = () => {
  const photosCopy = [...photos];
  const result = [];

  while (result.length < RANDOM_PHOTOS_COUNT && photosCopy.length > 0) {
    const index = Math.floor(Math.random() * photosCopy.length);
    result.push(...photosCopy.splice(index, 1));
  }

  return result;
};

const getDiscussedPhotos = () =>
  [...photos].sort((a, b) => b.comments.length - a.comments.length);

const getFilteredPhotos = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return getRandomPhotos();
    case Filter.DISCUSSED:
      return getDiscussedPhotos();
    default:
      return [...photos];
  }
};

const renderFilteredPhotos = () => {
  clearPictures();
  renderPictures(getFilteredPhotos());
};

const debouncedRender = debounce(renderFilteredPhotos, RERENDER_DELAY);

const onFiltersFormClick = (evt) => {
  const button = evt.target.closest('.img-filters__button');

  if (!button || button.id === currentFilter) {
    return;
  }

  filtersFormElement.querySelector(`.${ACTIVE_BUTTON_CLASS}`).classList.remove(ACTIVE_BUTTON_CLASS);
  button.classList.add(ACTIVE_BUTTON_CLASS);

  currentFilter = button.id;
  debouncedRender();
};

const initFilters = (loadedPhotos) => {
  photos = [...loadedPhotos];

  filtersElement.classList.remove('img-filters--inactive');
  filtersFormElement.addEventListener('click', onFiltersFormClick);
};

export {initFilters};
