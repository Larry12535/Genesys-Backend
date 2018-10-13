module.exports = function (app, io, workspaceApi, storage, request, statisticsApi, provisioningApi) {

  function loginWithLoginPage(req,res) {
    storage.redirectUri = `${req.protocol}://${req.hostname}:${storage.port}/initialize`;
    const authLoginPage = `${storage.apiUrl}/auth/v3/oauth/authorize?response_type=code&client_id=${storage.clientId}&redirect_uri=${storage.redirectUri}`;
    res.redirect(authLoginPage);
  };

  function loginWithoutLoginPage(req,res) {
    let encodedCredentials = new Buffer(`${storage.clientId}:${storage.clientSecret}`).toString('base64');
    // Your agent username
    let username = 'StephaneHervochon@genesys.com';
    // Your agent password
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
    storage.token = body.access_token;
    workspaceApi.initialize({token: storage.token}).then(() => {
        workspaceApi.activateChannels(workspaceApi.user.employeeId, null, workspaceApi.user.defaultPlace).then(() => {
          storage.user = workspaceApi.user;
          statisticsApi.initialize(storage.token).then( () => {
            provisioningApi.initialize({token: storage.token}).then( () => {
              res.redirect('/authenticated');
            });
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
  
  // Initializing Workspace API
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

  // Logging in (redirect to auth page)
  app.get('/login', (req, res) => {
    //To log in with a login page
    loginWithLoginPage(req,res);
    //To log in without a login page (userName & password available in the request to get auth token)
    //loginWithoutLoginPage(req,res);
  });

  // Logout and redirect to home
  app.get('/logout', (req, res) => {
    workspaceApi.destroy();
    storage.user = null;
    res.redirect('/');
  });

}
