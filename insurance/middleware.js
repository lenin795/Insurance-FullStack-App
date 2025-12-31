const { users } = require('./insuranceschema');
const jwt = require('jsonwebtoken');

const tokenVerify = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: 'token not found' });  
    }
    
    try {
        const received = jwt.verify(token, process.env.SECRET_KEY || 'your-super-secret-key');
        console.log('🔍 DECODED TOKEN:', received);  
        req.user = await users.findById(received._id).select("-password");
        
        if (!req.user) {
            return res.status(401).json({ error: 'User not found' });
        }
        
        console.log('✅ USER FOUND:', req.user.username, req.user.role);  
        next();
    } catch (err) {
        console.error('❌ JWT ERROR:', err.message);  
        res.status(403).json({ error: `forbidden: ${err.message}` });
    }
};

const roleVerification = (allowedRoles) => {
    return (req, res, next) => {
        console.log('🔐 ROLE CHECK:', req.user?.role, 'vs', allowedRoles);  
        if (!allowedRoles.includes(req.user?.role)) {
            return res.status(403).json({ error: 'Access denied' }); 
        }
        next();
    };
};

module.exports = { tokenVerify, roleVerification };
