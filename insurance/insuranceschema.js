const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')

const userSchema=mongoose.Schema({
    "username":{type:String,require:true,unique:true},
    "name":{type:String},
    "password":{type:String},
    "role":{type:String,enum:['user','admin'],default:'admin'}
})
const insuranceSchema=mongoose.Schema({
    
    "policyholdername":{type:String,require:true},
    "policyname":{type:String,require:true},
    "policytype":{type:String,require:true},
    "providername":{type:String,require:true},
    "PremiumAmount":{type:Number},
    "Frequency":{type:Number},
    "startdate":{type:String},
    "enddate":{type:String},
    "policystatus":{type:String,require:true}
})

userSchema.pre('save',async function () {
    if(!this.isModified('password'))return
    const salted=await bcrypt.genSalt(12)
    this.password=await bcrypt.hashSync(this.password,salted)
})

const users = mongoose.model('user',userSchema);
const insurance =mongoose.model('insurance',insuranceSchema);
module.exports={users,insurance};