import {isKeyEscape} from './util.js';

const successModalTemplate = document.querySelector('#success').content.querySelector('.success');
const errorModalTemplate = document.querySelector('#error').content.querySelector('.error');

const successModal = document.body.appendChild(successModalTemplate.cloneNode(true));
const errorModal = document.body.appendChild(errorModalTemplate.cloneNode(true));

successModal.classList.add('hidden');
errorModal.classList.add('hidden');


const showMessage = (message) => {
  if (message === 'success') {
    return void successModal.classList.remove('hidden');
  }
  errorModal.classList.remove('hidden');
};

const hideMessage = () => {
  successModal.classList.add('hidden');
  errorModal.classList.add('hidden');
  document.removeEventListener('keydown', onEscapePress);
};

successModal.addEventListener('click', (evt) => {
  if (!evt.target.classList.contains('success__inner' || evt.target.classList.contains('success__button'))) {
    hideMessage();
  }
});
errorModal.addEventListener('click', (evt) => {
  if (!evt.target.classList.contains('error__inner' || evt.target.classList.contains('error__button'))) {
    hideMessage();
  }
});

function onEscapePress (evt) {
  if(isKeyEscape(evt)) {
    evt.preventDefault();
    hideMessage();
  }
}

export {showMessage, onEscapePress};
