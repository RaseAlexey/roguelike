
var Unit = function(template, name, stats, slots, items) {
	this.template = template;
	this.name = name;
	this.stats = stats;
	this.inventory = new Inventory(this, slots, items);


	this.getId = function() {
		return this.place.units.indexOf(this);
	};

	this.generateAction = function(time, code, data, context) {
        this.action = new Action((context || this), time, code, data);
        if (this == player) {
             stack.tick();
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

	this.calcHp = function() {
		var old_max_hp = this.stats['max_hp'];
		var new_max_hp = this.stats['end']*5 + this.stats['bonus_hp'];
		if (new_max_hp == old_max_hp) {
			return true;
		} else {
			var diff = new_max_hp - old_max_hp;
			this.stats['max_hp'] = new_max_hp;
			this.stats['hp'] = this.stats['hp'] ? this.stats['hp'] + diff : this.stats['max_hp'];
		}
	};

	this.incStat = function(stat, value) {
		this.stats[stat].value++;
		this.calcHp();
	};

	this.die = function() {
		chat.send(this.name + ' has died.');
		this.action = undefined;
		this.inventory.emptySlots();
		this.inventory.dropItems();
		this.place.units.splice(this.getId(), 1);
		if (this == player) {
			UI.blockTab('place');
		}
	};

	this.goTo = function(dest) {
	//	console.log(dest);
		var dest_place;
		if(dest.constructor == Place) {
			dest_place = dest;
		} else if (dest.constructor == Floor) {
			dest_place = dest.entrance;
            dest.is_visited = true;
		} else {
			throw new Error('goTo invalid dest type');
		}
		this.generateAction(1, function(data) {
			this.setPlace(data.dest_place);
			if(this == player) {
				chat.send('You entered ' + dest_place.name + '.');
				data.dest_place.units.forEach(function(unit) {
					if(unit != player) {
						unit.tickAI();
					}
				});
			}
		}, {'dest_place' : dest_place});
	};

    this.wait = function() {
        this.generateAction(1, function (data) {
            // do nothing
        }, {} );
    };

    this.rest = function() {
        this.wait();
    };

	this.setPlace = function(place) {
		if(this.place) {
			this.place.removeUnit(this);	
		}
		place.addUnit(this);
		if(this == player) {
			dungeon.current_place = place;
			dungeon.current_floor = place.floor || player.floor || dungeon.current_floor;
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
		console.log(item)
		this.inventory.addItem(item);
	};

	this.pickUpItem = function(id) {
		this.generateAction(1, function (data) {
			this.inventory.pickUpItem(data.id)
		}, {'id':id} );
	};

	this.removeItem = function(id) {
		this.generateAction(1, function (data) {
			this.inventory.removeItem(data.id)
		}, {'id':id} );
	};

	this.wieldItem = function(id) {
		var item = this.inventory.getItemById(id);
		console.log(this.inventory.items, id, item);
		if(item) {
			var slot = this.inventory.getSlotForItem(item);
			console.log(id, item, slot)
			if(slot) {
				if(!slot.item && !slot.pair_slot) {
					if(this.checkRequirements(item.requirements)) {
						console.log('wielding', item.name)
						this.generateAction(1, function (data) {
							this.inventory.wieldItem(data.id)
						}, {'id':id} );	
					} else {
						chat.send('You dont meet requirements for ' + item.name + '.');
					};	
				} else {
					console.log('not empty slot');
					if(slot.type == 'hand') {
						chat.send('You have no empty hands for ' + item.name + '.');
					} else {
						console.log('not hand')
						chat.send("You can't wield " + item.name);
					}
				};
			} else {
				chat.send(item.name + " doesn't fit on your body.");
			};
		} else {
			console.log(this.name, this.inventory.items, id, item);
			throw new Error('unit.js wieldItem');
		}
	};

	this.unwieldItem = function(id) {
		console.log('unit unwield start', id);
		this.generateAction(1, function (data) {
			var item = this.inventory.slots[data.id].item;
			this.inventory.unwieldItem(data.id);
			var name = this == player ? 'You' : this.name;
			chat.send(name + ' unwielded ' + item.name + '.');
		}, {'id':id} );
	};

	this.unpairSlot = function(slot_id) {
		this.generateAction(1, function(data) {
			var name = this == player ? 'You' : this.name;
			this.inventory.unpairSlot(data.slot_id);
			chat.send(name + ' onehanded ' + this.inventory.slots[data.slot_id].item.name + '.');
		}, {'slot_id':slot_id});	
	};

	this.pairSlots = function(slot_id, pair_slot_id) {
		console.log(slot_id, pair_slot_id);
		this.generateAction(1, function(data) {
			this.inventory.pairSlots(data.slot_id, data.pair_slot_id);
			var name = this == player ? 'You' : this.name;
			chat.send(name + ' twohanded ' + this.inventory.slots[slot_id].item.name + '.');
		}, {'slot_id': slot_id, 'pair_slot_id': pair_slot_id});
	};

	this.toggleTwohand = function(slot_id) {
		var slot = this.inventory.slots[slot_id];
		console.log(this.inventory.slots, slot_id, slot);
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
		this.generateAction(1, function (data) {
			this.inventory.dropItem(data.id)
		}, {'id':id} );
	};


	this.calcHp();	
};


var UnitTemplate = function(name, stat_formulas, slots, item_templates) {
	this.name = name;
	this.slots = slots || humanoid_slots
	this.stat_formulas = stat_formulas;
    this.item_templates = item_templates;
	

	this.getUnit = function() {
		var stats = Formula.calcArray(this.stat_formulas);
		stats.max_hp = stats.bonus_hp + 5*stats.end;
		stats.hp = stats.max_hp;
		var items = [];
		if(this.item_templates) {
			this.item_templates.forEach(function(item_template, id) {
				items.push(item_template.getItem());
			});
		}
		return new Unit(this, this.name, stats, this.slots, items);
	};
};

 /*
var units = new Collection([
    new Unit('Rat', {'max_hp':range_formula(10, 15)}),
    new Unit('Zombie', {'max_hp':range_formula(10, 20)}),
    new Unit('Skeleton', {'max_hp':range_formula(5, 20)})
]);
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
	new UnitTemplate('Rat', 		{ 'bonus_hp':range_formula(1, 5), 'str':1, 'dex':1, 'end':0, 'int':0 }, null),
	new UnitTemplate('Zombie', 		{ 'bonus_hp':range_formula(0, 5), 'str':1, 'dex':0, 'end':1, 'int':0 }, humanoid_slots),
	new UnitTemplate('Skeleton', 	{ 'bonus_hp':range_formula(5, 10), 'str':1, 'dex':0, 'end':0, 'int':0 }, humanoid_slots, [item_templates.getByName('Dagger')])
]);