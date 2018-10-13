const express = require('express');
const cors = require('cors');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const url = require('url');
const request = require('request');
const workspace = require('genesys-workspace-client-js');
const authentication = require('genesys-authentication-client-js');
const ProvisioningApi = require('genesys-provisioning-client-js');
const Statistics = require('genesys-statistics-client-js');
const uuid = require('uuid/v4');


const app = express();
app.use(cors());

const server = require('http').Server(app);

const io = require('socket.io')(server);

const storage = {
  apiUrl: "https://gapi-use1.genesyscloud.com",
  clientId: "b219ac0408a14a33ac4333382fc776c3",
  clientSecret: "es33SiFOzMaaZ6KQ57jQ7L167owt2KOeaJq0BXEEdtlcY6V5",
  port: 3002,
  apiKey: "iB4b9IG8536FQCKiPlyXL9wJYfKbALKT4GZW9VGu"
};

const authClient = new authentication.ApiClient();
authClient.basePath = `${storage.apiUrl}/auth/v3`;
authClient.defaultHeaders = {
  'x-api-key': storage.apiKey
};

const provisioningApi = new ProvisioningApi.ProvisioningApi(storage.apiKey, storage.apiUrl, false);
const workspaceApi = new workspace(storage.apiKey, storage.apiUrl);
const statisticsApi = new Statistics(storage.apiKey, storage.apiUrl);

app.use(express.static('webapp', {
  extensions: ['html', 'htm']
}));

require('./routes/session')(app, io, workspaceApi, storage, request, statisticsApi, provisioningApi);

app.use((req, res, next) => {
  if (storage.user) {
    next();
  } else {
    res.status(403).json('Forbidden');
  }
});

require('./routes/targets')(app, workspaceApi);
require('./routes/voice')(app, workspaceApi, storage);
require('./routes/provisioning')(app, request, provisioningApi, storage);
require('./routes/statistics')(app, storage, statisticsApi);
require('./controllers/events')(workspaceApi, io, storage);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

server.listen(storage.port, () => {
  console.info(`Server started on port: ${storage.port}`);
});
