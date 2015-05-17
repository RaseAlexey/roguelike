var Stack = function() {
	this.actions = [];
	this.time = 0;

	this.tick = function() {
		if(this.time >= 10) return; //for preventing infinite loops in case of fuck-ups
		this.time++;
		console.log('stack tick', this.time);
		if(this.actions.length > 0) {
			this.actions.forEach(function(action, id) {
				action.tick();
			});
		};
		if(dungeon.current_place) {
			dungeon.current_place.tick()
		};
	};

	this.waitForPlayer = function() {
		while(player.action) {
			this.tick();
		};
	};

	this.addAction = function(action) {
		this.actions.push(action);
		if(action.context == player) {
			this.waitForPlayer();
		}
	};

	this.removeAction = function(action) {
		this.actions.splice(this.actions.indexOf(action), 1);
	};
};


var Action = function(context, time, code, data) {
	this.context = context;
	this.time = time;
	this.code = code;
	this.data = data;

	this.tick = function() {
		this.time --;
		if(this.time <=0) {
			this.end();
		}
	};


	this.end = function() {
		this.code.call(context, this.data);
		context.removeAction();
		stack.removeAction(this);
		UI.refreshTabs();
	};
}