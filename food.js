module.exports = function (req, res, next) {
  var userName = req.body.user_name;
  var price = req.body.price || 9999;

  var places = { "a CoffeeLabs Quiche": 7,
                 "a CoffeeLabs Tartine": 5,
                 "a CoffeeLabs Salad": 9,
                 "a Subway": 7,
                 "from the Grandbazar": 4.5,
                 "an UrbanWrap": 5.5,
                 "McDonalds": 7,
                 "at Hema": 5.5,
                 "... nah, no eating today, water is enough": 0,
                 "at the 2 Michelin stars on the MAS": 120,
                 "Le Dome", 80
                };

  var selection = [];


  function text() {

    for (var key in places){
      if (places[key] <= price){
          selection.push(key)
      }
    }
    var result = selection[Math.floor(Math.random() * selection.length)];
    return 'Hi, ' + userName + " my spidey sense tells me you should eat " + result
  };

  var botPayload = {
    text : text()
  };


  // avoid infinite loop
  if (userName !== 'translate-this') {
    return res.status(200).json(botPayload);
  } else {
    return res.status(200).end();
  }
}
