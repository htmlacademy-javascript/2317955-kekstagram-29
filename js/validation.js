import {form} from './upload-foto.js';


const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper', // Элемент, на который будут добавляться классы
  errorClass: 'form__item--invalid', // Класс, обозначающий невалидное поле
  successClass: 'form__item--valid', // Класс, обозначающий валидное поле
  errorTextParent: 'img-upload__field-wrapper', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'span', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'img-upload__message' // Класс для элемента с текстом ошибки
});

const hasgtagRule = /\B#[a-zа-яё0-9]{1,19}\b/i;
const validateHashtag = (value) => {
  return hasgtagRule.test(value);
  // хэш-тег начинается с символа # (решётка);
  // строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
  // хеш-тег не может состоять только из одной решётки;
  // максимальная длина одного хэш-тега 20 символов, включая решётку;
  // хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
  // хэш-теги разделяются пробелами;
  // один и тот же хэш-тег не может быть использован дважды;
  // нельзя указать больше пяти хэш-тегов;
};
const validateDescription = (value) => value.length <= 140;


pristine.addValidator(
  form.querySelector('.text__description'),
  validateDescription,
  'Максимальная длина сообщения 140 символов'
);

pristine.addValidator(
  form.querySelector('.text__hashtags'),
  validateHashtag,
  'error',
);


form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна');
  }
});
