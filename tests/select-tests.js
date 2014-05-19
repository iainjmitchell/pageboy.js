/*jshint expr: true*/
describe("Given that developer wants to simulate the selecting of an option within a select on a a page", function(){
	var TEST_FIXTURE_HTML = __html__['tests/select-test-fixture.html'],
		EXISTING_SELECT_ID = 'existingSelect',
		EXISTING_SELECT_LABEL = 'A select';

	beforeEach(function(){
		document.body.innerHTML = TEST_FIXTURE_HTML;
	});

	describe("When select is called", function(){
		describe("using an existing selects's id", function(){
			describe("and an existing option", function(){
				it("Then the option is selected", function(){
					var SELECTED_OPTION = 'Two';
					select(SELECTED_OPTION).from(EXISTING_SELECT_ID);
					var selectedOption = $('#' + EXISTING_SELECT_ID + ' option:selected').text();
					selectedOption.should.equal(SELECTED_OPTION);
				});
			});
		});

		// describe("using an existing selects's label", function(){
		// 	describe("and an existing option", function(){
		// 		it("Then the option is selected", function(){
		// 			var SELECTED_OPTION = 'Two';
		// 			select(SELECTED_OPTION).from(EXISTING_SELECT_LABEL);
		// 			var selectedOption = $('#' + EXISTING_SELECT_ID + ' option:selected').text();
		// 			selectedOption.should.equal(SELECTED_OPTION);
		// 		});
		// 	});
		// });
	});
});