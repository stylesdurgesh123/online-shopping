const express = require('express');
const auth = require('../Middlewares/auth');
const upload = require('../Middlewares/multer');
const { 
    uploadImages,
    addBanner,
    getBanner,
    removeImageFromCloudinary,
    deleteBanner,
    updateBanner,
    getSingleBanner
    } 
   = require('../Controllers/bannerV1');
const bannerV1Router = express.Router();

 bannerV1Router.post('/uploadImages', auth, upload.array('images'), uploadImages);
 bannerV1Router.post('/add', auth,addBanner);
 bannerV1Router.get('/',getBanner);
 bannerV1Router.get('/:id',getSingleBanner);
 bannerV1Router.delete('/deleteImage', auth, removeImageFromCloudinary);
 bannerV1Router.delete('/:id', auth, deleteBanner);
 bannerV1Router.put('/:id', auth, updateBanner);

module.exports = bannerV1Router;