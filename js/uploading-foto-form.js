import {form, submitBtn} from './uploading-foto-modal.js';
import {isValid} from './form-validation.js';
import {showAlert} from './util.js';
import {sendData} from './network.js';
import {showMessage, onEscapePress} from './errors.js';

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const blockSubmitButton = () => {
  submitBtn.disabled = true;
  submitBtn.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitBtn.disabled = false;
  submitBtn.textContent = SubmitButtonText.IDLE;
};

const setFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        // .then(onSuccess)
        .then(() => {
          onSuccess();
          showMessage('success');
          document.addEventListener('keydown', onEscapePress);
        })
        .catch((err) => {
          showMessage('error');
          document.addEventListener('keydown', onEscapePress);
          showAlert(err.message);
        })
        .finally(unblockSubmitButton);
    }
  });
};


export {setFormSubmit};
