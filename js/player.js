var player = (function(name, image_url) {
	var name = name;
	var me = new Unit(name, 100, 'units/sunbro.png');
	me.getName = function() {
		return name;
	};
	return me;
})('Alexey');
//prompt('say your name')