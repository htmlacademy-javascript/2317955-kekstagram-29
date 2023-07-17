import { picturesData } from './main.js';
import {makeIdGenerator, debounce } from './util.js';

const RERENDER_DELAY = 500;
const form = document.querySelector('.img-filters__form');
const buttons = form.querySelectorAll('.img-filters__button');

let currentActiveBtn = form.querySelector('#filter-default');

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


const setOnFiltersClick = (cb) => {
  const onFilterBtnClick = debounce((evt) => filterPictures(evt, cb), RERENDER_DELAY);
  buttons.forEach((button) => button.addEventListener('click', onFilterBtnClick));
};


export {setOnFiltersClick};
