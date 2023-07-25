import {isKeyEscape, isTextFieldActive} from './util.js';
import {resetValidator} from './form-validation.js';
import {resetEffects} from './effects.js';
import {RESULT_MESSAGE, NEW_PICTURE_FORM} from './html-elements.js';


const open = () => {
  NEW_PICTURE_FORM.uploadingModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  NEW_PICTURE_FORM.formCloseBtn.addEventListener('click', onCloseBtnClick);
  document.addEventListener('keydown', onEscapePress);
};

const resetForm = () => {
  NEW_PICTURE_FORM.submitBtn.disabled = false;
  NEW_PICTURE_FORM.scaleInput.value = '100%';
  NEW_PICTURE_FORM. preview.style.transform = 'scale(1)';
  NEW_PICTURE_FORM.pictureInput.value = '';
  NEW_PICTURE_FORM.hashtagInput.value = '';
  NEW_PICTURE_FORM.commentInput.value = '';
  resetEffects();
  resetValidator();
};

const close = () => {
  resetForm();
  NEW_PICTURE_FORM.uploadingModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  NEW_PICTURE_FORM.formCloseBtn.removeEventListener('click', onCloseBtnClick);
  document.removeEventListener('keydown', onEscapePress);
};

function onCloseBtnClick () {
  close();
}

function onEscapePress (evt) {
  if (!isTextFieldActive() && RESULT_MESSAGE.error.classList.contains('hidden')) {
    if(isKeyEscape(evt)) {
      evt.preventDefault();
      close();
    }
  }
}


export {open as openModal, close as closeModal};
