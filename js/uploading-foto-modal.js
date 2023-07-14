import {resetValidator} from './form-validation.js';
import {isTextFieldActive} from './util.js';

const form = document.querySelector('.img-upload__form');
const uploadModal = form.querySelector('.img-upload__overlay');
const imgInput = form.querySelector('.img-upload__input');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const submitBtn = form.querySelector('.img-upload__submit');
const formCloseBtn = form.querySelector('.img-upload__cancel');
const preview = form.querySelector('.img-upload__preview');
const scaleInput = form.querySelector('.scale__control--value');
const effectSliderComtainer = form.querySelector('.img-upload__effect-level');


const openModal = () => {
  uploadModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  formCloseBtn.addEventListener('click', onCloseBtnClick);
  document.addEventListener('keydown', onDocumentEscape);
};

const resetForm = () => {
  scaleInput.value = '100%';
  preview.style.transform = 'scale(1)';
  form.querySelector('.effects__radio[value = "none"]').checked = true;
  imgInput.value = '';
  hashtagInput.value = '';
  commentInput.value = '';
  resetValidator();
};

const closeModal = () => {
  resetForm();
  uploadModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  formCloseBtn.removeEventListener('click', onCloseBtnClick);
  document.removeEventListener('keydown', onDocumentEscape);
};

function onCloseBtnClick () {
  closeModal();
}

function onDocumentEscape (evt) {
  if (!isTextFieldActive()) {
    if(evt.key === 'Escape') {
      evt.preventDefault();
      closeModal();
    }
  }
}

const onInputImgChange = () => {
  openModal();
};

imgInput.addEventListener('change', onInputImgChange);


export {
  form,
  imgInput,
  submitBtn,
  hashtagInput,
  commentInput,
  preview,
  scaleInput,
  effectSliderComtainer
};
