import {form, submitBtn, hashtagInput, commentInput} from './upload-foto.js';
import {MAX_HASHTAG_LENGTH, MAX_HASHTAG_AMOUNT, MAX_DESCRIPTION_LENGTH} from './constants.js';


const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper', // Элемент, на который будут добавляться классы
  // errorClass: '', // Класс, обозначающий невалидное поле
  // successClass: '', // Класс, обозначающий валидное поле
  errorTextParent: 'img-upload__field-wrapper', // Элемент, куда будет выводиться текст с ошибкой
  // errorTextTag: '', // Тег, который будет обрамлять текст ошибки
  // errorTextClass: '' // Класс для элемента с текстом ошибки
});

const getHashtagsArray = (value) => value.replace(/\s+/g, ' ').trim().split(' ');

const isEveryHashtagValid = (value) => {
  if (value === '') {
    return true;
  }
  const hashtagRule = new RegExp(`^#[a-zа-яё0-9]{1,${MAX_HASHTAG_LENGTH}}$`, 'i');
  const hashtags = getHashtagsArray(value);
  return hashtags.every((hashtag) => hashtagRule.test(hashtag));
};
pristine.addValidator(
  hashtagInput,
  isEveryHashtagValid,
  `Хештег должен начинаться с # и содержать не более ${MAX_HASHTAG_LENGTH} букв кирилицы и/или латинского алфавита`,
);

const isEveryHasgtagUnique = (value) => {
  const hashtags = getHashtagsArray(value);
  const hashtagsNormalise = hashtags.map((hashtag) => hashtag.toLowerCase());
  return hashtagsNormalise.every((hashtag) => hashtagsNormalise.indexOf(hashtag) === hashtagsNormalise.lastIndexOf(hashtag));
};
pristine.addValidator(
  hashtagInput,
  isEveryHasgtagUnique,
  'Хештеги не должны повторяться',
);

const isHashtagAmountValid = (value) => {
  const hashtags = getHashtagsArray(value);
  return hashtags.length <= MAX_HASHTAG_AMOUNT;
};
pristine.addValidator(
  hashtagInput,
  isHashtagAmountValid,
  `Максимум ${MAX_HASHTAG_AMOUNT} хештегов`,
);


const isDescriptionValid = (value) => value.length <= MAX_DESCRIPTION_LENGTH;
pristine.addValidator(
  commentInput,
  isDescriptionValid,
  `Максимальная длина сообщения ${MAX_DESCRIPTION_LENGTH} символов`
);


const isEverythingValid = () => pristine.validate();
const disableSubmitBtn = () => {
  submitBtn.disabled = !isEverythingValid();
};
hashtagInput.addEventListener('input', () => {
  disableSubmitBtn();
});
commentInput.addEventListener('input', () => {
  disableSubmitBtn();
});

