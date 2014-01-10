(function($, module){
	var Pageboy = function(context){
		var contextElement = $(context),
			links = new LinkRepository(contextElement),
			buttons = new ButtonRepository(contextElement);

		this.clickLink = function (linkIdOrText){
			links.get(linkIdOrText).click();
		};

		this.clickButton = function (buttonIdOrText){
			buttons.get(buttonIdOrText).click();
		};

		this.fillIn = function (id){
			var element = $('#' + id);
			return {
				with : function(value){
					element.val(value);
				}
			};
		};
	};

	var PageElement = function(context, selector){
		var element = context.find(selector);

		this.click = function(){
			element.click();
		};
	};

	var IdOrTextSelectorFactory = function(elementType){
		var selectorFactories = [
				new ElementByIdSelectorFactory(elementType),
				new ElementByTextSelectorFactory(elementType)
			],
			multipleSelectorFactory = new MultipleSelectorFactory(selectorFactories);
		this.create = multipleSelectorFactory.create;
	};

	var IdOrValueSelectorFactory = function(elementType){
		var selectorFactories = [
				new ElementByIdSelectorFactory(elementType),
				new ElementByValueSelectorFactory(elementType)
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

	var ElementByValueSelectorFactory = function(elementType){
		this.create = function(elementIdOrText){
			return elementType + '[value="' + elementIdOrText + '"]';
		};
	};

	var LinkRepository = function(context){
		var linkSelectorFactory = new IdOrTextSelectorFactory('a'),
			pageElementFactory = new PageElementFactory(context, linkSelectorFactory);

		this.get = pageElementFactory.create;
	};

	var ButtonRepository = function(context){
		var buttonSelectorFactory = new MultipleSelectorFactory([
				new IdOrTextSelectorFactory('button'),
				new IdOrValueSelectorFactory('input[type=button]')
			]),
			pageElementFactory = new PageElementFactory(context, buttonSelectorFactory);

		this.get = pageElementFactory.create;
	};

	var PageElementFactory = function(context, selectorFactory){
		this.create = function(elementQuery){
			var selector = selectorFactory.create(elementQuery);
			return new PageElement(context, selector);
		};
	};

	(function exposeDSL(module, Pageboy){
		var pageboy = new Pageboy(document);
		module.Pageboy = Pageboy;
		module.clickLink = pageboy.clickLink;
		module.clickButton = pageboy.clickButton;
		module.fillIn = pageboy.fillIn;
	})(module, Pageboy);
})(jQuery, window);