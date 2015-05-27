
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
    var weapon_time = 0;
    var weapons = this.inventory.getItemsFromNotEmptySlotsOfType('hand');

    weapons.forEach(function(weapon) {
        if (weapon_time = 0) {
            weapon_time += weapon.stats.attack_time;
        } else {
            if (weapon.stats.attack_time > 1) {
                weapon_time += (weapon.stats.attack_time - 1);
            }
        }
    });

	return weapon_time > 0 ? weapon_time : 1;
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
