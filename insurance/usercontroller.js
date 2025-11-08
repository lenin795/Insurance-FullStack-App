const router  = require('express').Router();
const dao=require('./userdao')


router.post('/signup',async(req,res)=>{
    const newuser=req.body;
    const created = await dao.register(newuser)
    if(!created)return res.status(400).send('user already exists')
    res.status(201).json({message:created})
     
})

router.post('/signin',async(req,res)=>{
    const returned = await dao.loggin(req.body)
    if(!returned)
        res.status(401).json({error:`${req.body.username} unauthorized`})
    res.status(200).json({message:returned})
})
module.exports=router;