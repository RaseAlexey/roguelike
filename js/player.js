var player = (function(name, image_url) {
	var name = name;
	var me = new Unit(name, 100, 'units/sunbro.png');
	me.getName = function() {
		return name;
	};
	me.getLOS = function() {
		return 4;
	};
	return me;
})('Alexey');
//prompt('say your name')