import {form,preview, scaleInput} from './uploading-foto-modal.js';
import {SCALE_STEP} from './constants.js';

const scaleSmallerBtn = form.querySelector('.scale__control--smaller');
const scaleBiggerBtn = form.querySelector('.scale__control--bigger');


const scalePreview = (operand) => {
  const scaleValue = +scaleInput.value.replace('%', '');
  const newScaleValue = (operand === 'plus') ? scaleValue + SCALE_STEP : scaleValue - SCALE_STEP;
  scaleInput.value = `${newScaleValue}%`;
  preview.style.transform = `scale(${newScaleValue / 100})`;
};

scaleSmallerBtn.addEventListener('click', () => {
  if (scaleInput.value === '25%') {
    return;
  }
  scalePreview('minus');
});

scaleBiggerBtn.addEventListener('click', () => {
  if (scaleInput.value === '100%') {
    return;
  }
  scalePreview('plus');
});
