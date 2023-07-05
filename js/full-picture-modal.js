import {picturesData} from './main.js';
import {renderFullPicture} from './render-full-picture.js';
import {onCommentsLoadBtnClick} from './render-comments.js';
import {SHOWN_COMMENTS_AMOUNT} from './constants.js';

const picturesContainer = document.querySelector('.pictures');
const fullPicture = document.querySelector('.big-picture');
const fullPictureCloseBtn = fullPicture.querySelector('.big-picture__cancel');
const commentsContainer = fullPicture.querySelector('.social__comments');
const allComments = commentsContainer.children;
const commentsLoadBtn = fullPicture.querySelector('.social__comments-loader');


const getFullPictureData = (evt) => {
  const picture = evt.target.closest('.picture');
  const pictureData = picturesData.find((datum) => datum.id === +picture.dataset.pictureId);
  return pictureData;
};


const openFullPicture = (evt) => {
  evt.preventDefault();

  const pictureData = getFullPictureData(evt);
  renderFullPicture(pictureData);

  fullPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  fullPictureCloseBtn.addEventListener('click', onFullPictureCloseButton);
  if (allComments.length > SHOWN_COMMENTS_AMOUNT) {
    commentsLoadBtn.addEventListener('click', onCommentsLoadBtnClick);
  }
  document.addEventListener('keydown', onDocumentEscape);

  picturesContainer.removeEventListener('click', openFullPicture);
};

const closeFullPicture = () => {
  fullPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  fullPictureCloseBtn.removeEventListener('click', onFullPictureCloseButton);
  commentsLoadBtn.removeEventListener('click', onCommentsLoadBtnClick);
  document.removeEventListener('keydown', onDocumentEscape);

  picturesContainer.addEventListener('click', openFullPicture);
};

function onDocumentEscape (evt) {
  if(evt.key === 'Escape') {
    evt.preventDefault();
    closeFullPicture();
  }
}

function onFullPictureCloseButton () {
  closeFullPicture();
}


export {
  fullPicture,
  commentsContainer,
  allComments,
  openFullPicture
};
