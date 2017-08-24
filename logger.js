const winston = require('winston');

const getLabel = (callingModule) => {
  const parts = callingModule.filename.split('/');
  return `${parts[parts.length - 2]}/${parts.pop()}`;
};

module.exports = callingModule => new winston.Logger({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ label: getLabel(callingModule), filename: './tweets.log' }),
  ],
});
