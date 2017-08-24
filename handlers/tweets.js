const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: '',
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

