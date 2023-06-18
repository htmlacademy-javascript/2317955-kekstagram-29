// 4.16. Больше деталей
// функции для создания массива из 25  случайно сгенерированных объектов (фотографий)

const FOTOS_AMOUNT = 25;

const MESSAGES_SET = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const DESCRIPTIONS_SET = [
  'Когда режу лук, плачет он.',
  'Мёртвое море знаешь? я убил.',
  'Аскорбинку знаешь? Я оскорбил.',
  'Знаешь Соединённые Штаты Америки? Я соединил.',
  'Запомни: Одна ошибка - и ты ошибся!',
  'Если закрыть глаза - станет темно.',
  'Чем выше горы, тем ниже Приоры.',
  'Шаг влево, шаг вправо - два шага.',
  'Если хочешь идти - иди. Если хочешь забыть - забудь.',
  'Клади густо - в амбаре будет не пусто.',
  'Приходи одни - мы тоже одни придём.',
  'Если будут обижать, не обижайся.',
  'Эта рука была оторвана нахрен и пришита другой рукой.',
  'Шаурма как объединяет, так и разлучает людей.',
  'Лучше говно в руке, чем рука в говне.',
  'Если ты один, то ты такой не один.',
  'Почему водка так быстро кончается? (c) Стетхем',
  'Живи. кайфуй, гуляй, играй, упал - вставай, наглей, ругай, чужих роняй, своих спасай, пельмени, суп, картошка, чай',
  `Don't worry
Be happy
Pey whisky
Love siski`
];
const NAMES_SET = [
  'Linus',
  'Enrickerri',
  'Rishanona',
  'Ienna',
  'Jaguerick',
  'Jenne',
  'Isha',
  'Ellerish',
  'Wentani',
  'Xinael'
];


// получает целое положительное число в указанном диапазоне. если передано одно значение - возвращает от 0 до этого значения включительно. если ничего не передано - возвращает undefined
const getRandomIntegerNotNegativeNumber = (a, b) => {
  if (a === b) {
    return a;
  }
  a = a > 0 ? Math.round(parseInt(a, 10)) : 0;
  b = b > 0 ? Math.round(parseInt(b, 10)) : 0;
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  const rangeSize = max - min;
  return Math.round(min + Math.random() * rangeSize);
};

// создает массив чисел в заданном диапазоне и с помощью заданной инструкции, в массиве перечислены все числа из диапазона в рандомном порядке без повторений
const getNumbersArray = (from, to, instructions) => {
  const arrayLength = to - from + 1;
  const numbers = [];
  while (numbers.length < arrayLength) {
    let newNumber = instructions(from, to);
    while (numbers.includes(newNumber)) {
      newNumber = instructions(from, to);
    }
    numbers.push(newNumber);
  }
  return numbers;
};

// получает рандомный элемент из переданного массива по рандомному индексу
const getRandomElement = (array) => {
  const index = getRandomIntegerNotNegativeNumber(array.length - 1);
  return array[index];
};

// создает строку из предложений из набора MESSAGES_SET в случайном кол-ве из указанного диапазона
const getMessage = (from, to) => {
  const messagesAmount = getRandomIntegerNotNegativeNumber(from, to);
  const messagesIndexes = getNumbersArray (0, messagesAmount - 1, getRandomIntegerNotNegativeNumber);
  const messages = [];
  for (let i = 0; i < messagesAmount; i++) {
    const message = MESSAGES_SET[messagesIndexes[i]];
    messages.push(message);
  }
  return messages.join(' ');
};

// создает массив произвольной длинны в заданном диапазоне из объектов-комментариев
const getRandomComments = (from, to) => {
  const commentsAmount = getRandomIntegerNotNegativeNumber(from, to);
  const ids = getNumbersArray(1, commentsAmount, getRandomIntegerNotNegativeNumber);
  const comments = [];
  for (let i = 0; i < commentsAmount; i++) {
    const comment = {
      id: ids[i],
      avatar: `img/avatar-${getRandomIntegerNotNegativeNumber(1, 6)}.svg`,
      message: getMessage(1, 2),
      name: getRandomElement(NAMES_SET),
    };
    comments.push(comment);
  }
  return comments;
};

// создает массив произвольной длинны в заданном диапазоне из объектов-фотографий, внутри которых есть объекты-комментарии
const getRandomFotos = (from, to) => {
  const fotosAmount = getRandomIntegerNotNegativeNumber(from, to);
  const ids = getNumbersArray(1, fotosAmount, getRandomIntegerNotNegativeNumber);
  const urls = getNumbersArray(1, fotosAmount, getRandomIntegerNotNegativeNumber);
  const fotos = [];
  for (let i = 0; i < fotosAmount; i++) {
    const foto = {
      id: ids[i],
      url: `photos/${urls[i]}.jpg`,
      description: getRandomElement(DESCRIPTIONS_SET),
      likes: getRandomIntegerNotNegativeNumber(15, 200),
      comments: getRandomComments(30),
    };
    fotos.push(foto);
  }
  return fotos;
};

getRandomFotos(FOTOS_AMOUNT, FOTOS_AMOUNT);
