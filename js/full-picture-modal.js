import {picturesContainer} from './render-pictures.js';
import {renderFullPicture} from './render-full-picture.js';
import {SHOWN_COMMENTS_AMOUNT} from './constants.js';
import {onCommentsLoadBtnClick} from './render-comments.js';
import {isKeyEscape} from './util.js';

const fullPicture = document.querySelector('.big-picture');
const fullPictureCloseBtn = fullPicture.querySelector('.big-picture__cancel');
const commentsContainer = fullPicture.querySelector('.social__comments');
const allComments = commentsContainer.children;
const commentsLoadBtn = fullPicture.querySelector('.social__comments-loader');
const commentCount = fullPicture.querySelector('.comments-count__shown').firstChild;


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

  fullPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  fullPictureCloseBtn.addEventListener('click', onFullPictureCloseButton);
  if (allComments.length > SHOWN_COMMENTS_AMOUNT) {
    commentsLoadBtn.addEventListener('click', onCommentsLoadBtnClick);
  }
  document.addEventListener('keydown', onFullPictureEscapePress);
};

const closeFullPicture = () => {
  fullPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  fullPictureCloseBtn.removeEventListener('click', onFullPictureCloseButton);
  commentsLoadBtn.removeEventListener('click', onCommentsLoadBtnClick);
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

const setOnPictureClick = (picturesData) => {
  const onPicturesContainer = (evt) => openFullPicture(evt, picturesData);
  picturesContainer.addEventListener('click', onPicturesContainer);
};

export {
  fullPicture,
  commentsContainer,
  allComments,
  commentCount,
  commentsLoadBtn,
  openFullPicture,
  setOnPictureClick
};
