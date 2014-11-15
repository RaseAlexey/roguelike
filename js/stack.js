Stack = (function() {
	var time = 0;
	var objects = [];
	return {
		getObjects : function() {
			return objects;
		},
		getTime : function() {
			return time;
		},
		addObject : function(object) {
			return objects.push(object)
		},
		removeObject : function(object) {
			var index = objects.indexOf(object);
			if (index != -1) {
				objects.splice(index, 1);
			};
		},
		passTurn : function() {
			time++;
			objects.forEach(function(object, index) {
				console.log(object.getAction())
				object.getAction().do();
			});
		},
		pass : function(time) {
			for(var i=0; i<time; i++) {
				passTurn();
			};
		},
		passTillPlayer : function() {
			while(player.getAction()) {
				this.passTurn();
			}
		}
	}
})();

Action = function(time, code) {
	var time = time;
	var code = code;
	var unit;
	return {
		setUnit : function(new_unit) {
			console.log('new unit in action')
			console.log(new_unit)
			return unit = new_unit;
		},
		getUnit : function() {
			return unit;
		},
		end : function() {
			code.call(unit);
			if (unit == player) {
				Map.draw();
			};
			unit.endAction();
			console.log('action ended', this);
		},
		do : function() {
			time--;
			if (time <= 0) {
				this.end();
			} else {
				console.log('action passed, turns left: '+time)
			}
		}
	}
}