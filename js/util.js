const ALERT_SHOW_TIME = 5000;

// получает целое не отрицательное число в указанном диапазоне. если передано одно значение - возвращает от 0 до этого значения включительно. если ничего не передано - возвращает undefined
const getRandomIntegerNotNegativeNumber = (a, b) => {
  a = a > 0 ? Math.round(parseInt(a, 10)) : 0;
  b = b > 0 ? Math.round(parseInt(b, 10)) : 0;
  if (a === b) {
    return a;
  }
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  const rangeSize = max - min;
  return Math.round(min + Math.random() * rangeSize);
};


// создает генератор айди в заданном диапазоне
const makeIdGenerator = (min, max) => {
  const previousIds = [];
  return function() {
    if (previousIds.length === (max - min + 1)) {
      return null;
    }
    let newId = getRandomIntegerNotNegativeNumber(min, max);
    while (previousIds.includes(newId)) {
      newId = getRandomIntegerNotNegativeNumber(min, max);
    }
    previousIds.push(newId);
    return newId;
  };
};


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

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};


export {makeElement, isTextFieldActive, showAlert, debounce, makeIdGenerator};
