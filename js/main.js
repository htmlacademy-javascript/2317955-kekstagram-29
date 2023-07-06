import {getRandomPicturesData} from './get-random-pictures-data.js';
import {FOTOS_AMOUNT} from './constants.js';
import {renderPictures, picturesContainer} from './render-pictures.js';
import {openFullPicture} from './full-picture-modal.js';

const picturesData = getRandomPicturesData(FOTOS_AMOUNT);
renderPictures(picturesData);

picturesContainer.addEventListener('click', openFullPicture);


export {picturesData};
