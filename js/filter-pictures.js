import {makeIdGenerator, debounce} from './util.js';
import {FOTOS_AMOUNT} from './constants.js';

const RANDOM_FOTOS_AMOUNT = 10;
const RERENDER_DELAY = 500;
const form = document.querySelector('.img-filters__form');
let currentActiveButton = form.querySelector('#filter-default');

const getFiltersData = (evt, picturesData) => {
  switch (evt.target.id) {

    case 'filter-random':
      return function() {
        const generateId = makeIdGenerator(0, FOTOS_AMOUNT - 1);
        const randomIds = Array.from({length: RANDOM_FOTOS_AMOUNT}, generateId);
        return Array.from(randomIds, (id) => picturesData[id]);
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
  if (evt.target.classList.contains('img-filters__button')) {
    currentActiveButton.classList.remove('img-filters__button--active');
    currentActiveButton = evt.target;
    currentActiveButton.classList.add('img-filters__button--active');

    const previousPictures = document.querySelectorAll('.picture');
    previousPictures.forEach((previousPicture) => previousPicture.remove());

    const filtersData = getFiltersData(evt, picturesData);
    cb(filtersData);
  }
};


const setOnFiltersClick = (cb, picturesData) => {
  const makeDebouncer = debounce((data) => cb(data), RERENDER_DELAY);
  const onFilterBtnClick = (evt) => filterPictures(evt, makeDebouncer, picturesData);
  form.addEventListener('click', onFilterBtnClick);
};


export {setOnFiltersClick};
