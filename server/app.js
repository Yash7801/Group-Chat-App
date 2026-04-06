const HyperExpress = require('hyper-express');
const cors = require('cors');

module.exports = async function startHTTP() {
  const app = new HyperExpress.Server();

  app.use(cors());

  require('./routes/chatRoutes')(app);

  app.get('/', (req, res) => {
    res.send('API running 🚀');
  });

  await app.listen(3000);
  console.log('HTTP server running on 3000');
};