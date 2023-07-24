import {getData} from './network.js';
import {showAlert} from './util.js';
import {renderPictures} from './gallery.js';
import {handlePictureClick} from './full-picture-modal.js';
import {handleFiltersClick} from './filters-manager.js';
import {init as initUploadingPicture} from './uploading-picture-manager.js';


try {
  const picturesData = await getData();
  renderPictures(picturesData);
  handlePictureClick(picturesData);
  handleFiltersClick(renderPictures, picturesData);
} catch (err) {
  showAlert(err.message);
}

initUploadingPicture();
