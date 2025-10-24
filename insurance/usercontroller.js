const Router  = require('express').Router;
const dao=require('./userdao')
const app=require('express').Router();

router.post('./signup',async(req,res)=>{
    const newuser=req.body;
    const created = await dao.register(req.body)
    if(!created)return res.status(400).send('user already exists')
    res.status(200).json({message:returned})
     
})
module.exports=router;