const cartProductModel = require('../Models/cartModel');

async function addToCartItemController(req,res) {
 try {
 const userId = req.userId; // from middlware
 const { 
   productTitle,
   image,
   rating,
   price,
   oldPrice,
   discount,
   productRam,
   size,
   productWeight,
   brand,
   quantity,
   subTotal,
   countInStock,
   productId
   } = req.body;
 
 if(!productId){
    return res.status(401).json({
        message: 'Provide productId',
        error: true,
        success: false
    });
 }

 const checkItemCart = await cartProductModel.findOne({
    userId: userId,
    productId: productId
 });

 if(checkItemCart){
    return res.status(400).json({
    message: 'Item alerady in cart'
    });
 }

 const cartItem = new cartProductModel({
  productTitle:productTitle,
  image:image,
  rating:rating,
  price:price,
  oldPrice:oldPrice,
  discount:discount,
  productRam:productRam,
  size:size,
  productWeight:productWeight,
  brand:brand,
  quantity:quantity,
  subTotal:subTotal,
  productId: productId,
  countInStock:countInStock,
  userId: userId
 });

 const save = await cartItem.save();

 return res.status(201).json({
    data: save,
    message: 'Item add Successfully',
    error: false,
    success: true
 });

 } catch (error) {
   return res.status(500).json({
    message: error.message || error,
    error: true,
    success: false 
   }); 
 }   
}

 async function getCartItemController(req,res) {
   try {

    const userId = req.userId

    const cartItems = await cartProductModel.find({
    userId: userId,
    })

    return res.json({
        data: cartItems,
        error: false,
        success: true
    });

   } catch (error) {
    return res.status(500).json({
    message: error.message || error,
    error: true,
    success: false 
   });
   } 
 }
 
 async function updateCartItemQtyController(req,res) {
   try {
   
     const userId = req.userId;
     const { _id, qty, subTotal } = req.body;

     if(!_id || !qty){
        return res.status(400).json({
            message: ' Provide _id qty'
        });
     }

  const updateCartItem = await cartProductModel.updateOne({
    _id : _id,
    userId : userId
  },
{
  quantity : qty,  
  subTotal: subTotal  
}
);

return res.json({
    message: 'Update Cart',
    success: true,
    error: false,
    date: updateCartItem
})

   } catch (error) {
    return res.status(500).json({
    message: error.message || error,
    error: true,
    success: false 
   });
   } 
  }

/*
 async function deleteCartItemQtyController(req,res) {
   try {
      
   const userId = req.userId // from middleweare
   const {id} = req.params;

   if(!id){
    return res.status(400).json({
    message: 'Provide id',
    error: true,
    success: false
    });
   }

  const deleteCartItem = await cartProductModel.deleteOne({id: id, userId: userId });
 
    if(!deleteCartItem){
     return res.status(404).json({
        message: 'The Product in the cart is not found ',
        error: true,
        success: false
     });
    }
    
    return res.json({
        message: 'Item remove',
        error: false,
        success: true,
        data: deleteCartItem
    });

   } catch (error) {
    return res.status(500).json({
    message: error.message || error,
    error: true,
    success: false 
   });
   } 
 }
 */

async function deleteCartItemQtyController(req, res) {
  try {
    const userId = req.userId; // from middleware
    const { id } = req.params; // this should be cart item's _id

    if (!id) {
      return res.status(400).json({
        message: 'Provide id',
        error: true,
        success: false
      });
    }

    const deleteCartItem = await cartProductModel.deleteOne({ _id: id, userId });

    if (deleteCartItem.deletedCount === 0) {
      return res.status(404).json({
        message: 'The product in the cart is not found',
        error: true,
        success: false
      });
    }

    return res.json({
      message: 'Item removed',
      error: false,
      success: true,
      data: deleteCartItem
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
}

async function emptyCartController(req,res) {
 try {
  const userId = req.params.id // from middleweare

  await cartProductModel.deleteMany({userId:userId})

  return res.status(200).json({
    error: false,
    success: true
  })
 } catch (error) {
  return res.status(500).json({
   message: error.message || error,
   error: true,
   success: false
  });
 }
}

module.exports = {
    addToCartItemController,
    getCartItemController,
    updateCartItemQtyController,
    deleteCartItemQtyController,
    emptyCartController
}