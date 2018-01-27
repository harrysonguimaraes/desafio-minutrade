var MinhaContaService = function($location, $rootScope) {

	var minhaContaService = this;

	minhaContaService.getUsuarioLogado = function() {

		var usuarioLogado = JSON.parse(localStorage.getItem('dadosUsuario'));
		return usuarioLogado;
	};

	minhaContaService.setUsuarioLogado = function(usuario) {

		localStorage.setItem('dadosUsuario', JSON.stringify(usuario));
		$rootScope.dadosUsuario = usuario;
	};

	minhaContaService.removeLoggedUser = function() {
		localStorage.removeItem('dadosUsuario');
	};
	
};


exports.services.MinhaContaService = MinhaContaService;