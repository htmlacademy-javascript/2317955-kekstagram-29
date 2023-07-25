import {render as renderFullPicture} from './rendering-full-picture.js';
import {onCommentsLoadBtnClick, SHOWN_COMMENTS_COUNT} from './comments.js';
import {isKeyEscape} from './util.js';
import {FULL_PICTURE} from './html-elements.js';


const getData = (evt, picturesData) => {
  const picture = evt.target.closest('.picture');

  if (!picture) {
    return;
  }

  const pictureId = Number(picture.dataset.pictureId);

  return picturesData.find((datum) => datum.id === pictureId);
};

const open = (evt, picturesData) => {
  const pictureData = getData(evt, picturesData);

  if (!pictureData) {
    return;
  }

  evt.preventDefault();

  renderFullPicture(pictureData);

  FULL_PICTURE.root.classList.remove('hidden');
  document.body.classList.add('modal-open');

  FULL_PICTURE.closeBtn.addEventListener('click', onCloseButtonClick);

  if (FULL_PICTURE.commentsContainer.children.length > SHOWN_COMMENTS_COUNT) {
    FULL_PICTURE.commentsLoadBtn.addEventListener('click', onCommentsLoadBtnClick);
  }

  document.addEventListener('keydown', onEscapePress);
};

const close = () => {
  FULL_PICTURE.root.classList.add('hidden');
  document.body.classList.remove('modal-open');

  FULL_PICTURE.closeBtn.removeEventListener('click', onCloseButtonClick);
  FULL_PICTURE.commentsLoadBtn.removeEventListener('click', onCommentsLoadBtnClick);
  document.removeEventListener('keydown', onEscapePress);
};

function onEscapePress (evt) {
  if(isKeyEscape(evt)) {
    evt.preventDefault();
    close();
  }
}

function onCloseButtonClick () {
  close();
}


export {open};
