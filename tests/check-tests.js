/*jshint expr: true*/
describe("Given that developer wants to simulate the checking of an item on a a page", function(){
	var TEST_FIXTURE_HTML = __html__['tests/check-test-fixture.html'],
		EXISTING_CHECKBOX_ID = 'existingCheckbox';

	beforeEach(function(){
		document.body.innerHTML = TEST_FIXTURE_HTML;
	});

	describe("When check is called", function(){
		describe("using an existing checkboxes id", function(){
			it("Then radio button is clicked", function(){
				check(EXISTING_CHECKBOX_ID);
				var checked = $('#' + EXISTING_CHECKBOX_ID).prop('checked');
				checked.should.be.true;
			});
		});
	});
});