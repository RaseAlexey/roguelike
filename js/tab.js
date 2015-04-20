var Tab = function(node, default_mode) {
	this.node = node;
	this.mode = default_mode;
	this.modes = ['floor', 'place', 'inventory', 'slots', 'stats'];
	this.modes2HTML = {
		'floor' : function() {return player.floor.getHTML()},
		'place' : function() {return player.place.getHTML()},
		'inventory' : function() {return player.getInventoryHTML()},
		'slots' : function() {return player.slots.getHTML()},
		'stats' : function() {return player.getStatsHTML()}
	};

	this.scrollModesRight = function() {
		this.modes.indexOf(this.mode) < this.modes.length - 1 ? this.mode = this.modes[this.modes.indexOf(this.mode)+1] : this.mode = this.modes[0];	console.log(this.mode, this.getOtherTab().mode)
		if(this.mode == this.getOtherTab().mode) {
			this.scrollModesRight();
			this.draw();
		};
	};
	this.scrollModesLeft = function() {
		this.modes.indexOf(this.mode) > 0 ? this.mode = this.modes[this.modes.indexOf(this.mode)-1] : this.mode = this.modes[this.modes.length-1];
		if(this.mode == this.getOtherTab().mode) {
			this.scrollModesLeft();
			this.draw();
		};
	};
	this.getOtherTab = function() {
		return this == left_tab ? right_tab : left_tab;
	};

	this.draw = function() {
		this.node.html(this.getInnerHTML());
	};
};

$(document).on('click', '.scroll-button', function() {
	var tab = $(this).parents().hasClass('left tab') ? left_tab : right_tab;
	if($(this).hasClass('left')) {
		tab.scrollModesLeft();
	} else {
		tab.scrollModesRight();
	};
	tab.draw();
});
