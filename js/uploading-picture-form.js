import {isValid} from './form-validation.js';
import {sendData} from './network.js';
import {show as showMessage} from './modals-with-messages.js';
import {NEW_PICTURE_FORM} from './html-elements.js';

const SubmitButtonText = {
  IDLE: 'Отправить',
  SENDING: 'Отправляю...'
};

const blockSubmitButton = () => {
  NEW_PICTURE_FORM.submitBtn.disabled = true;
  NEW_PICTURE_FORM.submitBtn.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  NEW_PICTURE_FORM.submitBtn.disabled = false;
  NEW_PICTURE_FORM.submitBtn.textContent = SubmitButtonText.IDLE;
};


const submit = async (evt, onSuccess) => {
  evt.preventDefault();

  if (isValid()) {
    blockSubmitButton();
    try {
      await sendData(new FormData(evt.target));
      onSuccess();
      showMessage('success');
    } catch (err) {
      showMessage('error');
    }
    unblockSubmitButton();
  }
};


export {submit};
