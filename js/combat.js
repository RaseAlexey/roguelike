
Unit.prototype.calcDamage = function() {
    var weapon_damage = 0;
    var str_modificator = 10;
    var weapons = this.inventory.getItemsFromNotEmptySlotsOfType('hand');

    weapons.forEach(function(weapon) {
        weapon_damage += weapon.stats.dmg;
    });

    return weapon_damage + range(0, str_modificator);
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
