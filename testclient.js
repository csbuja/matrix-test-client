var request = require('request');

var postMe1 = {
        drink: 'coke',
        drinker: 'fatguy'
    }
console.log(postMe1.drink);
var postMe2 = postMe1;
postMe2.drink = 'pepsi';

var cokebody = JSON.stringify(postMe1);
var pepbody = JSON.stringify(postMe2);

//two different options
var options1 = {
    url: 'http://lalala1.devstack.sfdc-matrix.net:3000/streams/drinkstream/event?by=drink',
    body: cokebody,
    headers: {'Content-type': 'application/json'}
};

options2 = options1; options2.body = pepbody;


function callback(error, response, body) {
    if (error) {
        console.log('you got an error');
    }
    console.log(response.statusCode);
}


for(i=0;i<10; ++ i)
{
  if(i%2==0) request.post(options1, callback);
  else request.post(options2, callback);
}