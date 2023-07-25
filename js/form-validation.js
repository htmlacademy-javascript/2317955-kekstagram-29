import {NEW_PICTURE_FORM} from './html-elements.js';

const MAX_HASHTAG_LENGTH = 19;
const MAX_HASHTAG_COUNT = 5;
const MAX_DESCRIPTION_LENGTH = 140;
const HASHTAG_RULE_REGEX = new RegExp(`^#[a-zа-яё0-9]{1,${MAX_HASHTAG_LENGTH}}$`, 'i');


const pluralRules = new Intl.PluralRules('ru-RU');

const getHashtagCountMessage = (number) => {
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

const getLettersCountMessage = (number) => {
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

const getSymbolsCountMessage = (number) => {
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


const pristine = new Pristine(NEW_PICTURE_FORM.root, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const isValid = pristine.validate;
const resetValidator = pristine.reset;

const getHashtagsArray = (value) => value.toLowerCase().replace(/\s+/g, ' ').trim().split(' ');

const isAllHashtagsUnique = (value) => {
  const hashtags = getHashtagsArray(value);

  return hashtags.length === new Set(hashtags).size;
};

const isAllHashtagsValid = (value) => {
  if (value === '') {
    return true;
  }

  const hashtags = getHashtagsArray(value);

  return hashtags.every((hashtag) => HASHTAG_RULE_REGEX.test(hashtag));
};

const isHashtagCountValid = (value) => {
  const hashtags = getHashtagsArray(value);

  return hashtags.length <= MAX_HASHTAG_COUNT;
};

const isDescriptionValid = (value) => value.length <= MAX_DESCRIPTION_LENGTH;


const onTextInputChange = () => {
  NEW_PICTURE_FORM.submitBtn.disabled = !isValid();
};

const init = () => {
  pristine.addValidator(
    NEW_PICTURE_FORM.hashtagInput,
    isAllHashtagsUnique,
    'Хештеги не должны повторяться',
    1,
    true,
  );

  pristine.addValidator(
    NEW_PICTURE_FORM.hashtagInput,
    isAllHashtagsValid,
    getLettersCountMessage(MAX_HASHTAG_LENGTH),
    2,
    true,
  );

  pristine.addValidator(
    NEW_PICTURE_FORM.hashtagInput,
    isHashtagCountValid,
    getHashtagCountMessage(MAX_HASHTAG_COUNT),
    3,
    true,
  );

  pristine.addValidator(
    NEW_PICTURE_FORM.commentInput,
    isDescriptionValid,
    getSymbolsCountMessage(MAX_DESCRIPTION_LENGTH)
  );

  NEW_PICTURE_FORM.hashtagInput.addEventListener('input', onTextInputChange);
  NEW_PICTURE_FORM.commentInput.addEventListener('input', onTextInputChange);
};


export {resetValidator, isValid, init};

