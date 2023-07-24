import {picturesContainer} from './gallery.js';
import {renderFullPicture} from './full-picture.js';
import {onCommentsLoadBtnClick, SHOWN_COMMENTS_COUNT} from './comments.js';
import {isKeyEscape} from './util.js';
import {MODALS, NODES} from './html-elements.js';


const getFullPictureData = (evt, picturesData) => {
  const picture = evt.target.closest('.picture');
  if (!picture) {
    return;
  }

  const pictureId = +picture.dataset.pictureId;
  const pictureData = picturesData.find((datum) => datum.id === pictureId);
  return pictureData;
};

const openFullPicture = (evt, picturesData) => {
  const pictureData = getFullPictureData(evt, picturesData);
  if (!pictureData) {
    return;
  }

  evt.preventDefault();

  renderFullPicture(pictureData);

  MODALS.fullPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  NODES.fullPictureCloseBtn.addEventListener('click', onFullPictureCloseButton);
  if (NODES.allComments.length > SHOWN_COMMENTS_COUNT) {
    NODES.commentsLoadBtn.addEventListener('click', onCommentsLoadBtnClick);
  }
  document.addEventListener('keydown', onFullPictureEscapePress);
};

const closeFullPicture = () => {
  MODALS.fullPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  NODES.fullPictureCloseBtn.removeEventListener('click', onFullPictureCloseButton);
  NODES.commentsLoadBtn.removeEventListener('click', onCommentsLoadBtnClick);
  document.removeEventListener('keydown', onFullPictureEscapePress);
};

function onFullPictureEscapePress (evt) {
  if(isKeyEscape(evt)) {
    evt.preventDefault();
    closeFullPicture();
  }
}

function onFullPictureCloseButton () {
  closeFullPicture();
}

const handlePictureClick = (picturesData) => {
  const onPicturesContainerClick = (evt) => openFullPicture(evt, picturesData);
  picturesContainer.addEventListener('click', onPicturesContainerClick);
};

export {handlePictureClick};
