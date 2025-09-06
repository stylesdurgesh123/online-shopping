const productModel = require('../Models/productModel');
const productRamsModel = require('../Models/productRams');
const productWeightModel = require('../Models/productWEIGHT'); 
const productSizeModel = require('../Models/productSIZE');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const { error } = require('console');

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

  // product create
   async function createProduct(req,res) {
    try {
     let product = new productModel({
        name: req.body.name,
        description: req.body.description,
        images: imagesArr,
        brand: req.body.brand,
        price: req.body.price,
        oldPrice: req.body.oldPrice,
        catName: req.body.catName,
        catId: req.body.catId,
        category:req.body.category,
        subCatId: req.body.subCatId,
        subCat: req.body.subCat,
        thirdSubCat: req.body.thirdSubCat,
        thirdSubCatId: req.body.thirdSubCatId,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        isFeatured: req.body.isFeatured,
        discount: req.body.discount,
        productRam: req.body.productRam,
        size: req.body.size,
        productWeight: req.body.productWeight,
        sale: req.body.sale,
     });

    product = await product.save();

    if(!product){
      res.status(500).json({
        error: true,
        success: false,
        message: 'Product not created'
      })
    }

    imagesArr = [];

    res.status(201).json({
      message: 'Product created successfully!',
      error: false,
      success: true,
      product: product
    });

    } catch (error) {
        return res.status(500).json({
        message: error.message || error,
        error: true,
        success: false
      })  
    }
  }

  // get all product
  async function getAllProducts(req,res) {
    try {

    const page = parseInt(req.query.page) || 1;
   // const perPage = parseInt(req.query.perPage);
    const perPage = parseInt(req.query.perPage) || 10;
    const totalPosts = await productModel.countDocuments();
    const totalPages = Math.ceil(totalPosts/perPage);

    if(page > totalPages) {
      return res.status(404).json({
        message: 'Page not found',
        success: false,
        error: true
      });
    }

    const products =await productModel.find().populate('category')
    .skip((page - 1) * perPage)
    .limit(perPage)
    .exec();
    
    if(!products){
      res.status(500).json({
        error: true,
        success: false
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      products: products,
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

    // get all product by Category Id
  async function getAllProductsByCatId(req,res) {
    try {

    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10000;
    const totalPosts = await productModel.countDocuments();
    const totalPages = Math.ceil(totalPosts/perPage);

    if(page > totalPages) {
      return res.status(404).json({
        message: 'Page not found',
        success: false,
        error: true
      });
    }

    const products =await productModel.find({
      catId: req.params.id,
    }).populate('category')
    .skip((page - 1) * perPage)
    .limit(perPage)
    .exec();
    
    if(!products){
      res.status(500).json({
        error: true,
        success: false
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      products: products,
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

   // get all product by Category name
  async function getAllProductsByCatName(req,res) {
    try {

    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10000;
    const totalPosts = await productModel.countDocuments();
    const totalPages = Math.ceil(totalPosts/perPage);

    if(page > totalPages) {
      return res.status(404).json({
        message: 'Page not found',
        success: false,
        error: true
      });
    }

    const products =await productModel.find({
      catName: req.query.catName,
    }).populate('category')
    .skip((page - 1) * perPage)
    .limit(perPage)
    .exec();
    
    if(!products){
      res.status(500).json({
        error: true,
        success: false
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      products: products,
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

    // get all product by  sub Category Id
  async function getAllProductsBySubCatId(req,res) {
    try {

    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10000;
    const totalPosts = await productModel.countDocuments();
    const totalPages = Math.ceil(totalPosts/perPage);

    if(page > totalPages) {
      return res.status(404).json({
        message: 'Page not found',
        success: false,
        error: true
      });
    }

    const products =await productModel.find({
    subCatId: req.params.id,
    }).populate('category')
    .skip((page - 1) * perPage)
    .limit(perPage)
    .exec();
    
    if(!products){
      res.status(500).json({
        error: true,
        success: false
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      products: products,
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

    // get all product by sub Category name
  async function getAllProductsBySubCatName(req,res) {
    try {

    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10000;
    const totalPosts = await productModel.countDocuments();
    const totalPages = Math.ceil(totalPosts/perPage);

    if(page > totalPages) {
      return res.status(404).json({
        message: 'Page not found',
        success: false,
        error: true
      });
    }

    const products =await productModel.find({
      subCat: req.query.subCat,
    }).populate('category')
    .skip((page - 1) * perPage)
    .limit(perPage)
    .exec();
    
    if(!products){
      res.status(500).json({
        error: true,
        success: false
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      products: products,
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

    // get all product by  third sub Category Id
  async function getAllProductsByThirdSubCatId(req,res) {
    try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10000;
    const totalPosts = await productModel.countDocuments();
    const totalPages = Math.ceil(totalPosts/perPage);

    if(page > totalPages) {
      return res.status(404).json({
        message: 'Page not found',
        success: false,
        error: true
      });
    }

    const products =await productModel.find({
     thirdSubCatId: req.params.id,
    }).populate('category')
    .skip((page - 1) * perPage)
    .limit(perPage)
    .exec();
    
    if(!products){
      res.status(500).json({
        error: true,
        success: false
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      products: products,
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

    // get all product by third sub Category name
  async function getAllProductsByThirdSubCatName(req,res) {
    try {

    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10000;
    const totalPosts = await productModel.countDocuments();
    const totalPages = Math.ceil(totalPosts/perPage);

    if(page > totalPages) {
      return res.status(404).json({
        message: 'Page not found',
        success: false,
        error: true
      });
    }

    const products =await productModel.find({
     thirdSubCat: req.query.thirdSubCat,
    }).populate('category')
    .skip((page - 1) * perPage)
    .limit(perPage)
    .exec();
    
    if(!products){
      res.status(500).json({
        error: true,
        success: false
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      products: products,
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

  // get All product by price
    async function getAllProductsByPrice(req,res) {
    try {
      let productList = [];
      
      if(req.query.catId !== '' && req.query.catId !== undefined){
        const productListArr = await productModel.find({
          catId: req.query.catId,
        }).populate("category");
     productList = productListArr;
      }

       if(req.query.subCatId !== '' && req.query.subCatId !== undefined){
        const productListArr = await productModel.find({
          subCatId: req.query.subCatId,
        }).populate("category");
   productList = productListArr;
      }

       if(req.query.thirdSubCatId !== '' && req.query.thirdSubCatId !== undefined){
        const productListArr = await productModel.find({
        thirdSubCatId: req.query.thirdSubCatId,
        }).populate("category");
    productList = productListArr;
      }
      
    const filteredProducts = productList.filter((product)=>{
      if(req.query.minPrice && product.price < parseInt(+req.query.minPrice)) {
       return false;
      }
       if(req.query.maxPrice && product.price > parseInt(+req.query.maxPrice)) {
       return false;
      }
      return true;
    });

    return res.status(200).json({
      error: false,
      success: true,
      products: filteredProducts,
      totalPages: 0,
      page: 0
    })

    } catch (error) {
        return res.status(500).json({
        message: error.message || error,
        error: true,
        success: false
      })
    }
  }

     // get all product by sub rating
  async function getAllProductsByRating(req,res) {
    try {

    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10000;
    const totalPosts = await productModel.countDocuments();
    const totalPages = Math.ceil(totalPosts/perPage);

    if(page > totalPages) {
      return res.status(404).json({
        message: 'Page not found',
        success: false,
        error: true
      });
    }

    let products = [];

    if(req.query.catId!==undefined){
      products =await productModel.find({
      rating: req.query.rating,
      catId: req.query.catId,
    }).populate('category')
    .skip((page - 1) * perPage)
    .limit(perPage)
    .exec();
    }

    if(req.query.subCatId!==undefined){
      products =await productModel.find({
      rating: req.query.rating,
      subCatId: req.query.subCatId,
    }).populate('category')
    .skip((page - 1) * perPage)
    .limit(perPage)
    .exec();
    }

   if(req.query.thirdSubCatId!==undefined){
      products =await productModel.find({
      rating: req.query.rating,
      thirdSubCatId: req.query.thirdSubCatId,
    }).populate('category')
    .skip((page - 1) * perPage)
    .limit(perPage)
    .exec();
    }

    if(!products){
      res.status(500).json({
        error: true,
        success: false
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      products: products,
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

  // get All product Count
  async function getProductsCount(req,res) {
    try {
    const productsCount = await productModel.countDocuments();
    
    if(!productsCount){
      res.status(500).json({
      error: true,
      success: false
      });
    }

    return res.status(201).json({
      error: false,
      success: true,
      productsCount: productsCount
    })

    } catch (error) {
       return res.status(500).json({
        message: error.message || error,
        error: true,
        success: false
      })
    }
  }

     // get all features product
  async function getProductsFeatured(req,res) {
    try {

    const products =await productModel.find({
     isFeatured: true,
    }).populate('category');
    
    if(!products){
      res.status(500).json({
        error: true,
        success: false
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      products: products,
    });

    } catch (error) {
        return res.status(500).json({
        message: error.message || error,
        error: true,
        success: false
      })
    }
  }

  // delete product
  /*
  async function deleteProduct(req,res) {
    const product = await productModel.findById(req.params.id).populate('category');

    if(!product){
      return res.status(404).json({
        message: 'Product not found',
        error: true,
        success: false
      });
    }
  
    
   const images = product.images;

   for(img of images){
    const imgUrl = img;
    const urlArr = imgUrl.split('/');
    const image = urlArr[urlArr.length - 1];
    
    const imageName = image.split('/')[0];

    if(imageName){
      cloudinary.uploader.destroy(imageName,(error,result)=>{   
      });
    }
   }

 const deleteProduct = await productModel.findByIdAndDelete(req.params.id);

 if(!deleteProduct){
  res.status(404).json({
    message: 'Product not Deleted!',
    error: true,
    success: false
  });
 }

 return res.status(201).json({
  success: true,
  error: false,
  message: 'Product Deleted!'
 });

  }
*/

async function deleteProduct(req, res) {
  try {
    const product = await productModel.findById(req.params.id).populate('category');

    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
        error: true,
        success: false
      });
    }

    // Delete all associated images from Cloudinary
    const images = product.images;

    for (const imgUrl of images) {
      const urlArr = imgUrl.split('/');
      const publicIdWithExtension = urlArr[urlArr.length - 1]; // e.g. abc123.jpg
      const publicId = publicIdWithExtension.split('.')[0]; // Remove extension

      if (publicId) {
        await cloudinary.uploader.destroy(publicId); // wait for deletion
      }
    }

    // Delete product from DB
    await productModel.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      error: false,
      message: 'Product deleted successfully!'
    });

  } catch (error) {
    console.error('Delete Product Error:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: true,
      success: false
    });
  }
}

  // get Single Product
  async function getProduct(req,res) {
   try {
    const product = await productModel.findById(req.params.id).populate('category');

   if(!product){
    return res.status(404).json({
      message: 'The product is not found',
      error: true,
      success: false 
    })
   }

   return res.status(200).json({
    error: false,
    success: true,
    product: product
   })

   } catch (error) {
  return res.status(201).json({
  success: true,
  error: false,
  message: 'Product Deleted!'
  });
   } 
  }

  // delete image from cloudinary
     async function removeImageFromCloudinary(req, res) {
       try {
         const imgUrl = req.query.img;
         const urlArr = imgUrl.split('/');
         const image = urlArr[urlArr.length - 1];
         const imageName = image.split('.')[0];
     
         if (imageName) {
           const result = await cloudinary.uploader.destroy(imageName);
     
           if (result) {
             return res.status(200).json({
               message: "Image deleted from Cloudinary",
               result,
             });
           }
         }
     
         return res.status(400).json({ message: "Image name not found" });
       } catch (error) {
         return res.status(500).json({
           message: "Server error while deleting image",
           error: error.message,
         });
       }
     }

 // update product
  async function updateProduct(req,res) {
  try {
  const product = await productModel.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      images: req.body.images,
      brand: req.body.brand,
      price: req.body.price,
      oldPrice: req.body.oldPrice,
      catId: req.body.catId,
      subCatId: req.body.subCatId,
      subCat: req.body.subCat,
      catName: req.body.catName,
      thirdSubCat: req.body.thirdSubCat,
      thirdSubCatId: req.body.thirdSubCatId,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      isFeatured: req.body.isFeatured,
      productRam: req.body.productRam,
      size: req.body.size,
      productWeight: req.body.productWeight
    },
    {new: true}
  );
  
  if(!product){
    res.status(404).json({
      message: 'The product can not be updated!',
      error: true,
      success: false
    });
  }

  imagesArr = [];

  return res.status(201).json({
    message: 'The product is updated!',
    error: false,
    success: true
  });

  } catch (error) {
  return res.status(201).json({
  success: false,
  error: true,
  message: error.message || error
  });
  }
  }   
 
 // create product RAMS
   async function createProductRAMS(req,res) {
    try {
     let productRAMS = new productRamsModel({
        name: req.body.name
     });

    productRAMS = await productRAMS.save();

    if(!productRAMS){
    return res.status(500).json({
        error: true,
        success: false,
        message: 'Product RAMS not created'
      })
    }

    return res.status(201).json({
      message: 'Product RAMS created successfully!',
      error: false,
      success: true,
      product: productRAMS
    });

    } catch (error) {
        return res.status(500).json({
        message: error.message || error,
        error: true,
        success: false
      })  
    }
  }

   // Delete Product RAMS
   async function deleteProductRAMS(req, res) {
  try {
    const productRAMS = await productRamsModel.findById(req.params.id);

    if (!productRAMS) {
      return res.status(404).json({
        message: 'Product RAMS not found',
        error: true,
        success: false
      });
    }

    // Delete product RAMS from DB
    await productRamsModel.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      error: false,
      message: 'Product RAMS deleted successfully!'
    });

  } catch (error) {
    console.error('Delete Product Error:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: true,
      success: false
    });
  }
   }

 // update product RAMS
  async function updateProductRAMS(req,res) {
  try {
  const productRAMS = await productRamsModel.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    {new: true}
  );
  
  if(!productRAMS){
    res.status(404).json({
      message: 'The product RAMS can not be updated!',
      error: true,
      success: false
    });
  }

  return res.status(201).json({
    message: 'The product RAMS is updated!',
    error: false,
    success: true,
    productRAMS: productRAMS
  });

  } catch (error) {
   return res.status(500).json({
   message: error.message || error,
    error: true,
    success: false
      })
  }
  } 

  async function getProductRam(req,res) {
  try {
  const productRam = await productRamsModel.find();

    if(!productRam){
    return res.status(404).json({
      message: 'The product RAMS not found!',
      error: true,
      success: false
    });
   }

   return res.status(201).json({
    error: false,
    success: true,
    data: productRam
  });

  } catch (error) {
   return res.status(500).json({
    message: error.message || error,
    error: true,
    success: false
    })
  }
  }

  async function getProductRamById(req,res) {
  try {
  const productRam = await productRamsModel.findById(req.params.id);

    if(!productRam){
    return res.status(404).json({
      message: 'The product RAMS not found!',
      error: true,
      success: false
    });
   }

   return res.status(201).json({
    error: false,
    success: true,
    data: productRam
  });

  } catch (error) {
   return res.status(500).json({
    message: error.message || error,
    error: true,
    success: false
    })
  }
 }

  // create product WEIGHT
   async function createProductWEIGHT(req,res) {
    try {
     let productWEIGHT = new productWeightModel({
        name: req.body.name
     });

    productWEIGHT = await productWEIGHT.save();

    if(!productWEIGHT){
    return res.status(500).json({
        error: true,
        success: false,
        message: 'Product WEIGHT not created'
      })
    }

    return res.status(201).json({
      message: 'Product WEIGHT created successfully!',
      error: false,
      success: true,
      product: productWEIGHT
    });

    } catch (error) {
        return res.status(500).json({
        message: error.message || error,
        error: true,
        success: false
      })  
    }
  }

   // Delete Product WEIGHT
   async function deleteProductWEIGHT(req, res) {
   try {
    const productWEIGHT = await productWeightModel.findById(req.params.id);

    if (!productWEIGHT) {
      return res.status(404).json({
        message: 'Product WEIGHT not found',
        error: true,
        success: false
      });
    }

    // Delete product WEIGHT from DB
    await productWeightModel.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      error: false,
      message: 'Product WEIGHT deleted successfully!'
    });

  } catch (error) {
    console.error('Delete Product Error:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: true,
      success: false
    });
  }
   }

 // update product WEIGHT
 async function updateProductWEIGHT(req,res) {
  try {
  const productWEIGHT = await productWeightModel.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    {new: true}
  );
  
  if(!productWEIGHT){
    res.status(404).json({
      message: 'The product WEIGHT can not be updated!',
      error: true,
      success: false
    });
  }

  return res.status(201).json({
    message: 'The product WEIGHT is updated!',
    error: false,
    success: true,
    productRAMS: productWEIGHT
  });

  } catch (error) {
   return res.status(500).json({
   message: error.message || error,
    error: true,
    success: false
      })
  }
  } 

  async function getProductWEIGHT(req,res) {
  try {
  const productWEIGHT = await productWeightModel.find();

    if(!productWEIGHT){
    return res.status(404).json({
      message: 'The product WEIGHT not found!',
      error: true,
      success: false
    });
   }

   return res.status(201).json({
    error: false,
    success: true,
    data: productWEIGHT
  });

  } catch (error) {
   return res.status(500).json({
    message: error.message || error,
    error: true,
    success: false
    })
  }
  }

 async function getProductWEIGHTById(req,res) {
  try {
  const productWEIGHT = await productWeightModel.findById(req.params.id);

    if(!productWEIGHT){
    return res.status(404).json({
      message: 'The product WEIGHT not found!',
      error: true,
      success: false
    });
   }

   return res.status(201).json({
    error: false,
    success: true,
    data: productWEIGHT
  });

  } catch (error) {
   return res.status(500).json({
    message: error.message || error,
    error: true,
    success: false
    })
  }
 }

  // create product SIZE
  async function createProductSIZE(req,res) {
    try {
     let productSIZE = new productSizeModel({
        name: req.body.name
     });

    productSIZE = await productSIZE.save();

    if(!productSIZE){
    return res.status(500).json({
        error: true,
        success: false,
        message: 'Product SIZE not created'
      })
    }

    return res.status(201).json({
      message: 'Product SIZE created successfully!',
      error: false,
      success: true,
      product: productSIZE
    });

    } catch (error) {
        return res.status(500).json({
        message: error.message || error,
        error: true,
        success: false
      })  
    }
   }

   // Delete Product SIZE
   async function deleteProductSIZE(req, res) {
   try {
    const productSIZE = await productSizeModel.findById(req.params.id);

    if (!productSIZE) {
      return res.status(404).json({
        message: 'Product SIZE not found',
        error: true,
        success: false
      });
    }

    // Delete product WEIGHT from DB
    await productSizeModel.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      error: false,
      message: 'Product SIZE deleted successfully!'
    });

  } catch (error) {
    console.error('Delete Product Error:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: true,
      success: false
    });
  }
   }

 // update product SIZE
 async function updateProductSIZE(req,res) {
  try {
  const productSIZE = await productSizeModel.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    {new: true}
  );
  
  if(!productSIZE){
    res.status(404).json({
      message: 'The product SIZE can not be updated!',
      error: true,
      success: false
    });
  }

  return res.status(201).json({
    message: 'The product SIZE is updated!',
    error: false,
    success: true,
    productRAMS: productSIZE
  });

  } catch (error) {
   return res.status(500).json({
   message: error.message || error,
    error: true,
    success: false
      })
  }
  } 

 async function getProductSIZE(req,res) {
  try {
  const productSIZE = await productSizeModel.find();

    if(!productSIZE){
    return res.status(404).json({
      message: 'The product SIZE not found!',
      error: true,
      success: false
    });
   }

   return res.status(201).json({
    error: false,
    success: true,
    data: productSIZE
  });

  } catch (error) {
   return res.status(500).json({
    message: error.message || error,
    error: true,
    success: false
    })
  }
  }

 async function getProductSIZEById(req,res) {
  try {
  const productSIZE = await productSizeModel.findById(req.params.id);

    if(!productSIZE){
    return res.status(404).json({
      message: 'The product SIZE not found!',
      error: true,
      success: false
    });
   }

   return res.status(201).json({
    error: false,
    success: true,
    data: productSIZE
  });

  } catch (error) {
   return res.status(500).json({
    message: error.message || error,
    error: true,
    success: false
    })
  }
 }

async function filters(req, res) {
  try {
     const {
      catId,
      subCatId,
      thirdSubCatId,
      minPrice,
      maxPrice,
      rating,
      page = 1,
      limit = 10,
    } = req.body; // use req.body since you're using postData()

    const filterQuery = {};

    if (catId?.length > 0) {
      filterQuery.catId = { $in: catId };
    }

    if (subCatId?.length > 0) {
      filterQuery.subCatId = { $in: subCatId };
    }

    if (thirdSubCatId?.length > 0) {
      filterQuery.thirdSubCatId = { $in: thirdSubCatId };
    }

    if (rating?.length) {
      filterQuery.rating = { $gte: parseFloat(rating) };
    }

    if (minPrice || maxPrice) {
      filterQuery.price = {};
      if (minPrice) filterQuery.price.$gte = parseFloat(minPrice);
      if (maxPrice) filterQuery.price.$lte = parseFloat(maxPrice);
    }

    const totalFiltered = await productModel.countDocuments(filterQuery);
    const totalPages = Math.ceil(totalFiltered / limit);

    if (page > totalPages && totalFiltered > 0) {
      return res.status(404).json({
        message: 'Page not found',
        success: false,
        error: true,
      });
    }

    const filteredProducts = await productModel
      .find(filterQuery)
      .populate('catId')
      .populate('subCatId')
      .populate('thirdSubCatId')
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .exec();

    return res.status(200).json({
      error: false,
      success: true,
      totalFiltered,
      totalPages,
      currentPage: parseInt(page),
      products: filteredProducts,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

const sortItems=(products,sortBy,order)=>{
 return products.sort((a,b)=>{
  if(sortBy==='name'){
  return order==='asc'
   ? a.name.localeCompare(b.name) : 
   b.name.localeCompare(a.name) 
  }

 if(sortBy==='price'){
  return order==='asc' ? a.price - b.price : b.price - a.price
 } 
 return 0;
 })
}

async function sortBy(req,res) {
  try {
    
 const {products,sortBy,order}=req.body;
 const sortedItems=sortItems([...products?.products], sortBy,order)

 return res.status(200).json({
  error: false,
  success: true,
  products: sortedItems,
  page: 0,
  totalPages: 0
 });

  } catch (error) {
   return res.status(500).json({
     message: error.message || error,
     error: true,
     success: false,
    });
  }
 }

async function searchProductController(req,res) {

try {
  
const {query, page = 1, limit = 10 } = req.query;

if (!query) {
  return res.status(400).json({
    error: true, 
    success: false, 
    message: "Please provide a search Query" 
  });
  }
/*
const products = await productModel.find({
  $or: [
  { name: { $regex: query, $options: "i" } },
  { subCat: { $regex: query, $options: "i" } },
  { brand: { $regex: query, $options: "i" } },
  { catName: { $regex: query, $options: "i" } },
  { thirdSubCat: { $regex: query, $options: "i" } }
  ] 
 }).populate('category').skip((page - 1) * limit).limit(parseInt(limit)).exec();
*/

const filter = {
  $or: [
    { name: { $regex: query, $options: "i" } },
    { subCat: { $regex: query, $options: "i" } },
    { brand: { $regex: query, $options: "i" } },
    { catName: { $regex: query, $options: "i" } },
    { thirdSubCat: { $regex: query, $options: "i" } }
  ]
};

const products = await productModel.find(filter)
  .populate('category')
  .skip((page - 1) * limit)
  .limit(parseInt(limit));

const totalFiltered = await productModel.countDocuments(filter);
// const totalFiltered = await productModel.countDocuments(products);
 const totalPages = Math.ceil(totalFiltered / limit); 

 /*
 return res.status(200).json({
   success: true,
   error: false,
   count: products.length,
   products: products, 
   totalFiltered: totalFiltered,
   totalPages: totalPages,
   currentPage: parseInt(page),
   products: filteredProducts,
});*/

return res.status(200).json({
 success: true,
 error: false,
 count: products.length,
 products: products,
 totalFiltered: totalFiltered,
 totalPages: totalPages,
 currentPage: parseInt(page)
});

} catch (error) {
  return res.status(500).json({
   message: error.message || error,
   error: true,
   success: false,
  });  
}  
  
}

  module.exports = {
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
    sortBy,
    searchProductController
  }