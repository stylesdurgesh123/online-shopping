const userModel= require('../Models/user');
const reviewsModel = require('../Models/reviewModel');
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const { sendEmailFun } = require('../config/sendEmail');
const { verificationEmail } = require('../Utlis/sendEmailTemplate');
const generatedAccessToken = require('../Utlis/generatedAccessToken');
const generatedRefreshToken = require('../Utlis/generateRefreshToken');
require('dotenv').config(); 
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const { error } = require('console');

cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
  secure: true 
});

async function registerUserController(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Provide email, name, password',
        error: true,
        success: false
      });
    }

    const user = await userModel.findOne({ email: email });
    if (user) {
      return res.json({
        message: 'User already registered with this email',
        error: true,
        success: false
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      otp: verifyCode,
      otpExpires: Date.now() + 600000, // 10 mins
    });

    await newUser.save();

    // send email
   await sendEmailFun(
    email,
   'Verify Email from E-commerce App',
   '',
   verificationEmail(name, verifyCode)
   );

    const jwtToken = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '10h' }
    );

    return res.status(201).json({
      success: true,
      error: false,
      message: 'User registered successfully! Please verify your email.',
      token: jwtToken
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
}

async function verifyEmailController(req,res) {
  try {
     const {email, otp}=req.body
     const user= await userModel.findOne({email:email})
     if(!user){
      return res.status(400).json({
        message: 'User not found',
        error: true,
        success: false
      })
     }

     const isCodeValid = user.otp === otp;
     const isNotExpired = user.otpExpires > Date.now();

     if(isCodeValid && isNotExpired){
      user.verify_email= true;
      user.otp= null;
      user.otpExpires= null;
      await user.save();
      return res.status(200).json({
        error: false,
        success: true,
        message: 'Email Verified Successfully!'
      });

     } else if(!isCodeValid){
      return res.status(400).json({
        error: true,
        success: false,
        message: 'Invalid OTP'
      });

     } else{
      return res.status(400).json({
        error: true,
        success: false,
        message: 'OTP expired'
      });
     }

  } catch (error) {
      return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
}

async function loginUserController(req,res) {
  try {
  const {email, password}= req.body;
    const user= await userModel.findOne({email:email})

      if (!user) {
       return res.status(400).json({
       message: 'Email is not registered. Please register first.',
       error: true,
       success: false
       });
      }

    if(user.status!=='Active'){
     res.status(400).json({
      message: 'Contact to admin',
      error: true,
      success: false 
     })
    } 

     if(user.verify_email!==true){
     res.status(400).json({
      message: 'Your email is not verify yet email verify first',
      error: true,
      success: false 
     })
    } 

  const isMatch= await bcrypt.compare(password, user.password);
  if(!isMatch){
    return res.status(400).json({
      message: 'invalid user password',
      error: true,
      success: false
    })
  } 
  
  const accessToken = await generatedAccessToken(user._id); 
   const refreshToken = await generatedRefreshToken(user._id); 

   const updateUser = await userModel.findByIdAndUpdate(user?._id,{
     last_login_date : new Date()
   })

   const cookiesOption = {
    httpOnly : true,
    secure : true,
    sameSite : 'None'
   }

      res.cookie('accessToken', accessToken, cookiesOption)
      res.cookie('refreshToken', refreshToken, cookiesOption)

      return res.json({
        message: 'Login Successfully',
        error: false,
        success: true,
        data: {
          accessToken,
          refreshToken
        }
      });

  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })
  }
  
}

// logoutController
async function logoutUserController(req,res) {
  try {
   const userId = req.userId 

   const cookiesOption = {
    httpOnly : true,
    secure : true,
    sameSite : 'None'
   }

      res.clearCookie('accessToken', cookiesOption)
      res.clearCookie('refreshToken', cookiesOption)

      const removeRefreshToken = await userModel.findByIdAndUpdate(userId,{
        refresh_token : ''
      })

      return res.json({
        message: 'Logout Successfully',
        error: false,
        success: true
      });

  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })
  }
  
}

  // image upload
  var imagesArr = [];
  async function userAvatarController(req,res) {
    try {
      imagesArr = [];
      const userId = req.userId;
      const images = req.files;

      const user = await userModel.findOne({_id: userId});

        if(!user){
        return res.status(500).json({
          message: 'User not found',
          error: true,
          success: false
        });
      }
     
       // first image remove from cloudinary
      const imgUrl = user.avatar;
      const urlArr = imgUrl.split('/');
      const avatar_image = urlArr[urlArr.length - 1];
      const imageName = avatar_image.split('.')[0];

       if (imageName) {
       const result = await cloudinary.uploader.destroy(imageName);
      }
      
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

        user.avatar = imagesArr[0];
        await user.save();

       /* return res.status(200).json({
         _id: userId,
          avatar: imagesArr[0]
       });*/

       return res.status(200).json({
       success: true,
       error: false,
       data: {
      _id: userId,
      avatar: imagesArr[0]
      }
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
    const urlArr = imgUrl.split('/');
    const image = urlArr[urlArr.length - 1];
    const imageName = image.split('.')[0];

    if (imageName) {
      const result = await cloudinary.uploader.destroy(imageName);

      if (result) {
        return res.status(200).json({
          error: flase,
          success: true,
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

// update user details
 async function updateUserDetails(req,res) {
  try {
    const userId = req.userId // auth middleware
    const {name,email,mobile,password} = req.body;

    const userExist = await userModel.findById(userId);

    if(!userExist){
      return res.status(400).send('The use cannot be updated!')
    }

    /*
   let verifyCode = '';
   if(email!==userExist.email){
    verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
   }
*/
/*
  let hashedPassword = ''
  if(password){
     const salt = await bcrypt.genSalt(10);
     hashedPassword = await bcrypt.hash(password, salt);
  }else{
    hashedPassword = userExist.password;
  }
  */

 const updateUser = await userModel.findByIdAndUpdate(
  userId,{
    name: name,
    mobile: mobile,
    email: email,
   /* verify_email: email!==userExist.email ? false : true,
    password: hashedPassword,
    otp: verifyCode!=='' ? verifyCode : null,
    otpExpires: verifyCode!=='' ? Date.now() + 600000 : ''
    */
  },
  { new: true }
 );

 /*
  if(email!==userExist.email){
 // send verification email
    await sendEmailFun(
    email,
   'Verify Email from E-commerce App',
   '',
   verificationEmail(name, verifyCode)
   );
  }
*/
  return res.json({
    message: 'User Updated Successfully!',
    error: false,
    success: true,
    user:{
      name:updateUser?.name,
      _id:updateUser?._id,
      email:updateUser?.email,
      mobile:updateUser?.mobile,
      avatar:updateUser?.avatar
    }
  })
 
  } catch (error) {
     return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
     }) 
  }
}

// forgot password
async function forgotPasswordController(req,res) {
   try {
    const {email} = req.body;
    const user = await userModel.findOne({email:email})
    if(!user){
      return res.status(400).json({
        message: 'Email not available',
        error: true,
        success: false
      });
    }

  let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

  user.otp = verifyCode;
  user.otpExpires = Date.now() + 600000;
  
  await user.save();

   // send verification email
    await sendEmailFun(
    email,
   'Verify OTP from E-commerce App',
   '',
   verificationEmail(user?.name, verifyCode)
   );

  return res.json({
    message: 'check your email',
    error: false,
    success: true
  });

   } catch (error) {
     return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
     })
   }
}

async function verifyForgotPasswordOtp(req, res) {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: 'Provide required fields: email, otp',
        error: true,
        success: false
      });
    }

    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        message: 'Email not available',
        error: true,
        success: false
      });
    }

    if (otp !== user.otp) {
      return res.status(400).json({
        message: 'Invalid OTP',
        error: true,
        success: false
      });
    }

    const currentTime = Date.now();

    if (user.otpExpires < currentTime) {
      return res.status(400).json({
        message: 'OTP is expired',
        error: true,
        success: false
      });
    }

    user.otp = '';
    user.otpExpires = '';
    await user.save();

    return res.status(200).json({
      message: 'Verify OTP successfully!',
      error: false,
      success: true
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
}

// reset password
async function resetPassword(req,res) {
  try {
   const { email, oldPassword, newPassword, confirmPassword } = req.body;
   if(!email || !oldPassword || !newPassword || !confirmPassword){
   return res.status(400).json({
    error: true,
    success: false,
    message: 'Provide required fields: email, oldPassword, newPassword, confirmPassword'
  });
  }


  const user = await userModel.findOne({email})
    if (!user) {
      return res.status(400).json({
        message: 'Email not available',
        error: true,
        success: false
      });
    }
    
    const isMatch= await bcrypt.compare(oldPassword, user.password);
    if(!isMatch){
      return res.status(400).json({
        message: 'Your old password is wrong',
        error: true,
        success: false
      }); 
    }

    if(newPassword !== confirmPassword){
      return res.status(400).json({
        message: 'newPassword and confirmPassword must be same',
        error: true,
        success: false
      });
    }

   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(newPassword, salt);

   user.password = hashedPassword;
   await user.save();

   return res.json({
    message: 'Password updated successfully!',
    error: false,
    success: true
   })

  } catch (error) {
       return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
}

  // refresh token 
 async function refreshToken(req,res) {
  try {

   const refreshToken = req.cookies.refreshToken || req?.headers?.authorization?.split('')[1]

   if(!refreshToken){
    return res.status(401).json({
      message: 'Invalid token',
      error: true,
      success: false
    })
   }

 const verifyToken = await jwt.verify(refreshToken,process.env.JWT_SECRET)
 if(!verifyToken){
  return res.status(401).json({
    message: 'token is expired',
    error: true,
    success: false
  });
 }

 const userId = verifyToken?._id;
 const newAccessToken = await generatedAccessToken(userId);

  const cookiesOption = {
    httpOnly : true,
    secure : true,
    sameSite : 'None'
   }

  res.cookie('accessToken', newAccessToken, cookiesOption)

  return res.json({
    message: 'New Access token generated',
    error: false,
    success: true,
    data : {
      accessToken: newAccessToken
    }
  })

  } catch (error) {
      return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
 }

 // get login user details
async function userDetails(req, res) {
  try {
    const userId = req.userId;

    const user = await userModel
      .findById(userId)
      .select('-password -refresh_token')
      .populate('address_details');

    return res.json({
      message: 'user details',
      data: user,
      error: false,
      success: true
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Something is wrong',
      error: true,
      success: false
    });
  }
}

 /*
// get login user details
 async function userDetails(req,res) {
  try {
    const userId = req.userId;

    const user = await userModel.findById(userId).select('-password -refresh_token')
    
    return res.json({
      message: 'user details',
      data: user,
      error: false,
      success: true
    })

  } catch (error) {
    return res.status(500).json({
      message: 'Something is wrong',
      error: true,
      success: false
    })
  }
 }
  */

 // review controller
 async function addReview(req,res) {
  try {
    const {image,userName,review,rating,userId,productId}=req.body;

    const userReview = new reviewsModel({
      image:image,
      userName:userName,
      review:review,
      rating:rating,
      userId:userId,
      productId:productId
    })

    await userReview.save();
    
    return res.json({
      message: 'Review added successfully',
      error: false,
      success: true
    })

  } catch (error) {
    return res.status(500).json({
      message: 'Something is wrong',
      error: true,
      success: false
    })
  }
 }

 // get Review
 async function getReview(req,res) {
  try {
    const productId = req.query.productId;

    const review = await reviewsModel.find({ productId: productId });

     if(!review){
      return res.status(400).json({
      message: 'review not found',
      error: true,
      success: false
    })
     }

     return res.status(200).json({
      error: false,
      success: true,
      review: review 
    })
    
  } catch (error) {
    return res.status(500).json({
      message: 'Something is wrong',
      error: true,
      success: false
    })
  }
 }

// get all users
async function getAllUsers(req, res) {
  try {
    const users = await userModel.find()
      .select('-password -refresh_token');

    if (!users || users.length === 0) {
      return res.status(404).json({
        message: 'No users found',
        error: true,
        success: false
      });
    }

    return res.status(200).json({
      message: 'All users fetched successfully',
      error: false,
      success: true,
      total: users.length,
      data: users
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Server error',
      error: true,
      success: false
    });
  }
}

module.exports={
    registerUserController,
    verifyEmailController,
    loginUserController,
    logoutUserController,
    userAvatarController,
    removeImageFromCloudinary,
    updateUserDetails,
    forgotPasswordController,
    verifyForgotPasswordOtp,
    resetPassword,
    refreshToken,
    userDetails,
    addReview,
    getReview,
    getAllUsers
}