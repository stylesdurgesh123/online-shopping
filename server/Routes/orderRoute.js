const express = require('express');
const auth = require('../Middlewares/auth');
const { createOrderController, getOrderDetailsController, updateOrderStatusController, totalSalesController, totalUserController } = require('../Controllers/orderController');
const orderRouter = express.Router();

orderRouter.post('/create', auth, createOrderController);
orderRouter.get('/order-list',auth,getOrderDetailsController);
orderRouter.put('/order-status/:id',auth,updateOrderStatusController);
//orderRouter.get('/create-order-paypal',auth,createOrderPayPalController)
//orderRouter.post('/capture-order-paypal',auth,captureOrderPayPalcontroller)
orderRouter.get('/sales',auth,totalSalesController);
orderRouter.get('/users',auth,totalUserController);

module.exports = orderRouter;