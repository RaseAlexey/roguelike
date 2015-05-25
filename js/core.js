
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
	return array[Math.floor(Math.random()*array.length)];
};
