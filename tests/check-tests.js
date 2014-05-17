/*jshint expr: true*/
describe("Given that developer wants to simulate the checking of an item on a a page", function(){
	var TEST_FIXTURE_HTML = __html__['tests/check-test-fixture.html'],
		EXISTING_CHECKBOX_ID = 'existingCheckbox',
		EXISTING_CHECKBOX_LABEL = 'a label',
		CHECKED_CHECKBOX_ID = 'checkedCheckbox',
		CHECKED_CHECKBOX_LABEL = 'another label';

	beforeEach(function(){
		document.body.innerHTML = TEST_FIXTURE_HTML;
	});

	describe("When check is called", function(){
		describe("using an existing checkboxes id", function(){
			it("Then checkbox is checked", function(){
				check(EXISTING_CHECKBOX_ID);
				var checked = $('#' + EXISTING_CHECKBOX_ID).prop('checked');
				checked.should.be.true;
			});
		});

		describe("using an existing checkboxes label", function(){
			it("Then checkbox is checked", function(){
				check(EXISTING_CHECKBOX_LABEL);
				var checked = $('#' + EXISTING_CHECKBOX_ID).prop('checked');
				checked.should.be.true;
			});
		});
	});

	describe("When uncheck is called", function(){
		describe("using an existing checked checkboxes id", function(){
			it("Then checkbox becomes unchecked", function(){
				uncheck(CHECKED_CHECKBOX_ID);
				var checked = $('#' + CHECKED_CHECKBOX_ID).prop('checked');
				checked.should.be.false;
			});
		});

		describe("using an existing checkboxes label", function(){
			it("Then checkbox is checked", function(){
				uncheck(CHECKED_CHECKBOX_LABEL);
				var checked = $('#' + CHECKED_CHECKBOX_ID).prop('checked');
				checked.should.be.false;
			});
		});
	});
});