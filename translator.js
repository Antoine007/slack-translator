var request = require('request');

module.exports = function (req, res, next) {
  var text;
  var botPayload = {};
  text = req.body.text;
};

function translate (text) {
  botPayload.text = req.body.user_name + text
}

function send () {
  var path = process.env.INCOMING_WEBHOOK_PATH;
  var uri = 'https://hooks.slack.com/services' + path;

  request({
    uri: uri,
    method: 'POST',
    body: JSON.stringify(payload)
  }, function (error, response, body) {
    if (error) {
      return callback(error);
    }

    callback(null, response.statusCode, body);
  });
}
