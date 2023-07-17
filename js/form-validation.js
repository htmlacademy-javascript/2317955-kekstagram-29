// import {form, submitBtn, hashtagInput, commentInput} from './uploading-picture-modal.js';
import {MAX_HASHTAG_LENGTH, MAX_HASHTAG_AMOUNT, HASHTAG_RULE_REGEX, MAX_DESCRIPTION_LENGTH} from './constants.js';
const form = document.querySelector('.img-upload__form');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const submitBtn = form.querySelector('.img-upload__submit');


const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper', // Элемент, на который будут добавляться классы
  // errorClass: '', // Класс, обозначающий невалидное поле
  // successClass: '', // Класс, обозначающий валидное поле
  errorTextParent: 'img-upload__field-wrapper', // Элемент, куда будет выводиться текст с ошибкой
  // errorTextTag: '', // Тег, который будет обрамлять текст ошибки
  // errorTextClass: '' // Класс для элемента с текстом ошибки
});

const getHashtagsArray = (value) => value.replace(/\s+/g, ' ').trim().split(' ');

const isHashtagAmountValid = (value) => {
  const hashtags = getHashtagsArray(value);
  return hashtags.length <= MAX_HASHTAG_AMOUNT;
};
pristine.addValidator(
  hashtagInput,
  isHashtagAmountValid,
  `Максимум ${MAX_HASHTAG_AMOUNT} хештегов`,
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
  `Хештег должен начинаться с # и содержать не более ${MAX_HASHTAG_LENGTH} букв кирилицы и/или латинского алфавита`,
  2,
  true,
);

const isEveryHasgtagUnique = (value) => {
  const hashtags = getHashtagsArray(value);
  const hashtagsNormalise = hashtags.map((hashtag) => hashtag.toLowerCase());
  return hashtagsNormalise.length === new Set(hashtagsNormalise).size;
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
  `Максимальная длина сообщения ${MAX_DESCRIPTION_LENGTH} символов`
);


const disableSubmitBtn = () => {
  submitBtn.disabled = !pristine.validate();
};

hashtagInput.addEventListener('input', () => {
  disableSubmitBtn();
});

commentInput.addEventListener('input', () => {
  disableSubmitBtn();
});

const resetValidator = () => pristine.reset();

const isValid = pristine.validate;


export {resetValidator, isValid};

