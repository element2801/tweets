const http = require('http');
const handler = require('./handlers');
const logger = require('./logger')(module);

http.createServer((req, res) => {
  let body = [];
  req.on('error', (err) => {
    logger.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    if (body) {
      const parsedBody = JSON.parse(body);
      logger.info(req.method, req.url, parsedBody);
      handler.handle(req, parsedBody, res);
    } else {
      logger.info(req.method, req.url);
      handler.handle(req, body, res);
    }
  });
}).listen(process.env.PORT || 3000);

