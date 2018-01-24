var ListagemCarrinho = function(livrosService, alertaUtils, tooltipUtils) {

	var listagemCarrinho = this;

	tooltipUtils.init();

	listagemCarrinho.livros = livrosService.getLivrosAdicionadosAoCarrinho();

	listagemCarrinho.finalizarCompra = function() {
		alertaUtils.showMensagem('Funcionalidade em desenvolvimento.', 'danger');
	};

	listagemCarrinho.removerDoCarrinho = function(livro) {

		livrosService.removerDoCarrinho(livro);
		listagemCarrinho.livros = livrosService.getLivrosAdicionadosAoCarrinho();
	};

	listagemCarrinho.getValorTotalCompra = function() {

		var total = 0;
		for (var i = listagemCarrinho.livros.length - 1; i >= 0; i--) {
			total = total + listagemCarrinho.livros[i].valor;
		}
		return total;
	};

};

ListagemCarrinho.menu = app.utils.itensMenu.CARRINHO;
ListagemCarrinho.rota='/carrinho';
ListagemCarrinho.html = 'views/carrinho/listagemCarrinho.html';
exports.controllers.ListagemCarrinho = ListagemCarrinho;