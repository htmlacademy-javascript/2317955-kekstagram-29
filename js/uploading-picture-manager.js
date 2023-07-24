import {openModal, closeModal} from './uploading-picture-modal.js';
import {MODALS, NODES} from './html-elements.js';
import {handleScalingClick} from './scale-manager.js';
import {init as initValidaton} from './form-validation.js';
import {init as initEffects} from './effects.js';
import {setFormSubmit} from './uploading-picture-form.js';

const ACCEPTABLE_FILE_TYPES = ['jpg', 'jpeg', 'png'];

const onPictureUpload = () => {
  URL.revokeObjectURL(NODES.preview.src);
  const file = NODES.pictureInput.files[0];
  const fileName = file.name.toLowerCase();
  const isNameAcceptable = ACCEPTABLE_FILE_TYPES.some((type) => fileName.endsWith(type));
  if(isNameAcceptable) {
    NODES.preview.src = URL.createObjectURL(file);
    NODES.effectsPreviews.forEach((effectPreview) => {
      effectPreview.style.backgroundImage = `url(${NODES.preview.src})`;
    });
    openModal();
  }
};

const onFormSubmit = (evt) => setFormSubmit(evt, closeModal);

const init = () => {
  NODES.pictureInput.addEventListener('change', onPictureUpload);
  handleScalingClick();
  initEffects();
  initValidaton();
  MODALS.newPictureForm.addEventListener('submit', onFormSubmit);
};

export {init};
