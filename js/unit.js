
var Unit = function(template, name, stats, slots, items) {
	this.template = template;
	this.name = name;
	this.stats = stats;
	this.inventory = new Inventory(this, slots, items);
	this.stats['hp'] = this.stats['hp'] ? this.stats['hp'] : this.stats['max_hp'];


	this.getId = function() {
		return this.place.units.indexOf(this);
	};

	this.startAction = function(time, code, data, context) {
		if(!this.action) {
			var context = context || this;
			this.action = new Action(context, time, code, data);
			stack.addAction(this.action);
		}
	};

	this.removeAction = function() {
		this.action = undefined;
	};

	this.isEnemyWith = function(unit) {
		if(this == unit) {
			return false;
		}
		if (this != player && unit != player) {
			return false
		}
		if (this == player && unit != player) {
			return true
		}
		return true;
	};

	this.isEnemy = function() {
		return this.isEnemyWith(player);
	};

	this.check = function() {
		if(this.stats.hp <= 0) {
			this.die();
		}
	};

	this.die = function() {
		chat.send(this.name + ' has died.');
		this.action = undefined;
		this.inventory.emptySlots();
		this.inventory.dropItems();
		this.place.units.splice(this.getId(), 1);
		if(this == player) {
			UI.tabs['place'].block();
		}
	};

	this.goTo = function(dest) {
		var dest_place = typeof dest == Place ? dest : dest.entrance;
		this.startAction(1, function(data) {
			this.setPlace(data.dest_place);
			if(this == player) {
				chat.send('You entered ' + dest_place.name + '.');
				data.dest_place.units.forEach(function(unit, id) {
					if(unit != player) {
						unit.requestAction();
					}
				});
			}
		}, {'dest_place' : dest_place});
	};

	this.setPlace = function(place) {
		if(this.place) {
			this.place.removeUnit(this);	
		}
		place.addUnit(this);
		if(this == player) {
			dungeon.current_place = place;
		}
	};

	this.getPortraitUrl = function() {
		return 'portraits/'+this.template.name + '.jpg';
	};

	this.checkRequirements = function(requirements) {
		var stats = this.stats;
		var res = true;
		$.each(requirements, function(stat, value) {
			if(stats[stat]) {
				if(stats[stat] < value) {
					res = false;
				}
			}
		});
		return res;
	};

	this.addItem = function(item) {
		this.inventory.addItem(item);
	};

	this.pickUpItem = function(id) {
		this.startAction(1, function (data) {
			this.inventory.pickUpItem(data.id)
		}, {'id':id} );
	};

	this.removeItem = function(id) {
		this.startAction(1, function (data) {
			this.inventory.removeItem(data.id)
		}, {'id':id} );
	};

	this.wieldItem = function(id) {
		var item = this.inventory.items[id];
		if(this.inventory.canWield(item)) {
			this.startAction(1, function (data) {
				this.inventory.wieldItem(data.id)
			}, {'id':id} );			
		} else {
			if(this.checkRequirements(item.requirements)) {
				if(item.slot_type == 'hand') {
					chat.send('You have no empty hands for ' + item.name + '.');
				} else {
					chat.send(item.name + " doesn't fit on your body.")
				}
			} else {
				chat.send('You dont meet requirements for ' + item.name + '.')
			}
		}
	};

	this.unwieldItem = function(id) {
		console.log('unit unwield start', id);
		this.startAction(1, function (data) {
			this.inventory.unwieldItem(data.id)
		}, {'id':id} );
	};

	this.unpairSlot = function(slot_id) {
		this.startAction(1, function(data) {
			var name = this == player ? 'You' : this.name;
			this.inventory.unpairSlot(data.slot_id);
			chat.send(name + ' onehanded ' + this.inventory.slots[data.slot_id].item.name + '.');
		}, {'slot_id':slot_id});	
	};

	this.pairSlots = function(slot_id, pair_slot_id) {
		console.log(slot_id, pair_slot_id);
		this.startAction(1, function(data) {
			this.inventory.pairSlots(data.slot_id, data.pair_slot_id);
			var name = this == player ? 'You' : this.name;
			chat.send(name + ' twohanded ' + this.inventory.slots[slot_id].item.name + '.');
		}, {'slot_id': slot_id, 'pair_slot_id': pair_slot_id});
	};

	this.toggleTwohand = function(slot_id) {
		var slot = this.inventory.slots[slot_id];
		if(slot.pair_slot) {
			this.unpairSlot(slot_id);		
		} else {
			if(true) { //twohand condition
				var pair_slot = this.inventory.getPairForSlot(slot_id);
				var pair_slot_id = pair_slot.getId();
				if(pair_slot.item) {
					this.unwieldItem(pair_slot_id);
				} else {
					this.pairSlots(slot_id, pair_slot_id);
				}
			}
		}
	};

	this.dropItem = function(id) {
		this.startAction(1, function (data) {
			this.inventory.dropItem(data.id)
		}, {'id':id} );
	};
};


var UnitTemplate = function(name, stat_formulas, slots) {
	this.name = name;
	this.slots = slots || humanoid_slots
	this.stat_formulas = stat_formulas;
	

	this.getUnit = function() {
		var stats = Formula.calcArray(this.stat_formulas);
		stats.maxHp = stats.hp;
		return new Unit(this, this.name, stats, this.slots);
	};
};

/*
var Rat = function() {
	return new Unit('Rat', {'max_hp':range_formula(10, 15)});
};

var Zombie = function() {
	return new Unit('Zombie', {'max_hp':range_formula(10, 20)});
};

var Skeleton = function() {
	return new Unit('Skeleton', {'max_hp':range_formula(5, 20)});
};
*/


var unit_templates = new Collection([
	new UnitTemplate('Rat', 		{'max_hp':range_formula(10, 20)}, null),
	new UnitTemplate('Zombie', 		{'max_hp':range_formula(20, 30)}, humanoid_slots),
	new UnitTemplate('Skeleton', 	{'max_hp':range_formula(10, 30)}, humanoid_slots)
]);