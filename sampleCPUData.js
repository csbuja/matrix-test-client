var request = require('request');
var StatsD = require('node-statsd').StatsD,
      client = new StatsD();
var Q = require('q');
var async = require('async');

var boxObj = {
	id: 0,
	name: 'noname',
	CPU: .9
}

function ecallback(error){}

function makeAndSend()
{
	function makeBoxes(){
		var d = Q.defer();
		var BoxList = [];
		var BoxListSize = 15;

		for(var i = 1; i<=BoxListSize; ++i)
		{
			BoxList[i] = Object.create(boxObj);
				BoxList[i]['id'] = function(j){
					return j;
				}(i);

				BoxList[i]['CPU'] = function(j){
					return j !== 1 ? (Math.random()%(0.24)) : .95 + (Math.random()%(0.03)) ;
				}(i);

				BoxList[i]['name'] = 'SpencersCluster';
			
		}
		d.resolve(BoxList);
		return d.promise;
	}	


	makeBoxes()
	.then(function(BoxList){
		var d = Q.defer();
		async.each(BoxList, 
		function(box, ecallback){
			client.gauge(box.name+'.numBoxes',BoxList.length, null,function(){
    		console.log('incremented a stat')
  			});

			client.gauge(box.name+'.'+box.id+'.CPUload',box.CPU, null, function(){
				console.log('CPU load is: '+ box.CPU);
			});

		}, ecallback);
		d.resolve()
		return d.promise;
	})
	.done();
}

exports.makeAndSend = makeAndSend;


