const myListModel = require('../Models/myList');

async function addTomyListController(req,res) {
    try {

     const userId = req.userId; // from middleware
     const {
            productId,
            productTitle,
            image,
            rating,
            price,
            oldPrice,
            brand,
            discount
          } = req.body;

     const item = await myListModel.findOne({
        userId: userId,
        productId: productId
     });

     if(item){
        return res.status(400).json({
            message: 'Item already in my list'
        });
     }

     const myList = new myListModel({
        productId,
        productTitle,
        image,
        rating,
        price,
        oldPrice,
        brand,
        discount,
        userId
     });

     const save = await myList.save();

     return res.status(200).json({
        error: false,
        success: true,
        message: 'The product saved in the my list'
     });

    } catch (error) {
    return res.status(500).json({
        message: error.message || message,
        error: true,
        success: false
    });    
    }
}

async function deleteTomyListController(req,res) {
   try {

    const myListItem = await myListModel.findById(req.params.id);

    if(!myListItem){
        return res.status(404).json({
            error: true,
            success: false,
            message: 'The item with this given id was not found'
        });
    }

    const deletedItem = await myListModel.findByIdAndDelete(req.params.id);

    if(!deletedItem){
        return res.status(404).json({
            error: true,
            success: false,
            message: 'The item is not deleted'
        });
    }

    return res.status(201).json({
     error: false,
     success: true,
     message: 'The item removed from My List'
    });

   } catch (error) {
      return res.status(500).json({
      message: error.message || message,
      error: true,
      success: false
    });
   }   
}

async function getMyListController(req,res) {
  try {
    
  const userId = req.userId;

  const myListItems = await myListModel.find({
    userId: userId
  });

  return res.status(201).json({
    error: false,
    success: true,
    data: myListItems
  });

  } catch (error) {
      return res.status(500).json({
      message: error.message || message,
      error: true,
      success: false
    }); 
  }  
}

module.exports = {
  addTomyListController,
  deleteTomyListController,
  getMyListController
}