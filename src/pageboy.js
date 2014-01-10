(function($, module){
	var Pageboy = function(context){
		var contextElement = $(context),
			links = new click.LinkRepository(contextElement),
			buttons = new click.ButtonRepository(contextElement),
			textElements = new text.TextElementRepository(contextElement);

		this.clickLink = function (linkIdOrText){
			links.get(linkIdOrText).click();
		};

		this.clickButton = function (buttonIdOrText){
			buttons.get(buttonIdOrText).click();
		};

		this.fillIn = function (textElementIdOrLabel){
			var textElement = textElements.get(textElementIdOrLabel);
			return {
				with : textElement.fillIn
			};
		};
	};

	var click = (function(){
		var LinkRepository = function(context){
			var linkSelectorFactory = new IdOrTextSelectorFactory('a'),
				clickableElementFactory = new ClickableElementFactory(context, linkSelectorFactory);

			this.get = clickableElementFactory.create;
		};

		var ButtonRepository = function(context){
			var buttonSelectorFactory = new MultipleSelectorFactory([
					new IdOrTextSelectorFactory('button'),
					new IdOrValueSelectorFactory('input[type=button]')
				]),
				clickableElementFactory = new ClickableElementFactory(context, buttonSelectorFactory);

			this.get = clickableElementFactory.create;
		};

		var ClickableElementFactory = function(context, selectorFactory){
			this.create = function(elementQuery){
				var selector = selectorFactory.create(elementQuery);
				return new ClickableElement(context, selector);
			};
		};

		var ClickableElement = function(context, selector){
			var element = context.find(selector);

			this.click = function(){
				element.click();
			};
		};

		return {
			LinkRepository : LinkRepository,
			ButtonRepository : ButtonRepository
		};
	})();

	var text = (function(){
		var TextElementRepository = function(contextElement){
			var idOrLabelForSelectorFactory = new IdOrLabelForSelectorFactory(contextElement, 'input[type=text]');
			this.get = function(textElementIdOrLabel){
				var selector = idOrLabelForSelectorFactory.create(textElementIdOrLabel);
				return new TextElement(contextElement, selector);
			};
		};

		var TextElement = function(context, selector){
			var element = context.find(selector);

			this.fillIn = function(value){
				element.val(value);
			};
		};

		return {
			TextElementRepository : TextElementRepository
		};
	})();

	var IdOrLabelForSelectorFactory = function(contextElement, elementType){
		var multipleSelectorFactory = new MultipleSelectorFactory([
				new ElementByIdSelectorFactory(elementType),
				new ElementByLabelForSelectorFactory(contextElement, elementType)
			]);
		this.create = multipleSelectorFactory.create;
	};

	var ElementByLabelForSelectorFactory = function(contextElement, elementType){
		this.create = function(elementQuery){
			var labelForElementId = contextElement.find('label:contains('+ elementQuery +')').attr('for');
			if (labelForElementId){
				return elementType + '#' + labelForElementId;
			}
		};
	};

	var IdOrTextSelectorFactory = function(elementType){
		var multipleSelectorFactory = new MultipleSelectorFactory([
				new ElementByIdSelectorFactory(elementType),
				new ElementByTextSelectorFactory(elementType)
			]);
		this.create = multipleSelectorFactory.create;
	};

	var IdOrValueSelectorFactory = function(elementType){
		var multipleSelectorFactory = new MultipleSelectorFactory([
				new ElementByIdSelectorFactory(elementType),
				new ElementByValueSelectorFactory(elementType)
			]);
		this.create = multipleSelectorFactory.create;
	};

	var MultipleSelectorFactory = function(selectorFactories){
		this.create = function(elementQuery){
			var selectors = [];
			$.each(selectorFactories, function(){
				var selector = this.create(elementQuery);
				if (selector){
					selectors.push(selector);
				}
			});
			return selectors.join(', ');
		};
	};

	var ElementByIdSelectorFactory = function(elementType){
		this.create = function(elementQuery){
			return elementType + '#' + elementQuery;
		};
	};

	var ElementByTextSelectorFactory = function(elementType){
		this.create = function(elementQuery){
			return elementType + ':contains(' + elementQuery + ')';
		};
	};

	var ElementByValueSelectorFactory = function(elementType){
		this.create = function(elementQuery){
			return elementType + '[value="' + elementQuery + '"]';
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