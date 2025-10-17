import express from 'express';
import { faker } from '@faker-js/faker';
import { generateGoods, generateImage } from '../utils/random.js';
const router = express.Router();

function generateInventory() {
  if (Math.random() < 0.3) {
    return 0;
  } else {
    return faker.number.int({ min: 10, max: 1000 });
  }
}

function goods(id) {
  const price = Number(faker.commerce.price());
  const oldPrice = (price + faker.number.int({ min: 10, max: 1000 })).toFixed(2);
  return {
    id,
    desc: faker.commerce.productDescription(),
    price,
    oldPrice,
    salesCount: faker.number.int({ min: 10, max: 10000 }),
    commentCount: faker.number.int({ min: 10, max: 10000 }),
    collectCount: faker.number.int({ min: 10, max: 10000 }),
    brand: {
      name: faker.lorem.word().toUpperCase()
    },
    mainPictures: [
      generateImage(400),
      generateImage(400),
      generateImage(400),
      generateImage(400),
      generateImage(400)
    ],
    categories: [
      {
        id: faker.string.numeric(7),
        name: faker.commerce.department(),
      },
      {
        id: faker.string.numeric(7),
        name: faker.commerce.department(),
      },
    ],
    specs: [
      {
        name: "Colour",
        id: faker.string.numeric(10),
        values: [
          {
            name: "Red",
            picture: null,
            desc: faker.commerce.productDescription(),
          },
          {
            name: "Blue",
            picture: null,
            desc: faker.commerce.productDescription(),
          },
        ]
      },
      {
        name: "Size",
        id: faker.string.numeric(10),
        values: [
          {
            name: "Small",
            picture: null,
            desc: "",
          },
          {
            name: "Medium",
            picture: null,
            desc: "",
          },
          {
            name: "Large",
            picture: null,
            desc: "",
          },
        ]
      }
    ],
    skus: [
      {
        id: faker.string.numeric(10),
        skuCode: "goods-sku-001",
        price,
        oldPrice,
        inventory: generateInventory(),
        picture: generateImage(),
        specs: [
          {
            name: "Colour",
            valueName: "Red"
          },
          {
            name: "Size",
            valueName: "Small"
          },
        ]
      },
      {
        id: faker.string.numeric(10),
        skuCode: "goods-sku-002",
        price,
        oldPrice,
        inventory: generateInventory(),
        picture: generateImage(),
        specs: [
          {
            name: "Colour",
            valueName: "Blue"
          },
          {
            name: "Size",
            valueName: "Small"
          },
        ]
      },
      {
        id: faker.string.numeric(10),
        skuCode: "goods-sku-003",
        price: (price * 1.4).toFixed(2),
        oldPrice: (oldPrice * 1.4).toFixed(2),
        inventory: generateInventory(),
        picture: generateImage(),
        specs: [
          {
            name: "Colour",
            valueName: "Red"
          },
          {
            name: "Size",
            valueName: "Medium"
          },
        ]
      },
      {
        id: faker.string.numeric(10),
        skuCode: "goods-sku-004",
        price: (price * 1.4).toFixed(2),
        oldPrice: (oldPrice * 1.4).toFixed(2),
        inventory: generateInventory(),
        picture: generateImage(),
        specs: [
          {
            name: "Colour",
            valueName: "Blue"
          },
          {
            name: "Size",
            valueName: "Medium"
          },
        ]
      },
      {
        id: faker.string.numeric(10),
        skuCode: "goods-sku-005",
        price: (price * 1.7).toFixed(2),
        oldPrice: (oldPrice * 1.7).toFixed(2),
        inventory: generateInventory(),
        picture: generateImage(),
        specs: [
          {
            name: "Colour",
            valueName: "Red"
          },
          {
            name: "Size",
            valueName: "Large"
          },
        ]
      },
      {
        id: faker.string.numeric(10),
        skuCode: "goods-sku-006",
        price: (price * 1.7).toFixed(2),
        oldPrice: (oldPrice * 1.7).toFixed(2),
        inventory: generateInventory(),
        picture: generateImage(),
        specs: [
          {
            name: "Colour",
            valueName: "Blue"
          },
          {
            name: "Size",
            valueName: "Large"
          },
        ]
      }
    ],
    details: {
      pictures: [
        generateImage(860),
        generateImage(860),
        generateImage(860),
        generateImage(860),
        generateImage(860),
      ],
      properties: [
        {
          name: "Type",
          value: faker.lorem.words({ min: 1, max: 2 })
        },
        {
          name: "Material",
          value: faker.lorem.words({ min: 1, max: 2 })
        },
        {
          name: "Code",
          value: faker.string.alphanumeric(10).toUpperCase()
        },
        {
          name: "Manufacturer",
          value: faker.company.name()
        },
        {
          name: "Origin",
          value: faker.lorem.words(1)
        },
      ]
    },
  };
}

function hot(limit) {
  return generateGoods(limit);
}

function relevant(limit) {
  return generateGoods(limit);
}

router.get('/', (req, res) => {
  const { id } = req.query;
  res.json({
    code: 200,
    msg: 'success',
    result: goods(id),
  });
});

router.get('/hot', (req, res) => {
  const { limit } = req.query;
  res.json({
    code: 200,
    msg: 'success',
    result: hot(limit),
  });
});

router.get('/relevant', (req, res) => {
  const { limit } = req.query;
  res.json({
    code: 200,
    msg: 'success',
    result: relevant(limit),
  });
});

export default router;
