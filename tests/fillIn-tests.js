describe("Given that developer wants to fill in an item on a a page", function(){
	var TEST_FIXTURE_HTML = __html__['tests/fillIn-test-fixture.html'];

	beforeEach(function(){
		document.body.innerHTML = TEST_FIXTURE_HTML;
	});

	describe("When fillIn is called", function(){
		describe("using an existing text input's id", function(){
			it("Then the text input's value is set", function(){
				var SET_VALUE = 'random value ' + Math.random(),
					EXISTING_TEXT_INPUTS_ID = 'existingTextInput';
				
				fillIn(EXISTING_TEXT_INPUTS_ID).with(SET_VALUE);

				var textInputValue = $('#' + EXISTING_TEXT_INPUTS_ID).val();
				textInputValue.should.equal(SET_VALUE);
			});
		});
	});
});