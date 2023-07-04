import {picturesData} from './main.js';
import {fullPicture, renderFullPicture} from './render-full-picture.js';


const picturesContainer = document.querySelector('.pictures');
const fullPictureCloseBtn = fullPicture.querySelector('.big-picture__cancel');
const openFullPicture = (evt) => {
  evt.preventDefault();

  const picture = evt.target.closest('.picture');
  const pictureData = picturesData.find((datum) => datum.id === +picture.dataset.pictureId);

  renderFullPicture(pictureData);

  fullPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closeFullPicture = () => {
  fullPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  picturesContainer.addEventListener('click', onPicturesContainerClick);
};

const onDocumentEscape = (evt) => {
  if(evt.key === 'Escape') {
    evt.preventDefault();
    closeFullPicture();
  }
};

const onFullPictureCloseButton = () => {
  closeFullPicture();
  // fullPictureCommentsLoadBtn.removeEventListener('click', onFullPictureCommentsLoadBtn);
  document.removeEventListener('keydown', onDocumentEscape);
  fullPictureCloseBtn.removeEventListener('click', onFullPictureCloseButton);
};

function onPicturesContainerClick (evt) {
  openFullPicture(evt);
  document.addEventListener('keydown', onDocumentEscape);
  fullPictureCloseBtn.addEventListener('click', onFullPictureCloseButton);
  picturesContainer.removeEventListener('click', onPicturesContainerClick);
}


export {onPicturesContainerClick, fullPicture};
