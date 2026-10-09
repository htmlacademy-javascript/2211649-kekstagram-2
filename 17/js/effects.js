const effectsList = document.querySelector('.effects__list');
const imageEffectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const previewImage = document.querySelector('.img-upload__preview img');

const EFFECT_NONE = 'none';

const EFFECTS = {
  none: {
    filter: null,
    unit: '',
    range: {min: 0, max: 100},
    step: 1,
    start: 100,
  },
  chrome: {
    filter: 'grayscale',
    unit: '',
    range: {min: 0, max: 1},
    step: 0.1,
    start: 1,
  },
  sepia: {
    filter: 'sepia',
    unit: '',
    range: {min: 0, max: 1},
    step: 0.1,
    start: 1,
  },
  marvin: {
    filter: 'invert',
    unit: '%',
    range: {min: 0, max: 100},
    step: 1,
    start: 100,
  },
  phobos: {
    filter: 'blur',
    unit: 'px',
    range: {min: 0, max: 3},
    step: 0.1,
    start: 3,
  },
  heat: {
    filter: 'brightness',
    unit: '',
    range: {min: 1, max: 3},
    step: 0.1,
    start: 3,
  },
};

let currentEffect = EFFECT_NONE;

const updateImageFilter = function (value) {
  const effect = EFFECTS[currentEffect];

  if (effect.filter === null) {
    previewImage.style.filter = '';
  } else {
    previewImage.style.filter = `${effect.filter }(${value}${effect.unit})`;
  }
};

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

effectLevelSlider.noUiSlider.on('update', (values, handle) => {
  const value = values[handle];
  effectLevelValue.value = value;
  updateImageFilter(value);
});

const updateSliderForEffect = function (effectName) {
  const effect = EFFECTS[effectName];

  effectLevelSlider.noUiSlider.updateOptions({
    range: effect.range,
    start: effect.start,
    step: effect.step,
  });
};

const onEffectsListChange = function (evt) {
  if (!evt.target.matches('input[type="radio"]')) {
    return;
  }

  currentEffect = evt.target.value;

  if (currentEffect === EFFECT_NONE) {
    imageEffectLevel.classList.add('hidden');
  } else {
    imageEffectLevel.classList.remove('hidden');
  }

  updateSliderForEffect(currentEffect);
};

effectsList.onchange = onEffectsListChange;

const resetEffect = function () {
  currentEffect = EFFECT_NONE;
  imageEffectLevel.classList.add('hidden');
  updateSliderForEffect(EFFECT_NONE);
};

export {resetEffect};
