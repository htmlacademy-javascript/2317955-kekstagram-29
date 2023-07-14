import {getData} from './network.js';
import {renderPictures} from './render-pictures.js';
import {setFormSubmit} from './uploading-foto-form.js';
import {closeModal} from './uploading-foto-modal.js';
import './edit-foto.js';
import './scale-preview.js';
import { showAlert } from './util.js';

let picturesData;
getData()
  .then((data) => {
    picturesData = data;
    renderPictures(picturesData);
  })
  .catch((err) => {
    showAlert(err);
  });

setFormSubmit(closeModal);


export {picturesData};
