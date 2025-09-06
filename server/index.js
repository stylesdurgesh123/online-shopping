const express=require('express');
const cors=require('cors');
const { connectToMongoDB }=require('./connectdb');
const userRouter= require('./Routes/user');
const categoryRouter = require('./Routes/category');
const productRouter = require('./Routes/product');
const app=express(); 
require('dotenv').config();
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cartRouter = require('./Routes/cart');
const myListRouter = require('./Routes/myList');
const addreshRouter = require('./Routes/addresh');
const homeSlideRouter = require('./Routes/homeSlide');
const bannerV1Router = require('./Routes/bannerV1');
const blogRouter = require('./Routes/blog');
const orderRouter = require('./Routes/orderRoute');
const PORT=process.env.PORT || 8000;


const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecommerceApp';

 connectToMongoDB(mongoUri)
.then(()=>console.log('mongodb connected successfully!'))
.catch((err)=>console.error('MongoDB connection Error:',err));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet({
  contentSecurityPolicy: false, 
}));
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://localhost:3001',
    'https://online-shopping-woad.vercel.app',
    'https://online-shopping-zbxa.vercel.app'
  ],
  credentials: true
}));


app.get('/', (req, res) => {
  res.json({message: 'Hello from server!'});
});

app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/myList', myListRouter);
app.use('/api/address', addreshRouter);
app.use('/api/homeSlides', homeSlideRouter);
app.use('/api/bannerV1', bannerV1Router);
app.use('/api/blog', blogRouter);
app.use('/api/order', orderRouter);

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});