const ALERT_SHOW_TIME = 5000;
const KEYS_KEYCODE = {
  Escape: 'Escape',
};

const isKeyEscape = (evt) => evt.key === KEYS_KEYCODE.Escape;

const isTextFieldActive = () => {
  if (document.activeElement.type === 'text' || document.activeElement.type === 'textarea') {
    return true;
  }
  return false;
};

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
