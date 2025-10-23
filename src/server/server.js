import express from 'express';
import cors from 'cors';
import categoryRoutes from './routes/category.js'
import homeRoutes from './routes/home.js';
import goodsRoutes from './routes/goods.js'
import loginRoutes from './routes/login.js'
import memberRoutes from './routes/member.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: '*', // 开发阶段允许所有源
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// 挂载路由
app.use('/home', homeRoutes);
app.use('/category', categoryRoutes);
app.use('/goods', goodsRoutes);
app.use('/login', loginRoutes);
app.use('/member', memberRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
