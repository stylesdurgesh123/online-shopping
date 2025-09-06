const orderModel = require('../Models/orders');
const productModel = require('../Models/productModel');
const userModel = require('../Models/user');
//const paypal = require('@paypal/paypal-server-sdk')

async function createOrderController(req,res) {
 try {

let order = new orderModel({
    userId: req.body.userId,
    products: req.body.products,
    paymentId: req.body.paymentId,
    payment_status: req.body.payment_status,
    delivery_address: req.body.delivery_address,
    totalAmt: req.body.totalAmt,
    date: req.body.date
});

for(let i = 0; i< req.body.products.length; i++){
 await productModel.findByIdAndUpdate(
   req.body.products[i].productId,
   {
    countInStock: parseInt(req.body.products[i].countInStock - req.body.products[i].quantity),
   },
 { new: true }
 );
}

 // save order in DB
 order = await order.save();

 return res.status(201).json({
   message: "Order created successfully",
   data: order,
   success: true,
   error: false
 });
  
 } catch (error) {
   return res.status(500).json({
    message: error.message || error,
    error: true,
    success: false
  });  
 }   
}

async function getOrderDetailsController(req,res) {
  try {
  
 const userId = req.userId;

 const orderList = await orderModel.find({ userId: userId }).sort({ createdAt: -1 }).
 populate('delivery_address userId')

 return res.status(200).json({
    message: 'order list',
    data: orderList,
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
/*
function getPayPalClient() {
  const environment = 
   process.env.PAYPAL_MODE === 'live'
   ? new paypal.core.LiveEnvironment(
   process.env.PAYPAL_CLIENT_ID_LIVE,
   process.env.PAYPAL_SECRET_LIVE
   )
   : new paypal.core.SandboxEnvironment(
   process.env.PAYPAL_CLIENT_ID_TEST,
   process.env.PAYPAL_SECRET_TEST
   );

 return new paypal.core.PayPalHttpClient(environment)
   
}*/
/*
  // it's function do payment
async function createOrderPayPalController(req,res) {
 try {
const paypalRequest = new paypal.orders.OrdersCreateRequest();
paypalRequest.prefer('return=representation');

paypalRequest.requestBody({
  intent: 'CAPTURE',
  purchase_units: [{
    amount: {
      currency_code: 'USD',
      value: req.query.totalAmount
    }
  }]
});


try {
const client = getPayPalClient();
//const order = await client.execute(req);
const order = await client.execute(paypalRequest);
res.json({id: order.result.id});  
} catch (error) {
 console.error(error);
 res.status(500).send('Error creating pay pal order'); 
}

 } catch (error) {
  return res.status(500).json({
   message: error.message || error,
   error: true,
   success: false
}); 
 }
}
  
// it's function do save order 
async function captureOrderPayPalcontroller(req,res) {
  try {
    
const { paymentId } = req.body;

const req = new paypal.orders.OrdersCaptureRequest(paymentId);
req.requestBody({});

const orderInfo = {
   userId: req.body.userId,
    products: req.body.products,
    paymentId: req.body.paymentId,
    payment_status: req.body.payment_status,
    delivery_address: req.body.delivery_address,
    totalAmt: req.body.totalAmt,
    date: req.body.date
}

const order = new orderModel(orderInfo);
await order.save();

for(let i = 0; i < req.body.products.length; i++){
 await productModel.findByIdAndUpdate(
   req.body.products[i].productId,
   {
    countInStock: parseInt(req.body.products[i].countInStock - req.body.products[i].quantity),
   },
 { new: true }
 );
}

 return res.status(201).json({
   message: "Order created successfully",
   order: order,
   success: true,
   error: false
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

async function updateOrderStatusController(req,res) {
 try {
  
const {id,order_status}=req.body;

 const updateOrder = await orderModel.updateOne({
    _id : id,
  },
{
  order_status : order_status,   
}
);

return res.status(200).json({
  message: 'Update Order Status',
  success: true,
  error: false,
  date: updateOrder
})


 } catch (error) {
  return res.status(500).json({
   message: error.message || error,
   error: true,
   success: false
});
 }
}

async function totalSalesController(req,res){
 try {

const currentYear = new Date().getFullYear();

const ordersList = await orderModel.find();

let totalSales = 0;

let monthlySales = [
  {
   name: 'JAN',
   totalSales: 0
  },

  {
   name: 'FEB',
   totalSales: 0
  },

  {
   name: 'MARCH',
   totalSales: 0
  },
  
  {
   name: 'APRIL',
   totalSales: 0
  },
  
  {
   name: 'MAY',
   totalSales: 0
  },
  
  {
   name: 'JUNE',
   totalSales: 0
  },
  
  {
   name: 'JULY',
   totalSales: 0
  },
  
  {
   name: 'AUG',
   totalSales: 0
  },

  {
   name: 'SEP',
   totalSales: 0
  },
  
  {
   name: 'OCT',
   totalSales: 0
  },
  
  {
   name: 'NOV',
   totalSales: 0
  },
  
  {
   name: 'DEC',
   totalSales: 0
  }  
]

for(let i = 0; i < ordersList.length; i++){
 totalSales = totalSales + parseInt(ordersList[i].totalAmt);
 const str = JSON.stringify(ordersList[i]?.createdAt);
 const year = str.substr(1,4);
 const monthStr = str.substr(6,8);
 const month = parseInt(monthStr.substr(0,2));

 if(currentYear === year){
 
  if(month === 1){
    monthlySales[0] = {
      name: 'JAN',
      totalSales: monthlySales[0].totalSales = parseInt(monthlySales[0].totalSales) + parseInt(ordersList[i].totalAmt)
    }
  }

  if(month === 2){
    monthlySales[1] = {
      name: 'FEB',
      totalSales: monthlySales[1].totalSales = parseInt(monthlySales[1].totalSales) + parseInt(ordersList[i].totalAmt)
    }
  }

  if(month === 3){
    monthlySales[2] = {
      name: 'MARCH',
      totalSales: monthlySales[2].totalSales = parseInt(monthlySales[2].totalSales) + parseInt(ordersList[i].totalAmt)
    }
  }
  
 if(month === 4){
    monthlySales[3] = {
      name: 'APRIL',
      totalSales: monthlySales[3].totalSales = parseInt(monthlySales[3].totalSales) + parseInt(ordersList[i].totalAmt)
    }
  }  

 if(month === 5){
    monthlySales[4] = {
      name: 'MAY',
      totalSales: monthlySales[4].totalSales = parseInt(monthlySales[4].totalSales) + parseInt(ordersList[i].totalAmt)
    }
  }  

 if(month === 6){
    monthlySales[5] = {
      name: 'JUNE',
      totalSales: monthlySales[5].totalSales = parseInt(monthlySales[5].totalSales) + parseInt(ordersList[i].totalAmt)
    }
  }

 if(month === 7){
    monthlySales[6] = {
      name: 'JULY',
      totalSales: monthlySales[6].totalSales = parseInt(monthlySales[6].totalSales) + parseInt(ordersList[i].totalAmt)
    }
  }
  
 if(month === 8){
    monthlySales[7] = {
      name: 'AUG',
      totalSales: monthlySales[7].totalSales = parseInt(monthlySales[7].totalSales) + parseInt(ordersList[i].totalAmt)
    }
  }  

 if(month === 9){
    monthlySales[8] = {
      name: 'SEP',
      totalSales: monthlySales[8].totalSales = parseInt(monthlySales[8].totalSales) + parseInt(ordersList[i].totalAmt)
    }
  }  

 if(month === 10){
    monthlySales[9] = {
      name: 'OCT',
      totalSales: monthlySales[9].totalSales = parseInt(monthlySales[9].totalSales) + parseInt(ordersList[i].totalAmt)
    }
  }

 if(month === 11){
    monthlySales[10] = {
      name: 'NOV',
      totalSales: monthlySales[10].totalSales = parseInt(monthlySales[10].totalSales) + parseInt(ordersList[i].totalAmt)
    }
  }  

 if(month === 12){
    monthlySales[11] = {
      name: 'JAN',
      totalSales: monthlySales[11].totalSales = parseInt(monthlySales[11].totalSales) + parseInt(ordersList[i].totalAmt)
    }
  }  

 }
}

return res.status(200).json({
 totalSales: totalSales,
 monthlySales: monthlySales,
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

async function totalUserController(req,res) {
 try {

const users = await userModel.aggregate([

  {
    $group: {
      _id: {
      year: {$year: '$createdAt'}, 
      month: {$month: '$createdAt'}},
      count: {$sum: 1},
    },
  },
  {
   $sort: {'_id.year': 1, '_id.month': 1},
  },
]);

let monthlyUsers = [
  {
   name: 'JAN',
   totalUsers: 0
  },

  {
   name: 'FEB',
    totalUsers: 0
  },

  {
   name: 'MARCH',
   totalUsers: 0
  },
  
  {
   name: 'APRIL',
    totalUsers: 0
  },
  
  {
   name: 'MAY',
    totalUsers: 0
  },
  
  {
   name: 'JUNE',
    totalUsers: 0
  },
  
  {
   name: 'JULY',
   totalUsers: 0
  },
  
  {
   name: 'AUG',
   totalUsers: 0
  },

  {
   name: 'SEP',
    totalUsers: 0
  },
  
  {
   name: 'OCT',
   totalUsers: 0
  },
  
  {
   name: 'NOV',
  totalUsers: 0
  },
  
  {
   name: 'DEC',
   totalUsers: 0
  }  
]

for(let i = 0; i < users.length; i++){
 
  if(users[i]?._id?.month === 1){
    monthlyUsers[0] = {
      name: 'JAN',
      totalUsers: users[i].count
    }
  }

  if(users[i]?._id?.month === 2){
    monthlyUsers[1] = {
      name: 'FEB',
      totalUsers: users[i].count
    }
  }

  if(users[i]?._id?.month === 3){
    monthlyUsers[2] = {
      name: 'MARCH',
      totalUsers: users[i].count
    }
  }

 if(users[i]?._id?.month === 4){
    monthlyUsers[3] = {
      name: 'APRIL',
      totalUsers: users[i].count
    }
  }  

 if(users[i]?._id?.month === 5){
  monthlyUsers[4] = {
  name: 'MAY',
  totalUsers: users[i].count
    }
  }  

 
  if(users[i]?._id?.month === 6){
    monthlyUsers[5] = {
      name: 'JUNE',
      totalUsers: users[i].count
    }
  }


  if(users[i]?._id?.month === 7){
    monthlyUsers[6] = {
      name: 'JULY',
      totalUsers: users[i].count
    }
  }
  

  if(users[i]?._id?.month === 8){
    monthlyUsers[7] = {
      name: 'AUG',
      totalUsers: users[i].count
    }
  } 


  if(users[i]?._id?.month === 9){
    monthlyUsers[8] = {
      name: 'SEP',
      totalUsers: users[i].count
    }
  }  


  if(users[i]?._id?.month === 10){
    monthlyUsers[9] = {
      name: 'OCT',
      totalUsers: users[i].count
    }
  }

 
  if(users[i]?._id?.month === 11){
    monthlyUsers[10] = {
      name: 'NOV',
      totalUsers: users[i].count
    }
  }  


  if(users[i]?._id?.month === 12){
    monthlyUsers[11] = {
      name: 'DEC',
      totalUsers: users[i].count
    }
  }  
}

return res.status(200).json({
  totalUsers: monthlyUsers,
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
 createOrderController,
 getOrderDetailsController,
 updateOrderStatusController,
 totalSalesController,
 totalUserController
// createOrderPayPalController,
// captureOrderPayPalcontroller
}