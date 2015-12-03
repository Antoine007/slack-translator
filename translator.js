var request = require('request');

module.exports = function (req, res, next) {
  var text;
  var botPayload = {};
  var user_name = req.body.user_name;
  text = req.body.text;
  botPayload.text = translate(text);
  // botPayload.text = req.body.text;
  botPayload.user_name = user_name;
  // botPayload.channel = req.body.channel_id;


  if (user_name !== 'translate-this') {
    return res.status(200).send(botPayload);
  } else {
    return res.status(200).end();
  }



  // send(botPayload) {
  //   if (error) {
  //     return next(error);
  //   } else if (status !== 200) {
  //     // inform user that our Incoming WebHook failed
  //     return next(new Error('Incoming WebHook: ' + status + ' ' + body));
  //   } else {
  //     return res.status(200).end();
  //   }
  // });


};

function translate (text) {
  return text + "_is what you meant!_ :flag-uk: please! Thanks!"
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
