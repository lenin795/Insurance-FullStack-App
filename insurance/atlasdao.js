const {insurance} =require('./insuranceschema')

const getAllRecords=async()=>{
    return await insurance.find()
}
const create= async (newRecord)=>{
    const newinsurance = new insurance(newRecord)
    await newinsurance.save()
    return newinsurance;
}
const update=async(usereg,updatedrecord)=>{
    try{
        const updated = await insurance.findOneAndUpdate({policyno:usereg},updatedrecord,{new:true})
        return updated;
    }
    catch(err){
        console.error(err);
        return null;
    }
}
const deletedrecord=async(usereg)=>{
    try{
        const deleted = await insurance.findOneAndDelete({policyno:usereg})
        return deleted;
    }
    catch(err){
        console.error(err);
        return null;
    }
}
module.exports = {getAllRecords, create, update, deletedrecord};