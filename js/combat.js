
Unit.prototype.calcDamage = function() {
    return this.calcWeaponDamage() + this.calcStrBonus();
};

Unit.prototype.calcWeaponDamage = function() {
    var weapon_damage = 0;
    var weapons = this.inventory.getItemsFromNotEmptySlotsOfType('hand');

    weapons.forEach(function(weapon) {
        weapon_damage += weapon.stats.dmg;
    });

    return weapon_damage;
};

Unit.prototype.calcStrBonus = function() {
    var sum_of_str = 0;
    var weapons = this.inventory.getItemsFromNotEmptySlotsOfType('hand');

    weapons.forEach(function(weapon) {
        sum_of_str += weapon.requirements.str;
    });

    return (sum_of_str > this.stats.str) ? 0 : this.stats.str;
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
	console.log(this.name, 'decreaseHp')
    this.stats.hp -= damage;
    this.check();
};

Unit.prototype.getAbsorb = function() {
    var armor = this.inventory.getItemsFromNotEmptySlotsOfType('torso');
    if (armor.length) {
        console.log(armor);
        return armor[0].stats.def;
    }
    return 0;
};

Unit.prototype.getDodge = function() {
    return 5 + this.stats.dex;
};

Unit.prototype.strike = function(target) {
	//console.log('strike', data.source_name, data.target_name);
	var data = {};
	data.target = target;
    data.source_name = this == player ? 'You' : this.name;
    data.target_name = target == player ? 'You' : target.name;
	this.startAction(this.calcAttackTime(), function(data) {
        var user_str = 0;
        var user_dex = 0;
        this.inventory.slots.forEach(function(slot) {
            if (slot.item && slot.item.requirements) {
                user_str -= slot.item.requirements.str ? slot.item.requirements.str : 0;
                user_dex -= slot.item.requirements.dex ? slot.item.requirements.str : 0;
            }
        });
        var str_bonus = ((this.stats.str - user_str) > 0) ? this.stats.str : 0;
        var dex_bonus = ((this.stats.dex - user_str) > 0) ? this.stats.dex : 0;
        var weapons = this.inventory.getItemsFromNotEmptySlotsOfType('hand');
        if (weapons.length == 0) {
            // удар голыми руками
            weapons.push(new Item(null, 'hand', {'dmg':1, 'accuracy':5, 'attack_time':1}, {}, 'hand', {}));
        }
        weapons.forEach(function(weapon) {
            var accuracy = weapon.stats.accuracy + dex_bonus;
            var dodge = data.target.getDodge();
            var diff = accuracy - dodge;
            //  if (accuracy == dodge) -> 50% miss
            var percent_diff = 50 + parseInt(diff*10);

            var roll = range(0, 100);
            if (roll < percent_diff) {
                console.log(accuracy, dodge, diff, percent_diff);
                // hit!
                var dmg = weapon.stats.dmg + str_bonus;
                var absorb = data.target.getAbsorb();
                if (absorb >= dmg) {
                    // damage absorbed
                    chat.send(data.source_name + ' hit ' + data.target_name +', but damage absorbed.');
                }
                else {
                    // strike successful
                    //chat.send(data.source_name + ' striked ' + data.target_name +' and dealt ' + (dmg - absorb) + ' damage. absorbed: '+absorb);
                    chat.send(data.source_name + ' striked ' + data.target_name +' for ' + (dmg - absorb) + ' damage.');
                    data.target.decreaseHp(dmg - absorb);
                }
            } else {
                // miss!
                console.log(accuracy, dodge, diff, percent_diff);
                //chat.send(data.source_name + ' missed ' + data.target_name +'. (roll: '+roll+', percent:'+percent_diff+')');
                chat.send(data.source_name + ' missed ' + data.target_name +'.');
            }
        }, this);
	}, data);
};
