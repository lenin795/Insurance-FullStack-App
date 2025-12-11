const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { users } = require('./insuranceschema');
require('dotenv').config();

const register = async (newuser) => {
    const exists = await users.findOne({ username: newuser.username });
    if (exists) return null;
    
    // ✅ Hash password BEFORE save
    newuser.password = await bcrypt.hash(newuser.password, 12);
    const createduser = new users(newuser);
    await createduser.save();
    return createduser;
};

const login = async (obj) => {  // ✅ Fixed typo: loggin → login
    const { username, password } = obj;
    const exists = await users.findOne({ username });

    if (!exists || !(await bcrypt.compare(password, exists.password))) {
        return null;
    }
    
    // ✅ FIXED: Use _id and role (matches middleware)
    const token = jwt.sign(
        { _id: exists._id, role: exists.role || 'user' }, 
        process.env.SECRET_KEY || 'your-super-secret-key'
    );
    return token;  // ✅ Returns token string
};

module.exports = { register, login };
