export const getEffectSliderOptions = (effect) => {
  switch (effect) {
    case 'chrome':
      return {
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      };
    case 'sepia':
      return {
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      };
    case 'marvin':
      return {
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      };
    case 'phobos':
      return {
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      };
    case 'heat':
      return {
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      };
  }
};

export const getEffecFiltertOption = (effect, input) => {
  switch (effect) {
    case 'chrome':
      return `grayscale(${input.value})`;
    case 'sepia':
      return `sepia(${input.value})`;
    case 'marvin':
      return `invert(${input.value}%)`;
    case 'phobos':
      return `blur(${input.value}px)`;
    case 'heat':
      return `brightness(${input.value})`;
  }
};
