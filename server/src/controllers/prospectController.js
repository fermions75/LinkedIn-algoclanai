import * as prospectService from '../services/monitor/prospectService.js';
import * as postService from '../services/monitor/postService.js';
import User from '../models/User.js';

export const addProspect = async (req, res) => {
  try {
    const { linkedinUsername, type } = req.body;
    const userId = req.user.id;

    const newProspect = await prospectService.addProspect(userId, linkedinUsername, type);
    
    // Trigger post update asynchronously
    postService.updateProspectPost(newProspect).catch(console.error);

    res.status(201).json({ message: 'Prospect added successfully', prospect: newProspect });
  } catch (error) {
    console.error('Error adding prospect:', error);
    res.status(error.status || 500).json({ message: error.message || 'Server error' });
  }
};

export const deleteProspect = async (req, res) => {
  try {
    const { prospectId } = req.params;
    const userId = req.user.id;

    await prospectService.deleteProspect(userId, prospectId);
    
    // Delete associated posts
    await postService.deleteProspectPosts(prospectId);

    res.status(200).json({ message: 'Prospect and associated posts deleted successfully' });
  } catch (error) {
    console.error('Error deleting prospect:', error);
    res.status(error.status || 500).json({ message: error.message || 'Server error' });
  }
};

export const getProspects = async (req, res) => {
  try {
    const userId = req.user.id;
    const prospects = await prospectService.getProspects(userId);
    res.json(prospects);
  } catch (error) {
    console.error('Error fetching prospects:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProspectPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    const forceFetch = req.query.forceFetch === 'true';

    // Check if the user has available LinkedIn API calls
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(user)
    if (user.linkedinApiCalls <= 0) {
      return res.status(403).json({ message: 'No LinkedIn API calls available' });
    }

    // Decrement the LinkedIn API calls
    user.linkedinApiCalls -= 1;
    await user.save();

    // Proceed with fetching prospect posts
    const posts = await postService.getProspectPosts(userId, forceFetch);
    res.json(posts);
  } catch (error) {
    console.error('Error fetching prospect posts:', error);
    res.status(500).json({ message: 'Server error' });
  }
};