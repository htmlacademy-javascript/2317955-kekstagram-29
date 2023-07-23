import {isKeyEscape, createMessageModal} from './util.js';

const classesForClosing = ['success__button', 'success', 'error__button', 'error'];

const successModalTemplate = document.querySelector('#success').content.querySelector('.success');
const errorModalTemplate = document.querySelector('#error').content.querySelector('.error');
const successModal = createMessageModal(successModalTemplate);
const errorModal = createMessageModal(errorModalTemplate);


const showMessage = (isSuccess) => {
  const modal = isSuccess ? successModal : errorModal;
  modal.classList.remove('hidden');
  modal.addEventListener('click', onMessageModalClick);
  document.addEventListener('keydown', onEscapePress);
};

const hideMessage = () => {
  const modal = (!successModal.classList.contains('hidden')) ? successModal : errorModal;
  modal.classList.add('hidden');
  modal.removeEventListener('click', onMessageModalClick);
  document.removeEventListener('keydown', onEscapePress);
};

function onEscapePress (evt) {
  if(isKeyEscape(evt)) {
    evt.preventDefault();
    hideMessage();
  }
}

function onMessageModalClick (evt) {
  const [...targetClasses] = evt.target.classList;
  const intersection = classesForClosing.filter((classForClosing) => targetClasses.includes(classForClosing));
  if (intersection.length) {
    hideMessage();
  }
}


export {showMessage, errorModal};
