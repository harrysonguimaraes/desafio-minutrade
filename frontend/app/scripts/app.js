var livraria = angular.module('livraria', [
	'ngRoute',
	'ngMessages',
	'ui.bootstrap.showErrors',
	'ui.utils.masks']);

var utils = app.utils;

livraria.config(function ($routeProvider, $locationProvider) {

	$locationProvider.hashPrefix('');

	$routeProvider.otherwise({redirectTo : '/404'});

	utils.routes($routeProvider, app.controllers);

});


livraria.run(function($rootScope, minhaContaService) {

	$rootScope.itensMenu = app.utils.itensMenu; 

	$rootScope.msg = {
		show: false
	};

	$rootScope.$on('$routeChangeSuccess', function(event, current) {
		
		$rootScope.menu = current.$$route && current.$$route.controller ? current.$$route.controller.menu : '';
		$rootScope.usuarioLogado = minhaContaService.getUsuarioLogado(); 
	});

});

//services
utils.services(livraria, app.services);

//directives
utils.directives(livraria, app.directives);