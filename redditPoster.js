require('dotenv').config();
const snoowrap = require('snoowrap');

const reddit = new snoowrap({
  userAgent: 'randomFacts/1.0 by ' + process.env.REDDIT_USERNAME,
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  username: process.env.REDDIT_USERNAME,
  password: process.env.REDDIT_PASSWORD
});

async function postToReddit(title, text) {
  try {
    const post = await reddit.getSubreddit(process.env.REDDIT_SUBREDDIT).submitSelfpost({
      title,
      text
    });
    console.log('Posted to Reddit:', post.url);
    //Post a comment to the post
    const comment = await post.reply('Thanks for reading! 🚀 Let us know your thoughts below.');
    console.log('💬 Comment posted:', comment.id);

    return post.url;
  } catch (error) {
    console.error('❌ Reddit post failed:', error.message);
    return null;
  }
}

module.exports = postToReddit;