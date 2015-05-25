
Unit.prototype.requestAction = function() {
	if(!this.sawPlayer) {
		chat.send(this.name + ' noticed you!');
		this.sawPlayer = true;
	};
	this.strike(player);
};