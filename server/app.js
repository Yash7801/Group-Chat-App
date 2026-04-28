const HyperExpress = require('hyper-express');
const cors = require('cors');

const app = new HyperExpress.Server();

app.use(cors({
  origin:'https://group-chat-app-seven.vercel.app/',
  origin:'http://localhost:5173',
}));

require('./routes/chatRoutes')(app);

app.get('/', (req, res) => {
  res.send('API running successfully');
});

module.exports = app;