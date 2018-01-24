var directives = function (module, directives) {

	var hub = {
		add: function (nome, controller, config) {
			
			module.directive(nome, function () {
				return angular.extend({
					restrict: 'AE'
				}, config || {}, {
					controller: controller,
					controllerAs: nome
				});
			});

			return hub;
		}
	};

	for(var index in directives){

		var directive = directives[index];

		hub.add(index.camelize(), directive, directive.config);

	}

	return hub;
};

exports.utils.directives = directives;