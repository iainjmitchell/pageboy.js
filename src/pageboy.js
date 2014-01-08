(function(module){
	module.Pageboy = function(context){
		var contextElement = $(context);


		this.clickLink = function (linkIdOrText){
			var linkSelector = 'a#' + linkIdOrText + ', a:contains(' + linkIdOrText + ')';
			click(linkSelector);
		};

		this.clickButton = function (buttonId){
			var buttonSelector = '#' + buttonId + ', button:contains(' + buttonId + ')';
			click(buttonSelector);
		};

		function click(selector){
			contextElement
				.find(selector)
				.trigger('click');
		}
	};

	var pageboy = new module.Pageboy(document);

	module.clickLink = pageboy.clickLink;
	module.clickButton = pageboy.clickButton;
})(window);