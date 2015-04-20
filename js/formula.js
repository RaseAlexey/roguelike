/*	
	Formulas are functions wrappers, which allow to save context, arguments and function itself.
	new Formula(f, arguments_array, context) is equal to function() { return f.apply(context, arguments_array) }
*/
var Formula = function(f, arguments_array, context) { 
    var f = f;
    var arguments_array = arguments_array;
    var context = context || window;
    return function() {
        return f.apply(context, arguments_array)
    }
};
var rand_formula = function(max) {
    return new Formula(rand, [max]);
};
var range_formula = function(min, max) {
    return new Formula(range, [min, max]);
};
var constant_formula = function(constant) {
    return new Formula(function(value){return value}, [constant]);
};


Formula.calcArray = function(array) {
	var calculated = {}; 
	$.each(array, function(stat, formula) {
		calculated[stat] = formula();
	});
	return calculated;
};


