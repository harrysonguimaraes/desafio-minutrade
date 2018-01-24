var LivrosService = function(alertaUtils) {

	var livrosService = this;

	livrosService.livros = [
			{'valor': 10.99, 'ISBN' : '9788539004256', 'filename': 'poderdohabito.png', 'nome': 'O poder do hábito', 'descricao': 'Segundo o autor, a chave para se exercitar regularmente, perder peso, educar os filhos, tornar-se mais produtivo, criar empresas revolucionárias e alcançar o sucesso é entender como os hábitos funcionam. Ele procura mostrar que, ao dominar esta ciência, todos podem transformar suas empresas e suas vidas.'},
			{'valor': 13.99, 'ISBN' : '9788580861280', 'filename': 'stevejobs.png', 'nome': 'Steve Jobs - A biografia', 'descricao' : 'Conheça a história do homem que pôs o futuro nas palmas das suas mãos. A biografia autorizada de Steve Jobs, a única escrita em colaboração com o próprio.'},
			{'valor': 17.99, 'ISBN' : '9788575428917', 'filename': 'outliers.png', 'nome': 'Fora de série - Outliers', 'descricao': 'Baseando-se na história de celebridades como Bill Gates, os Beatles e Mozart, Malcolm Gladwell procura mostrar que ninguém "se faz sozinho". Todos os que se destacam por uma atuação fenomenal são, invariavelmente, pessoas que se beneficiaram de oportunidades incríveis, vantagens ocultas e heranças culturais. Tiveram a chance de aprender, trabalhar duro e interagir com o mundo de uma forma singular. Esses são os indivíduos fora de série - os outliers. Para Gladwell, mais importante do que entender como são essas pessoas é saber qual é sua cultura, a época em que nasceram, quem são seus amigos, sua família e o local de origem de seus antepassados, pois tudo isso pode exercer um impacto no padrão de qualidade das realizações humanas.'},
			{'valor': 6.99, 'ISBN' : '9780136083252', 'filename': 'cleancode.png', 'nome': 'Clean Code', 'descricao' : 'Mesmo um código ruim pode funcionar. Mas se ele não for limpo, pode acabar com uma empresa de desenvolvimento. Perdem-se a cada ano horas incontáveis e recursos importantes devido a um código mal escrito. O especialista em software, Robert C. Martin, apresenta um paradigma com "Código limpo - Habilidades Práticas do Agile Software." O leitor poderá aprender a ler códigos e descobrir o que está correto e errado neles.'},
			{'valor': 10.99, 'ISBN' : '9788555192678', 'filename': 'vuejs.png', 'nome': 'Vue.js - Construa aplicações incríveis', 'descricao': 'O modo como escrevemos código front-end mudou muito ao longo dos últimos anos. Mais do que dar as ferramentas necessárias para desenvolver, os frameworks de componentes reativos para interfaces web modernas vieram nos ajudar com padrões e reaproveitamento de código. Vue.js, ou simplesmente Vue, é uma biblioteca moderna de desenvolvimento front-end, uma lib JavaScript para componentes reativos para web. Ele ganhou muita visibilidade no mercado após ser adotado como padrão pelo Laravel, tendo a possibilidade de ser utilizado em qualquer projeto que possua front-end, independente da linguagem de programação escolhida. Neste livro, você vai aprender a sintaxe do Vue.js 2.0, como funcionam seus componentes e métodos, como integrar com APIs externas e criar rotas, e muito mais! Caio Incau guia o leitor desde a instalação, passando por algumas bibliotecas úteis, até o desenvolvimento de um projeto de exemplo. A ideia é que, após ler este livro, você consiga desenvolver sua primeira aplicação em Vue.js, com um alto padrão de código, saindo com teoria e prática para poder começar a aplicar em seus próprios projetos.'}
	];

	livrosService.getAllLivros = function() {

		return livrosService.livros;
		// return request.get('papeis');
		// TODO Buscar do backend a lista de livros disponíveis para venda
	};

	livrosService.getLivro = function(ISBN) {

		var livro = livrosService.livros.filter(function(livro) {
			return livro.ISBN === ISBN;
		});
		return livro[0];
	};

	// Quebrando o array para simular Mais vendidos e Lançamentos. Com um item a mais 
	// na quebra para ter um mesmo livro entre os mais vendidos e também em lançamentos.
	livrosService.getMaisVendidos = function() {

		var livros = livrosService.livros;
		
		var livrosMaisVendidos = livros.filter(function(elem, index, array) {
			return (array.length / 2) + 1 > index;
		});

		return livrosMaisVendidos;
	};

	livrosService.getLancamentos = function() {

		var livros = livrosService.livros;
		
		var lancamentos = livros.filter(function(elem, index, array) {
			return (array.length / 2) < index;
		});

		return lancamentos;
	};

	livrosService.getLivrosAdicionadosAoCarrinho = function() {

		var livrosJaAdicionados = JSON.parse(localStorage.getItem('carrinho')) || [];
		return livrosJaAdicionados;
	};

	livrosService.adicionarAoCarrinho = function(livro) {

		alertaUtils.showMensagem('Livro adicionado ao seu carrinho.', 'success');
		var livrosJaAdicionados = JSON.parse(localStorage.getItem('carrinho')) || [];
		
		var deveAdicionar = true;
		for (var i = livrosJaAdicionados.length - 1; i >= 0; i--) {
			//Se o livro já existe, não adiciona novamente. 
			//A Livraria ainda não trata mais de uma compra de livro igual por vez.
			if (livrosJaAdicionados[i].ISBN === livro.ISBN) {
				deveAdicionar = false;
			}
		}

		if (deveAdicionar) {
			livrosJaAdicionados.push(livro);
			localStorage.setItem('carrinho', JSON.stringify(livrosJaAdicionados));
		}
	};

	livrosService.removerDoCarrinho = function(livro) {

		var livrosJaAdicionados = JSON.parse(localStorage.getItem('carrinho')) || [];

			for (var i = livrosJaAdicionados.length - 1; i >= 0; i--) {
				if (livrosJaAdicionados[i].ISBN === livro.ISBN) {
					alertaUtils.showMensagem('Livro removido do seu carrinho.', 'success');
					livrosJaAdicionados.splice(i, 1);
				}
			}
			localStorage.setItem('carrinho', JSON.stringify(livrosJaAdicionados));
	};

};


exports.services.LivrosService = LivrosService;