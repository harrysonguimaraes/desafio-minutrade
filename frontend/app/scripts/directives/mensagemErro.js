var MensagemErro = function($scope){

	// Pega a quantidade mínima de caracteres que deve ser usada no campo para ser exibido na mensagem de erro.
	var elementosEntradaDados = $('form[name=' + $scope.campo.$$parentForm.$name + ']').find('input[name='+$scope.campo.$name+'], textarea[name='+$scope.campo.$name+']');

	$scope.minLengthSize = elementosEntradaDados.attr('minLength') || elementosEntradaDados.attr('minlength');
	$scope.maxDate = elementosEntradaDados.attr('max-date') === 'max-date' ? undefined : elementosEntradaDados.attr('max-date');
	$scope.minDate = elementosEntradaDados.attr('min-date') === 'min-date' ? undefined : elementosEntradaDados.attr('min-date');

	$scope.$parent.$on('show-errors-reset', function() {

		$scope.campo.$pristine = true;

		$scope.campo.$touched = false;

		$scope.campo.$$parentForm.$submitted = false;

	});

};

MensagemErro.config = {templateUrl: 'directives/errorMessages.html', scope: {campo: '=', required: '@'}};

exports.directives.MensagemErro = MensagemErro;