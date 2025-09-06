const categoryModel = require('../Models/categoryModel');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
  secure: true 
});

    // upload images
    var imagesArr = [];
    async function uploadImages(req,res) {
     try {
       imagesArr = [];

         const images = req.files;
 
         const options = {
          use_filename: true,
          unique_filename: false,
          overwrite: false
        };

      for(let i = 0; i < images?.length; i++){

      const result = await cloudinary.uploader.upload(images[i].path, options);

         if (result && result.secure_url) {
         imagesArr.push(result.secure_url);
         fs.unlinkSync(images[i].path); 
         console.log(images[i].filename);
         }
        }

        return res.status(200).json({
          images: imagesArr
       });

    } catch (error) {
        return res.status(500).json({
        message: error.message || error,
        error: true,
        success: false
      })
    }
  }

  // create category
  async function createCategory(req,res) {
    try {
      
      let category = new categoryModel({
      name: req.body.name,
      images: req.body.images, 
      parentId: req.body.parentId,
      parentCatName: req.body.parentCatName
      });

      if(!category){
        return res.status(500).json({
        message: 'Category not created',
        error: true,
        success: false
      });
      }

      category = await category.save();
      imagesArr = [];

        return res.status(201).json({
        message: 'Category created',
        error: false,
        success: true,
        category: category
      })

    } catch (error) {
         return res.status(500).json({
        message: error.message || error,
        error: true,
        success: false
      })
    }
  }

  // get categories
  async function getCategories(req,res) {
   try {
    const categories = await categoryModel.find(); // get all category
    const categoryMap = {};

    categories.forEach(cat => {
     categoryMap[cat._id] = {...cat._doc,children: [] };
    });

    const rootCategories = [];

     categories.forEach(cat => {
      if(cat.parentId){
        categoryMap[cat.parentId].children.push(categoryMap[cat._id]);
      }else{
        rootCategories.push(categoryMap[cat._id]);
      }
    });

        return res.status(200).json({
        error: false,
        success: true,
        data: rootCategories
      });

   } catch (error) {
         return res.status(500).json({
        message: error.message || error,
        error: true,
        success: false
      })
   } 
  }

    // get all Category count
   async function getCategoryCount(req,res) {
    try {
      const categoryCount = await categoryModel.countDocuments({parentId: undefined});
      if(!categoryCount){
        res.status(500).json({
          success: false,
          error: true
        });
      }else{
        res.send({
          categoryCount: categoryCount
        });
      }
    } catch (error) {
        return res.status(500).json({
        message: error.message || error,
        error: true,
        success: false
      }) 
    }
   }

       // get All Sub Category Count
   async function getSubCategoryCount(req,res) {
    try {
      const allSubCategory = await categoryModel.find();

      if(!allSubCategory){
        res.status(500).json({
          success: false,
          error: true
        });
      }else{
       const subCatList = [];
       for(let cat of allSubCategory){
        if(cat.parentId!==undefined){
          subCatList.push(cat);
        }
       }
         res.send({
          subCategoryCount: subCatList.length
        });
      }
    } catch (error) {
        return res.status(500).json({
        message: error.message || error,
        error: true,
        success: false
      }) 
    }
   }

     // get Single Category
   async function getSingleCategory(req,res) {
    try {
      const category = await categoryModel.findById(req.params.id);
      if(!category){
        res.status(500).json({
          message: 'The category with the given ID was not found.',
          error: true,
          success: false
        });
      }
      
     return res.status(201).json({
      error: false,
      success: true,
      category: category
     });

    } catch (error) {
        return res.status(500).json({
        message: error.message || error,
        error: true,
        success: false
      }) 
    }
   }

 async function removeImageFromCloudinary(req, res) {
  try {
    const imgUrl = req.query.img;

    if (!imgUrl) {
      return res.status(400).json({ message: "Image URL is required" });
    }

    const urlArr = imgUrl.split('/');
    const image = urlArr[urlArr.length - 1];
    const imageName = image?.split('.')[0];

    if (!imageName) {
      return res.status(400).json({ message: "Invalid image name extracted from URL" });
    }

    const result = await cloudinary.uploader.destroy(imageName);

    if (result.result === 'ok') {
      return res.status(200).json({
        message: "Image deleted from Cloudinary",
        result,
      });
    } else {
      return res.status(400).json({
        message: "Failed to delete image from Cloudinary",
        result,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server error while deleting image",
      error: error.message,
    });
  }
}

   async function deleteCategory(req,res) {
    const category = await categoryModel.findById(req.params.id);
    const images = category.images;

    for(img of images){
       const imgUrl = img;
       const urlArr = imgUrl.split('/');
       const image = urlArr[urlArr.length - 1];
       const imageName = image.split('.')[0];
   
       if(imageName){
        cloudinary.uploader.destroy(imageName,(error,result)=>{
        // console.log(error,result);
      });
       }
    }

   const subCategory = await categoryModel.find({
    parentId: req.params.id
   });

   for(let i = 0; i < subCategory.length; i++){
    const thirdSubCategory = await categoryModel.find({
      parentId: subCategory[i]._id
    });

   for(let i = 0; i < thirdSubCategory.length; i++){
    const deleteThirdSubCat = await categoryModel.findByIdAndDelete(thirdSubCategory[i]._id);
   }
   
  const deleteSubCat = await categoryModel.findByIdAndDelete(subCategory[i]._id);

   }

   const deleteCat = await categoryModel.findByIdAndDelete(req.params.id);

   if(!deleteCat){
    res.status(404).json({
      message: 'Category not found!',
      success: false,
      error: true
    });
   }

   res.status(201).json({
    message: 'Category Deleted!',
    success: true,
    error: false
   });

   }

   async function updateCategory(req,res) {
    const category = await categoryModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        images: imagesArr.length>0 ? imagesArr[0]   : req.body.images,
        parentId: req.body.parentId,
        parentCatName: req.body.parentCatName
      },
      {new: true}
    );

   if(!category){
    return res.status(500).json({
      message: 'category cannot be updated!',
      success: false,
      error: true
    })
   }

   imagesArr = [];

   res.status(200).json({
    error: false,
    success: true,
    category: category
   });

   }

 module.exports = {
   uploadImages,
   createCategory,
   getCategories,
   getCategoryCount,
   getSubCategoryCount,
   getSingleCategory,
   removeImageFromCloudinary,
   deleteCategory,
   updateCategory 
 }