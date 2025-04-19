require('dotenv').config();
const express = require('express');
const postToReddit = require('./redditPoster');
const fetchMessage = require('./messageFetcher');
const schedulePost = require('./scheduler');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/auto-post-now', async (req, res) => {
  const message = await fetchMessage();
  if (!message) return res.status(500).send('Failed to fetch message.');

  const redditResult = await postToReddit(message.riddle, 'we\nhave\nthe\nanswer\ndown\nhere\nShare with your reddit');

  if (redditResult) {
    res.send(`✅ Posted to Reddit: ${redditResult}`);
  } else {
    res.status(500).send('❌ Failed to post to Reddit.');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  schedulePost();
});
