require('dotenv').config();
const cron = require('node-cron');
const fetchMessage = require('./messageFetcher');
const postToReddit = require('./redditPoster');

function schedulePost() {
  // Schedule a post time
  cron.schedule('* * * * *', async () => {
    console.log('⏰ Scheduled Reddit post started (every hour)...');
    const message = await fetchMessage();
    if (message) {
      await postToReddit(message,'we\nhave\nthe\nanswer\ndown\nhere\nShare with your reddit');
    }
  });
}

module.exports = schedulePost;