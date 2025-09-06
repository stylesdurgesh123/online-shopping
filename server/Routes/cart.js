const express = require('express');
const auth = require('../Middlewares/auth');
const { 
    addToCartItemController,
    getCartItemController,
    updateCartItemQtyController, 
    deleteCartItemQtyController,
    emptyCartController
    } = require('../Controllers/cart');
const cartRouter = express.Router();

cartRouter.post('/add',auth,addToCartItemController);
cartRouter.get('/get',auth,getCartItemController);
cartRouter.put('/update-qty',auth,updateCartItemQtyController);
cartRouter.delete('/delete-cart-item/:id',auth,deleteCartItemQtyController);
cartRouter.delete('/emptyCart/:id',auth,emptyCartController)

module.exports = cartRouter;