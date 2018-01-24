var VisualizacaoLivros = function($routeParams, livrosService) {

	var visualizacaoLivros = this;

	visualizacaoLivros.livroVisualizado = livrosService.getLivro($routeParams.ISBN);

	visualizacaoLivros.adicionarAoCarrinho = function(livro) {

		livrosService.adicionarAoCarrinho(livro);
	};
};

VisualizacaoLivros.menu = app.utils.itensMenu.LIVROS;
VisualizacaoLivros.rota='/livros/visualizacao/:ISBN';
VisualizacaoLivros.html = 'views/livros/visualizacaoLivro.html';
exports.controllers.VisualizacaoLivros = VisualizacaoLivros;