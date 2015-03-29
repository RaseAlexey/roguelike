var clone = function(what) {
	return $.extend({}, what);
};
var rand = function(max) {
	return Math.floor(1+Math.random()*max);
};
var range = function(min, max) {
	return Math.floor(Math.random() * (max - min +1)) + min;
};
var getObjectSize = function(object) {
    var size = 0, key;
    for (key in object) {
        if (object.hasOwnProperty(key)) size++;
    }
    return size;
};
var getRandomPropertyInObject = function(object) {
  var keys = Object.keys(object);
  return object[keys[Math.floor(keys.length * Math.random())]];
};
var getRandomItemInArray = function(array) {
	var array = array;
	var pos = Math.floor(Math.random()*array.length);
	return array[pos];
};


var Formula = function(f, arguments_array, context) { //new Formula(f, arguments_array, context) is equal to function() { return f.apply(context, arguments_array) }
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

/*
var rand_formula = function(max) {
    var max = max;
    return function() {
        return rand(max);
    }
};
var range_formula = function(min, max) {
    var min = min;
    var max = max;
    return function() {
        return range(min, max);
    }
};
var constant_formula = function(constant) {
    var constant = constant;
    return function() {
        return constant;
    }
};
*/
