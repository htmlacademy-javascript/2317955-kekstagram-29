// import {form, submitBtn, hashtagInput, commentInput} from './uploading-picture-modal.js';
import {MAX_HASHTAG_LENGTH, MAX_HASHTAG_AMOUNT, HASHTAG_RULE_REGEX, MAX_DESCRIPTION_LENGTH} from './constants.js';
const form = document.querySelector('.img-upload__form');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const submitBtn = form.querySelector('.img-upload__submit');

const getHashtagAmountMessage = (number) => {
  switch (new Intl.PluralRules('ru-RU').select(number)) {
    case 'one': {
      return `${number} хештег`;
    }
    case 'few': {
      return `${number} хештега`;
    }
    case 'many': {
      return `${number} хештегов`;
    }
    case 'dafault': {
      return `${number} хештега`;
    }
  }
};
const getLettersAmountMessage = (number) => {
  switch (new Intl.PluralRules('ru-RU').select(number)) {
    case 'one': {
      return `${number} буквы`;
    }
    case 'few': {
      return `${number} букв`;
    }
    case 'many': {
      return `${number} букв`;
    }
    case 'dafault': {
      return `${number} букв`;
    }
  }
};
const getSymbolsAmountMessage = (number) => {
  switch (new Intl.PluralRules('ru-RU').select(number)) {
    case 'one': {
      return `${number} символ`;
    }
    case 'few': {
      return `${number} символа`;
    }
    case 'many': {
      return `${number} символов`;
    }
    case 'dafault': {
      return `${number} символа`;
    }
  }
};


const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper', // Элемент, на который будут добавляться классы
  // errorClass: '', // Класс, обозначающий невалидное поле
  // successClass: '', // Класс, обозначающий валидное поле
  errorTextParent: 'img-upload__field-wrapper', // Элемент, куда будет выводиться текст с ошибкой
  // errorTextTag: '', // Тег, который будет обрамлять текст ошибки
  // errorTextClass: '' // Класс для элемента с текстом ошибки
});

const getHashtagsArray = (value) => value.toLowerCase().replace(/\s+/g, ' ').trim().split(' ');

const isHashtagAmountValid = (value) => {
  const hashtags = getHashtagsArray(value);
  return hashtags.length <= MAX_HASHTAG_AMOUNT;
};
pristine.addValidator(
  hashtagInput,
  isHashtagAmountValid,
  `Максимум ${getHashtagAmountMessage(MAX_HASHTAG_AMOUNT)}`,
  3,
  true,
);

const isEveryHashtagValid = (value) => {
  if (value === '') {
    return true;
  }
  const hashtags = getHashtagsArray(value);
  return hashtags.every((hashtag) => HASHTAG_RULE_REGEX.test(hashtag));
};
pristine.addValidator(
  hashtagInput,
  isEveryHashtagValid,
  `Хештег должен начинаться с # и содержать не более ${getLettersAmountMessage(MAX_HASHTAG_LENGTH)} кирилицы и/или латинского алфавита`,
  2,
  true,
);

const isEveryHasgtagUnique = (value) => {
  const hashtags = getHashtagsArray(value);
  return hashtags.length === new Set(hashtags).size;
};
pristine.addValidator(
  hashtagInput,
  isEveryHasgtagUnique,
  'Хештеги не должны повторяться',
  1,
  true,
);

const isDescriptionValid = (value) => value.length <= MAX_DESCRIPTION_LENGTH;
pristine.addValidator(
  commentInput,
  isDescriptionValid,
  `Максимальная длина сообщения ${getSymbolsAmountMessage(MAX_DESCRIPTION_LENGTH)}`
);

const isValid = pristine.validate;
const resetValidator = pristine.reset;

const onTextInputChange = () => {
  submitBtn.disabled = !isValid();
};

hashtagInput.addEventListener('input', onTextInputChange);

commentInput.addEventListener('input', onTextInputChange);


export {resetValidator, isValid};

