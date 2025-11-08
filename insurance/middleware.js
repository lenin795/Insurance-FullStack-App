const {user} =require('./insuranceschema')
const jwt =require('jsonwebtoken')

const tokenVerify=async(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]
    if(!token)
        res.json({error:'token not found'})
    try{
        const received=jwt.verify(token,process.env.SECRET_KEY)
        req.user =await user.findOne({username:received.logged}).select("-password")
        next()
    }
    catch(err){
        res.status(403).json({error:`forbidden`})
    }
} 
const roleVerification = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) return res.sendStatus(403);
    next();
  };
};
module.exports = {tokenVerify,roleVerification}