/*jshint expr: true*/
describe("Given that developer wants to simulate the choosing of an radio button on a a page", function(){
	var TEST_FIXTURE_HTML = __html__['tests/choose-test-fixture.html'],
		EXISTING_RADIO_BUTTON_ID = 'existingRadioButton';

	beforeEach(function(){
		document.body.innerHTML = TEST_FIXTURE_HTML;
	});

	describe("When choose is called", function(){
		describe("using an existing radio button's id", function(){
			it("Then radio button is checked", function(){
				choose(EXISTING_RADIO_BUTTON_ID);
				var checked = $('#' + EXISTING_RADIO_BUTTON_ID).prop('checked');
				checked.should.be.true;
			});
		});
	});
});