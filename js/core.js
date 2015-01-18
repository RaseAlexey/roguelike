var clone = function(what) {
	return $.extend({}, what);
};
var calcDamage = function(source, target, amount) {

};
var rand = function(upper_bound) {
	return Math.floor(1+Math.random()*upper_bound);
};
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
var randomPropertyInObject = function (object) {
  var keys = Object.keys(object);
  return object[keys[Math.floor(keys.length * Math.random())]];
};
Array.prototype.getRandomElement = function() {
	return this[Math.floor(Math.random()*this.length)];
};
$(document).on('click', '.connection', function() {
  Player.goTo($(this).data('location_id'), $(this).data('place_id'));
});