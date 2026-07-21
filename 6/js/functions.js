/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
const lineLength = function (string, maxLength) {
  if (string.length <= maxLength) {
    return true;
  } else {
    return false;
  }
};

const Palin = function (string) {
  let empty = '';

  for (let i = string.length - 1; i >= 0; i--) {
    empty += string[i];
  }

  return empty === string;
};


const Kolo = function (string) {
  let a = '';
  const digits = '0123456789';

  for (let i = 0; i < string.length; i++) {
    if (digits.includes(string[i])) {
      a += string[i];
    }
  }

  if (a === '') {
    return NaN;
  } else {
    return +a;
  }
};
