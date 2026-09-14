const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');

const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;

const updateScale = function (value) {
  scaleControlValue.value = `${value}%`;
  previewImage.style.transform = `scale(${value / 100})`;
};

scaleControlSmaller.onclick = function () {
  const currentValue = parseInt(scaleControlValue.value, 10);
  const newValue = Math.max(SCALE_MIN, currentValue - SCALE_STEP);
  updateScale(newValue);
};

scaleControlBigger.onclick = function () {
  const currentValue = parseInt(scaleControlValue.value, 10);
  const newValue = Math.min(SCALE_MAX, currentValue + SCALE_STEP);
  updateScale(newValue);
};

const resetScale = function () {
  updateScale(SCALE_DEFAULT);
};

export {resetScale};
