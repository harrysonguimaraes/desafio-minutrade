var Cabecalho = function (facebookService, minhaContaService, alertaUtils, $window) {

    var cabecalho = this;

    cabecalho.login = function() {

    	facebookService.getStatus(function(response) {
    		
    		if (response.status === 'connected') {

                alertaUtils.showMensagem('Login realizado com sucesso', 'success');
				
				facebookService.getInfoLoggedUser(function(response) {
                    minhaContaService.setUsuarioLogado(response);
                    $window.location.reload();
				});
			
            } else {
                facebookService.login(function(response) {

                    if (response.status === 'connected') {
                        console.log(response);
                        alertaUtils.showMensagem('Login realizado com sucesso', 'success');
                                             
                        facebookService.getInfoLoggedUser(function(response) {
                            
                            console.log(response);

                            minhaContaService.setUsuarioLogado(response);
                            $window.location.reload();
                        });
                    }

                });
            }

    	});

    };

    cabecalho.logout = function() {

        facebookService.getStatus(function(response) {
            if (response.status === 'connected') {
                    
                facebookService.logout(function() {
                    alertaUtils.showMensagem('Logout realizado com sucesso', 'success');
                    $window.location.reload(); 
                    minhaContaService.removeLoggedUser();
                });
            }

        });
    };

};

exports.controllers.Cabecalho = Cabecalho;