const successModalTemplate = document.querySelector('#success').content.querySelector('.success');
const errorModalTemplate = document.querySelector('#error').content.querySelector('.error');

const successModal = document.body.appendChild(successModalTemplate.cloneNode(true));
const successBtn = successModal.querySelector('.success__button');

const errorModal = document.body.appendChild(errorModalTemplate.cloneNode(true));
const errorBtn = errorModal.querySelector('.error__button');

successModal.classList.add('hidden');
errorModal.classList.add('hidden');


const showMessage = (message) => {
  if (message === 'success') {
    successModal.classList.remove('hidden');
    return;
  }
  errorModal.classList.remove('hidden');
};

const hideMessage = () => {
  successModal.classList.add('hidden');
  errorModal.classList.add('hidden');
  document.removeEventListener('keydown', onEscapePress);
};

successModal.addEventListener('click', (evt) => {
  if (!evt.target.classList.contains('success__inner')) {
    hideMessage();
  }
});
errorModal.addEventListener('click', (evt) => {
  if (!evt.target.classList.contains('error__inner')) {
    hideMessage();
  }
});

successBtn.addEventListener('click', () => {
  hideMessage();
});
errorBtn.addEventListener('click', () => {
  hideMessage();
});

function onEscapePress (evt) {
  if(evt.key === 'Escape') {
    evt.preventDefault();
    hideMessage();
  }
}

export {showMessage, onEscapePress};
