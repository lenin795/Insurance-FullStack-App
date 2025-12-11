const router = require('express').Router();
const dao = require('./userdao');
const { users } = require('./insuranceschema');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
    try {
        const newuser = req.body;
        const created = await dao.register(newuser);
        if (!created) {
            return res.status(400).json({ error: 'User already exists' });
        }
        
        // ✅ FIXED: Use _id instead of username
        const token = jwt.sign(
            { _id: created._id, role: created.role || 'user' }, 
            process.env.SECRET_KEY || 'your-super-secret-key'
        );
        
        const userData = await users.findById(created._id).select('-password');
        res.status(201).json({ 
            token, 
            user: { 
                _id: userData._id, 
                name: userData.name, 
                username: userData.username, 
                phone: userData.phone, 
                role: userData.role 
            } 
        });
    } catch (err) {
        console.error('Signup Error:', err);
        res.status(500).json({ error: 'Signup failed' });
    }
});

router.post('/signin', async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await dao.login({ username, password });  // ✅ Fixed typo: loggin → login
        
        if (!result) {
            return res.status(401).json({ error: `${username} unauthorized` });
        }
        
        // ✅ FIXED: result IS the token, userData from DB
        const userData = await users.findOne({ username }).select('-password');
        res.status(200).json({ 
            token: result,  // ✅ Token string directly
            user: { 
                _id: userData._id, 
                name: userData.name, 
                username: userData.username, 
                phone: userData.phone, 
                role: userData.role 
            } 
        });
    } catch (err) {
        console.error('Signin Error:', err);
        res.status(401).json({ error: 'Login failed' });
    }
});

module.exports = router;
