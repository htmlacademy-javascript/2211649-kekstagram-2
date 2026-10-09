import {createLoader} from './load.js';
import {renderPictures} from './picture.js';
import {showDataError} from './messages.js';
import './form.js';
import './scale.js';
import './effects.js';

const loadPhotos = createLoader(renderPictures, showDataError);

loadPhotos();
