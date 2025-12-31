const { insurance } = require('./insuranceschema');
const { users } = require('./insuranceschema');

const getAllRecords = async (user) => {
  if (user.role === 'admin') {
    return await insurance.find().populate('userId', 'name username phone role');
  } else {
    return await insurance.find({ userId: user._id }).populate('userId', 'name');
  }
};

const create = async (newRecord) => {
  const newinsurance = new insurance(newRecord);
  await newinsurance.save();
  return newinsurance;
};

const update = async (policyId, updatedrecord, user) => {
  try {
    const query = user.role === 'admin' 
      ? { _id: policyId } 
      : { _id: policyId, userId: user._id };
    
    const updated = await insurance.findOneAndUpdate(query, updatedrecord, { 
      new: true,
      runValidators: true 
    }).populate('userId', 'name username');
    return updated;
  } catch (err) {
    console.error('Update Error:', err);
    return null;
  }
};

const deletedrecord = async (policyId) => {
  try {
    const deleted = await insurance.findOneAndDelete({ _id: policyId });
    return deleted;
  } catch (err) {
    console.error('Delete Error:', err);
    return null;
  }
};

const getAllUsers = async () => {
  return await users.find({}, '-password').lean();
};

const getPoliciesWithClaims = async () => {
  return await insurance.find({
    'claims.status': 'pending'
  }).populate('userId', 'name username phone');
};

const updateClaimStatus = async (policyId, claimId, status) => {
  return await insurance.findOneAndUpdate(
    { _id: policyId, 'claims._id': claimId },
    { $set: { 'claims.$.status': status, 'claims.$.approvedAt': new Date() } },
    { new: true }
  );
};

module.exports = { 
  getAllRecords, create, update, deletedrecord, 
  getAllUsers, getPoliciesWithClaims, updateClaimStatus 
};
