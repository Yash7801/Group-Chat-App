const startHTTP = require('./app');
const startWS = require('./websocket/wsServer');

startHTTP();
startWS();