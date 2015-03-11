var clone = function(what) {
	return $.extend({}, what);
};
var rand = function(max) {
	return Math.floor(1+Math.random()*max);
};
var range = function(min, max) {
	return Math.floor(Math.random() * (max - min +1)) + min;
};
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
}
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
    console.log(array)
	var array = array;
	var pos = Math.floor(Math.random()*array.length);
	return array[pos];
};

var Collection = function(items) {
    this.all = [];
    this.byName = {};
    this.add = function(item) {
    	this.all.push(item);
    	this.byName[item.name] = item;
    };
    this.getByName = function(name) {
    	return this.byName[name];
    };
    var add_method = this.add;
    var self = this;
    items.forEach(function(item, index) {
        add_method.call(self, item);
    });
};