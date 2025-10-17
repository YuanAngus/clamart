import express from 'express';
import { addAddress, addCart, addOrder, changeAddress, deleteCart, deleteOrderById, findOrderById, getAddress, getCart, mergeCart, payOrderById, queryOrder } from '../utils/crud.js';
import { faker } from '@faker-js/faker';
const router = express.Router();

function cartPost(goods) {
  addCart(goods);
}

function cartGet(goods) {
  return getCart(goods);
}

function cartDelete(ids) {
  deleteCart(ids);
}

function merge(data) {
  mergeCart(data);
}

function pre() {
  return {
    userAddresses: getAddress(),
    summary: {
      postFee: 10
    }
  };
}

function postOrder(data) {
  const id = faker.string.numeric(10);
  addOrder({ id, ...data });
  return { id };
}

function getOrderById(id) {
  return findOrderById(id);
}

function getOrder(query) {
  return queryOrder(query);
}

function payOrder(id) {
  return payOrderById(id);
}

function deleteOrder(id) {
  return deleteOrderById(id);
}

function address(data) {
  const id = faker.string.numeric(10);
  addAddress({
    id,
    isDefault: 1,
    ...data
  });
  changeDefaultAddress(id);
}

function changeDefaultAddress(id) {
  changeAddress(id);
}

router.post('/cart', (req, res) => {
  const goods = req.body;
  res.json({
    code: 200,
    msg: 'success',
    result: cartPost(goods),
  });
});

router.get('/cart', (req, res) => {
  res.json({
    code: 200,
    msg: 'success',
    result: cartGet(),
  });
});

router.delete('/cart', (req, res) => {
  const { ids } = req.body;
  res.json({
    code: 200,
    msg: 'success',
    result: cartDelete(ids),
  });
});

router.post('/cart/merge', (req, res) => {
  const data = req.body;
  res.json({
    code: 200,
    msg: 'success',
    result: merge(data),
  });
});

router.get('/order/pre', (req, res) => {
  res.json({
    code: 200,
    msg: 'success',
    result: pre(),
  });
});

router.post('/order', (req, res) => {
  const data = req.body;
  res.json({
    code: 200,
    msg: 'success',
    result: postOrder(data),
  });
});

router.get('/order/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    code: 200,
    msg: 'success',
    result: getOrderById(id),
  });
});

router.get('/order', (req, res) => {
  res.json({
    code: 200,
    msg: 'success',
    result: getOrder(req.query),
  });
});

router.delete('/order', (req, res) => {
  const { id } = req.body;
  res.json({
    code: 200,
    msg: 'success',
    result: deleteOrder(id),
  });
});

router.post('/pay', (req, res) => {
  const { id } = req.body;
  res.json({
    code: 200,
    msg: 'success',
    result: payOrder(id),
  });
});

router.post('/address', (req, res) => {
  res.json({
    code: 200,
    msg: 'success',
    result: address(req.body),
  });
});

router.post('/address/default', (req, res) => {
  const { id } = req.body;
  res.json({
    code: 200,
    msg: 'success',
    result: changeDefaultAddress(id),
  });
});
export default router;