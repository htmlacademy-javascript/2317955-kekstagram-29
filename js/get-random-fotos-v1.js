import {MESSAGES_SET, DESCRIPTIONS_SET, NAMES_SET} from './data.js';
import {MAX_COMMENTS_AMOUNT, MAX_AVATAR_URL} from './constants.js';
import {getRandomElement, getRandomIntegerNotNegativeNumber} from './util.js';

// ПЕРВОНАЧАЛЬНОЕ РЕШЕНИЕ "4.16. Больше деталей" БЕЗ ИСПОЛЬЗОВАНИЯ ГЕНЕРАТОРА //
// функции для создания массива из случайно сгенерированных объектов (фотографий)

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
const getRandomComments = (minCommentsAmount, maxCommentsAmount) => {
  const commentsAmount = getRandomIntegerNotNegativeNumber(minCommentsAmount, maxCommentsAmount);
  return Array.from({length: commentsAmount}, (_, i) => ({
    id: i + 1,
    avatar: `img/avatar-${getRandomIntegerNotNegativeNumber(1, MAX_AVATAR_URL)}.svg`,
    message: getMessage(1, 2),
    name: getRandomElement(NAMES_SET),
  }));
};

// создает массив заданной длинны из случайных объектов-фотографий, внутри которых есть массив с случайными объектами-комментариями
const getRandomFotosV1 = (fotosAmount) => Array.from({length: fotosAmount}, (_, i) => ({
  id: i + 1,
  url: `photos/${i + 1}.jpg`,
  description: getRandomElement(DESCRIPTIONS_SET),
  likes: getRandomIntegerNotNegativeNumber(15, 200),
  comments: getRandomComments(MAX_COMMENTS_AMOUNT),
}));


export {getRandomFotosV1};
