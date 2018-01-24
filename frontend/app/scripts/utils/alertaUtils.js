var AlertaUtils = function($rootScope) {

	var alertaUtils = this;

	var exibirMensagem = function(texto, tipo, showProximaTela) {

		$rootScope.msg = {
			texto: texto,
			tipo: tipo || 'warning',
			show: true,
			showProximaTela: showProximaTela,
			fade : 'in'
		};
	};

	alertaUtils.showMensagem = function(texto, tipo) {

		exibirMensagem(texto, tipo, false);
	};

	alertaUtils.showMensagemNaModal = function(texto, tipo) {

		$rootScope.msgModal = {
			texto: texto,
			tipo: tipo || 'warning',
			show: true,
			fade : 'in'
		};

	};

	alertaUtils.showMensagemNaProximaTela = function(texto, tipo) {

		exibirMensagem(texto, tipo, true);	
	};

	alertaUtils.esconderMensagem = function() {

		$rootScope.msg.show = false;
		$rootScope.msg.fade = 'out';

	};

	alertaUtils.esconderMensagemNaModal = function() {

		$rootScope.msgModal.show = false;
		$rootScope.msgModal.fade = 'out';
		
	};

	$rootScope.$on('$routeChangeSuccess', function() {
		
		if ($rootScope.msg.showProximaTela) {

			$rootScope.msg.showProximaTela = false;
		}
		else {

			alertaUtils.esconderMensagem();
		}
	});

};

exports.services.AlertaUtils = AlertaUtils;