(function($, module){
	var Pageboy = function(context){
		var contextElement = $(context),
			linkSelectorFactory = new IdOrTextSelectorFactory('a'),
			buttonSelectorFactory = new ButtonSelectorFactory();

		this.clickLink = function (linkIdOrText){
			var linkSelector = linkSelectorFactory.create(linkIdOrText);
			click(linkSelector);
		};

		this.clickButton = function (buttonIdOrText){
			var buttonSelector = buttonSelectorFactory.create(buttonIdOrText);
			click(buttonSelector);
		};

		function click(selector){
			contextElement
				.find(selector)
				.trigger('click');
		}
	};

	var IdOrTextSelectorFactory = function(elementType){
		var selectorFactories = [
				new ElementByIdSelectorFactory(elementType),
				new ElementByTextSelectorFactory(elementType)
			],
			multipleSelectorFactory = new MultipleSelectorFactory(selectorFactories);
		this.create = multipleSelectorFactory.create;
	};

	var MultipleSelectorFactory = function(selectorFactories){
		this.create = function(elementQuery){
			var selectors = [];
			$.each(selectorFactories, function(){
				selectors.push(this.create(elementQuery));
			});
			return selectors.join(', ');
		};
	};

	var ElementByIdSelectorFactory = function(elementType){
		this.create = function(elementIdOrText){
			return elementType + '#' + elementIdOrText;
		};
	};

	var ElementByTextSelectorFactory = function(elementType){
		this.create = function(elementIdOrText){
			return elementType + ':contains(' + elementIdOrText + ')';
		};
	};

	var ButtonSelectorFactory = function(){
			var selectorFactories = [
				new IdOrTextSelectorFactory('button'),
				new ElementByIdSelectorFactory('input[type=button]')
			],
			multipleSelectorFactory = new MultipleSelectorFactory(selectorFactories);
		this.create = multipleSelectorFactory.create;
	};

	(function exposeDSL(module, Pageboy){
		var pageboy = new Pageboy(document);
		module.Pageboy = Pageboy;
		module.clickLink = pageboy.clickLink;
		module.clickButton = pageboy.clickButton;
	})(module, Pageboy);
})(jQuery, window);