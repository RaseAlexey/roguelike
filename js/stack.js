
var Stack = function() {
	this.time = 0;


	this.tick = function() {
		this.time++;
		if(dungeon.current_place) {
			var units = dungeon.current_place.units;
			units.forEach(function(unit) {
				if(unit.action) {
					unit.action.tick();
				} else if (unit != player) {
					unit.tickAI();
				}
			});
		} else {
            console.log(player);
			player.action.tick();
		}
		if(player.action) {	
			console.log('player has action', player.action);		
			this.tick();
		} else {
			UI.refreshTabs();
		}	
	};

	this.addAction = function(action) {  // deprecated
        console.log(action);
		if(action.context == player) { //Player's actions cause stack to tick and process all actions
			this.tick();
		}
	};

};


var Action = function(context, time, code, data) {
	this.context = context;
	this.time = time;
	this.code = code;
	this.data = data;


	this.tick = function() {
		this.time--;
		if(this.time <= 0) {
			this.end();
		}
	};

	this.end = function() {
		this.code.call(context, this.data);
		context.removeAction();
	};
};