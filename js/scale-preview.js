import {form, preview, scaleInput} from './uploading-picture-modal.js';
import {SCALE_STEP} from './constants.js';

const MAX_SCALE_VALUE = SCALE_STEP * 4;
const MIN_SCALE_VALUE = SCALE_STEP * 1;

const scalingUpButton = form.querySelector('.scale__control--bigger');
const scalingDownButton = form.querySelector('.scale__control--smaller');


const onScalingButton = (evt) => {
  const scaleValue = parseInt(scaleInput.value, 10);
  const newScaleValue = (evt.target === scalingUpButton) ?
    Math.min(MAX_SCALE_VALUE, scaleValue + SCALE_STEP) :
    Math.max(MIN_SCALE_VALUE, scaleValue - SCALE_STEP);
  scaleInput.value = `${newScaleValue}%`;
  preview.style.transform = `scale(${newScaleValue / 100})`;
};

scalingUpButton.addEventListener('click', onScalingButton);

scalingDownButton.addEventListener('click', onScalingButton);
