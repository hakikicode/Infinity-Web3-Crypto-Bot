const Twitter = require('twitter-v2');
const twitterClient = new Twitter({
    bearer_token: process.env.TWITTER_BEARER_TOKEN
});

module.exports = twitterClient;
