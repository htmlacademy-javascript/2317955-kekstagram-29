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

// получает рандомный элемент из переданного массива по рандомному индексу
const getRandomElement = (array) => {
  const index = getRandomIntegerNotNegativeNumber(array.length - 1);
  return array[index];
};

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


// ПЕРВОНАЧАЛЬНОЕ РЕШЕНИЕ БЕЗ ИСПОЛЬЗОВАНИЯ ГЕНЕРАТОРА //

// создает массив произвольной длинны в заданном диапазоне из объектов-комментариев
const getRandomComments = (from, to) => {
  const commentsAmount = getRandomIntegerNotNegativeNumber(from, to);
  return Array.from({length: commentsAmount}, (element, id) => {
    id++;
    return {
      id: id,
      avatar: `img/avatar-${getRandomIntegerNotNegativeNumber(1, 6)}.svg`,
      message: getMessage(1, 2),
      name: getRandomElement(NAMES_SET),
    };
  });
};

// создает массив произвольной длинны в заданном диапазоне из объектов-фотографий, внутри которых есть объекты-комментарии
const getRandomFotos = (fotosAmount) => Array.from({length: fotosAmount}, (element, id) => {
  id++;
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomElement(DESCRIPTIONS_SET),
    likes: getRandomIntegerNotNegativeNumber(15, 200),
    comments: getRandomComments(30),
  };
});

getRandomFotos(FOTOS_AMOUNT);


// РЕШЕНИЕ С ИСПОЛЬЗОВАНИЕМ ГЕНЕРАТОРА НА ОСНОВЕ ДЕМОНСТРАЦИЙ "Практическая польза замыканий" И "Учебный проект: нас орда" //

// создает генератор айди в заданном диапазоне
function makeIdGenerator (min, max) {
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
}

// создает массив случайно сгенерированных комментариев случайного размера из указанного диапазоне
function makeComments(minCommentsAmount, maxCommentsAmount) {
  const commentsAmount = getRandomIntegerNotNegativeNumber(minCommentsAmount, maxCommentsAmount);
  const generateCommentId = makeIdGenerator(1, commentsAmount);
  return Array.from({length: commentsAmount}, () => ({
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomIntegerNotNegativeNumber(1, 6)}.svg`,
    message: getMessage(1, 2),
    name: getRandomElement(NAMES_SET),
  }));
}

// создает массив случайно сгенерированных фотографий в заданном количестве
function makeFoto (fotosAmount) {
  const generateFotoId = makeIdGenerator(1, fotosAmount);
  const generateUrl = makeIdGenerator(1, fotosAmount);
  return Array.from({length: fotosAmount}, () => ({
    id: generateFotoId(),
    url: `photos/${generateUrl()}.jpg`,
    description: getRandomElement(DESCRIPTIONS_SET),
    likes: getRandomIntegerNotNegativeNumber(15, 200),
    comments: makeComments(0, 30),
  }));
}

makeFoto(FOTOS_AMOUNT);
