import {isValid} from './form-validation.js';
import {sendData} from './network.js';
import {show as showMessage} from './modals-with-messages.js';
import {NEW_PICTURE_FORM} from './html-elements.js';

const SubmitButtonText = {
  IDLE: 'Отправить',
  SENDING: 'Отправляю...'
};

const regulateSubmitButton = (needToDisable) => {
  NEW_PICTURE_FORM.submitBtn.disabled = needToDisable;
  NEW_PICTURE_FORM.submitBtn.textContent = needToDisable ? SubmitButtonText.SENDING : SubmitButtonText.IDLE;
};


const submit = async (evt, onSuccess) => {
  evt.preventDefault();

  if (isValid()) {
    regulateSubmitButton(true);
    try {
      await sendData(new FormData(evt.target));
      onSuccess();
      showMessage('success');
    } catch (err) {
      showMessage('error');
    }
    regulateSubmitButton(false);
  }
};


export {submit};
