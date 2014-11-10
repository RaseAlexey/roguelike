var player = (function(name) {
	var name = name;
	var me = new Unit(name, 100);
	me.getName = function() {
		return name;
	};
	me.getLOS = function() {
		return 4;
	};
	return me;
})('player fgv dfg sdg sfg dsg dg ');
//prompt('say your name')