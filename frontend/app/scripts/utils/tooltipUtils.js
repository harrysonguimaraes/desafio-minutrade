var TooltipUtils = function() {

	this.init = function() {

		setTimeout(function() {
  			$('[data-toggle="tooltip"]').tooltip({container: 'body', trigger: 'hover'});
		},1000);
		
		
	};

};

exports.services.TooltipUtils = TooltipUtils;