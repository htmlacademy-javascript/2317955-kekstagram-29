const ALERT_SHOW_TIME = 5000;

const makeElement = (tagName, className, text) => {

  // TODO refactor makeElement using other variant
  const someElement = document.createElement(tagName);
  someElement.classList.add(className);

  if (text) {
    if (tagName === 'img') {
      someElement.alt = text;
    } else {
      someElement.textContent = text;
    }
  }

  return someElement;
};

const isTextFieldActive = () => {
  // TODO find active element type-text bu other way
  if (document.activeElement.type === 'text' || document.activeElement.type === 'textarea') {
    return true;
  }
  return false;
};


const showAlert = (message) => {
  const alertContainer = makeElement('div', 'error-message', message);

  // TODO make css style for error message
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';


  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {makeElement, isTextFieldActive, showAlert};
