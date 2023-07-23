import {isKeyEscape, isTextFieldActive} from './util.js';
import {resetValidator} from './form-validation.js';
import {resetEffects} from './effects.js';
import {errorModal} from './errors.js';


const form = document.querySelector('.img-upload__form');
const pictureInput = form.querySelector('.img-upload__input');
const uploadingModal = form.querySelector('.img-upload__overlay');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const formCloseBtn = form.querySelector('.img-upload__cancel');
const preview = form.querySelector('.img-upload__preview img');
const scaleInput = form.querySelector('.scale__control--value');
const submitBtn = form.querySelector('.img-upload__submit');


const openModal = () => {
  uploadingModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  formCloseBtn.addEventListener('click', onCloseBtnClick);
  document.addEventListener('keydown', onEscapePress);
};

const resetForm = () => {
  submitBtn.disabled = false;
  scaleInput.value = '100%';
  preview.style.transform = 'scale(1)';
  pictureInput.value = '';
  hashtagInput.value = '';
  commentInput.value = '';
  resetEffects();
  resetValidator();
};

const closeModal = () => {
  resetForm();
  uploadingModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  formCloseBtn.removeEventListener('click', onCloseBtnClick);
  document.removeEventListener('keydown', onEscapePress);
};

function onCloseBtnClick () {
  closeModal();
}

function onEscapePress (evt) {
  if (!isTextFieldActive() && errorModal.classList.contains('hidden')) {
    if(isKeyEscape(evt)) {
      evt.preventDefault();
      closeModal();
    }
  }
}


export {
  form,
  pictureInput,
  hashtagInput,
  commentInput,
  preview,
  scaleInput,
  closeModal,
  openModal
};
