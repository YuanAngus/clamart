import { faker } from '@faker-js/faker';

export function generateGoods(n) {
  const ret = [];
  for (let i = 0; i < n; i++) {
    ret.push({
      id: faker.string.numeric(7),
      picture: generateImage(306, 306),
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      desc: faker.commerce.productDescription(),
    });
  }
  return ret;
}

export function generateImage(w, h) {
  if (w) {
    if (h) {
      return `https://picsum.photos/${w}/${h}?random=${Math.random()}`;
    } else {
      return `https://picsum.photos/${w}?random=${Math.random()}`;
    }
  } else {
    return `https://picsum.photos/100?random=${Math.random()}`;
  }
}

export function generateSubCategory(id, n) {
  const ret = [];
  for (let i = 0; i < n; i++) {
    ret.push({
      id: id + faker.string.numeric(6),
      name: faker.commerce.department(),
      picture: generateImage(100, 100),
      goods: generateGoods(5),
    });
  }
  return ret;
}