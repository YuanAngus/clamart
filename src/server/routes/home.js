import express from 'express';
import { faker } from '@faker-js/faker';
import { generateGoods, generateImage } from '../utils/random.js';
import { categoryList } from '../utils/categoryStore.js';
const router = express.Router();

function banner(n) {
  const ret = [];
  for (let i = 0; i < n; i++) {
    ret.push({
      id: i+1,
      imgUrl: generateImage(1585, 625),
    });
  }
  return ret;
}

function _new(n) {
  return generateGoods(n);
}

function hot(n) {
  const ret = [];
  for (let i = 0; i < n; i++) {
    ret.push({
      id: i+1,
      picture: generateImage(306, 306),
      title: faker.commerce.product(),
      alt: faker.lorem.sentence(faker.number.int({ min: 1, max: 3 })),
    });
  }
  return ret;
}

function goods(n) {
  const ret = [];
  for (let i = 0; i < n; i++) {
    ret.push({
      id: faker.string.numeric(7),
      name: faker.commerce.department(),
      picture: generateImage(240, 610),
      saleInfo: faker.lorem.sentence(1),
      goods: generateGoods(8),
    });
  }
  return ret;
}

function head(n) {
  const ret = [];
  for (let i = 0; i < n; i++) {
    ret.push({
      id: categoryList[i].id,
      name: categoryList[i].name,
      children: [
        {
          id: faker.string.numeric(7),
          name: faker.commerce.department(),
        },
        {
          id: faker.string.numeric(7),
          name: faker.commerce.department(),
        },
      ],
      goods: generateGoods(8),
    });
  }
  return ret;
}

router.get('/banner', (req, res) => {
  res.json({
    code: 200,
    msg: 'success',
    result: banner(5),
  });
});

router.get('/new', (req, res) => {
  res.json({
    code: 200,
    msg: 'success',
    result: _new(4),
  });
});

router.get('/hot', (req, res) => {
  res.json({
    code: 200,
    msg: 'success',
    result: hot(4),
  });
});

router.get('/goods', (req, res) => {
  res.json({
    code: 200,
    msg: 'success',
    result: goods(4),
  });
});

router.get('/category/head', (req, res) => {
  res.json({
    code: 200,
    msg: 'success',
    result: head(9),
  });
});

export default router;
