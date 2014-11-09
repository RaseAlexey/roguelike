var player = (function(name) {
	var name = name;
	var me = new Unit(name, 100);
	me.getCode = function() {
			var code;
			return code;
	};
	me.getName = function() {
		return name;
	};
	return me;
})('player');
//prompt('say your name')