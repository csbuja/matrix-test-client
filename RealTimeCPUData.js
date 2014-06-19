var sender = require('./sampleCPUData.js');
var opt = require('getopt');
var seconds=2;

try {
    // set options, 2nd argument is optional, if not set it will fetch process.argv
    opt.setopt("ht:");
} catch (e) {
    // exceptions are thrown when an invalid option
    // is set or a required parameter is not set
    console.dir(e);
}

opt.getopt(function (o, p) {
    switch (o) {
        case "h":
        	console.log('-h for help');
        	console.log ('-t followed by an argument time in seconds')
        	process.exit(0)
        	break;
        case 't':
        	if(p<= 0)
        	{
        		console.log('give a t bigger than 0');
        		process.exit(1);
        	}
        	else
        		seconds = (p*1000);

        	break;
    }
});

console.log(seconds);
setInterval(sender.makeAndSend, seconds);
