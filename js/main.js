import {getData} from './network.js';
import {renderPictures} from './render-pictures.js';
import {showAlert} from './util.js';
import './uploading-picture-modal.js';
import './edit-foto.js';
import './scale-preview.js';


let picturesData;

try {
  picturesData = await getData();
  renderPictures(picturesData);
} catch (err) {
  showAlert(err.message);
}


export {picturesData};
