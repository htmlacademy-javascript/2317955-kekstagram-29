import {MAX_HASHTAG_LENGTH, MAX_HASHTAG_NUMBER, HASHTAG_RULE_REGEX, MAX_DESCRIPTION_LENGTH} from './constants.js';

const form = document.querySelector('.img-upload__form');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const submitBtn = form.querySelector('.img-upload__submit');

/* TODO можно использовать класс:
class MessageFormater {
  static rules = new Intl.PluralRules('ru-RU');

  static message(n) {
    return MessageFormater.rules.select(n)
}
MessageFormater.message(5)
*/

const pluralRules = new Intl.PluralRules('ru-RU');

const getHashtagNumberMessage = (number) => {
  switch (pluralRules.select(number)) {
    case 'one': {
      return `Максимум ${number} хештег`;
    }
    case 'few': {
      return `Максимум ${number} хештега`;
    }
    case 'many': {
      return `Максимум ${number} хештегов`;
    }
    // case 'other'
    default: {
      return `Максимум ${number} хештега`;
    }
  }
};
const getLettersNumberMessage = (number) => {
  switch (pluralRules.select(number)) {
    case 'one': {
      return `Хештег должен начинаться с # и содержать не более ${number} буквы кирилицы и/или латинского алфавита`;
    }
    case 'few': {
      return `Хештег должен начинаться с # и содержать не более ${number} букв кирилицы и/или латинского алфавита`;
    }
    case 'many': {
      return `Хештег должен начинаться с # и содержать не более ${number} букв кирилицы и/или латинского алфавита`;
    }
    // case 'other'
    default: {
      return `Хештег должен начинаться с # и содержать не более ${number} букв кирилицы и/или латинского алфавита`;
    }
  }
};
const getSymbolsNumberMessage = (number) => {
  switch (pluralRules.select(number)) {
    case 'one': {
      return `Максимальная длина сообщения ${number} символ`;
    }
    case 'few': {
      return `Максимальная длина сообщения ${number} символа`;
    }
    case 'many': {
      return `Максимальная длина сообщения ${number} символов`;
    }
    // case 'other'
    default: {
      return `Максимальная длина сообщения ${number} символа`;
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

const isValid = pristine.validate;
const resetValidator = pristine.reset;

const getHashtagsArray = (value) => value.toLowerCase().replace(/\s+/g, ' ').trim().split(' ');

const isHashtagNumberValid = (value) => {
  const hashtags = getHashtagsArray(value);
  return hashtags.length <= MAX_HASHTAG_NUMBER;
};

const isEveryHashtagValid = (value) => {
  if (value === '') {
    return true;
  }
  const hashtags = getHashtagsArray(value);
  return hashtags.every((hashtag) => HASHTAG_RULE_REGEX.test(hashtag));
};

const isEveryHasgtagUnique = (value) => {
  const hashtags = getHashtagsArray(value);
  return hashtags.length === new Set(hashtags).size;
};

const isDescriptionValid = (value) => value.length <= MAX_DESCRIPTION_LENGTH;


const onTextInputChange = () => {
  submitBtn.disabled = !isValid();
};

const initValidaton = () => {
  pristine.addValidator(
    hashtagInput,
    isHashtagNumberValid,
    getHashtagNumberMessage(MAX_HASHTAG_NUMBER),
    3,
    true,
  );

  pristine.addValidator(
    hashtagInput,
    isEveryHashtagValid,
    getLettersNumberMessage(MAX_HASHTAG_LENGTH),
    2,
    true,
  );

  pristine.addValidator(
    hashtagInput,
    isEveryHasgtagUnique,
    'Хештеги не должны повторяться',
    1,
    true,
  );

  pristine.addValidator(
    commentInput,
    isDescriptionValid,
    getSymbolsNumberMessage(MAX_DESCRIPTION_LENGTH)
  );

  hashtagInput.addEventListener('input', onTextInputChange);
  commentInput.addEventListener('input', onTextInputChange);
};


export {resetValidator, isValid, initValidaton};

