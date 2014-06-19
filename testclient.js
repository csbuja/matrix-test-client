var request = require('request');
var StatsD = require('node-statsd').StatsD,
      client = new StatsD();

////////////////////////////////////////////////////////////////////////////////
for(i=0;i<10; ++ i)
{
  //make a metric to keep track of -- here we are doing 

  //Parameters (specified as an options hash):

  //host: The host to send stats to default: localhost
  //port: The port to send stats to default: 8125
  //more options to be posted later

  //All StatsD methods have the same API:
  //name: Stat name required
  //value: Stat value required except in increment/decrement where it defaults to 1/-1 respectively
  //sampleRate: Sends only a sample of data to StatsD default: 1
  //callback: The callback to execute once the metric has been sent

  //here is the current naming convention: 
  //[Environment(may not be needed except for development)].[product name/Cluster].[module-(streamsAPI/Keymaker/etc)]
  //.[component/topology/process].[bolt name].[metric (timer, increment/counter, gauge]

  client.increment('show.me.to.Jeff',null, null,function(){
    console.log('incremented a stat')
  });
}



var postMe1 = {
        drink : 'coke',
        drinker : 'Southern Gentleman',
        status : 'admin'
    }
var postMe2 = {
        drink : 'coke',
        drinker : 'Southern Gentleman',
        status : 'admin'
    }
postMe2.drink = 'pepsi';

var cokebody = JSON.stringify(postMe1);
var pepbody = JSON.stringify(postMe2);

//two different options
var options1 = {
    url: 'http://lalala1.devstack.sfdc-matrix.net:3000/streams/drinkstream/event?by=drink',
    body: cokebody,
    headers: {'Content-type': 'application/json'}
};

options2 = {
    url: 'http://lalala1.devstack.sfdc-matrix.net:3000/streams/drinkstream/event?by=drink',
    body: pepbody,
    headers: {'Content-type': 'application/json'}
};


function callback(error, response, body) {
    if (error) {
        console.log('you got an error');
    }
    console.log(response.statusCode);
}
