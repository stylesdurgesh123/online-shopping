const express = require('express');
const {
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
  } = require('../Controllers/user');
const auth = require('../Middlewares/auth');
const upload = require('../Middlewares/multer');
const userRouter = express.Router();

userRouter.post('/register', registerUserController);
userRouter.post('/verifyEmail', verifyEmailController);
userRouter.post('/login', loginUserController);
userRouter.get('/logout', auth, logoutUserController);
userRouter.put('/user-avatar', auth, upload.array('avatar'), userAvatarController);
userRouter.delete('/deleteImage', auth, removeImageFromCloudinary);
userRouter.put('/:id', auth, updateUserDetails);
userRouter.post('/forgot-password', forgotPasswordController);
userRouter.post('/verify-forgot-password-otp', verifyForgotPasswordOtp);
userRouter.post('/reset-password', resetPassword);
userRouter.post('/refresh-token', refreshToken);
userRouter.get('/user-details',auth, userDetails);
userRouter.post('/addReview',auth, addReview);
userRouter.get('/getReview', getReview);
userRouter.get('/getAllUsers', auth, getAllUsers);

module.exports = userRouter;
