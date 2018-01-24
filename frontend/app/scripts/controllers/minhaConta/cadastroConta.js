var CadastroConta = function(minhaContaService, $routeParams, $location, alertaUtils) {

	var cadastroConta = this;

	if ($routeParams.isEdicao) {

		cadastroConta.dadosUsuario = minhaContaService.getUsuarioLogado();

		if (cadastroConta.dadosUsuario) {

			cadastroConta.isEdicao = true;
		}
	}

	cadastroConta.salvarUsuario = function() {

		minhaContaService.setUsuarioLogado(cadastroConta.dadosUsuario);
		$location.path('/');
		if ($routeParams.isEdicao) {
			alertaUtils.showMensagemNaProximaTela('Usuário alterado com sucesso!', 'success');
		} else {
			alertaUtils.showMensagemNaProximaTela('Usuário salvo com sucesso!', 'success');
		}
	};
};

CadastroConta.menu = app.utils.itensMenu.MINHA_CONTA;
CadastroConta.rota='/minhaConta/cadastro/:isEdicao?';
CadastroConta.html = 'views/minhaConta/cadastroConta.html';
exports.controllers.CadastroConta = CadastroConta;