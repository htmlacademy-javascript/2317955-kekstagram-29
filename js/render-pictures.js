/*
Задача: Отобразить фотографии других пользователей.

На основе временных данных для разработки и шаблона #picture создайте DOM-элементы, соответствующие фотографиям, и заполните их данными:

Адрес изображения url подставьте как атрибут src изображения.
Описание изображения description подставьте в атрибут alt изображения.
Количество лайков likes выведите в блок .picture__likes.
Количество комментариев comments выведите в блок .picture__comments.

Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.

Подключите модуль в проект.
*/

// import {getRandomFotosV1} from './get-random-fotos-v1.js';
import {getRandomFotosV2} from './get-random-fotos-v2.js';
import {FOTOS_AMOUNT} from './constants.js';

// const generatedPicturesData = getRandomFotosV1(FOTOS_AMOUNT);
const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesData = getRandomFotosV2(FOTOS_AMOUNT);

const picturesTemporaryFragment = document.createDocumentFragment();

picturesData.forEach(({url, description, likes, comments, id}) => {
  const newPicture = pictureTemplate.cloneNode(true);
  newPicture.dataset.id = id;
  const image = newPicture.querySelector('.picture__img');
  image.src = url;
  image.alt = description;
  newPicture.querySelector('.picture__likes').textContent = likes;
  newPicture.querySelector('.picture__comments').textContent = comments.length;
  picturesTemporaryFragment.append(newPicture);
});

const renderPictures = () => picturesContainer.append(picturesTemporaryFragment);
renderPictures();

export {picturesData};
