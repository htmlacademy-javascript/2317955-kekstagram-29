import {getRandomPicturesData} from './get-random-pictures-data.js';
import {FOTOS_AMOUNT} from './constants.js';
import {renderPictures} from './render-pictures.js';
// import {openFullPicture} from './full-picture-modal.js';
import './form-validation.js';
import './edit-foto.js';
import './scale-preview.js';

const picturesData = getRandomPicturesData(FOTOS_AMOUNT);
renderPictures(picturesData);


export {picturesData};
