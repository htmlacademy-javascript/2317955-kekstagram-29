import {getRandomPicturesData} from './get-random-pictures-data.js';
import {FOTOS_AMOUNT} from './constants.js';
import {renderPictures} from './render-pictures.js';
import { onPicturesContainer} from './full-picture-modal.js';

const picturesData = getRandomPicturesData(FOTOS_AMOUNT);
renderPictures(picturesData);

const picturesContainer = document.querySelector('.pictures');
picturesContainer.addEventListener('click', onPicturesContainer);


export {picturesData};
