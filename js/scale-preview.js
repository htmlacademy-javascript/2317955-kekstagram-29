import {form,preview, scaleInput} from './uploading-foto-modal.js';
import {SCALE_STEP} from './constants.js';

const MAX_SCALE_VALUE = 100;
const MIN_SCALE_VALUE = 25;

const scaleSmallerBtn = form.querySelector('.scale__control--smaller');
const scaleBiggerBtn = form.querySelector('.scale__control--bigger');


const scalePreview = (operand) => {
  const scaleValue = parseInt(scaleInput.value, 10);
  const newScaleValue = (operand === 'plus') ? scaleValue + SCALE_STEP : scaleValue - SCALE_STEP;
  scaleInput.value = `${newScaleValue}%`;
  preview.style.transform = `scale(${newScaleValue / 100})`;
};


scaleSmallerBtn.addEventListener('click', () => {
  if (scaleInput.value === `${MIN_SCALE_VALUE}%`) {
    return;
  }
  scalePreview('minus');
});

scaleBiggerBtn.addEventListener('click', () => {
  if (scaleInput.value === `${MAX_SCALE_VALUE}%`) {
    return;
  }
  scalePreview('plus');
});
