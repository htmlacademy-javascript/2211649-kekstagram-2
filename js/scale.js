const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;

const scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = document.querySelector('.scale__control--bigger');
const scaleControlValueElement = document.querySelector('.scale__control--value');
const previewImageElement = document.querySelector('.img-upload__preview img');

const updateScale = (value) => {
  scaleControlValueElement.value = `${value}%`;
  previewImageElement.style.transform = `scale(${value / 100})`;
};

const onScaleSmallerClick = () => {
  const currentValue = parseInt(scaleControlValueElement.value, 10);
  const newValue = Math.max(SCALE_MIN, currentValue - SCALE_STEP);
  updateScale(newValue);
};

const onScaleBiggerClick = () => {
  const currentValue = parseInt(scaleControlValueElement.value, 10);
  const newValue = Math.min(SCALE_MAX, currentValue + SCALE_STEP);
  updateScale(newValue);
};

scaleControlSmallerElement.addEventListener('click', onScaleSmallerClick);
scaleControlBiggerElement.addEventListener('click', onScaleBiggerClick);

const resetScale = () => {
  updateScale(SCALE_DEFAULT);
};

export {resetScale};
