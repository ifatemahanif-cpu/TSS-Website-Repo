const handler = require('../dist/serverless.cjs');
module.exports = handler.default || handler;
