const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const commentIdsPool = [];
const uniqueIdsSet = new Set();

while (uniqueIdsSet.size < 200) {
  uniqueIdsSet.add(getRandomInteger(1, 1000));
}

commentIdsPool.push(...uniqueIdsSet);

export { getRandomInteger, getRandomArrayElement, commentIdsPool };
