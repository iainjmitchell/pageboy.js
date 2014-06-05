describe("Given that developer wants to find a field on a page", function(){
	var TEST_FIXTURE_HTML = __html__['tests/findField-test-fixture.html'];

	beforeEach(function(){
		document.body.innerHTML = TEST_FIXTURE_HTML;
	});

	describe('When findField is called', function(){
		describe('against a existing text input', function(){
			var EXISTING_TEXT_INPUTS_ID = 'existingTextInput';

			describe("by using it's id", function(){
				it('Then text inputs value is returned', function(){
					var TEXT_INPUT_VALUE = 'random value ' + Math.random();
					$('#' + EXISTING_TEXT_INPUTS_ID).val(TEXT_INPUT_VALUE);
					findField(EXISTING_TEXT_INPUTS_ID).value.should.equal(TEXT_INPUT_VALUE);
				});
			});

			describe("by using it's label for", function(){
				it('Then text inputs value is returned', function(){
					var TEXT_INPUT_VALUE = 'random value ' + Math.random(),
						EXISTING_TEXT_INPUTS_LABEL_FOR = 'Existing text input label';
					$('#' + EXISTING_TEXT_INPUTS_ID).val(TEXT_INPUT_VALUE);
					findField(EXISTING_TEXT_INPUTS_LABEL_FOR).value.should.equal(TEXT_INPUT_VALUE);
				});
			});
		});

		describe('against a existing text area', function(){
			var EXISTING_TEXT_AREA_ID = 'existingTextArea';

			describe("by using it's id", function(){
				it('Then text inputs value is returned', function(){
					var TEXT_INPUT_VALUE = 'random value ' + Math.random();
					$('#' + EXISTING_TEXT_AREA_ID).val(TEXT_INPUT_VALUE);
					findField(EXISTING_TEXT_AREA_ID).value.should.equal(TEXT_INPUT_VALUE);
				});
			});

			describe("by using it's label for", function(){
				it('Then text inputs value is returned', function(){
					var TEXT_INPUT_VALUE = 'random value ' + Math.random(),
						EXISTING_TEXT_AREA_LABEL_FOR = 'Existing textarea label';
					$('#' + EXISTING_TEXT_AREA_ID).val(TEXT_INPUT_VALUE);
					findField(EXISTING_TEXT_AREA_LABEL_FOR).value.should.equal(TEXT_INPUT_VALUE);
				});
			});
		});

		describe('against a existing password field', function(){
			var EXISTING_PASSWORD_FIELD_ID = 'existingPasswordInput';

			describe("by using it's id", function(){
				it('Then text inputs value is returned', function(){
					var TEXT_INPUT_VALUE = 'random value ' + Math.random();
					$('#' + EXISTING_PASSWORD_FIELD_ID).val(TEXT_INPUT_VALUE);
					findField(EXISTING_PASSWORD_FIELD_ID).value.should.equal(TEXT_INPUT_VALUE);
				});
			});

			describe("by using it's label for", function(){
				it('Then text inputs value is returned', function(){
					var TEXT_INPUT_VALUE = 'random value ' + Math.random(),
						EXISTING_PASSWORD_FIELD_LABEL_FOR = 'Existing password input label';
					$('#' + EXISTING_PASSWORD_FIELD_ID).val(TEXT_INPUT_VALUE);
					findField(EXISTING_PASSWORD_FIELD_LABEL_FOR).value.should.equal(TEXT_INPUT_VALUE);
				});
			});
		});
	});
});