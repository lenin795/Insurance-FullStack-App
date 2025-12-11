const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')

const userSchema=mongoose.Schema({
    "username":{type:String,require:true,unique:true},
    "name":{type:String},
    "password":{type:String},
    "role":{type:String,enum:['user','admin'],default:'user'}
})
const insuranceSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    policyholdername: { type: String, required: true },
    policyname: { type: String, required: true },
    policytype: { type: String, required: true },
    providername: { type: String, required: true },
    PremiumAmount: { type: Number, required: true },
    sumInsured: { type: String, required: true },
    Frequency: { type: String, required: true },
    startdate: { type: Date, required: true },
    enddate: { type: Date, required: true },
    policystatus: { type: String, enum: ['Active', 'Lapsed', 'Pending'], default: 'Active' },
    payments: [{
        amount: Number,
        date: { type: Date, default: Date.now },
        status: { type: String, enum: ['paid', 'pending', 'failed'], default: 'pending' }
    }],
    claims: [{
        claimId: String,
        description: String,
        amount: Number,
        submittedAt: { type: Date, default: Date.now },
        status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
        approvedAt: Date
    }]
}, { timestamps: true });


userSchema.pre('save',async function () {
    if(!this.isModified('password'))return
    const salted=await bcrypt.genSalt(12)
    this.password=await bcrypt.hashSync(this.password,salted)
})

const users = mongoose.model('user',userSchema);
const insurance =mongoose.model('insurance',insuranceSchema);
module.exports={users,insurance};