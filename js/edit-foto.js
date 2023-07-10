import {form} from './upload-foto.js';
import {SCALE_STEP} from './constants.js';

const scaleSmallerBtn = form.querySelector('.scale__control--smaller');
const scaleBiggerBtn = form.querySelector('.scale__control--bigger');
const scaleInput = form.querySelector('.scale__control--value');
const preview = form.querySelector('.img-upload__preview');

const effectSliderComtainer = form.querySelector('.img-upload__effect-level');
const effectSlider = effectSliderComtainer.querySelector('.effect-level__slider');
const effectInput = effectSliderComtainer.querySelector('.effect-level__value');

const effectRadioCollection = form.querySelectorAll('.effects__radio ');

const scalePreview = () => {
  const scaleValue = +scaleInput.value.replace('%', '') / 100;
  preview.style.transform = `scale(${scaleValue})`;
};

scaleSmallerBtn.addEventListener('click', () => {
  if (scaleInput.value === '25%') {
    return;
  }
  let scaleValue = +scaleInput.value.replace('%', '');
  scaleValue -= SCALE_STEP;
  scaleInput.value = `${scaleValue}%`;
  scalePreview();
});
scaleBiggerBtn.addEventListener('click', () => {
  if (scaleInput.value === '100%') {
    return;
  }
  let scaleValue = +scaleInput.value.replace('%', '');
  scaleValue += SCALE_STEP;
  scaleInput.value = `${scaleValue}%`;
  scalePreview();
});

effectInput.value = 100;
noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 0,
  step: 1,
  connect: 'lower',
});

effectSlider.noUiSlider.on('update', () => {
  effectInput.value = effectSlider.noUiSlider.get();
  let value;
  for (const radio of effectRadioCollection) {
    if (radio.checked) {
      value = radio.value;
    }
  }

  switch (value) {
    case 'none':
      preview.style.filter = '';
      break;
    case 'chrome':
      preview.style.filter = `grayscale(${effectInput.value})`;
      break;
    case 'sepia':
      preview.style.filter = `sepia(${effectInput.value})`;
      break;
    case 'marvin':
      preview.style.filter = `invert(${effectInput.value}%)`;
      break;
    case 'phobos':
      preview.style.filter = `blur(${effectInput.value}px)`;
      break;
    case 'heat':
      preview.style.filter = `brightness(${effectInput.value})`;
      break;
  }
});

form.addEventListener('change', () => {
  let value;
  for (const radio of effectRadioCollection) {
    if (radio.checked) {
      value = radio.value;
    }
  }

  if (value === 'none') {
    effectSliderComtainer.classList.add('hidden');
  } else {
    effectSliderComtainer.classList.remove('hidden');
  }

  switch (value) {
    case 'none':
      break;
    case 'chrome':
      effectSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      break;
    case 'sepia':
      effectSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      break;
    case 'marvin':
      effectSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
      break;
    case 'phobos':
      effectSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      break;
    case 'heat':
      effectSlider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      break;
  }
});

/* Настройки эффектов:
chrome — filter: grayscale(0..1) с шагом 0.1;
sepia — filter: sepia(0..1) с шагом 0.1;
marvin — filter: invert(0..100%) с шагом 1%;
phobos — filter: blur(0..3px) с шагом 0.1px;
heat — filter: brightness(1..3) с шагом 0.1;
none CSS-стили filter удаляются.
*/
