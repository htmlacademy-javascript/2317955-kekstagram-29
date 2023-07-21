import {getData} from './network.js';
import {showAlert} from './util.js';
import {renderPictures} from './render-pictures.js';
import {handlePictureClick} from './full-picture-modal.js';
import {handleFiltersClick} from './filter-pictures.js';
import {initModalForm} from './uploading-picture-modal.js';


try {
  const picturesData = await getData();
  renderPictures(picturesData);
  handlePictureClick(picturesData);
  handleFiltersClick(renderPictures, picturesData);
} catch (err) {
  showAlert(err.message);
}

initModalForm();
