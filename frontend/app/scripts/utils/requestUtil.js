var Request = function($http, alertaUtils, $location) {

	this._$http = $http;
	this._alertaUtils = alertaUtils;
	this._$location = $location;

};

Request.prototype._error401 = function(mensagem,statusCode, header){

	if (statusCode === app.utils.httpStatusCode.UNAUTHORIZED){

		sessionStorage.setItem('alerta', mensagem);
		this._$location.url(header('urlLogin'));
		
		return;
	}

	if (statusCode === app.utils.httpStatusCode.NOT_FOUND) {

		this._alertaUtils.showMensagem('Oops, o recurso solicitado não existe mais.', 'danger');
		return;
	}

	if (statusCode !== app.utils.httpStatusCode.SUCESSO){

		this._alertaUtils.showMensagem(mensagem, 'danger');
		return;
	}

};


Request.prototype._finally = function(http){

	http.error(this._error401.bind(this));
};

Request.prototype.get = function(url, params) {

	var http =	this._$http({

		url: url,
		method: 'GET',
		params: params
	});

	this._finally(http);

	return http;
};

Request.prototype.getWithCache = function(url, params) {

	var http =	this._$http({

		url: url,
		method: 'GET',
		cache: true,
		params: params
	});


	this._finally(http);

	return http;
};

Request.prototype.getWithoutBlockWithCache = function(url, params) {

	var http =	this._$http({

		url: url,
		method: 'GET',
		cache: true,
		params: params
	});

	this._finally(http);

	return http;
};

Request.prototype.post = function(url, params) {

	var http = this._$http({

		url:  url,
		method: 'POST',
		cache: false,
		data: $.param(params),
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	});

	this._finally(http);

	return http;
};


Request.prototype.postAsJson = function(url, params) {

	var http = this._$http({

		url:  url,
		method: 'POST',
		cache: false,
		data: params,
		headers: {'Content-Type': 'application/json'}
	});

	this._finally(http);

	return http;
};

exports.services.Request = Request;