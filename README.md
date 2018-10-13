# workspace-api-sample

## Install & Running

First, install dependencies:

``` shell
npm install
```

Configure app with environment (See theses lines of `service/app.js`):

``` javascript
// This is the environment url
apiUrl: "https://gapi-use1.genesyscloud.com",
// This is the environment client id
clientId: "b219ac0408a14a33ac4333382fc776c3",
// This is the environment client secret
clientSecret: "es33SiFOzMaaZ6KQ57jQ7L167owt2KOeaJq0BXEEdtlcY6V5",
// This is needed as a header to authorize requests
apiKey: "iB4b9IG8536FQCKiPlyXL9wJYfKbALKT4GZW9VGu",
// Your service port (3000 to 3003)
port: 3000
```

Start the service:

``` shell
npm start
```

You can now visit and enjoy yourself more than you probably should:

[http://localhost:3000](http://localhost:3000)

## What should I do ?

Click on buttons and do stuff.

Check how the code works and make something awesome.

## Usage

### By Workspace librairies

Feel free to check the code to see how the libraries can be used.
Or you can see the documentation here:

[https://developer.genesyscloud.com/reference](https://developer.genesyscloud.com/reference)

Also, the tutorials can be useful:

[https://developer.genesyscloud.com/tutorials](https://developer.genesyscloud.com/tutorials)

### By requests

Just make sure to add these headers to your requests:

``` javascript
var API_KEY = 'iB4b9IG8536FQCKiPlyXL9wJYfKbALKT4GZW9VGu';
var TOKEN = 'Get this when authenticating';
headers: {
  'x-api-key': API_KEY,
  'Authorization': 'Bearer ' + TOKEN
}
```

## Contact

Jérémie Pichon <jeremie.pichon@genesys.com>

Stéphane Hervochon <shervoch@genesys.com>
