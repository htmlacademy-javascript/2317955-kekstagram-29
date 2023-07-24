import {NODES} from './html-elements.js';

const SCALE_STEP = 25;
const minScaleValue = SCALE_STEP * 1;
const maxScaleValue = SCALE_STEP * 4;


const getNewScaleValue = (button, currentValue) => {
  switch (button) {
    case NODES.scalingUpButton:
      return Math.min(maxScaleValue, currentValue + SCALE_STEP);
    case NODES.scalingDownButton:
      return Math.max(minScaleValue, currentValue - SCALE_STEP);
  }
};

const onScalingButton = (evt) => {
  const scaleValue = parseInt(NODES.scaleInput.value, 10);
  const newScaleValue = getNewScaleValue(evt.target, scaleValue);
  NODES.scaleInput.value = `${newScaleValue}%`;
  NODES.preview.style.transform = `scale(${newScaleValue / 100})`;
};

const handleScalingClick = () => {
  NODES.scalingUpButton.addEventListener('click', onScalingButton);
  NODES.scalingDownButton.addEventListener('click', onScalingButton);
};

export {handleScalingClick};
