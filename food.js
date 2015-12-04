require('dotenv').load();
var SLACK_FOOD_INCOMING_TOKENS = process.env.SLACK_FOOD_INCOMING_TOKENS;
var request = require('request');

module.exports = function (req, res, next) {
  var request = require('request');
  var userName = req.body.user_name;
  var price = req.body.text || 9999;
  var channel = req.body.channel_name || "#random";

  var places = { "a CoffeeLabs Quiche": 7,
                 "a CoffeeLabs Tartine": 5,
                 "a CoffeeLabs Salad": 9,
                 "a Subway": 7,
                 "a Wok Away": 11,
                 "from the Grandbazar": 4.5,
                 "an UrbanWrap": 5.5,
                 "McDonalds": 7,
                 "at Hema": 5.5,
                 "... nah, no eating today, water is enough": 0,
                 "at the 2 Michelin stars on the MAS": 120,
                 "at Le Dome": 80
                };

  var selection = [];


  function text() {

    for (var key in places){
      if (places[key] <= price){
          selection.push(key)
      }
    }
    var result = selection[Math.floor(Math.random() * selection.length)];
    return 'Hi, ' + userName + " my Spidey Sense tells me you should eat " + result
  };

  // var botPayload = {
  //   text : text()
  // };


  // avoid infinite loop
  if (userName !== 'translate-this') {
    var text = text();
    var url = "https://hooks.slack.com/services/"+ SLACK_FOOD_INCOMING_TOKENS;
    var payload = JSON.stringify({
        "channel": channel,
        "username": "lunch",
        "text": text,
        "icon_emoji": ":fries:"
    });

    var options = {
      uri : url,
      form : payload
    };

    request.post(options, function(error, response, body){
      if (!error && response.statusCode == 200) {
        console.log(body.name);
      } else {
        console.log('error: '+ response.statusCode + body);
      }
    });

  } else {
    return res.status(200).end();
  }
}
