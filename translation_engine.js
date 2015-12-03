require('dotenv').load();
var CLIENT_ID = process.env.CLIENT_ID;
var CLIENT_SECRET = process.env.CLIENT_SECRET;
var request = require('request');
var Promise = require('promise');

var ACCESS_TOKEN;
var isAccessable = false;
var queue = [];




module.exports = {

  t: function(text) {
    request.get(
      {
        url: 'https://api.datamarket.azure.com/Bing/MicrosoftTranslator/v1/Translate?Text=%27' + encodeURIComponent(text) + '%27&To=%27en%27',
        auth: { bearer: ACCESS_TOKEN }
      }
    ).then(trimMicrosoft);
  },

  requestAPICall: function(fn) {

    console.log("isAccessable  " + isAccessable)
    console.log("token  " + ACCESS_TOKEN)


    if (isAccessable) { fn(); }
    else { queue.push(fn); }

  },

  updateAccess: function () { return updateAccess() }


};

function updateAccess() {
  // console.log("client_id: " + CLIENT_ID)
  getAccessToken(CLIENT_ID, CLIENT_SECRET)
  .then(console.log(JSON))
  .then(JSON.parse)
  .then((res) => {
    trackExpiration(res.expires_in);
    return res;
  })
  .then((res) => res.access_token)
  .then((token) => ACCESS_TOKEN = res.access_token)
  .then(() => isAccessable = true)
  .then(dispatchQueue)
  .catch(console.error.bind(console));

  console.log("isAccessable" + isAccessable)

}

function getAccessToken(client_id, client_secret) {

  return new Promise((resolve, reject) => {
    // console.log(client_id)
    request.post(
      'https://datamarket.accesscontrol.windows.net/v2/OAuth2-13',
      {
        form: {
          scope: 'http://api.microsofttranslator.com',
          grant_type: 'client_credentials',
          client_id, client_secret
        }
      },
      (err, res, body) => err ? reject(err) : resolve(body));
  });
}

function dispatchQueue() {

  queue.forEach((fn) => fn());
  queue = [];
}

function trackExpiration(time) {

  setTimeout(() => {

    isAccessable = false;
    updateAccess();
  }, time * 1000);
}

function trimMicrosoft(codeStr) {

  return codeStr.match(/"(.*)"/)[1];
}

