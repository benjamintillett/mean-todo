beforeEach(function(){
	jasmine.addMatchers({
		toEqualData: function(actual,expected){
			return {
				compare: function(actual,expected){
					var passed = angular.equals(actual,expected);
					return {
						pass: passed
					}
				}
			}
		}
	});
});
