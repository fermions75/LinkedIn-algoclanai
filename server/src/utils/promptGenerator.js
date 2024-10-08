const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

const truncatePost = (postBody, maxLength = 500) => {
  if (postBody.length <= maxLength) return postBody;

  const ellipsis = '...';
  const charsToShow = maxLength - ellipsis.length;
  const frontChars = Math.ceil(charsToShow * 0.6);  // Show more of the beginning
  const backChars = Math.floor(charsToShow * 0.4);  // Show less of the end

  const beginning = postBody.substring(0, frontChars);
  const end = postBody.substring(postBody.length - backChars);

  return `${beginning}${ellipsis}${end}`;
};

export const generatePrompt = (persona, postBody, tone) => {
  // Truncate post body if it's too long
  const truncatedPost = truncatePost(postBody, 500);
  
  // Truncate job role if it's too long (e.g., more than 50 characters)
  const truncatedJob = truncateText(persona.job, 50);

  // Truncate tone if it's too long (e.g., more than 30 characters)
  const truncatedTone = truncateText(tone, 100);

  return `
  Generate a LinkedIn comment based on the following information:

  User Persona:
  - Job Role: ${truncatedJob}
  - Experience: ${persona.experience} years
  - Industry: ${persona.industry}
  - Expertise: ${persona.expertise}
  - Niche: ${persona.niche}

  LinkedIn Post:
  ${truncatedPost}

  Tone: ${truncatedTone}

  Guidelines:
  1. Write a concise comment relevant to the post.
  2. Incorporate knowledge from the user's expertise and experience.
  3. Add value by sharing insights, asking thoughtful questions, or providing a unique perspective.
  4. Maintain the specified tone throughout the comment.
  5. If applicable, address any questions or calls-to-action from the end of the post.
  6. Ensure your comment is engaging and encourages further discussion.

  Generate the comment:
  `;
};