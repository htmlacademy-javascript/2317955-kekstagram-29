import {isValid} from './form-validation.js';
import {sendData} from './network.js';
import {showMessage} from './errors.js';

const SubmitButtonText = {
  IDLE: 'Отправить',
  SENDING: 'Отправляю...'
};

const submitBtn = document.querySelector('.img-upload__submit');

// TODO here we can use classes to group those simillar functions
const blockSubmitButton = () => {
  submitBtn.disabled = true;
  submitBtn.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitBtn.disabled = false;
  submitBtn.textContent = SubmitButtonText.IDLE;
};


const setFormSubmit = async (evt, onSuccess) => {
  evt.preventDefault();
  if (isValid()) {
    blockSubmitButton();
    try {
      await sendData(new FormData(evt.target));
      onSuccess();
      showMessage(true);
    } catch (err) {
      showMessage(false);
    }
    unblockSubmitButton();
  }
};


export {setFormSubmit};
