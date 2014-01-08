(function($, module){
	var Pageboy = function(context){
		var contextElement = $(context),
			linkSelectorFactory = new IdOrTextSelectorFactory('a'),
			buttonSelectorFactory = new IdOrTextSelectorFactory('button');

		this.clickLink = function (linkIdOrText){
			var linkSelector = linkSelectorFactory.create(linkIdOrText);
			click(linkSelector);
		};

		this.clickButton = function (buttonIdOrText){
			var buttonSelector = buttonSelectorFactory.create(buttonIdOrText);
			buttonSelector = buttonSelector + ', input[type=button]#' + buttonIdOrText;
			click(buttonSelector);
		};

		function click(selector){
			contextElement
				.find(selector)
				.trigger('click');
		}
	};

	var IdOrTextSelectorFactory = function(elementType){
		this.create = function(elementIdOrText){
			var selectors = [
					buildIdSelector(elementIdOrText),
					buildTextSelector(elementIdOrText)
				],
				idOrTextSelector = selectors.join(', ');
			return idOrTextSelector;
		};

		function buildIdSelector(elementIdOrText){
			return elementType + '#' + elementIdOrText;
		}

		function buildTextSelector(elementIdOrText){
			return elementType + ':contains(' + elementIdOrText + ')';	
		}
	};

	(function exposeDSL(module, Pageboy){
		var pageboy = new Pageboy(document);
		module.Pageboy = Pageboy;
		module.clickLink = pageboy.clickLink;
		module.clickButton = pageboy.clickButton;
	})(module, Pageboy);
})(jQuery, window);