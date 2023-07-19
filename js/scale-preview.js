import {form, preview, scaleInput} from './uploading-picture-modal.js';
import {SCALE_STEP} from './constants.js';

const minScaleValue = SCALE_STEP * 1;
const maxScaleValue = SCALE_STEP * 4;

const scalingUpButton = form.querySelector('.scale__control--bigger');
const scalingDownButton = form.querySelector('.scale__control--smaller');

const getNewScaleValue = (button, currentValue) => {
  switch (button) {
    case scalingUpButton:
      return Math.min(maxScaleValue, currentValue + SCALE_STEP);
    case scalingDownButton:
      return Math.max(minScaleValue, currentValue - SCALE_STEP);
  }
};

const onScalingButton = (evt) => {
  const scaleValue = parseInt(scaleInput.value, 10);
  const newScaleValue = getNewScaleValue(evt.target, scaleValue);
  scaleInput.value = `${newScaleValue}%`;
  preview.style.transform = `scale(${newScaleValue / 100})`;
};

scalingUpButton.addEventListener('click', onScalingButton);

scalingDownButton.addEventListener('click', onScalingButton);
