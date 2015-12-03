require('dotenv').load();
var SLACK_FOOD_INCOMING_TOKENS = process.env.SLACK_FOOD_INCOMING_TOKENS;
var request = require('request');

module.exports = function (req, res, next) {
  var userName = req.body.user_name;
  var price = req.body.text || 9999;

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

  function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
         }
    }

    document.body.appendChild(form);
    form.submit();
  }

  var botPayload = {
    text : text()
  };


  // avoid infinite loop
  if (userName !== 'translate-this') {
    // var text_here = text()
    var text = text();
    // console.log(text)
    res.status(200).json(
      "https://hooks.slack.com/services/"+ SLACK_FOOD_INCOMING_TOKENS ,
      {
        payload: {
        "channel":"#random",
        "username":"lunch",
        "text": text,
        "icon_emoji": ":fries:"
        }
      });
    post(uri, botPayload);
  } else {
    return res.status(200).end();
  }
}
