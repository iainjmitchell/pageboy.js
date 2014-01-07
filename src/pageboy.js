(function(module){
	module.Pageboy = function(context){
		var contextElement = $(context);

		this.clickLink = function (linkIdOrText){
			var linkSelector = 'a#' + linkIdOrText + ', a:contains(' + linkIdOrText + ')';
			click(linkSelector);
		};

		function click(selector){
			contextElement
				.find(selector)
				.trigger('click');
		}
	};

	var pageboy = new module.Pageboy(document);

	module.clickLink = pageboy.clickLink;
})(window);