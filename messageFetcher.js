require('dotenv').config();
const axios = require('axios');

async function fetchMessage() {
  try {
    const response = await axios.get(process.env.MESSAGE_API);
    return {
        riddle: response.data.riddle || 'Default fallback riddle',
        answer: response.data.answer || 'Default fallback answer'
      };
  } catch (error) {
    console.error('Failed to fetch message:', error.message);
    return null;
  }
}

module.exports = fetchMessage;
