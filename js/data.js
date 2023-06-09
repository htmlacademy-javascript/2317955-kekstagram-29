export const MESSAGES_SET = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

export const DESCRIPTIONS_SET = [
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

export const NAMES_SET = [
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

export const getEffectSliderOptions = (effect) => {
  switch (effect) {
    case 'chrome':
      return {
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      };
    case 'sepia':
      return {
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      };
    case 'marvin':
      return {
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      };
    case 'phobos':
      return {
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      };
    case 'heat':
      return {
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      };
  }
};

export const getEffecFiltertOption = (effect, input) => {
  switch (effect) {
    case 'chrome':
      return `grayscale(${input.value})`;
    case 'sepia':
      return `sepia(${input.value})`;
    case 'marvin':
      return `invert(${input.value}%)`;
    case 'phobos':
      return `blur(${input.value}px)`;
    case 'heat':
      return `brightness(${input.value})`;
  }
};
