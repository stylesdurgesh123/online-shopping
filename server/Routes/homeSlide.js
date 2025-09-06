const express = require('express');
const auth = require('../Middlewares/auth');
const upload = require('../Middlewares/multer');
const { 
        uploadImages,
        addHomeSlide,
        getHomeSlides,
        getHomeSlide, 
        removeImageFromCloudinary,
        deleteHomeSlide,
        updateHomeSlide,
     } = require('../Controllers/homeSlider');
const homeSlideRouter = express.Router();

 homeSlideRouter.post('/uploadImages', auth, upload.array('images'), uploadImages);
 homeSlideRouter.post('/add', auth, addHomeSlide);
 homeSlideRouter.get('/', getHomeSlides);
 homeSlideRouter.get('/:id', getHomeSlide);
 homeSlideRouter.delete('/deleteImage', auth, removeImageFromCloudinary);
 homeSlideRouter.delete('/:id', auth, deleteHomeSlide);
 homeSlideRouter.put('/:id', auth, updateHomeSlide);

module.exports = homeSlideRouter;