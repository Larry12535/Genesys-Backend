module.exports = function (app, io, workspaceApi, storage, request, statisticsApi, provisioningApi) {

  function loginWithoutLoginPage(req,res) {
    console.log('AUTHENTICATION COMPLETE')
    let encodedCredentials = new Buffer(`${storage.clientId}:${storage.clientSecret}`).toString('base64');
    let username = 'StephaneHervochon@genesys.com';
    let password = 'Genesys2!';
    request.post(`${storage.apiUrl}/auth/v3/oauth/token`, {
      headers: {
        'x-api-key': storage.apiKey,
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${encodedCredentials}`
        },
      form: {
        client_id: storage.clientId,
        grant_type: 'password',
        scope:'*',
        username: `Hackathon\\${username}`,
        password: password
      },
      json: true
    }, function (err, res2, body) {
      initializeWorkspace(body, res);  
    });
  };

  function initializeWorkspace(body, res) {
    console.log('INITIALIZATION COMPLETE')
    storage.token = body.access_token;
    workspaceApi.initialize({token: storage.token}).then(() => {
        workspaceApi.activateChannels(workspaceApi.user.employeeId, null, workspaceApi.user.defaultPlace).then(() => {
          storage.user = workspaceApi.user;
          statisticsApi.initialize(storage.token).then(() => {
            provisioningApi.initialize({token: storage.token})
          });
        })
        .catch(err => {
          throw new Error(err);
        });
      }).catch(err => {
        console.error(err);
        res.redirect('/');
      });
  };

  app.get('/current-session', (req, res) => {
    if (storage.user) {
      res.send({user: storage.user});
    } else {
      res.status(403).json('Forbidden');
    }
  });
  
  app.get('/initialize', (req, res) => {
    let encodedCredentials = new Buffer(`${storage.clientId}:${storage.clientSecret}`).toString('base64');
    request.post(`${storage.apiUrl}/auth/v3/oauth/token`, {
      form: {
        grant_type: 'authorization_code',
        redirect_uri: storage.redirectUri,
        code: req.query.code
      },
      headers: {
        'x-api-key': storage.apiKey,
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${encodedCredentials}`
      },
      json: true
    }, function (err, res2, body) {
      initializeWorkspace(body, res);
     });
  });

  app.get('/login', (req, res) => {
    loginWithoutLoginPage(req,res);
  });

  app.get('/logout', (req, res) => {
    workspaceApi.destroy();
    storage.user = null;
    res.redirect('/');
  });

}
