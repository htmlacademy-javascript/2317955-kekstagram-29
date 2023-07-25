import {GALLERY} from './html-elements.js';
import {fetchData} from './network.js';
import {showAlert} from './util.js';
import {render as renderGallery} from './gallery.js';
import {open as openFullPicture} from './full-picture-modal.js';
import {handleClick as handleFiltersClick} from './filters-manager.js';
import {init as initUploadingPicture} from './uploading-picture-manager.js';


try {
  const picturesData = await fetchData();
  renderGallery(picturesData);

  const onGalleryClick = (evt) => openFullPicture(evt, picturesData);
  GALLERY.root.addEventListener('click', onGalleryClick);

  handleFiltersClick(renderGallery, picturesData);
} catch (err) {
  showAlert(err.message);
}

initUploadingPicture();
