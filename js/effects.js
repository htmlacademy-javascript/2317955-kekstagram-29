const form = document.querySelector('.img-upload__form');
const preview = form.querySelector('.img-upload__preview img');
const buttonsContainer = form.querySelector('.img-upload__effects');
const sliderContainer = form.querySelector('.img-upload__effect-level');
const slider = sliderContainer.querySelector('.effect-level__slider');
const sliderInput = sliderContainer.querySelector('.effect-level__value');

let chosenEffect;


const EffectsOptions = {
  DEFAULT: {
    sliderOptions: {
      range: {
        min: 0,
        max: 100,
      },
      start: 0,
      step: 1,
      connect: 'lower',
      format: {
        to: (value) => value.toFixed((Number.isInteger(value)) ? 0 : 1),
        from: Number.parseFloat,
      },
    },
  },
  NONE: {
    sliderOptions: {
      range: {
        min: 0,
        max: 100,
      },
      start: 0,
      step: 1,
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

noUiSlider.create(slider, EffectsOptions.DEFAULT.sliderOptions);


const onEffectBtnChange = (evt) => {
  if (evt.target.name !== 'effect') {
    return;
  }

  chosenEffect = evt.target.value.toUpperCase();
  const effect = EffectsOptions[chosenEffect];

  if (chosenEffect === 'NONE') {
    sliderContainer.classList.add('hidden');
  } else {
    sliderContainer.classList.remove('hidden');
  }
  slider.noUiSlider.updateOptions(effect.sliderOptions);
};

// TODO вынести назначение слушателя радио кнопок куда-то в другое место
buttonsContainer.addEventListener('change', onEffectBtnChange);


slider.noUiSlider.on('update', () => {
  sliderInput.value = slider.noUiSlider.get();
  const effect = EffectsOptions[chosenEffect];
  if (effect) {
    preview.style.filter = effect.filterOptions(sliderInput.value);
  }
});

const resetEffects = () => {
  sliderContainer.classList.add('hidden');
  preview.style.filter = 'none';
  form.querySelector('.effects__radio[value = "none"]').checked = true;
  sliderInput.value = 0;
};

resetEffects();

export {onEffectBtnChange, resetEffects};
