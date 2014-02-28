describe("Given that developer wants to find a field on a page", function(){
	var TEST_FIXTURE_HTML = __html__['tests/findField-test-fixture.html'];

	beforeEach(function(){
		document.body.innerHTML = TEST_FIXTURE_HTML;
	});

	describe('When findField is called', function(){
		describe('And field exists with matching id', function(){
			it('Then text inputs value is returned', function(){
				var TEXT_INPUT_VALUE = 'random value ' + Math.random(),
					EXISTING_TEXT_INPUTS_ID = 'existingTextInput';
				$('#' + EXISTING_TEXT_INPUTS_ID).val(TEXT_INPUT_VALUE);
				findField(EXISTING_TEXT_INPUTS_ID).value.should.equal(TEXT_INPUT_VALUE);
			});
		});

		describe('And field exists with matching label for', function(){
			it('Then text inputs value is returned', function(){
				var TEXT_INPUT_VALUE = 'random value ' + Math.random(),
					EXISTING_TEXT_INPUTS_LABEL_FOR = 'Existing text input label',
					EXISTING_TEXT_INPUTS_ID = 'existingTextInput';
				$('#' + EXISTING_TEXT_INPUTS_ID).val(TEXT_INPUT_VALUE);
				findField(EXISTING_TEXT_INPUTS_LABEL_FOR).value.should.equal(TEXT_INPUT_VALUE);
			});
		});
	});
});