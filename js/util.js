const ALERT_SHOW_TIME = 5000;
const KEYBOARD_KEYCODE = {
  Escape: 'Escape',
};

const isKeyEscape = (evt) => evt.key === KEYBOARD_KEYCODE.Escape;

const isTextFieldActive = () => document.activeElement.type === 'text'
                             || document.activeElement.type === 'textarea';

const makeElement = (tagName, options) => Object.assign(document.createElement(tagName), options);

const showAlert = (message) => {
  const alertContainer = makeElement('div', {textContent: message, className: 'alert'});
  document.body.append(alertContainer);
  setTimeout(() => alertContainer.remove(), ALERT_SHOW_TIME);
};

const createMessageModal = (template) => {
  const modal = document.body.appendChild(template.cloneNode(true));
  modal.classList.add('hidden');

  return modal;
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};


export {makeElement, isTextFieldActive, showAlert, debounce, isKeyEscape, createMessageModal};
