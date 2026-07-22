import { getRandomInteger, getRandomArrayElement, commentIdsPool } from './util.js';
import { DESCRIPTION, NAMES, MESSAGE } from './constants.js';

const createComment = () => ({
  id: commentIdsPool.pop(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGE),
  name: getRandomArrayElement(NAMES),
});


const photoDescription = (element, index) => {
  const photoID = index + 1;
  const commentsCount = getRandomInteger(1, 30);

  return {
    id: photoID,
    url: `photos/${photoID}.jpg`,
    description: getRandomArrayElement(DESCRIPTION),
    likes: getRandomInteger(15, 300),
    comments: Array.from({ length: commentsCount }, createComment),
  };
};

export { photoDescription };
