const express = require('express');
const auth = require('../Middlewares/auth');
const upload = require('../Middlewares/multer');
const { 
     uploadImages,
      removeImageFromCloudinary,
      addBlog,
      getBlog,
      getSingleBlog,
      deleteBlog,
      updateBlog
    } 
   = require('../Controllers/blog');
const blogRouter = express.Router();

blogRouter.post('/uploadImages', auth, upload.array('images'), uploadImages);
blogRouter.post('/add', auth, addBlog);
blogRouter.get('/', getBlog);
blogRouter.get('/:id', getSingleBlog);
blogRouter.delete('/deleteImage', auth, removeImageFromCloudinary);
blogRouter.delete('/:id', auth, deleteBlog);
blogRouter.put('/:id', auth, updateBlog);

module.exports = blogRouter;