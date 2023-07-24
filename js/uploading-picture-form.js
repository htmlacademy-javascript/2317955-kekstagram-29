import {isValid} from './form-validation.js';
import {sendData} from './network.js';
import {showMessage} from './modals-with-messages.js';
import {NODES} from './html-elements.js';

const SubmitButtonText = {
  IDLE: 'Отправить',
  SENDING: 'Отправляю...'
};

// TODO here we can use classes to group those simillar functions
const blockSubmitButton = () => {
  NODES.submitBtn.disabled = true;
  NODES.submitBtn.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  NODES.submitBtn.disabled = false;
  NODES.submitBtn.textContent = SubmitButtonText.IDLE;
};


const setFormSubmit = async (evt, onSuccess) => {
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


export {setFormSubmit};
