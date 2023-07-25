import {isKeyEscape} from './util.js';
import {RESULT_MESSAGE} from './html-elements.js';

const CLASSES_FOR_CLOSING = ['success__button', 'success', 'error__button', 'error'];

let openedMessage = null;

const show = (modalType) => {
  if (RESULT_MESSAGE[modalType]) {
    document.body.classList.add('modal-open');
    openedMessage = RESULT_MESSAGE[modalType];
    openedMessage.classList.remove('hidden');
    openedMessage.addEventListener('click', onMessageModalClick);
    document.addEventListener('keydown', onEscapePress);
  }
};


const hide = () => {
  document.body.classList.remove('modal-open');
  openedMessage.classList.add('hidden');
  openedMessage.removeEventListener('click', onMessageModalClick);
  document.removeEventListener('keydown', onEscapePress);
  openedMessage = null;
};

function onEscapePress (evt) {
  if(isKeyEscape(evt)) {
    evt.preventDefault();
    hide();
  }
}

function onMessageModalClick (evt) {
  if (CLASSES_FOR_CLOSING.some((CLASS_FOR_CLOSING) => evt.target.classList.contains(CLASS_FOR_CLOSING))) {
    hide();
  }
}


export {show};
