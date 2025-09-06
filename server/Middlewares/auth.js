const jwt = require("jsonwebtoken");

const auth = async (req,res,next)=>{
    try {
     var token=req.cookies.accessToken || req?.headers?.authorization?.split('')
    [1];

   if(!token){
    token = req.query.token;
   }

    if(!token){
    return res.status(401).json({ 
        message: "Provide Token!" 
    });
    }

   const decoded= await jwt.verify(token, process.env.JWT_SECRET);
   
   if(!decoded){
    return res.status(401).json({
        message: 'unauthorized access',
        error: false,
        success: false
    })
   }

   req.userId = decoded.id
   next();
        
    } catch (error) {
      return res.status(500).json({
        message: 'You have not login',
        error: true,
        success: false
      })  
    }
}

module.exports = auth; 