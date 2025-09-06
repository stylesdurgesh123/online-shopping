const bannerV1Model=require('../Models/bannerV1');
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

  // add banner
  async function addBanner(req,res) {
    try {
      
      let banner = new bannerV1Model({
      bannerTitle: req.body.bannerTitle,
      images: imagesArr, 
      catId: req.body.catId,
      subCatId: req.body.subCatId,
      thirdSubCatId: req.body.thirdSubCatId,
      price: req.body.price,
      });

      if(!banner){
        return res.status(500).json({
        message: 'Banner not created',
        error: true,
        success: false
      });
      }

      banner = await banner.save();
      imagesArr = [];

        return res.status(201).json({
        message: 'Banner created',
        error: false,
        success: true,
        banner: banner
      })

    } catch (error) {
         return res.status(500).json({
        message: error.message || error,
        error: true,
        success: false
      })
    }
  }

  // get banner
 async function getBanner(req,res) {
   try {
    const banners = await bannerV1Model.find(); // get all banner
    
      if(!banners){
        return res.status(500).json({
        message: 'Banner not found',
        error: true,
        success: false
      });
      }

     return res.status(200).json({
        error: false,
        success: true,
        data: banners
      });

   } catch (error) {
         return res.status(500).json({
        message: error.message || error,
        error: true,
        success: false
      })
   } 
  }

    // get Single Banner
 async function getSingleBanner(req,res) {
     try {
       const banner = await bannerV1Model.findById(req.params.id);
       if(!banner){
         res.status(500).json({
           message: 'The banner with the given ID was not found.',
           error: true,
           success: false
         });
       }
       
      return res.status(201).json({
       error: false,
       success: true,
       banner: banner
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

  async function deleteBanner(req,res) {
    const banner = await bannerV1Model.findById(req.params.id);
    const images = banner.images;

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

   const deleteBanner = await bannerV1Model.findByIdAndDelete(req.params.id);

   if(!deleteBanner){
    res.status(404).json({
      message: 'Banner not found!',
      success: false,
      error: true
    });
   }

   res.status(201).json({
    message: 'Banner Deleted!',
    success: true,
    error: false
   });
   }

 async function updateBanner(req,res) {
    const banner = await bannerV1Model.findByIdAndUpdate(
      req.params.id,
      {
        bannerTitle: req.body.bannerTitle,
        images: imagesArr.length>0 ? imagesArr[0]   : req.body.images,
        catId: req.body.catId,
        subCatId: req.body.subCatId,
        thirdSubCatId: req.body.thirdSubCatId,
        price: req.body.price,
      },
      {new: true}
    );

   if(!banner){
    return res.status(500).json({
      message: 'banner cannot be updated!',
      success: false,
      error: true
    })
   }

   imagesArr = [];

   res.status(200).json({
    error: false,
    success: true,
    banner: banner
   });

   }

 module.exports = {
   uploadImages,
   addBanner,
   getBanner,
   deleteBanner, 
   updateBanner,
   removeImageFromCloudinary,
   getSingleBanner
 } 