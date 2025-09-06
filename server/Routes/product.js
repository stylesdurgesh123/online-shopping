const express = require('express');
const {
    uploadImages,
    createProduct,
    getAllProducts, 
    getAllProductsByCatId,
    getAllProductsByCatName, 
    getAllProductsBySubCatId,
    getAllProductsBySubCatName,
    getAllProductsByThirdSubCatId, 
    getAllProductsByThirdSubCatName,
    getAllProductsByPrice,
    getAllProductsByRating,
    getProductsCount,
    getProductsFeatured,
    deleteProduct,
    getProduct,
    removeImageFromCloudinary,
    updateProduct,
    createProductRAMS,
    deleteProductRAMS,
    updateProductRAMS,
    getProductRam,
    getProductRamById,
    createProductWEIGHT,
    deleteProductWEIGHT,
    updateProductWEIGHT,
    getProductWEIGHT,
    getProductWEIGHTById,
    createProductSIZE,
    deleteProductSIZE,
    updateProductSIZE,
    getProductSIZE,
    getProductSIZEById,
    filters,
    getProductsByAnyCategoryId,
    sortBy,
    searchProductController
} = require('../Controllers/product');
const auth = require('../Middlewares/auth');
const upload = require('../Middlewares/multer');
const productRouter = express.Router();

productRouter.post('/uploadImages', auth, upload.array('images'), uploadImages);
productRouter.post('/create', auth,createProduct);
productRouter.get('/getAllProducts',getAllProducts);
productRouter.get('/getAllProductsByCatId/:id',getAllProductsByCatId);
productRouter.get('/getAllProductsByCatName',getAllProductsByCatName);
productRouter.get('/getAllProductsBySubCatId/:id',getAllProductsBySubCatId);
productRouter.get('/getAllProductsBySubCatName',getAllProductsBySubCatName);
productRouter.get('/getAllProductsByThirdSubCatId/:id',getAllProductsByThirdSubCatId);
productRouter.get('/getAllProductsByThirdSubCatName',getAllProductsByThirdSubCatName);
productRouter.get('/getAllProductsByPrice',getAllProductsByPrice);
productRouter.get('/getAllProductsByRating',getAllProductsByRating);
productRouter.get('/getProductCount',getProductsCount);
productRouter.get('/getProductFeatured',getProductsFeatured);
productRouter.delete('/:id',deleteProduct);
productRouter.get('/:id',getProduct);
productRouter.delete('/deleteImage', auth, removeImageFromCloudinary);
productRouter.put('/updateProduct/:id',auth,updateProduct);

productRouter.post('/productRAMS/add',auth,createProductRAMS);
productRouter.delete('/productRAMS/:id',deleteProductRAMS);
productRouter.put('/updateProductRAMS/:id',auth,updateProductRAMS);
productRouter.get('/productRAMS/get',getProductRam);
productRouter.get('/productRAMS/:id',getProductRamById);

productRouter.post('/productWEIGHT/add',auth,createProductWEIGHT);
productRouter.delete('/productWEIGHT/:id',deleteProductWEIGHT);
productRouter.put('/updateProductWEIGHT/:id',auth,updateProductWEIGHT);
productRouter.get('/productWEIGHT/get',getProductWEIGHT);
productRouter.get('/productWEIGHT/:id',getProductWEIGHTById);

productRouter.post('/productSIZE/add',auth,createProductSIZE);
productRouter.delete('/productSIZE/:id',deleteProductSIZE);
productRouter.put('/updateProductSIZE/:id',auth,updateProductSIZE);
productRouter.get('/productSIZE/get',getProductSIZE);
productRouter.get('/productSIZE/:id',getProductSIZEById);
productRouter.post('/filters',filters);
productRouter.post('/sortBy',sortBy);
productRouter.get('/search/get', searchProductController);


module.exports = productRouter; 