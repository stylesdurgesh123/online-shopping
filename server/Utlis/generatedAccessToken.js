const jwt = require('jsonwebtoken');

const generatedAccessToken = async (userId) => {
    const token = await jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: '10h' }
    );

    return token;
};

module.exports = generatedAccessToken;