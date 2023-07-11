import {getRandomPicturesData} from './get-random-pictures-data.js';
import {FOTOS_AMOUNT} from './constants.js';
import {renderPictures, picturesContainer} from './render-pictures.js';
import {openFullPicture} from './full-picture-modal.js';
import {form, hashtagInput, commentInput} from './uploading-foto-modal.js';
import './form-validation.js';
import './edit-foto.js';
import './scale-preview.js';

const picturesData = getRandomPicturesData(FOTOS_AMOUNT);
renderPictures(picturesData);

picturesContainer.addEventListener('click', openFullPicture);

form.setAttribute('method', 'post');
form.setAttribute('enctype', 'multipart/form-data');
form.setAttribute('action', 'https://29.javascript.pages.academy/kekstagram');
hashtagInput.setAttribute('type', 'text');
commentInput.setAttribute('type', 'text');


export {picturesData};
