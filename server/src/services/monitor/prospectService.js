import Prospect from '../../models/Prospect.js';

export const addProspect = async (userId, linkedinUsername, type) => {
  if (!['user', 'company'].includes(type)) {
    const error = new Error('Invalid prospect type. Must be either "user" or "company".');
    error.status = 400;
    throw error;
  }

  const existingProspect = await Prospect.findOne({ user: userId, linkedinUsername });
  if (existingProspect) {
    const error = new Error('This prospect already exists for your account.');
    error.status = 400;
    throw error;
  }

  const newProspect = new Prospect({
    user: userId,
    linkedinUsername,
    type
  });

  await newProspect.save();
  return newProspect;
};

export const deleteProspect = async (userId, prospectId) => {
  const prospect = await Prospect.findOne({ _id: prospectId, user: userId });

  if (!prospect) {
    const error = new Error('Prospect not found or you do not have permission to delete it.');
    error.status = 404;
    throw error;
  }

  await Prospect.findByIdAndDelete(prospectId);
};

export const getProspects = async (userId) => {
  return await Prospect.find({ user: userId });
};