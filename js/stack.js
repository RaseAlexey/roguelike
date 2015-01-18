var Stack = (function() {
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
				if(object.getAction()) {
					object.getAction().do();
				} else {
					if (object == Player) {
											
					} else {
						processFor(object);
					}
				}
				
			});
		},
		pass : function(time) {
			for(var i=0; i<time; i++) {
				passTurn();
			};
		},
		passTillPlayer : function() {
			while(Player.getAction()) {
				this.passTurn();
			}
		},
		refresh : function() {
			if(Player.getPlace()) {
				$('.main').html(Player.getPlace().getCode());
				$('.header').html(Player.getLocation().getName()+': '+Player.getPlace().getName()+Player.getPlace().getDepth())
			};
		}
	}
})();

var Action = function(time, code) {
	var time = time;
	var code = code;
	var unit;
	return {
		setUnit : function(new_unit) {
			return unit = new_unit;
		},
		getUnit : function() {
			return unit;
		},
		end : function() {
			code.call(unit);
			if (unit == Player) {
				Stack.refresh();
			};
			unit.endAction();
		},
		do : function() {
			time--;
			if (time <= 0) {
				this.end();
			}
		}
	}
}