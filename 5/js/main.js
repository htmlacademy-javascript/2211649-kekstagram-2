const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда выделаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше!',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше!',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Иван',
  'Степан',
  'Мария',
  'Дмитрий',
  'Дарья',
  'Ольга',
];

const DESCRIPTION = [
  'В отпуске!',
  'На природе',
  'На работе!',
  'С друзьями!',
  'На прогулке!',
  'Моя собака!',
];

const commentIdsPool = [];
const uniqueIdsSet = new Set();

while (uniqueIdsSet.size < 200) {
  uniqueIdsSet.add(getRandomInteger(1, 1000));
}

commentIdsPool.push(...uniqueIdsSet);

const createComment = () => ({
  id: commentIdsPool.pop(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGE),
  name: getRandomArrayElement(NAMES),
});

const ALL_PHOTOS = 25;

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

Array.from({length: ALL_PHOTOS}, photoDescription);
