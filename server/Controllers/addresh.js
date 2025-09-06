const addressModel = require('../Models/address');
const userModel = require('../Models/user');

async function addaddressController(req, res) {
  try {
    const {
      address_line1,
      city,
      state,
      pincode,
      country,
      mobile,
      userId,
      landmark,
      addressType
    } = req.body;

  if (!address_line1 || !city || !state || !pincode || !country || !mobile || !userId || !landmark || !addressType) {
  return res.status(400).json({
    message: 'Please provide all the fields',
    error: true,
    success: false
    });
   }

    // Create and save address
    const address = new addressModel({
      address_line1,
      city,
      state,
      pincode,
      country,
      mobile,
      userId,
      landmark,
      addressType
    });

    const saveaddress = await address.save();

    // Update user with address
    await userModel.updateOne({ _id: userId }, {
      $push: {
        address_details: saveaddress?._id
      }
    });

    return res.status(201).json({
      data: saveaddress,
      message: 'Address added successfully',
      error: false,
      success: true,
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
async function getAddaddressController(req, res) {
  try {
  const address = await addressModel.find({userId:req?.query?.userId});

  console.log(address)

  if(!address){
  return res.status(400).json({
  error: true,
  success: false,
  msg: 'address not found'
  });  
  }
 
 else{

 const updateUser = await userModel.updateOne({_id:req?.query?.userId},{
   $push:{
   address: address?._id
   }
 });
 
 return res.status(201).json({
  error: false,
  success: true,
   address:address 
  });
}

  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
}
  */

async function getAddaddressController(req, res) {
  try {
    const userId = req?.query?.userId?.trim();

    if (!userId) {
      return res.status(400).json({
        error: true,
        success: false,
        msg: 'User ID is required'
      });
    }

    const address = await addressModel.find({ userId });

    if (!address || address.length === 0) {
      return res.status(404).json({
        error: true,
        success: false,
        msg: 'Address not found'
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      data:address
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
}

 async function deleteAddressController(req,res) {
   try {
      
   const userId = req.userId
   const _id = req.params.id;

   if(!_id){
    return res.status(400).json({
    message: 'Provide _id',
    error: true,
    success: false
    });
   }

  const deleteItem = await addressModel.deleteOne({_id: _id, userId: userId });

    if(!deleteItem){
     return res.status(404).json({
        message: 'The address in the database is not found ',
        error: true,
        success: false
     });
    }

    return res.json({
        message: 'address remove',
        error: false,
        success: true,
    });

   } catch (error) {
    return res.status(500).json({
    message: error.message || error,
    error: true,
    success: false 
   });
   } 
 }

 
 async function getSingleAddressController(req,res) {
   try {
 const id=req.params.id;

 const address=await addressModel.findOne({_id:id});

  if (!address) {
      return res.status(404).json({
        error: true,
        success: false,
        msg: 'Address not found'
      });
    }

   return res.status(201).json({
    error: false,
    success: true,
    address: address 
   });   

   } catch (error) {
    return res.status(500).json({
    message: error.message || error,
    error: true,
    success: false 
   });
   } 
 }

// update user details
 async function editAddressController(req,res) {
  try {

    const id=req.params.id; 

    const {
      address_line1,
      city,
      state,
      pincode,
      country,
      mobile,
      userId,
      landmark,
      addressType
     } = req.body;

 const address = await addressModel.findByIdAndUpdate(
  id,{
      address_line1:address_line1,
      city:city,
      state:state,
      pincode:pincode,
      country:country,
      mobile:mobile,
      landmark:landmark,
      addressType:addressType,
  },
  { new: true }
 );

  return res.json({
    message: 'Address Updated Successfully!',
    error: false,
    success: true,
    address:address
  })
 
  } catch (error) {
     return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
     }) 
  }
} 

module.exports = {
  addaddressController,
  getAddaddressController,
  deleteAddressController,
  getSingleAddressController,
  editAddressController
};
