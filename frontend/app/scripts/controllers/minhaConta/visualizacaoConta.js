var VisualizacaoConta = function(minhaContaService) {

	var visualizacaoConta = this;

	visualizacaoConta.dadosUsuario = minhaContaService.getUsuarioLogado();
};

VisualizacaoConta.menu = app.utils.itensMenu.MINHA_CONTA;
VisualizacaoConta.rota='/minhaConta';
VisualizacaoConta.html = 'views/minhaConta/visualizacaoConta.html';
exports.controllers.VisualizacaoConta = VisualizacaoConta;