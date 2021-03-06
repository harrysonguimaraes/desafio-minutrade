var Inicial = function(livrosService, tooltipUtils, $location) {

	var inicial = this;

	setTimeout(function() {
		$('input.search').focus();	
	}, 100);

	tooltipUtils.init();

	inicial.maisVendidos = livrosService.getMaisVendidos();
	inicial.lancamentos  = livrosService.getLancamentos();
	
	inicial.resetFiltro = function() {
		inicial.filtro.nome = '';
		$('#filtroLivros').focus();
	};


	inicial.visualizarLivro = function(ISBN) {

		$location.path('livros/visualizacao/' + ISBN);
	};

	inicial.adicionarAoCarrinho = function(livro) {

		livrosService.adicionarAoCarrinho(livro);

	};

};

Inicial.menu = app.utils.itensMenu.INICIO;
Inicial.rota='/';
Inicial.html = 'views/inicial.html';
exports.controllers.Inicial = Inicial;