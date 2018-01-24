var ListagemLivros = function(livrosService, tooltipUtils, $location) {

	var livros = this;

	setTimeout(function() {
		$('input.search').focus();	
	}, 100);

	tooltipUtils.init();

	livros.livros = livrosService.getAllLivros();

	livros.resetFiltro = function() {
		livros.filtro.nome = '';
		$('#filtroLivros').focus();
	};


	livros.visualizarLivro = function(ISBN) {

		$location.path('livros/visualizacao/' + ISBN);
	};

	livros.adicionarAoCarrinho = function(livro) {

		livrosService.adicionarAoCarrinho(livro);
	};
};

ListagemLivros.menu = app.utils.itensMenu.LIVROS;
ListagemLivros.rota='/livros';
ListagemLivros.html = 'views/livros/listagemLivros.html';
exports.controllers.ListagemLivros = ListagemLivros;