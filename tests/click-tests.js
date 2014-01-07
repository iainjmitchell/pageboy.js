describe("Given that developer wants to simulate the click of an item on a a page", function(){
	var TEST_FIXTURE_HTML = __html__['tests/click-test-fixture.html'];

	beforeEach(function(){
		document.body.innerHTML = TEST_FIXTURE_HTML;
	});

	describe("When click link using an existing anchor's id", function(){
		it("Then link is clicked", function(done){
			var EXISTING_LINK_ID = 'existingLink';
			$('#' + EXISTING_LINK_ID).click(function(){
				done();
			});
			clickLink(EXISTING_LINK_ID);
		});
	});

	describe("When click link using an existing button's id", function(){
		it("Then button is NOT clicked", function(done){
			var EXISTING_BUTTON_ID = 'existingButton';
			$('#' + EXISTING_BUTTON_ID).click(function(){
				done('Button should NOT have been clicked');
			});
			clickLink(EXISTING_BUTTON_ID);
			done();
		});
	});

	describe("When click link using an existing anchor's link text", function(){
		it("Then link is clicked", function(done){
			var EXISTING_LINK_ID = 'existingLink',
				EXISTING_LINK_TEXT = 'a link';
			$('#' + EXISTING_LINK_ID).click(function(){
				done();
			});
			clickLink(EXISTING_LINK_TEXT);
		});
	});
});