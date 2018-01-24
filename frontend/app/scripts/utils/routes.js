var routes = function (routeProvider, controllers) {

	var hub = {
		when: function (route, templateUrl, controller, controllerName) {

			routeProvider.when(route, {
				templateUrl: templateUrl,
				controller: controller,
				controllerAs: controllerName
			});

			return hub;
		}
	};

	for(var index in controllers){

		var controller = controllers[index];

		hub.when(controller.rota, controller.html, controller, index.camelize());

	}

	return hub;
};

exports.utils.routes = routes;