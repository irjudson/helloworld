var Store = require('nitrogen-leveldb-store'),
	nitrogen = require('nitrogen');

var config = {
    host: process.env.HOST_NAME || 'localhost',
    http_port: process.env.PORT || 3030,
    protocol: process.env.PROTOCOL || 'http',
    api_key: process.env.API_KEY
};

config.store = new Store(config);

var service = new nitrogen.Service(config);

var helloWorld = new nitrogen.Device({
	nickname: 'helloWorld',
	tags: ['sends:ping'],
	api_key: config.api_key
});

service.connect(helloWorld, function(err, session, helloWorld) {
	if (err) return console.log('failed to connect helloWorld: ' + err);

	var self = this;

	setInterval(function () {
		var message = new nitrogen.Message({
			type: '_ping',
			body: {
				command: {
					message: "I'm alive. My ID is: " + helloWorld.id
				}
			}
		});
		message.send(session);
	}, 2000);
});
