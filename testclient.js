var request = require('request');

var postMe1 = {
        'drink': 'coke',
        'drinker': 'fatguy'
    }
var postMe2 = new postMe1();
postMe2.drink = 'pepsi'

var cokebody = JSON.stringify(postMe);
var pepbody = JSON.stringify(postMe);

//two different options
var options1 = {
    url: 'http://jayryoo1.devstack.sfdc-matrix.net:3000/streams/hr/event?by=name',
    body: cokebody
};

var options2 = {
    url: 'http://jayryoo1.devstack.sfdc-matrix.net:3000/streams/hr/event?by=name',
    body: pepbody
};


function callback(error, response, body) {
    if (!error) {
        console.log('congrats you didnt get an error braj');
    }
    console.log('y\'get this text whether you error or not');
}

for( int i = 0; i<10; ++ i)
{
  request.post(options, callback);
}