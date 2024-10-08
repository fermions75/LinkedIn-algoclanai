import Post from '../../models/LinkedinPost.js';
import Prospect from '../../models/Prospect.js';
import * as linkedinApiService from './linkedinApiService.js';

export const updateProspectPost = async (prospect) => {
  // console.time(`fetchLatestPost for ${prospect.linkedinUsername}`);
  try {
    const latestPost = await linkedinApiService.fetchLatestPost(prospect.linkedinUsername, prospect.type);
    // console.timeEnd(`fetchLatestPost for ${prospect.linkedinUsername}`);
    
    if (latestPost) {
      // console.time(`parsePostData for ${prospect.linkedinUsername}`);
      const postData = linkedinApiService.parsePostData(latestPost, prospect.type);
      // console.timeEnd(`parsePostData for ${prospect.linkedinUsername}`);
      
      // console.time(`upsertPost for ${prospect.linkedinUsername}`);
      const result = await upsertPost(prospect._id, postData);
      // console.timeEnd(`upsertPost for ${prospect.linkedinUsername}`);
      return result;
    }
  } catch (error) {
    console.error(`Error updating post for prospect ${prospect.linkedinUsername}:`, error);
    throw error;
  }
};

export const getProspectPosts = async (userId, forceFetch = false) => {
  // console.time('getProspectPosts');
  const prospects = await Prospect.find({ user: userId });
  // console.log(`Found ${prospects.length} prospects for user ${userId}`);

  const posts = [];
  const UPDATE_INTERVAL_HOURS = parseInt(process.env.UPDATE_INTERVAL_HOURS || '24', 10);

  for (const prospect of prospects) {
    // console.time(`Processing prospect ${prospect.linkedinUsername}`);
    const updateThreshold = new Date(Date.now() - UPDATE_INTERVAL_HOURS * 60 * 60 * 1000);

    let existingPost = await Post.findOne({ prospect: prospect._id });
    // console.log(`Existing post for ${prospect.linkedinUsername}: ${existingPost ? 'Found' : 'Not found'}`);

    if (forceFetch || !existingPost || !prospect.lastChecked || prospect.lastChecked < updateThreshold) {
      // console.log(`Updating post for ${prospect.linkedinUsername}`);
      // console.time('updateProspectPost');
      try {
        await updateProspectPost(prospect);
        existingPost = await Post.findOne({ prospect: prospect._id });
        
        await Prospect.findByIdAndUpdate(prospect._id, { lastChecked: new Date() });
        // console.log(`Post updated for ${prospect.linkedinUsername}`);
      } catch (error) {
        // console.error(`Error updating post for prospect ${prospect.linkedinUsername}:`, error);
      }
      // console.timeEnd('updateProspectPost');
    } else {
      // console.log(`Using existing post for ${prospect.linkedinUsername}`);
    }

    if (existingPost) {
      posts.push({
        post: existingPost,
        prospect: {
          _id: prospect._id,
          linkedinUsername: prospect.linkedinUsername,
          lastChecked: prospect.lastChecked,
          type: prospect.type,
        }
      });
    }
    // console.timeEnd(`Processing prospect ${prospect.linkedinUsername}`);
  }

  // console.timeEnd('getProspectPosts');
  // console.log(`Returning ${posts.length} posts`);
  return posts;
};

const upsertPost = async (prospectId, postData) => {
  const existingPost = await Post.findOne({ prospect: prospectId });

  if (existingPost) {
    Object.assign(existingPost, postData);
    await existingPost.save();
    return existingPost;
  } else {
    const newPost = new Post({ ...postData, prospect: prospectId });
    await newPost.save();
    return newPost;
  }
};