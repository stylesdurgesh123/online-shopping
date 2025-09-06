const homeSliderModel = require('../Models/homeSlider');
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

   // create Home Slide
    async function addHomeSlide(req,res) {
      try {
        
        let homeSlide = new homeSliderModel({
        images: imagesArr 
        });
  
        if(!homeSlide){
          return res.status(500).json({
          message: 'Home Slide Image not created',
          error: true,
          success: false
        });
        }
  
        homeSlide = await homeSlide.save();
        imagesArr = [];
  
          return res.status(201).json({
          message: 'Home Slide Image created',
          error: false,
          success: true,
          homeSlide: homeSlide
        })
  
      } catch (error) {
           return res.status(500).json({
          message: error.message || error,
          error: true,
          success: false
        })
      }
    }

   // get Home Slide
  async function getHomeSlides(req,res) {
   try {
    const homeSlide = await homeSliderModel.find(); // get all Home slide
   
      if(!homeSlide){
       return res.status(500).json({
       message: 'Home Slide Image not found',
       error: true,
       success: false
       });
     }
  
     return res.status(200).json({
      error: false,
      success: true,
      data: homeSlide
     });

   } catch (error) {
         return res.status(500).json({
        message: error.message || error,
        error: true,
        success: false
      })
   } 
  } 

    // get Single Home Slide
  async function getHomeSlide(req,res) {
      try {
        const homeSlide = await homeSliderModel.findById(req.params.id);
        if(!homeSlide){
          res.status(500).json({
            message: 'The Home Slide with the given ID was not found.',
            error: true,
            success: false
          });
        }
        
       return res.status(201).json({
        error: false,
        success: true,
        category: homeSlide
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

  async function deleteHomeSlide(req,res) {
    const homeSlide = await homeSliderModel.findById(req.params.id);
    const images = homeSlide.images;
  
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
  
     const deleteHomeSlide = await homeSliderModel.findByIdAndDelete(req.params.id);
  
     if(!deleteHomeSlide){
     return res.status(404).json({
        message: 'Home Slide not found!',
        success: false,
        error: true
      });
     }
  
     res.status(201).json({
      message: 'Home Slide Deleted!',
      success: true,
      error: false
     });
  
   }

  async function updateHomeSlide(req,res) {
      const homeSlide = await homeSliderModel.findByIdAndUpdate(
        req.params.id,
        {
        images: imagesArr.length>0 ? imagesArr[0]   : req.body.images,
        },
        {new: true}
      );
  
     if(!homeSlide){
      return res.status(500).json({
        message: 'Home Slide cannot be updated!',
        success: false,
        error: true
      })
     }
  
     imagesArr = [];
  
     res.status(200).json({
      error: false,
      success: true,
      category: homeSlide
     });
  
     }

  module.exports = {
   uploadImages,
   addHomeSlide,
   getHomeSlides,
   getHomeSlide,
   removeImageFromCloudinary,
   deleteHomeSlide,
   updateHomeSlide 
  }