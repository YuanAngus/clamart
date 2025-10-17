import express from 'express';
import { findUserByAccount } from '../utils/crud.js';
import { generateToken } from '../utils/jwt.js';
const router = express.Router();

function login(account, password) {
  const user = findUserByAccount(account);
  if (user?.password === password) {
    return {
      ...user,
      token: generateToken()
    };
  }
  else
    throw new Error("wrong password"); 
}

router.post('/', (req, res) => {
  const { account, password } = req.body;
  try {
    res.json({
      code: 200,
      msg: 'success',
      result: login(account, password),
    });
  } catch (e) {
    res.status(400).json({
      code: 400,
      msg: 'fail',
      message: e.message,
    });
  }
});

export default router;