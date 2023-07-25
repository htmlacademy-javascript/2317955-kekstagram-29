import {debounce} from './util.js';
import {FILTERS} from './html-elements.js';

const RERENDER_DELAY = 500;
const RANDOM_PICTURES_COUNT = 10;

let currentActiveButton = FILTERS.default;

const getFiltersData = (effect, picturesData) => {
  switch (effect) {

    case 'filter-random': {
      return picturesData.slice().sort(() => Math.random() - 0.5).slice(0, RANDOM_PICTURES_COUNT);
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


const handleClick = (cb, picturesData) => {
  FILTERS.root.classList.remove('img-filters--inactive');
  const getDebouncedFunction = debounce((data) => {
    const previousPictures = document.querySelectorAll('.picture');
    previousPictures.forEach((previousPicture) => previousPicture.remove());
    cb(data);
  }, RERENDER_DELAY);
  const onFilterBtnClick = (evt) => filterPictures(evt, getDebouncedFunction, picturesData);
  FILTERS.root.addEventListener('click', onFilterBtnClick);
};


export {handleClick};
