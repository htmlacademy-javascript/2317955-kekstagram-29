import {isKeyEscape} from './util.js';
import {MODALS} from './html-elements.js';

const CLASSES_FOR_CLOSING = ['success__button', 'success', 'error__button', 'error'];

let openedMessage = 'none';

const showMessage = (modalType) => {
  if (MODALS.resultMessage[modalType]) {
    openedMessage = MODALS.resultMessage[modalType];
    openedMessage.classList.remove('hidden');
    openedMessage.addEventListener('click', onMessageModalClick);
    document.addEventListener('keydown', onEscapePress);
  }
};


const hideMessage = () => {
  openedMessage.classList.add('hidden');
  openedMessage.removeEventListener('click', onMessageModalClick);
  document.removeEventListener('keydown', onEscapePress);
  openedMessage = 'none';
};

function onEscapePress (evt) {
  if(isKeyEscape(evt)) {
    evt.preventDefault();
    hideMessage();
  }
}

function onMessageModalClick (evt) {
  if (CLASSES_FOR_CLOSING.some((CLASS_FOR_CLOSING) => evt.target.classList.contains(CLASS_FOR_CLOSING))) {
    hideMessage();
  }
}


export {showMessage};
