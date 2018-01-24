var services = function (module, services) {

	var hub = {
		add: function (nome, service) {
			
			module.service(nome, service);

			return hub;
		}
	};

	for(var index in services){

		var service = services[index];

		hub.add(index.camelize(), service);

	}

	return hub;
};

exports.utils.services = services;