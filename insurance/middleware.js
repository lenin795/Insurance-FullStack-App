const { users } = require('./insuranceschema');
const jwt = require('jsonwebtoken');

const tokenVerify = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: 'token not found' });  // ✅ Changed to 401
    }
    
    try {
        const received = jwt.verify(token, process.env.SECRET_KEY || 'your-super-secret-key');
        console.log('🔍 DECODED TOKEN:', received);  // ✅ DEBUG
        
        // ✅ FIX 1: Use _id instead of logged
        req.user = await users.findById(received._id).select("-password");
        
        if (!req.user) {
            return res.status(401).json({ error: 'User not found' });
        }
        
        console.log('✅ USER FOUND:', req.user.username, req.user.role);  // ✅ DEBUG
        next();
    } catch (err) {
        console.error('❌ JWT ERROR:', err.message);  // ✅ DEBUG
        res.status(403).json({ error: `forbidden: ${err.message}` });
    }
};

const roleVerification = (allowedRoles) => {
    return (req, res, next) => {
        console.log('🔐 ROLE CHECK:', req.user?.role, 'vs', allowedRoles);  // ✅ DEBUG
        if (!allowedRoles.includes(req.user?.role)) {
            return res.status(403).json({ error: 'Access denied' });  // ✅ Better error
        }
        next();
    };
};

module.exports = { tokenVerify, roleVerification };
