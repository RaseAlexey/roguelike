Unit.prototype.calcDamage = function() {
	return rand(10);
};

Unit.prototype.calcAttackTime = function() {
	return 1;
};

Unit.prototype.decreaseHp = function(damage) {
	this.stats.hp -= damage;
	this.check();
};

Unit.prototype.strike = function(target) {
	console.log('strike', this.name, target.name);
	var data = {};
	data.target = target;
	this.startAction(this.calcAttackTime(), function(data) {
		chat.send(this.name + ' strikes ' + target.name +'.');
		data.target.decreaseHp(this.calcDamage());
	}, data);
};
