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
    const parsedBody = JSON.parse(body);
    logger.info(req.method, req.url, parsedBody);
    handler.handle(req, parsedBody, res);
  });
}).listen(3000);

