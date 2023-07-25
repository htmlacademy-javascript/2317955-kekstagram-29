import {openModal, closeModal} from './uploading-picture-modal.js';
import {NEW_PICTURE_FORM} from './html-elements.js';
import {handleClick as handleScalingClick} from './scale-manager.js';
import {init as initValidaton} from './form-validation.js';
import {init as initEffects} from './effects.js';
import {submit as setFormSubmit} from './uploading-picture-form.js';

const ACCEPTABLE_FILE_TYPES = ['jpg', 'jpeg', 'png'];

const onPictureUpload = () => {
  URL.revokeObjectURL(NEW_PICTURE_FORM.preview.src);
  const file = NEW_PICTURE_FORM.pictureInput.files[0];
  const fileName = file.name.toLowerCase();
  const isNameAcceptable = ACCEPTABLE_FILE_TYPES.some((type) => fileName.endsWith(type));

  if(isNameAcceptable) {
    NEW_PICTURE_FORM.preview.src = URL.createObjectURL(file);
    NEW_PICTURE_FORM.effectsPreviews.forEach((effectPreview) => {
      effectPreview.style.backgroundImage = `url(${NEW_PICTURE_FORM.preview.src})`;
    });
    openModal();
  }
};

const onFormSubmit = (evt) => setFormSubmit(evt, closeModal);

const init = () => {
  NEW_PICTURE_FORM.pictureInput.addEventListener('change', onPictureUpload);
  handleScalingClick();
  initEffects();
  initValidaton();
  NEW_PICTURE_FORM.root.addEventListener('submit', onFormSubmit);
};

export {init};
