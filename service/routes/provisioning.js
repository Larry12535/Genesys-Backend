module.exports = function (app, request, provisioningApi, storage) {

    app.get('/provisioning/get-users', async (req, res) => {
      provisioningApi.users.getUsers().then( (data) => {
        res.send(data);
      })
      .catch((error) => {
        console.log(error);
        res.send('Couldn\'t get users.');
      });
    });
  }
  