describe("Given that developer wants to fill in an item on a a page", function(){
	var TEST_FIXTURE_HTML = __html__['tests/fillIn-test-fixture.html'];

	beforeEach(function(){
		document.body.innerHTML = TEST_FIXTURE_HTML;
	});

	describe('When fillIn is called', function(){
		it('test', function(){
			true.should.equal(true);
		});
	});
});