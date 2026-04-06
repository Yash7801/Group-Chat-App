const HyperExpress = require('hyper-express');
const cors = require('cors');

const app = new HyperExpress.Server();

app.use(cors());

require('./routes/chatRoutes')(app);

app.get('/', (req, res) => {
  res.send('API running successfully');
});

module.exports = app;