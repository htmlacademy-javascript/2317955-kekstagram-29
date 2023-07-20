import {getData} from './network.js';
import {showAlert} from './util.js';
import {renderPictures} from './render-pictures.js';
import {setOnPictureClick} from './full-picture-modal.js';
import {setOnFiltersClick} from './filter-pictures.js';
import './uploading-picture-modal.js';
import './scale-preview.js';


try {
  const picturesData = await getData();
  renderPictures(picturesData);
  setOnPictureClick(picturesData);
  setOnFiltersClick(renderPictures, picturesData);
} catch (err) {
  showAlert(err.message);
}

