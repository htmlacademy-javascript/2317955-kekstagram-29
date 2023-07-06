import {picturesData} from './main.js';
import {picturesContainer} from './render-pictures.js';
import {renderFullPicture} from './render-full-picture.js';
import {SHOWN_COMMENTS_AMOUNT} from './constants.js';

const fullPicture = document.querySelector('.big-picture');
const fullPictureCloseBtn = fullPicture.querySelector('.big-picture__cancel');
const commentsContainer = fullPicture.querySelector('.social__comments');
const allComments = commentsContainer.children;
const commentsLoadBtn = fullPicture.querySelector('.social__comments-loader');
const commentCount = fullPicture.querySelector('.social__comment-count').firstChild;
let firstHiddenCommentIndex;

const getFullPictureData = (evt) => {
  const picture = evt.target.closest('.picture');
  const pictureData = picturesData.find((datum) => datum.id === +picture.dataset.pictureId);
  return pictureData;
};

// Обязательно ли эта функция должна называться onPicturesContainer чтобы соблюдать критерий Д4 или не обязательно? По сути она передается в обработчик и больше ни с каких других элементов вызвана не может быть... но тогда по ней не очевидно, что она делает
const openFullPicture = (evt) => {
  evt.preventDefault();
  firstHiddenCommentIndex = SHOWN_COMMENTS_AMOUNT;
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

// эту функцию хочется убрать в модуль render-comments, но для нее нужно иметь доступ к переменной firstHiddenCommentIndex. Если ее экспортировать, то нельзя изменять, а если объявлять в модуле render-comments, то она не перезаписывается в момент открытия окна. Как быть?
function onCommentsLoadBtnClick () {
  const breakpoint = Math.min(firstHiddenCommentIndex + SHOWN_COMMENTS_AMOUNT, allComments.length) ;
  for (let i = firstHiddenCommentIndex; i < breakpoint ; i++) {
    allComments.item(i).classList.remove('hidden');
  }
  if (breakpoint === allComments.length) {
    firstHiddenCommentIndex = SHOWN_COMMENTS_AMOUNT;
    fullPicture.querySelector('.social__comments-loader').classList.add('hidden');
    commentsLoadBtn.removeEventListener('click', onCommentsLoadBtnClick);
  } else {
    firstHiddenCommentIndex = breakpoint;
  }
  commentCount.textContent = `${breakpoint} из `;
}

export {
  fullPicture,
  commentsContainer,
  allComments,
  commentCount,
  openFullPicture
};
