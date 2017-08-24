const logger = require('../logger')(module);

function RequestHandler() {
  this.handlers = {
    GET: {},
    POST: {},
  };

  this.get = (url, handler) => {
    this.handlers.GET[url] = handler;
  };

  this.post = (url, handler) => {
    this.handlers.POST[url] = handler;
  };

  this.handle = (req, body, res) => {
    try {
      const handler = this.handlers[req.method][req.url];
      if (handler) {
        handler(req, body, res, () => {
          res.end();
        });
      } else {
        res.statusCode = 404;
        res.end();
      }
    } catch (err) {
      logger.error(err);
      res.statusCode = 500;
      res.end();
    }
  };
}


module.exports = RequestHandler;
