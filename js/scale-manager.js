import {NEW_PICTURE_FORM} from './html-elements.js';

const SCALE_STEP = 25;
const minScaleValue = SCALE_STEP * 1;
const maxScaleValue = SCALE_STEP * 4;


const getNewScaleValue = (button, currentValue) => {
  switch (button) {
    case NEW_PICTURE_FORM.scalingUpButton:
      return Math.min(maxScaleValue, currentValue + SCALE_STEP);
    case NEW_PICTURE_FORM.scalingDownButton:
      return Math.max(minScaleValue, currentValue - SCALE_STEP);
  }
};

const onScalingButtonClick = (evt) => {
  const scaleValue = parseInt(NEW_PICTURE_FORM.scaleInput.value, 10);
  const newScaleValue = getNewScaleValue(evt.target, scaleValue);
  NEW_PICTURE_FORM.scaleInput.value = `${newScaleValue}%`;
  NEW_PICTURE_FORM.preview.style.transform = `scale(${newScaleValue / 100})`;
};

const handleClick = () => {
  NEW_PICTURE_FORM.scalingUpButton.addEventListener('click', onScalingButtonClick);
  NEW_PICTURE_FORM.scalingDownButton.addEventListener('click', onScalingButtonClick);
};

export {handleClick};
