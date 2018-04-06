var livraria = angular.module('livraria', [
	'ngRoute']);

var utils = app.utils;

livraria.config(function ($routeProvider, $locationProvider) {

	$locationProvider.hashPrefix('');

	$routeProvider.otherwise({redirectTo : '/404'});

	utils.routes($routeProvider, app.controllers);

});


livraria.run(function($rootScope, minhaContaService, facebookService) {

	facebookService.init();

	$rootScope.itensMenu = app.utils.itensMenu; 

	$rootScope.msg = {
		show: false
	};

	var teste =function(teste='2') {
		console.log(teste);
		let anotherTeste = 2;
		console.log(anotherTeste);
	};
	teste();

	$rootScope.$on('$routeChangeSuccess', function(event, current) {
		
		$rootScope.menu = current.$$route && current.$$route.controller ? current.$$route.controller.menu : '';
		$rootScope.usuarioLogado = minhaContaService.getUsuarioLogado(); 
	});

});

livraria.controller('cabecalho', app.controllers.Cabecalho);

//services
utils.services(livraria, app.services);