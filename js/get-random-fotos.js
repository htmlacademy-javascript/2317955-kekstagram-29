import {MAX_COMMENTS_AMOUNT, MESSAGES_SET, DESCRIPTIONS_SET, NAMES_SET} from './data.js';
import {getRandomElement, getRandomIntegerNotNegativeNumber} from './util.js';

// ПЕРВОНАЧАЛЬНОЕ РЕШЕНИЕ "4.16. Больше деталей" БЕЗ ИСПОЛЬЗОВАНИЯ ГЕНЕРАТОРА //
// функции для создания массива из 25  случайно сгенерированных объектов (фотографий)

// создает строку из предложений из набора MESSAGES_SET в случайном кол-ве из указанного диапазона
const getMessage = (minSize, maxSize) => {
  const size = (minSize > MESSAGES_SET.length) || (maxSize > MESSAGES_SET.length) ? MESSAGES_SET.length : getRandomIntegerNotNegativeNumber(minSize, maxSize);
  const messageArray = [];
  while(messageArray.length < size) {
    const index = getRandomIntegerNotNegativeNumber(0, MESSAGES_SET.length - 1);
    messageArray.push(MESSAGES_SET[index]);
  }
  return messageArray.join(' ');
};

// создает массив произвольной длинны в заданном диапазоне из объектов-комментариев
const getRandomComments = (from, to) => {
  const commentsAmount = getRandomIntegerNotNegativeNumber(from, to);
  return Array.from({length: commentsAmount}, (element, i) => ({
    id: i + 1,
    avatar: `img/avatar-${getRandomIntegerNotNegativeNumber(1, 6)}.svg`,
    message: getMessage(1, 2),
    name: getRandomElement(NAMES_SET),
  }));
};

// создает массив произвольной длинны в заданном диапазоне из объектов-фотографий, внутри которых есть объекты-комментарии
const getRandomFotos = (fotosAmount) => Array.from({length: fotosAmount}, (element, i) => ({
  id: i + 1,
  url: `photos/${i + 1}.jpg`,
  description: getRandomElement(DESCRIPTIONS_SET),
  likes: getRandomIntegerNotNegativeNumber(15, 200),
  comments: getRandomComments(MAX_COMMENTS_AMOUNT),
}));


export {getRandomFotos};
