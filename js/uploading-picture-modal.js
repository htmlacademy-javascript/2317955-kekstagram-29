import {resetValidator} from './form-validation.js';
import {isKeyEscape, isTextFieldActive} from './util.js';
import {setFormSubmit} from './uploading-picture-form.js';
import {resetEffects} from './effects.js';
import {errorModal} from './errors.js';
import {handleScailingClick} from './scale-preview.js';

const ACCEPTABLE_FILE_TYPES = ['jpg', 'jpeg', 'png'];

const form = document.querySelector('.img-upload__form');
const uploadModal = form.querySelector('.img-upload__overlay');
const imgInput = form.querySelector('.img-upload__input');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const formCloseBtn = form.querySelector('.img-upload__cancel');
const preview = form.querySelector('.img-upload__preview img');
const effectsPreviews = form.querySelectorAll('.effects__preview');
const scaleInput = form.querySelector('.scale__control--value');
const submitBtn = form.querySelector('.img-upload__submit');


const openModal = () => {
  uploadModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  formCloseBtn.addEventListener('click', onCloseBtnClick);
  document.addEventListener('keydown', onEscapePress);
};

const resetForm = () => {
  submitBtn.disabled = false;
  scaleInput.value = '100%';
  preview.style.transform = 'scale(1)';
  imgInput.value = '';
  hashtagInput.value = '';
  commentInput.value = '';
  resetEffects();
  resetValidator();
};

const closeModal = () => {
  resetForm();
  uploadModal.classList.add('hidden');
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

const onInputImgChange = () => {
  URL.revokeObjectURL(preview.src);
  const file = imgInput.files[0];
  const fileName = file.name.toLowerCase();
  const isNameAcceptable = ACCEPTABLE_FILE_TYPES.some((type) => fileName.endsWith(type));
  if(isNameAcceptable) {
    preview.src = URL.createObjectURL(file);
    effectsPreviews.forEach((effectPreview) => {
      effectPreview.style.backgroundImage = `url(${preview.src})`;
    });
  }

  openModal();
};


const onFormSubmit = (evt) => setFormSubmit(evt, closeModal);

const initModalForm = () => {
  imgInput.addEventListener('change', onInputImgChange);
  form.addEventListener('submit', onFormSubmit);
  handleScailingClick();
};

export {
  form,
  imgInput,
  hashtagInput,
  commentInput,
  preview,
  scaleInput,
  closeModal,
  initModalForm
};
