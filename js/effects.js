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

const effectsListElement = document.querySelector('.effects__list');
const effectLevelElement = document.querySelector('.img-upload__effect-level');
const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const effectLevelValueElement = document.querySelector('.effect-level__value');
const previewImageElement = document.querySelector('.img-upload__preview img');

let currentEffect = EFFECT_NONE;

const updateImageFilter = (value) => {
  const effect = EFFECTS[currentEffect];

  if (effect.filter === null) {
    previewImageElement.style.filter = '';
  } else {
    previewImageElement.style.filter = `${effect.filter}(${value}${effect.unit})`;
  }
};

noUiSlider.create(effectLevelSliderElement, {
  range: EFFECTS[EFFECT_NONE].range,
  start: EFFECTS[EFFECT_NONE].start,
  step: EFFECTS[EFFECT_NONE].step,
  connect: 'lower',
  format: {
    to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
    from: (value) => parseFloat(value),
  },
});

effectLevelElement.classList.add('hidden');

effectLevelSliderElement.noUiSlider.on('update', (values, handle) => {
  const value = values[handle];
  effectLevelValueElement.value = value;
  updateImageFilter(value);
});

const updateSliderForEffect = (effectName) => {
  const effect = EFFECTS[effectName];

  effectLevelSliderElement.noUiSlider.updateOptions({
    range: effect.range,
    start: effect.start,
    step: effect.step,
  });
};

const onEffectsListChange = (evt) => {
  if (!evt.target.matches('input[type="radio"]')) {
    return;
  }

  currentEffect = evt.target.value;

  if (currentEffect === EFFECT_NONE) {
    effectLevelElement.classList.add('hidden');
  } else {
    effectLevelElement.classList.remove('hidden');
  }

  updateSliderForEffect(currentEffect);
};

effectsListElement.addEventListener('change', onEffectsListChange);

const resetEffect = () => {
  currentEffect = EFFECT_NONE;
  effectLevelElement.classList.add('hidden');
  updateSliderForEffect(EFFECT_NONE);
};

export {resetEffect};
