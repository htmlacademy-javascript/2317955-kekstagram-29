import {form, preview, pictureInput, openModal, closeModal} from './uploading-picture-modal.js';
import {handleScailingClick} from './handle-scailing-click.js';
import {initValidaton} from './form-validation.js';
import {initEffects} from './effects.js';
import {setFormSubmit} from './set-form-submit.js';
import { ACCEPTABLE_FILE_TYPES } from './constants.js';

const effectsPreviews = form.querySelectorAll('.effects__preview');

const onPictureUpload = () => {
  URL.revokeObjectURL(preview.src);
  const file = pictureInput.files[0];
  const fileName = file.name.toLowerCase();
  const isNameAcceptable = ACCEPTABLE_FILE_TYPES.some((type) => fileName.endsWith(type));
  if(isNameAcceptable) {
    preview.src = URL.createObjectURL(file);
    effectsPreviews.forEach((effectPreview) => {
      effectPreview.style.backgroundImage = `url(${preview.src})`;
    });
    openModal();
  }
};

const onFormSubmit = (evt) => setFormSubmit(evt, closeModal);

const initModalForm = () => {
  pictureInput.addEventListener('change', onPictureUpload);
  handleScailingClick();
  initEffects();
  initValidaton();
  form.addEventListener('submit', onFormSubmit);
};

export {initModalForm};
