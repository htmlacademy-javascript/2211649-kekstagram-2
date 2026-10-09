const DATA_ERROR_SHOW_TIME = 5000;

let currentMessage = null;

const isEscapeKey = (evt) => evt.key === 'Escape';

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
  if (!currentMessage) {
    return;
  }

  currentMessage.remove();
  currentMessage = null;
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
  currentMessage = messageElement;
  document.addEventListener('keydown', onMessageKeydown);
};

const showSuccessMessage = () => showMessage('success');
const showErrorMessage = () => showMessage('error');
const isMessageShown = () => currentMessage !== null;

export {showDataError, showSuccessMessage, showErrorMessage, isMessageShown};
