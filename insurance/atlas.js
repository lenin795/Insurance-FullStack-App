const atlasrouter =require('express').Router();
const dao=require('./atlasdao');
const { tokenVerify, roleVerification } = require('./middleware');

atlasrouter.get('/',async(req,res)=>{
    const records = await dao.getAllRecords();
    res.json(records);
})

atlasrouter.post('/',async(req,res)=>{
    const newrecord=req.body;
    const createRecord = await dao.create(newrecord);
    res.json(createRecord)
})

atlasrouter.patch('/:usereg',async(req,res)=>{
    const usereg=req.params.usereg;
    const result=await dao.update(usereg);
    if(result){
        res.json(result);
    }
    else{
        res.json({message:'not found'})
    }
})
atlasrouter.delete('/:usereg',tokenVerify,roleVerification,async(req,res)=>{
    const usereg=req.params.usereg;
    const result=await dao.deletedrecord(usereg);
    if(result){
        res.json(result);
    }
    else{
        res.json({message:'not found'})
    }
})

module.exports=atlasrouter;