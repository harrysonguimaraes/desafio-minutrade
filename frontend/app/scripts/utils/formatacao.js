String.prototype.minimizarTexto = function(size){

	var texto = this.toString();

	size = size || 10;

	return texto.length > size ? (texto.substring(0, size).trim() + '...') : texto;
};

String.prototype.camelize = function() {

	var str = this.toString();

	return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {

		if (+match === 0) {
			return '';
		}
		return index === 0 ? match.toLowerCase() : match.toUpperCase();

	});
};

var formatarNumero = function(number, casas){

	casas = isNaN(casas) ? 2 : casas;

	var numeros = number.toFixed(casas).toString().split('.');
	var esquerdo = numeros[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
	var direito = casas === 0 ? '' : ',' + numeros[1];
	return esquerdo + direito;
} ;

String.prototype.formatarNumero = function(casas){

	return formatarNumero(parseFloat(this.replace(',','.')), casas);

};

Number.prototype.formatarNumero = function(casas){

	return formatarNumero(this, casas);

};