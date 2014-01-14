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

		describe("using an existing text input's label for", function(){
			it("Then the text input's value is set", function(){
				var SET_VALUE = 'random value ' + Math.random(),
					EXISTING_TEXT_INPUTS_LABEL_FOR = 'Existing text input label',
					EXISTING_TEXT_INPUTS_ID = 'existingTextInput';
				
				fillIn(EXISTING_TEXT_INPUTS_LABEL_FOR).with(SET_VALUE);

				var textInputValue = $('#' + EXISTING_TEXT_INPUTS_ID).val();
				textInputValue.should.equal(SET_VALUE);
			});
		});

		describe("using an existing textarea's id", function(){
			it("Then the textarea's value is set", function(){
				var SET_VALUE = 'random value ' + Math.random(),
					EXISTING_TEXTAREA_ID = 'existingTextArea';
				
				fillIn(EXISTING_TEXTAREA_ID).with(SET_VALUE);

				var textAreaValue = $('#' + EXISTING_TEXTAREA_ID).val();
				textAreaValue.should.equal(SET_VALUE);
			});
		});

		describe("using an existing textarea's label for", function(){
			it("Then the textarea's value is set", function(){
				var SET_VALUE = 'random value ' + Math.random(),
					EXISTING_TEXTAREA_LABEL_FOR = 'Existing textarea label',
					EXISTING_TEXTAREA_ID = 'existingTextArea';
				
				fillIn(EXISTING_TEXTAREA_LABEL_FOR).with(SET_VALUE);

				var textAreaValue = $('#' + EXISTING_TEXTAREA_ID).val();
				textAreaValue.should.equal(SET_VALUE);
			});
		});

		describe("using an existing password input's id", function(){
			it("Then the password input's value is set", function(){
				var SET_VALUE = 'random value ' + Math.random(),
					EXISTING_PASSWORD_INPUTS_ID = 'existingPasswordInput';
				
				fillIn(EXISTING_PASSWORD_INPUTS_ID).with(SET_VALUE);

				var passwordnputValue = $('#' + EXISTING_PASSWORD_INPUTS_ID).val();
				passwordnputValue.should.equal(SET_VALUE);
			});
		});

		describe("using an existing password input's label for", function(){
			it("Then the password input's value is set", function(){
				var SET_VALUE = 'random value ' + Math.random(),
					EXISTING_PASSWORD_INPUTS_LABEL_FOR = 'Existing password input label',
					EXISTING_PASSWORD_INPUTS_ID = 'existingPasswordInput';
				
				fillIn(EXISTING_PASSWORD_INPUTS_LABEL_FOR).with(SET_VALUE);

				var passwordnputValue = $('#' + EXISTING_PASSWORD_INPUTS_ID).val();
				passwordnputValue.should.equal(SET_VALUE);
			});
		});
	});
});