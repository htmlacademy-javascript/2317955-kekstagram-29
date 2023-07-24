import {isKeyEscape, isTextFieldActive} from './util.js';
import {resetValidator} from './form-validation.js';
import {resetEffects} from './effects.js';
import {MODALS, NODES} from './html-elements.js';


const openModal = () => {
  NODES.uploadingModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  NODES.formCloseBtn.addEventListener('click', onCloseBtnClick);
  document.addEventListener('keydown', onEscapePress);
};

const resetForm = () => {
  NODES.submitBtn.disabled = false;
  NODES.scaleInput.value = '100%';
  NODES. preview.style.transform = 'scale(1)';
  NODES.pictureInput.value = '';
  NODES.hashtagInput.value = '';
  NODES.commentInput.value = '';
  resetEffects();
  resetValidator();
};

const closeModal = () => {
  resetForm();
  NODES.uploadingModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  NODES.formCloseBtn.removeEventListener('click', onCloseBtnClick);
  document.removeEventListener('keydown', onEscapePress);
};

function onCloseBtnClick () {
  closeModal();
}

function onEscapePress (evt) {
  if (!isTextFieldActive() && MODALS.resultMessage.error.classList.contains('hidden')) {
    if(isKeyEscape(evt)) {
      evt.preventDefault();
      closeModal();
    }
  }
}


export {openModal, closeModal};
