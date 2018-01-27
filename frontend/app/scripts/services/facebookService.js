var FacebookService = function() {

	var facebookService = this;

	facebookService.init = function() {

		(function(d, s, id){
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {return;}
			js = d.createElement(s); js.id = id;
			js.src = 'https://connect.facebook.net/en_US/sdk/debug.js';
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));

		window.fbAsyncInit = function() {
			
			FB.init({
				appId      : '564707953875978',
				cookie     : true,
				xfbml      : true,
				version    : 'v2.11'
			});
			
			FB.AppEvents.logPageView();
			
		};
	};

	facebookService.getStatus = function(successCallBack, errorCallback) {

		FB.getLoginStatus(successCallBack, errorCallback);
	};

	facebookService.login = function() {
		FB.login();
	};

	facebookService.logout = function(successCallBack) {

		FB.logout(successCallBack);
	};

	facebookService.getInfoLoggedUser = function(successCallBack, errorCallback) {
		
		FB.api('/me', successCallBack, errorCallback);
	};

};


exports.services.FacebookService = FacebookService;