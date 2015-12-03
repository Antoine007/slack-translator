var request = require('request');
var translationEngine = require('./translation_engine');

module.exports = function (req, res, next) {

  var botPayload = {};

  var text;
  var channel_name = req.body.channel_name;
  var user_name    = req.body.user_name;

  text = req.body.text;

  botPayload.text      = translate(text);
  botPayload.user_name = user_name;
  botPayload.channel_name = channel_name;

  if (channel_name !== 'translate-this') {
    return res.status(200).send(botPayload);
  } else {
    return res.status(200).end();
  }

};

function translate (text) {

  translationEngine.updateAccess();
  translationEngine.requestAPICall(() => {
    return translationEngine.t(text); + " _is what you meant!_ :uk: please! Thanks!"
  })
}

function send (payload) {
  var path = process.env.INCOMING_WEBHOOK_PATH;
  var uri = 'https://hooks.slack.com/services/' + path;

  request({
    uri: uri,
    method: 'POST',
    body: JSON.stringify(payload)
  });
}
