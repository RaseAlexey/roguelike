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
		};
	};

	this.addAction = function(action) {
		this.actions.push(action);
		if(action.context == player) {
			console.log('player started action');
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
		console.log('Action ended');
		this.code.call(context, this.data);
		context.removeAction();
		stack.removeAction(this);
		UI.refreshTabs();
	};
}