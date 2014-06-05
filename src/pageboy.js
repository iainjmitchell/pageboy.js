(function($, module){
	var Pageboy = function(context){
		var contextElement = $(context),
			links = new clickable.LinkRepository(contextElement),
			buttons = new clickable.ButtonRepository(contextElement),
			textElements = new fillable.TextElementRepository(contextElement),
			checkboxes = new checkable.CheckBoxRepository(contextElement),
			radioButtons = new checkable.RadioButtonRepository(contextElement),
			selects = new selectable.SelectRepository(contextElement);

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

		this.findField = function (fieldIdOrLabel){
			var selectorFactory = new selectors.IdOrLabelForSelectorFactory(contextElement, 'input[type=text]'),
				elementSelector = selectorFactory.create(fieldIdOrLabel);	
			return {
				value : contextElement.find(elementSelector).val()
			};
		};

		this.check = function(checkboxIdOrLabel){
			checkboxes.get(checkboxIdOrLabel).check();
		};

		this.uncheck = function(checkboxIdOrLabel){
			checkboxes.get(checkboxIdOrLabel).uncheck();
		};

		this.choose = function(radioButtonIdOrLabel){
			radioButtons.get(radioButtonIdOrLabel).check();
		};

		this.select = function(optionText){
			return {
				from : function(selectId){
					selects.get(selectId).choose(optionText);
				}
			};
		};
	};

	var selectors = (function(){
		var IdOrLabelForSelectorFactory = function(contextElement, elementType){
			var multipleSelectorFactory = new MultipleSelectorFactory([
					new ElementByIdSelectorFactory(elementType),
					new ElementByLabelForSelectorFactory(contextElement, elementType)
				]);
			this.create = multipleSelectorFactory.create;
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
				var allSelectors = [];
				$.each(selectorFactories, function(){
					var selector = this.create(elementQuery);
					if (selector){
						allSelectors.push(selector);
					}
				});
				return allSelectors.join(', ');
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

		var ElementByLabelForSelectorFactory = function(contextElement, elementType){
			this.create = function(elementQuery){
				var labelForElementId = contextElement.find('label:contains('+ elementQuery +')').attr('for');
				if (labelForElementId){
					return elementType + '#' + labelForElementId;
				}
			};
		};

		return {
			MultipleSelectorFactory : MultipleSelectorFactory,
			IdOrTextSelectorFactory : IdOrTextSelectorFactory,
			IdOrValueSelectorFactory : IdOrValueSelectorFactory,
			IdOrLabelForSelectorFactory : IdOrLabelForSelectorFactory,
			ElementByIdSelectorFactory : ElementByIdSelectorFactory
		};
	})();

	var clickable = (function(selectors){
		var LinkRepository = function(context){
			var linkSelectorFactory = new selectors.IdOrTextSelectorFactory('a'),
				clickableElementFactory = new ClickableElementFactory(context, linkSelectorFactory);

			this.get = clickableElementFactory.create;
		};

		var ButtonRepository = function(context){
			var buttonSelectorFactory = new selectors.MultipleSelectorFactory([
					new selectors.IdOrTextSelectorFactory('button'),
					new selectors.IdOrValueSelectorFactory('input[type=button]')
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
	})(selectors);

	var fillable = (function(selectors){
		var TextElementRepository = function(contextElement){
			var textElementSelectorFactory = new selectors.MultipleSelectorFactory([
					new selectors.IdOrLabelForSelectorFactory(contextElement, 'input[type=text]'),
					new selectors.IdOrLabelForSelectorFactory(contextElement, 'textarea'),
					new selectors.IdOrLabelForSelectorFactory(contextElement, 'input[type=password]')
				]);	

			this.get = function(textElementIdOrLabel){
				var selector = textElementSelectorFactory.create(textElementIdOrLabel);
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
	})(selectors);

	var checkable = (function(selectors){
		var CheckBoxRepository = function(contextElement){
			var checkboxSelectorFactory = new selectors.IdOrLabelForSelectorFactory(contextElement, 'input[type=checkbox]');

			this.get = function(checkboxIdOrLabel){
				var selector = checkboxSelectorFactory.create(checkboxIdOrLabel);
				return new CheckableElement(contextElement, selector);
			};
		};

		var RadioButtonRepository = function(contextElement){
			var checkboxSelectorFactory = new selectors.IdOrLabelForSelectorFactory(contextElement, 'input[type=radio]');

			this.get = function(radioButtonIdOrLabel){
				var selector = checkboxSelectorFactory.create(radioButtonIdOrLabel);
				return new CheckableElement(contextElement, selector);
			};
		};

		var CheckableElement = function(context, selector){
			var element = context.find(selector);

			this.check = function(){
				element.prop('checked', true);
			};

			this.uncheck = function(){
				element.prop('checked', false);
			};
		};

		return {
			CheckBoxRepository : CheckBoxRepository,
			RadioButtonRepository : RadioButtonRepository
		};
	})(selectors);

	var selectable = (function(selectors){
		var SelectRepository = function(contextElement){
			var selectSelectorFactory = new selectors.IdOrLabelForSelectorFactory(contextElement, 'select');

			this.get = function(selectId){
				var selector = selectSelectorFactory.create(selectId);
				return new SelectElement(contextElement, selector);
			};
		};

		var SelectElement = function(context, selector){
			var element = context.find(selector);

			this.choose = function(optionText){
				element.val(optionText);
			};
		};

		return {
			SelectRepository : SelectRepository
		};
	})(selectors);

	(function exposeDSL(module, Pageboy){
		var page = new Pageboy(document);
		module.Pageboy = Pageboy;
		module.clickLink = page.clickLink;
		module.clickButton = page.clickButton;
		module.fillIn = page.fillIn;
		module.findField = page.findField;
		module.check = page.check;
		module.uncheck = page.uncheck;
		module.choose = page.choose;
		module.select = page.select;
	})(module, Pageboy);
})(jQuery, window);