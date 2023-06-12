// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ АВТОМАТИЧЕСКИХ ПРОВЕРОК

// Функция для генерации рандомного числа от 0 до 100
const generateNumber = () => Math.round(Math.random() * 100);

// Функция для генерации рандомной строки заданной длинны (если не задано, то до 100 символов), строка состоит из рандомных цифр
const generateString = (length = generateNumber()) => {
  let result = '';
  while (result.length < Math.floor(length)) {
    const char = Math.floor(Math.random() * 10);
    result += char;
  }
  return result;
};


// ЗАДАНИЕ №1

// Функция проверяет длинну введенной строки на введенный допустимый размер
const isAcceptableLength = (string, maxLength) => string.length <= maxLength;

isAcceptableLength(generateString(), generateNumber());

/* //автоматическая проверка функции isAcceptableLength
const randomString = generateString();
const randomMaxLenght = generateNumber();

console.log(`Строка ${randomString} длинной ${randomString.length} символов при проверке на максимум ${randomMaxLenght} символов дает ${isAcceptableLength(randomString, randomMaxLenght)}`);
*/


// ЗАДАНИЕ №2

//Функция проверяет, является ли введенная строка палиндромом
const isPalindrome = (string) => {
  const normaliseString = string.replaceAll(' ', '').toLowerCase();
  let reverseString = '';
  for (let i = normaliseString.length - 1; i >= 0; i--) {
    reverseString += normaliseString[i];
  }
  return normaliseString === reverseString;
};

isPalindrome(generateString());

/* вторая версия с разбиением на две отдельные функции
//функция создания строки в обратном порядке
const reverseString = (string) => {
  let reverse = '';
  for (let i = string.length - 1; i >= 0; i--) {
    reverse += string[i];
  }
  return reverse;
};

//Функция для проверки, является ли строка палиндромом
const isPalindrome = (string) => string.replaceAll(' ', '').toLowerCase() === reverseString(string).replaceAll(' ', '').toLowerCase();
*/

/* //проверки функции isPalindrome()
console.log('топот', isPalindrome('топот'));
console.log('ДовОд', isPalindrome('ДовОд'));
console.log('Кекс', isPalindrome('Кекс'));
console.log('Лёша на полке клопа нашёл ', isPalindrome('Лёша на полке клопа нашёл '));
*/


// ЗАДАНИЕ №3

// Функция извлекает из строки содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры - возвращает NaN
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

/* // проверки функции extractNumbers()
console.log('ввожу "2023 год", ожидаю 2023, получаю - ', extractNumbers('2023 год'));
console.log('ввожу "ECMAScript 2022", ожидаю 2022, получаю - ', extractNumbers('ECMAScript 2022'));
console.log('ввожу "1 кефир, 0.5 батона", ожидаю 105, получаю - ', extractNumbers('1 кефир, 0.5 батона'));
console.log('ввожу "агент 007", ожидаю 7, получаю - ', extractNumbers('агент 007'));
console.log('ввожу "а я томат", ожидаю NaN, получаю - ', extractNumbers('а я томат'));
console.log('ввожу 2023, ожидаю 2023, получаю - ', extractNumbers(2023));
console.log('ввожу -1, ожидаю 1, получаю - ', extractNumbers(-1));
console.log('ввожу 1.5, ожидаю 15, получаю - ', extractNumbers(1.5));
*/
