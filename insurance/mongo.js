const mongoose=require('mongoose');
require('dotenv').config();

const connect = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Monodb connected")
    }
    catch(err){
        console.error(err);
        process.exit(1)
    }
}
module.exports=connect