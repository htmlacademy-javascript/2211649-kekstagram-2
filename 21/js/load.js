const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const createLoader = (onSuccess, onError) => () =>
  fetch(`${BASE_URL}/data`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onError(err);
    });

const createSender = (onSuccess, onError) => (body) =>
  fetch(BASE_URL, {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      onSuccess();
    })
    .catch((err) => {
      onError(err);
    });

export {createLoader, createSender};
