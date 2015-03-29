var Tab = function(node, default_mode) {
	this.node = node;
	this.mode = default_mode;
	this.modes = ['floor', 'place', 'inv', 'stats'];
	this.modes2HTML = {
		'floor' : function() {return player.floor.getHTML()},
		'place' : function() {return player.place.getHTML()},
		'inv' : function() {return player.inv.getHTML()},
		'stats' : function() {return player.getHTML()}
	};

	this.scrollModes = function() {
		this.modes.indexOf(this.mode) < this.modes.length - 1 ? this.mode = this.modes[this.modes.indexOf(this.mode)+1] : this.mode = this.modes[0];
	};

	this.draw = function() {
		this.node.html(this.getHTML());
	};

	this.getHTML = function() {
		return this.modes2HTML[this.mode];
	};
};