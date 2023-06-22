import {getRandomFotosV1} from './get-random-fotos-v1.js';
import {getRandomFotosV2} from './get-random-fotos-v2.js';
import {FOTOS_AMOUNT} from './constants.js';
import './upload-foto.js';
import './edit-foto.js';
import './validation.js';
import './errors.js';
import './see-picture.js';
import './comments.js';
import './filter-fotos.js';


getRandomFotosV1(FOTOS_AMOUNT);

getRandomFotosV2(FOTOS_AMOUNT);
