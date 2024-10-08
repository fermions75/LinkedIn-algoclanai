import axios from 'axios';

const RAPID_API_KEY = '200fbd2ba5msh32fd6c7484eb6dap196058jsn47fc5cb05c17';
const RAPID_API_HOST = 'linkedin-api8.p.rapidapi.com';
const COMPANY_API_KEY = 'e6bd922cedmsh976c3eb90331c44p168e5djsn51a76b0c986f';
const COMPANY_API_HOST = 'linkedin-data-scraper.p.rapidapi.com';

export const fetchLatestPost = async (username, type) => {
  if (type === 'company') {
    return fetchCompanyPost(username);
  } else {
    return fetchProfilePost(username);
  }
};

const fetchProfilePost = async (username) => {
  const options = {
    method: 'GET',
    url: 'https://linkedin-api8.p.rapidapi.com/get-profile-posts',
    params: { username, start: '0' },
    headers: {
      'x-rapidapi-key': RAPID_API_KEY,
      'x-rapidapi-host': RAPID_API_HOST
    }
  };

  const response = await axios.request(options);
  return response.data.data[0];
};

const fetchCompanyPost = async (companyUrl, retries = 3, delay = 1000) => {
  const fullCompanyUrl = companyUrl.startsWith('http') ? companyUrl : `https://www.linkedin.com/company/${companyUrl}`;
  
  const options = {
    method: 'POST',
    url: 'https://linkedin-data-scraper.p.rapidapi.com/company_updates',
    headers: {
      'x-rapidapi-key': COMPANY_API_KEY,
      'x-rapidapi-host': COMPANY_API_HOST,
      'Content-Type': 'application/json'
    },
    data: {
      company_url: fullCompanyUrl,
      posts: 1,
      comments: 0,
      reposts: 10
    }
  };

  try {
    const response = await axios.request(options);
    if (response.data && response.data.response && response.data.response.length > 0) {
      return response.data.response[0];
    } else {
      throw new Error('No posts found for the company');
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 429 && retries > 0) {
        console.log(`Rate limit exceeded. Retrying in ${delay / 1000} seconds...`);
        await setTimeout(delay);
        return fetchCompanyPost(companyUrl, retries - 1, delay * 2);
      } else if (error.response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(`API request failed: ${error.response.data.message || error.message}`);
      }
    } else {
      throw new Error(`Network error: ${error.message}`);
    }
  }
};

export const parsePostData = (latestPost, type) => {
  if (type === 'company') {
    return parseCompanyPostData(latestPost);
  } else {
    return parseProfilePostData(latestPost);
  }
};

const parseProfilePostData = (latestPost) => {
  return {
    text: latestPost.text,
    postUrl: latestPost.postUrl,
    numLikes: latestPost.likeCount,
    numComments: latestPost.commentsCount,
    numReposts: latestPost.repostsCount,
    postedAt: parseLinkedInDate(latestPost.postedAt),
    postedAtString: latestPost.postedAt,
    postedDateTimestamp: latestPost.postedDateTimestamp,
    isReshared: latestPost.reshared || false,
    originalPostUrl: latestPost.reshared ? latestPost.originalPostUrl : latestPost.postUrl,
    totalReactionCount: latestPost.totalReactionCount,
    appreciationCount: latestPost.appreciationCount,
    empathyCount: latestPost.empathyCount,
    interestCount: latestPost.InterestCount,
    praiseCount: latestPost.praiseCount,
    urn: latestPost.urn
  };
};

const parseCompanyPostData = (latestPost) => {
  const socialCount = latestPost.socialCount;
  const reactionCounts = socialCount.reactionTypeCounts.reduce((acc, reaction) => {
    acc[reaction.reactionType.toLowerCase() + 'Count'] = reaction.count;
    return acc;
  }, {});

  return {
    text: latestPost.postText,
    postUrl: latestPost.postLink,
    numLikes: socialCount.numLikes,
    numComments: socialCount.numComments,
    numReposts: socialCount.numShares,
    postedAt: new Date(latestPost.postedAt),
    postedAtString: latestPost.postedAgo,
    postedDateTimestamp: new Date(latestPost.postedAt).getTime(),
    isReshared: latestPost.is_repost,
    originalPostUrl: latestPost.postLink,
    totalReactionCount: socialCount.numLikes,
    ...reactionCounts,
    urn: latestPost.urn
  };
};

function parseLinkedInDate(dateString) {
  if (dateString.endsWith('h') || dateString.endsWith('d')) {
    const value = parseInt(dateString);
    const unit = dateString.slice(-1);
    const multiplier = unit === 'h' ? 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
    return new Date(Date.now() - value * multiplier);
  } else if (dateString.includes(' ')) {
    return new Date(dateString);
  } else {
    return null;
  }
}