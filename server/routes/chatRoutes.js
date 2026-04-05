module.exports = (app) => {

  app.get('/api/messages/:roomId', async (req, res) => {
    const { roomId } = req.params;

    res.json({
      success: true,
      roomId,
      message: "Fetch messages here"
    });
  });

};