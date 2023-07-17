import {makeIdGenerator, debounce} from './util.js';
import {FOTOS_AMOUNT} from './constants.js';

const RANDOM_FOROS_AMOUNT = 10;
const RERENDER_DELAY = 500;
const form = document.querySelector('.img-filters__form');
const buttons = form.querySelectorAll('.img-filters__button');
let currentActiveButton = form.querySelector('#filter-default');

const getFiltersData = (evt, picturesData) => {
  switch (evt.target.id) {

    case 'filter-random':
      return function() {
        const generateId = makeIdGenerator(1, FOTOS_AMOUNT);
        const randomIds = Array.from({length: RANDOM_FOROS_AMOUNT}, generateId);
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

const filterPictures = (evt, cb, picturesData) => {
  currentActiveButton.classList.remove('img-filters__button--active');
  currentActiveButton = evt.target;
  currentActiveButton.classList.add('img-filters__button--active');

  const previousPictures = document.querySelectorAll('.picture');
  previousPictures.forEach((previousPicture) => previousPicture.remove());

  const filtersData = getFiltersData(evt, picturesData);
  cb(filtersData);
};


const setOnFiltersClick = (cb, picturesData) => {
  const onFilterBtnClick = debounce((evt) => filterPictures(evt, cb, picturesData), RERENDER_DELAY);
  buttons.forEach((button) => button.addEventListener('click', onFilterBtnClick));
};


export {setOnFiltersClick};
