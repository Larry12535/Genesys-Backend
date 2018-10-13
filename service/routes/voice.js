module.exports = function (app, workspaceApi) {

  // Toggle agent state
  app.get('/voice/state', async (req, res) => {
    try {
      const query = req.query.state;
      var response = null;
      if (query !== 'Ready') {
        response = await workspaceApi.voice.ready();
      } else {
        response = await workspaceApi.voice.notReady('AfterCallWork');
      }
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  });

  // Answer call by id
  app.get('/voice/call/Answer', async (req, res) => {
    try {
      const callId = req.query.id;
      var response = await workspaceApi.voice.answerCall(callId);
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  });

  // Hold call by id
  app.get('/voice/call/Hold', async (req, res) => {
    try {
      const callId = req.query.id;
      var response = await workspaceApi.voice.holdCall(callId);
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  });

  // Release call by id
  app.get('/voice/call/Release', async (req, res) => {
    try {
      const callId = req.query.id;
      var response = await workspaceApi.voice.releaseCall(callId);
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  });

  // Retrieve call by id
  app.get('/voice/call/Retrieve', async (req, res) => {
    try {
      const callId = req.query.id;
      var response = await workspaceApi.voice.retrieveCall(callId);
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  });

}
