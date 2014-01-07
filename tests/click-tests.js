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

function clickLink(linkIdOrText){
	$('#' + linkIdOrText + ', a:contains(' + linkIdOrText + ')').trigger('click');
}