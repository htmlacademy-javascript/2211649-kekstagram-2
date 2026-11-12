import {isEscapeKey} from './util.js';

const DATA_ERROR_SHOW_TIME = 5000;

let currentMessageElement = null;

const getTemplateElement = (name) =>
  document.querySelector(`#${name}`).content.querySelector(`.${name}`).cloneNode(true);

const showDataError = () => {
  const dataErrorElement = getTemplateElement('data-error');
  document.body.append(dataErrorElement);

  setTimeout(() => {
    dataErrorElement.remove();
  }, DATA_ERROR_SHOW_TIME);
};

const onMessageKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
};

function closeMessage () {
  if (!currentMessageElement) {
    return;
  }

  currentMessageElement.remove();
  currentMessageElement = null;
  document.removeEventListener('keydown', onMessageKeydown);
}

const showMessage = (name) => {
  closeMessage();

  const messageElement = getTemplateElement(name);

  messageElement.querySelector(`.${name}__button`).addEventListener('click', closeMessage);

  messageElement.addEventListener('click', (evt) => {
    if (!evt.target.closest(`.${name}__inner`)) {
      closeMessage();
    }
  });

  document.body.append(messageElement);
  currentMessageElement = messageElement;
  document.addEventListener('keydown', onMessageKeydown);
};

const showSuccessMessage = () => showMessage('success');
const showErrorMessage = () => showMessage('error');
const isMessageShown = () => currentMessageElement !== null;

export {showDataError, showSuccessMessage, showErrorMessage, isMessageShown};
