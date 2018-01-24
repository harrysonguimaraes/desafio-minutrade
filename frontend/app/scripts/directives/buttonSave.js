var ButtonSave = function($scope, $element, alertaUtils) {
	
	var showMsg = $scope.showMsg === 'false' ? false : true;

	$element.on('click',function() {

		$scope.validate();

		$scope.$parent.$broadcast('show-errors-check-validity');

		if ($scope.formulario.$valid) {

			$scope.callback($scope.formulario);
		
		} else {

			if (!showMsg) {
				return;
			}

			if ($scope.modal) {

				alertaUtils.showMensagemNaModal('Preencha os campos marcados em vermelho!', 'danger');
			
			} else {

				// Caso tenha algum erro de validação de formulário, 
				//sobe a tela para o primeiro campo com erro, com uma margem de 30 pra não ficar exatamente em cima.
				$('html, body').animate({
					scrollTop: $('.has-error').length > 0 ? ($('.has-error')[0].getBoundingClientRect().top - document.body.getBoundingClientRect().top) - 30 : 0
				}, 1000);
				alertaUtils.showMensagem('Preencha os campos marcados em vermelho!', 'danger');
			}

		}

		
	});
};

ButtonSave.config = {templateUrl: 'directives/buttonSave.html', scope: {callback : '&', formulario: '=', modal: '=', validate: '&', showMsg: '@'}, transclude: true, replace: true};
exports.directives.ButtonSave = ButtonSave;