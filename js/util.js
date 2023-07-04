// генерирует рандомное числа от 0 до 100
const generateNumber = () => Math.round(Math.random() * 100);

// генерирует рандомную строку заданной длинны (если не задано, то до 100 символов), строка состоит из рандомных цифр
const generateString = (length = generateNumber()) => {
  let result = '';
  while (result.length < Math.floor(length)) {
    const char = Math.floor(Math.random() * 10);
    result += char;
  }
  return result;
};

// проверяет длинну введенной строки на введенный допустимый размер
const isAcceptableLength = (string, maxLength) => string.length <= maxLength;

isAcceptableLength(generateString(), generateNumber());

// проверяет, является ли введенная строка палиндромом
const isPalindrome = (string) => {
  const normaliseString = string.replaceAll(' ', '').toLowerCase();
  let reverseString = '';
  for (let i = normaliseString.length - 1; i >= 0; i--) {
    reverseString += normaliseString[i];
  }
  return normaliseString === reverseString;
};

isPalindrome(generateString());

// извлекает из строки содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры - возвращает NaN
const extractNumbers = (string) => {
  string = string.toString();
  let result = '';
  for(let i = 0; i < string.length; i++) {
    const char = string[i];
    const charNumber = parseFloat(char);
    result += (Number.isNaN(charNumber)) ? '' : charNumber;
  }
  return parseFloat(result);
};

extractNumbers(generateString());

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

// получает рандомный элемент из переданного массива по рандомному индексу
const getRandomElement = (array) => {
  const index = getRandomIntegerNotNegativeNumber(array.length - 1);
  return array[index];
};

const makeElement = (tagName, className, text) => {
  const someElement = document.createElement(tagName);
  someElement.classList.add(className);

  if (text) {
    if (tagName === 'img') {
      someElement.alt = text;
    }
    someElement.textContent = text;
  }

  return someElement;
};

export {getRandomElement, getRandomIntegerNotNegativeNumber, makeElement};
