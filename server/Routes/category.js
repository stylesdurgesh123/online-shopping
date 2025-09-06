const express = require('express');
const { uploadImages, createCategory, getCategories, getCategoryCount, getSubCategoryCount, getSingleCategory, removeImageFromCloudinary, deleteCategory, updateCategory } = require('../Controllers/category');
const auth = require('../Middlewares/auth');
const upload = require('../Middlewares/multer');
const categoryRouter = express.Router();

 categoryRouter.post('/uploadImages', auth, upload.array('images'), uploadImages);
 categoryRouter.post('/create', auth,createCategory);
 categoryRouter.get('/',getCategories);
 categoryRouter.get('/get/count',getCategoryCount);
 categoryRouter.get('/get/count/subCat',getSubCategoryCount);
 categoryRouter.get('/:id',getSingleCategory);
 categoryRouter.delete('/deleteImage', auth, removeImageFromCloudinary);
 categoryRouter.delete('/:id', auth, deleteCategory);
 categoryRouter.put('/:id', auth, updateCategory);

module.exports = categoryRouter;