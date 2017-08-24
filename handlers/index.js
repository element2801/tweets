const RequestHandler = require('./handler');
const getTweets = require('./tweets');

const handler = new RequestHandler();

handler.get('/', (req, body, res, callback) => {
  res.write('Hello! Send post query to /api/generate-pdf!');
  callback();
});


handler.post('/api/generate-pdf', (req, body, res, callback) => {
  const promises = body.words.map(word => new Promise((resolve, reject) => {
    getTweets(word, 3, (error, tweets) => {
      if (!error) {
        resolve({
          word,
          tweets,
        });
      } else {
        resolve({
          word,
          tweets: [],
        });
      }
    });
  }));

  Promise.all(promises).then((tweets) => {
    res.writeHead(200, 'Content-Type', 'application/json');
    res.write(JSON.stringify(tweets));
    callback();
  });
});


module.exports = handler;
