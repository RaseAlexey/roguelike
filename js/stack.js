var Stack = function() {
	this.actions = [];
	this.time = 0;


	this.tick = function() {
		this.time++;
		if(dungeon.current_place) {
			dungeon.current_place.tick();
		} else {
			player.action.tick();
		};
		if(player.action) {			
			this.tick();
		};
	};

	this.addAction = function(action) {
		this.actions.push(action);
		if(action.context == player) { //Player's actions cause stack to tick and process all actions
			this.tick();
		};
	};

	this.removeAction = function(id) {
		this.actions.splice(id, 1);
	};
};


var Action = function(context, time, code, data) {
	this.context = context;
	this.time = time;
	this.code = code;
	this.data = data;

	this.tick = function() {
		this.time --;
		if(this.time <= 0) {
			this.end();
		}
	};

	this.end = function() {
		this.code.call(context, this.data);
		context.removeAction();
		stack.removeAction(stack.actions.indexOf(this));
		UI.refreshTabs();
	};
}