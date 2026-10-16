import {createLoader} from './load.js';
import {renderPictures} from './picture.js';
import {initFilters} from './filters.js';
import {showDataError} from './messages.js';
import './form.js';
import './scale.js';
import './effects.js';

const onLoadSuccess = (photos) => {
  renderPictures(photos);
  initFilters(photos);
};

const loadPhotos = createLoader(onLoadSuccess, showDataError);

loadPhotos();
