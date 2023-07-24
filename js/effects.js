import {MODALS, NODES} from './html-elements.js';

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
  NODES.sliderContainer.classList.add('hidden');
  NODES.preview.style.filter = 'none';
  MODALS.newPictureForm.querySelector('.effects__radio[value = "none"]').checked = true;
  NODES.sliderInput.value = 0;
};

const onEffectSelect = (evt) => {
  if (evt.target.name !== 'effect') {
    return;
  }

  chosenEffect = evt.target.value.toUpperCase();
  const effect = EffectsOptions[chosenEffect];

  if (chosenEffect === 'NONE') {
    NODES.sliderContainer.classList.add('hidden');
  } else {
    NODES.sliderContainer.classList.remove('hidden');
  }
  NODES.slider.noUiSlider.updateOptions(effect.sliderOptions);
};

const init = () => {
  resetEffects();

  NODES.buttonsContainer.addEventListener('change', onEffectSelect);

  noUiSlider.create(NODES.slider, {
    ...EffectsOptions.NONE.sliderOptions,
    connect: 'lower',
    format: {
      to: (value) => value.toFixed((Number.isInteger(value)) ? 0 : 1),
      from: Number.parseFloat,
    },
  });

  NODES.slider.noUiSlider.on('update', () => {
    NODES.sliderInput.value = NODES.slider.noUiSlider.get();
    const effect = EffectsOptions[chosenEffect];
    if (effect) {
      NODES.preview.style.filter = effect.filterOptions(NODES.sliderInput.value);
    }
  });
};

export {init, resetEffects};
