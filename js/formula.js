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

Formula.calcArray = function(array) {
    var calculated = {};
    $.each(array, function(stat, formula) {
        calculated[stat] = (typeof formula == 'function') ? formula() : formula;
    });
    return calculated;
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

var add_item_to_player_formula = function(item) {
    return new Formula(function(item) { player.addItem(item)}, [item]);
};

var inc_player_stats_formula = function(stats_name) {
    return new Formula(function(stats_name) { player.stats[stats_name]++; }, [stats_name]);
};



