import { picturesData } from './main.js';
import {makeIdGenerator, debounce } from './util.js';

const RERENDER_DELAY = 500;
const filtersForm = document.querySelector('.img-filters__form');
const btnDefault = filtersForm.querySelector('#filter-default');
const btnRandom = filtersForm.querySelector('#filter-random');
const btnPopular = filtersForm.querySelector('#filter-discussed');

let currentActiveBtn = btnDefault;

const getFilterData = (evt) => {
  switch (evt.target.id) {

    case 'filter-random':
      return function() {
        const generateId = makeIdGenerator(1, 25);
        const randomIds = Array.from({length: 10}, generateId);
        return picturesData.filter((picture) => randomIds.includes(picture.id));
      }();

    case 'filter-discussed':
      return picturesData.slice().sort((a, b) => {
        const popularityA = a.comments.length;
        const popularityB = b.comments.length;
        return popularityB - popularityA;
      });

    default:
      return picturesData;
  }
};


const filterPictures = (evt, cb) => {
  currentActiveBtn.classList.remove('img-filters__button--active');
  currentActiveBtn = evt.target;
  currentActiveBtn.classList.add('img-filters__button--active');

  const previousPictures = document.querySelectorAll('.picture');
  previousPictures.forEach((previousPicture) => previousPicture.remove());

  const data = getFilterData(evt);
  cb(data);
};


const setDafaultFilterClick = (cb) => {
  const onFilterBtnClick = debounce((evt) => filterPictures(evt, cb), RERENDER_DELAY);
  btnDefault.addEventListener('click', onFilterBtnClick);
};

const setRandomFilterClick = (cb) => {
  const onFilterBtnClick = debounce((evt) => filterPictures(evt, cb), RERENDER_DELAY);
  btnRandom.addEventListener('click', onFilterBtnClick);
};

const setPopularFilterClick = (cb) => {
  const onFilterBtnClick = debounce((evt) => filterPictures(evt, cb), RERENDER_DELAY);
  btnPopular.addEventListener('click', onFilterBtnClick);
};

export {setDafaultFilterClick, setRandomFilterClick, setPopularFilterClick};
