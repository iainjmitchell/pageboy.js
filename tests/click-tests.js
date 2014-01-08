describe("Given that developer wants to simulate the click of an item on a a page", function(){
	var TEST_FIXTURE_HTML = __html__['tests/click-test-fixture.html'],
		EXISTING_LINK_ID = 'existingLink',
		EXISTING_LINK_TEXT = 'a link',
		EXISTING_BUTTON_ID = 'existingButton',
		EXISTING_BUTTON_TEXT = 'a button',
		EXISTING_INPUT_BUTTON_ID = 'existingInputButton',
		EXISTING_INPUT_BUTTON_TEXT = 'an input button';

	beforeEach(function(){
		document.body.innerHTML = TEST_FIXTURE_HTML;
	});

	describe("When click link is called", function(){
		describe("using an existing anchor's id", function(){
			it("Then link is clicked", function(done){
				$('#' + EXISTING_LINK_ID).click(function(){
					done();
				});
				clickLink(EXISTING_LINK_ID);
			});
		});

		describe("using an existing button's id", function(){
			it("Then button is NOT clicked", function(done){
				$('#' + EXISTING_BUTTON_ID).click(function(){
					done('Button should NOT have been clicked');
				});
				clickLink(EXISTING_BUTTON_ID);
				done();
			});
		});

		describe("using an existing anchor's link text", function(){
			it("Then link is clicked", function(done){
				$('#' + EXISTING_LINK_ID).click(function(){
					done();
				});
				clickLink(EXISTING_LINK_TEXT);
			});
		});
	});

	describe("When click button is called", function(){
		describe("using an existing button's id", function(){
			it("Then button is clicked", function(done){
				$('#' + EXISTING_BUTTON_ID).click(function(){
					done();
				});
				clickButton(EXISTING_BUTTON_ID);
			});
		});

		describe("using an existing anchor's id", function(){
			it("Then link is NOT clicked", function(done){
				$('#' + EXISTING_LINK_ID).click(function(){
					done('Link should NOT be clicked');
				});
				clickButton(EXISTING_LINK_ID);
				done();
			});
		});

		describe("using an existing button's text", function(){
			it("Then button is clicked", function(done){
				$('#' + EXISTING_BUTTON_ID).click(function(){
					done();
				});
				clickButton(EXISTING_BUTTON_TEXT);
			});
		});

		describe("using an existing input button's id", function(){
			it("Then button is clicked", function(done){
				$('#' + EXISTING_INPUT_BUTTON_ID).click(function(){
					done();
				});
				clickButton(EXISTING_INPUT_BUTTON_ID);
			});
		});

		describe("using an an none button input's id", function(){
			it("Then button is clicked", function(done){
				var EXISTING_NONE_BUTTON_INPUT_ID = 'existingNoneButtonInput';
				$('#' + EXISTING_NONE_BUTTON_INPUT_ID).click(function(){
					done('None button input should NOT be clicked');
				});
				clickButton(EXISTING_NONE_BUTTON_INPUT_ID);
				done();
			});
		});

		
	});
});