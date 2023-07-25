import {NEW_PICTURE_FORM} from './html-elements.js';

const EffectsOptions = {
  NONE: {
    sliderOptions: {
      range: {
        min: 0,
        max: 0,
      },
      start: 0,
      step: 0,
    },
    filterOptions: () => 'none',
  },
  CHROME: {
    sliderOptions: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    filterOptions: (inputValue) => `grayscale(${inputValue})`,
  },
  SEPIA: {
    sliderOptions: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    filterOptions: (inputValue) => `sepia(${inputValue})`,
  },
  MARVIN: {
    sliderOptions: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    },
    filterOptions: (inputValue) => `invert(${inputValue}%)`,
  },
  PHOBOS: {
    sliderOptions: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    filterOptions: (inputValue) => `blur(${inputValue}px)`,
  },
  HEAT: {
    sliderOptions: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    filterOptions: (inputValue) => `brightness(${inputValue})`,
  },
};

let chosenEffect;

const resetEffects = () => {
  NEW_PICTURE_FORM.sliderContainer.classList.add('hidden');
  NEW_PICTURE_FORM.preview.style.filter = 'none';
  NEW_PICTURE_FORM.defaultEffect.checked = true;
  NEW_PICTURE_FORM.sliderInput.value = 0;
};

const onEffectSelect = (evt) => {
  if (evt.target.name !== 'effect') {
    return;
  }

  chosenEffect = evt.target.value.toUpperCase();
  const effect = EffectsOptions[chosenEffect];

  if (chosenEffect === 'NONE') {
    NEW_PICTURE_FORM.sliderContainer.classList.add('hidden');
  } else {
    NEW_PICTURE_FORM.sliderContainer.classList.remove('hidden');
  }

  NEW_PICTURE_FORM.slider.noUiSlider.updateOptions(effect.sliderOptions);
};

const init = () => {
  resetEffects();

  NEW_PICTURE_FORM.buttonsContainer.addEventListener('change', onEffectSelect);

  noUiSlider.create(NEW_PICTURE_FORM.slider, {
    ...EffectsOptions.NONE.sliderOptions,
    connect: 'lower',
    format: {
      to: (value) => value.toFixed((Number.isInteger(value)) ? 0 : 1),
      from: Number.parseFloat,
    },
  });

  NEW_PICTURE_FORM.slider.noUiSlider.on('update', () => {
    NEW_PICTURE_FORM.sliderInput.value = NEW_PICTURE_FORM.slider.noUiSlider.get();
    const effect = EffectsOptions[chosenEffect];

    if (effect) {
      NEW_PICTURE_FORM.preview.style.filter = effect.filterOptions(NEW_PICTURE_FORM.sliderInput.value);
    }

  });
};

export {init, resetEffects};
