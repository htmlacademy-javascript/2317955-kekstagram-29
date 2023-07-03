import {picturesData} from './main.js';
import {renderFullPicture} from './render-full-picture.js';

const picturesContainer = document.querySelector('.pictures');
const fullPicture = document.querySelector('.big-picture');
const fullPictureCloseBtn = fullPicture.querySelector('.big-picture__cancel');


const openFullPicture = (evt) => {
  evt.preventDefault();

  const picture = evt.target.closest('.picture');
  const pictureData = picturesData.find((date) => date.id === +picture.dataset.pictureId);

  renderFullPicture(pictureData);

  fullPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closeFullPicture = () => {
  fullPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  picturesContainer.addEventListener('click', onPicturesContainer);
};

const onDocumentEscape = (evt) => {
  if(evt.key === 'Escape') {
    evt.preventDefault();
    closeFullPicture();
  }
};

const onFullPictureCloseButton = () => {
  closeFullPicture();
  document.removeEventListener('keydown', onDocumentEscape);
  fullPictureCloseBtn.removeEventListener('click', onFullPictureCloseButton);
};

const onPicturesContainer = (evt) => {
  openFullPicture(evt);
  document.addEventListener('keydown', onDocumentEscape);
  fullPictureCloseBtn.addEventListener('click', onFullPictureCloseButton);
  picturesContainer.removeEventListener('click', onPicturesContainer); // это излишнее удаление обработчика или норм? мы же как бы не можем им воспользоваться, когда открыт попап, зачем его оставлять в памяти?
};


export {onPicturesContainer};
