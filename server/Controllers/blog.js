const blogModel = require('../Models/blog');
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

  // create blog
  async function addBlog(req,res) {
    try {
      
      let blog = new blogModel({
      title: req.body.title, 
      images: req.body.images,
      description: req.body.description
      });

      if(!blog){
        return res.status(500).json({
        message: 'Blog not created',
        error: true,
        success: false
      });
      }

      blog = await blog.save();
      imagesArr = [];

        return res.status(201).json({
        message: 'Blog created',
        error: false,
        success: true,
        blog: blog
      })

    } catch (error) {
         return res.status(500).json({
        message: error.message || error,
        error: true,
        success: false
      })
    }
  }

   // get blog
  async function getBlog(req,res) {
   try {
  
     const page = parseInt(req.query.page) || 1;
       // const perPage = parseInt(req.query.perPage);
     const perPage = parseInt(req.query.perPage) || 10;
     const totalPosts = await blogModel.countDocuments();
     const totalPages = Math.ceil(totalPosts/perPage); 

      const blogs =await blogModel.find()
         .skip((page - 1) * perPage)
         .limit(perPage)
         .exec();
         
         if(!blogs){
           res.status(500).json({
             error: true,
             success: false
           });
         }
     
         return res.status(200).json({
           error: false,
           success: true,
           blogs: blogs,
           totalPages: totalPages,
           page: page
         });  

   } catch (error) {
         return res.status(500).json({
        message: error.message || error,
        error: true,
        success: false
      })
   } 
  }

     // get Single blog
   async function getSingleBlog(req,res) {
    try {
      const blog = await blogModel.findById(req.params.id);
      if(!blog){
        res.status(500).json({
          message: 'The blog with the given ID was not found.',
          error: true,
          success: false
        });
      }
      
     return res.status(201).json({
      error: false,
      success: true,
      blog: blog
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

   async function deleteBlog(req,res) {
      const blog = await blogModel.findById(req.params.id);
      const images = blog.images;
  
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
  
     const deleteBlog = await blogModel.findByIdAndDelete(req.params.id);
  
     if(!deleteBlog){
      res.status(404).json({
        message: 'Blog not found!',
        success: false,
        error: true
      });
     }
  
     res.status(201).json({
      message: 'Blog Deleted!',
      success: true,
      error: false
     });
     }  

   async function updateBlog(req,res) {
    const blog = await blogModel.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title, 
        images: imagesArr.length>0 ? imagesArr[0]   : req.body.images,
        description: req.body.description
      },
      {new: true}
    );

   if(!blog){
    return res.status(500).json({
      message: 'Blog cannot be updated!',
      success: false,
      error: true
    })
   }

   imagesArr = [];

   res.status(200).json({
    error: false,
    success: true,
    blog: blog
   });

   }

 module.exports = {
   uploadImages,
   removeImageFromCloudinary,
   addBlog,
   getBlog,
   getSingleBlog,
   deleteBlog,
   updateBlog
 }