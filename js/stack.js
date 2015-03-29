var Stack = function() {
	this.actions = [];


	this.tick = function() {
		this.actions.forEach(function(action, id) {
			action.tick();
		});
	};

	this.waitForPlayer = function() {
		while(player.action) {
			this.tick();
		}
	};

	this.addAction = function(action) {
		this.actions.push(action);
		if(action.unit == player) {
			console.log('player started action');
			this.waitForPlayer();
		}
	};

	this.removeAction = function(action) {
		this.actions.splice(this.actions.indexOf(action), 1);
	};
};


var Action = function(unit, time, code, data) {
	this.unit = unit;
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
		console.log('Action ended');
		this.code.call(unit, this.data);
		unit.removeAction();
		stack.removeAction(this);
	};
}