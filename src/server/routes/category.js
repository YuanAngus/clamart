import express from 'express';
import { faker } from '@faker-js/faker';
import { generateGoods, generateSubCategory } from '../utils/random.js';
import { categoryList } from '../utils/categoryStore.js';
const router = express.Router();

function category(id) {
  return {
    name: categoryList.find(u => u.id === id).name,
    children: generateSubCategory(id, 7)
  };
}

function sub(id) {
  return {
    name: faker.commerce.department(),
    parentId: id[0],
    parentName: categoryList.find(u => u.id === id[0]).name,
  }
}

function temporary(pageSize) {
  return {
    items: generateGoods(pageSize),
  }
}

router.get('/', (req, res) => {
  const { id } = req.query;
  res.json({
    code: 200,
    msg: 'success',
    result: category(id),
  });
});

router.get('/sub/filter', (req, res) => {
  const { id } = req.query;
  res.json({
    code: 200,
    msg: 'success',
    result: sub(id),
  });
});

router.post('/goods/temporary', (req, res) => {
  const { pageSize } = req.body;
  res.json({
    code: 200,
    msg: 'success',
    result: temporary(pageSize),
  });
});

export default router;
