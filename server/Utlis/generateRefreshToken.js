const UserModel = require('../Models/user');
const userModel = require('../Models/user')
const jwt = require('jsonwebtoken');

const generatedRefreshToken =  async (userId) => {
    const token = await jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    const updateRefreshTokenUser = await UserModel.updateOne(
        {_id : userId},
        {
         refresh_token : token 
        }
    )

    return token;

};

module.exports = generatedRefreshToken; 