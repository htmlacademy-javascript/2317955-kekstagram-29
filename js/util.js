import { ALERT_SHOW_TIME } from './constants.js';


const makeElement = (tagName, options) => Object.assign(document.createElement(tagName), options);

const isTextFieldActive = () => {
  if (document.activeElement.type === 'text' || document.activeElement.type === 'textarea') {
    return true;
  }
  return false;
};


const showAlert = (message) => {
  const alertContainer = makeElement('div', {textContent: message, className: 'alert'});
  document.body.append(alertContainer);
  setTimeout(() => alertContainer.remove(), ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const isKeyEscape = (evt) => evt.key === 'Escape';

const createMessageModal = (template) => {
  const modal = document.body.appendChild(template.cloneNode(true));
  modal.classList.add('hidden');
  return modal;
};


export {makeElement, isTextFieldActive, showAlert, debounce, isKeyEscape, createMessageModal};
