var ButtonClean = function($scope, $element) {

	$element.on('click', function() {

		$scope.$parent.$broadcast('show-errors-reset');

		$scope.formulario.$setPristine();
		$scope.formulario.$setUntouched();

		angular.forEach($scope.formulario, function(ngModel) {

			if(ngModel && ngModel.hasOwnProperty('$setViewValue')){
				ngModel.$setViewValue('');
				ngModel.$$writeModelToScope('');
				ngModel.$render();
			}

		});

		$scope.callback();
		
		$scope.$apply();
		
	});
};

ButtonClean.config = {templateUrl: 'directives/buttonClean.html', scope: {callback : '&', formulario: '='}, transclude: true, replace: true};
exports.directives.ButtonClean = ButtonClean;