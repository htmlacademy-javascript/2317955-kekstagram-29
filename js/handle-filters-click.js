import {debounce} from './util.js';
import {RANDOM_FOTOS_NUMBER, RERENDER_DELAY} from './constants.js';

const form = document.querySelector('.img-filters__form');
let currentActiveButton = form.querySelector('#filter-default');

const getFiltersData = (effect, picturesData) => {
  switch (effect) {

    case 'filter-random': {
      return picturesData.slice().sort(() => Math.random() - 0.5).slice(0, RANDOM_FOTOS_NUMBER);
    }

    case 'filter-discussed':
      return picturesData.slice().sort((a, b) => b.comments.length - a.comments.length);

    default:
      return picturesData;
  }
};

const filterPictures = (evt, cb, picturesData) => {
  if (evt.target.classList.contains('img-filters__button')) {
    currentActiveButton.classList.remove('img-filters__button--active');
    currentActiveButton = evt.target;
    currentActiveButton.classList.add('img-filters__button--active');

    const filtersData = getFiltersData(evt.target.id, picturesData);
    cb(filtersData);
  }
};


const handleFiltersClick = (cb, picturesData) => {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  const makeDebouncer = debounce((data) => {
    const previousPictures = document.querySelectorAll('.picture');
    previousPictures.forEach((previousPicture) => previousPicture.remove());
    cb(data);
  }, RERENDER_DELAY);
  const onFilterBtnClick = (evt) => filterPictures(evt, makeDebouncer, picturesData);
  form.addEventListener('click', onFilterBtnClick);
};


export {handleFiltersClick};
