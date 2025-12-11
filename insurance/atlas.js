const atlasrouter = require('express').Router();
const dao = require('./atlasdao');
const { tokenVerify, roleVerification } = require('./middleware');

// ✅ FIXED: Auto-add userId to new policies
atlasrouter.post('/', tokenVerify, async (req, res) => {
    try {
        const policyData = {
            ...req.body,
            userId: req.user._id  // ✅ CRITICAL FIX!
        };
        const createRecord = await dao.create(policyData);
        res.json(createRecord);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// In atlasrouter.js
atlasrouter.get('/users', tokenVerify, roleVerification(['admin']), async (req, res) => {
    try {
        const users = await dao.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// ✅ FIXED: Correct param names (id instead of usereg)
atlasrouter.get('/', tokenVerify, async (req, res) => {
    try {
        const records = await dao.getAllRecords(req.user);
        res.json(records);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

atlasrouter.patch('/:id', tokenVerify, async (req, res) => {
    try {
        const policyId = req.params.id;  // ✅ FIXED: id not usereg
        const result = await dao.update(policyId, req.body, req.user);
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ message: 'not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

atlasrouter.delete('/:id', tokenVerify, roleVerification(['admin']), async (req, res) => {
    try {
        const policyId = req.params.id;  // ✅ FIXED: id not usereg
        const result = await dao.deletedrecord(policyId);
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ message: 'not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = atlasrouter;
