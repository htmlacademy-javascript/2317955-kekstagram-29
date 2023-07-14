import {form, hashtagInput, commentInput, preview, effectSliderComtainer} from './uploading-foto-modal.js';
import {getEffectSliderOptions, getEffecFiltertOption} from './data.js';

const effectSlider = effectSliderComtainer.querySelector('.effect-level__slider');
const effectLevelInput = effectSliderComtainer.querySelector('.effect-level__value');


noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

let activeEffectRadioBtn;

form.addEventListener('change', (evt) => {
  if (evt.target === commentInput | evt.target === hashtagInput) {
    return;
  }

  activeEffectRadioBtn = form.querySelector('.effects__radio:checked').value;

  if (activeEffectRadioBtn === 'none') {
    effectSliderComtainer.classList.add('hidden');
    preview.style.filter = 'none';
  } else {
    effectSliderComtainer.classList.remove('hidden');
    effectSlider.noUiSlider.updateOptions(getEffectSliderOptions(activeEffectRadioBtn));
  }
});

effectSlider.noUiSlider.on('update', () => {
  effectLevelInput.value = effectSlider.noUiSlider.get();
  preview.style.filter = getEffecFiltertOption(activeEffectRadioBtn, effectLevelInput);
});

