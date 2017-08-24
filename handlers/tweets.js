const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});


function getTweets(keyWord, count, callback) {
  client.get('search/tweets', { q: keyWord, count }, (error, tweets) => {
    if (error) {
      callback(error);
    } else {
      const links = [];
      tweets.statuses.forEach((item) => {
        const link = `https://twitter.com/statuses/${item.id_str}`;
        links.push(link);
      });
      callback(error, links);
    }
  });
}

module.exports = getTweets;

