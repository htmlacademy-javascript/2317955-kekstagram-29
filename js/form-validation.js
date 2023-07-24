import {MODALS, NODES} from './html-elements.js';

const MAX_HASHTAG_LENGTH = 19;
const MAX_HASHTAG_COUNT = 5;
const MAX_DESCRIPTION_LENGTH = 140;
const HASHTAG_RULE_REGEX = new RegExp(`^#[a-zа-яё0-9]{1,${MAX_HASHTAG_LENGTH}}$`, 'i');

/* TODO here we can use classes to group those simillar functions:
class MessageFormater {
  static rules = new Intl.PluralRules('ru-RU');

  static message(n) {
    return MessageFormater.rules.select(n)
}
MessageFormater.message(5)
*/

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


const pristine = new Pristine(MODALS.newPictureForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const isValid = pristine.validate;
const resetValidator = pristine.reset;

const getHashtagsArray = (value) => value.toLowerCase().replace(/\s+/g, ' ').trim().split(' ');

const isEveryHasgtagUnique = (value) => {
  const hashtags = getHashtagsArray(value);
  return hashtags.length === new Set(hashtags).size;
};

const isEveryHashtagValid = (value) => {
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
  NODES.submitBtn.disabled = !isValid();
};

const init = () => {
  pristine.addValidator(
    NODES.hashtagInput,
    isEveryHasgtagUnique,
    'Хештеги не должны повторяться',
    1,
    true,
  );

  pristine.addValidator(
    NODES.hashtagInput,
    isEveryHashtagValid,
    getLettersCountMessage(MAX_HASHTAG_LENGTH),
    2,
    true,
  );

  pristine.addValidator(
    NODES.hashtagInput,
    isHashtagCountValid,
    getHashtagCountMessage(MAX_HASHTAG_COUNT),
    3,
    true,
  );

  pristine.addValidator(
    NODES.commentInput,
    isDescriptionValid,
    getSymbolsCountMessage(MAX_DESCRIPTION_LENGTH)
  );

  NODES.hashtagInput.addEventListener('input', onTextInputChange);
  NODES.commentInput.addEventListener('input', onTextInputChange);
};


export {resetValidator, isValid, init};

