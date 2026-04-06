const app = require("./app");
const startWS = require("./websocket/wsServer");

const PORT = process.env.PORT || 10000;


startWS(app);

app.listen(PORT).then(() => {
  console.log("Server running on port", PORT);
});