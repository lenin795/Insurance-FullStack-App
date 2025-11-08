const jwt=require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { users } = require('./insuranceschema')
require('dotenv').config()

const register=async(newuser)=>{
    const exists=await users.findOne({username:newuser.username})
    if(exists) return null
    const createduser=new users(newuser)
    await createduser.save()
    return createduser
}
const loggin =async(obj)=>{
    const{username,password}=obj
    const exists=await users.findOne({username})

    if(!exists||!(await bcrypt.compare(password,exists.password)))
        return null
    const token = jwt.sign({"logged":username},process.env.SECRET_KEY)
    return token;
}
module.exports={register,loggin}
