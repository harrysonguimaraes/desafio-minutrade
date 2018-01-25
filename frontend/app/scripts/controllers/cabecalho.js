var Cabecalho = function (facebookService) {

    var cabecalho = this;

    cabecalho.login = function() {

    	facebookService.login(function(response) {
    		
    		console.log(response);
    		if (response.status === 'connected') {
					
				facebookService.getInfoLoggedUser(function(response) {
	    			console.log(response);
				});
			}

    	});

    };

    cabecalho.getDadosusuarioLogado = function() {

    	facebookService.getInfoLoggedUser(function(response) {
	    	console.log(response);
		});
    };

};

exports.controllers.Cabecalho = Cabecalho;