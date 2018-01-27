var Cabecalho = function (facebookService, minhaContaService, alertaUtils) {

    var cabecalho = this;

    cabecalho.login = function() {

    	facebookService.getStatus(function(response) {
    		
    		console.log(response);
    		if (response.status === 'connected') {

                alertaUtils.showMensagem('Login realizado com sucesso', 'success');
					
				facebookService.getInfoLoggedUser(function(response) {
	    			console.log(response);
                    minhaContaService.setUsuarioLogado(response);
				});
			} else {
                facebookService.login();
            }

    	});

    };

    cabecalho.logout = function() {

        facebookService.getStatus(function(response) {
            
            if (response.status === 'connected') {
                    
                facebookService.logout(function() {
                    alertaUtils.showMensagem('Logout realizado com sucesso', 'success');
                    minhaContaService.removeLoggedUser();
                });
            }

        });
    };

};

exports.controllers.Cabecalho = Cabecalho;