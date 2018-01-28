var VisualizacaoLivros = function($routeParams, livrosService, alertaUtils, $location) {

	var visualizacaoLivros = this;

	visualizacaoLivros.livroVisualizado = livrosService.getLivro($routeParams.ISBN);

	visualizacaoLivros.adicionarAoCarrinho = function(livro) {

		livrosService.adicionarAoCarrinho(livro);
	};

	visualizacaoLivros.compartilhar = function() {

		FB.ui({
		  method: 'share',
		  href: $location.absUrl(),
		
		}, function(response){
			
			if (response && !response.error_message) {
	
				alertaUtils.showMensagem('Post compartilhado com sucesso', 'success');
			}
		});
	};
};

VisualizacaoLivros.menu = app.utils.itensMenu.LIVROS;
VisualizacaoLivros.rota='/livros/visualizacao/:ISBN';
VisualizacaoLivros.html = 'views/livros/visualizacaoLivro.html';
exports.controllers.VisualizacaoLivros = VisualizacaoLivros;