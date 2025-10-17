import fs from 'fs';

function readData(dataPath) {
  const data = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(data);
}

export function writeData(dataPath, data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
}

export function findUserByAccount(account) {
  const data = readData('./db/user.json');
  return data.find(i => i.account === account);
}

export function addCart(goods) {
  const data = readData('./db/cart.json');
  data.push(goods);
  writeData('./db/cart.json', data);
}

export function getCart() {
  const data = readData('./db/cart.json');
  return data;
}

export function deleteCart(ids) {
  const data = readData('./db/cart.json');
  const newData = data.filter(i => !ids.includes(i.skuId));
  writeData('./db/cart.json', newData);
}

export function mergeCart(cart) {
  const data = readData('./db/cart.json');
  data.push(...cart);
  writeData('./db/cart.json', data);
}

export function getAddress() {
  const data = readData('./db/address.json');
  return data;
}

export function addOrder(order) {
  const data = readData('./db/order.json');
  data.push(order);
  writeData('./db/order.json', data);
}

export function findOrderById(id) {
  const data = readData('./db/order.json');
  return data.find(i => i.id === id);
}

export function queryOrder(query) {
  const { orderState, page, pageSize } = query;
  const start = (page - 1) * pageSize;
  const data = readData('./db/order.json');
  const filteredData = orderState == 0 ? data : data.filter(i => i.orderState == orderState);
  const counts = filteredData.length;
  
  return {
    items: filteredData.slice(start, start + pageSize),
    pages: Math.floor(counts / pageSize),
    counts
  };
}

export function deleteOrderById(id) {
  const data = readData('./db/order.json');
  const newData = data.filter(i => i.id !== id);
  writeData('./db/order.json', newData);
}

export function payOrderById(id) {
  const data = readData('./db/order.json');
  data.forEach(i => {
    if (i.id === id) {
      i.orderState = 2;
    }
  });
  writeData('./db/order.json', data);
}

export function addAddress(address) {
  const data = readData('./db/address.json');
  data.push(address);
  writeData('./db/address.json', data);
}

export function changeAddress(id) {
  const data = readData('./db/address.json');
  data.forEach(i => {
    i.isDefault = i.id === id ? 1 : 0;
  });
  writeData('./db/address.json', data);
}