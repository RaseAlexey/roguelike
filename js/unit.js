var Unit = function(template, name, stats, slots, items) {
	this.template = template;
	this.name = name;
	this.stats = stats;
	this.inventory = new Inventory(this, slots, items);

	this.getId = function() {
		return this.place.units.indexOf(this);
	};

	this.startAction = function(time, code, data, context) {
		if(!this.action) {
			var context = context || this;
			this.action = new Action(this, time, code, data);
			stack.addAction(this.action);
		}
	};

	this.removeAction = function() {
		this.action = undefined;
	};

	this.isEnemyWith = function(unit) {
		if (this != player && unit != player) {
			return false
		};
		if (this == player && unit != player) {
			return true
		};
		return true;
	};

	this.isEnemy = function() {
		return this.isEnemyWith(player);
	};

	this.check = function() {
		if(this.hp <= 0) {
			this.die();
		}
	};

	this.die = function() {
		this.inventory.emptySlots();
		this.inventory.dropItems();
		this.place.units.splice(this.getId(), 1);
	};

	this.goTo = function(dest) {
		var dest_place = typeof dest == Place ? dest : dest.entrance;
		this.startAction(1, function(data) {
			this.setPlace(data.dest_place);
			if(this == player) {
				chat.send('You entered ' + dest_place.name + '.');
			}
		}, {'dest_place' : dest_place});
	};

	this.setPlace = function(place) {
		if(this.place) {
			this.place.removeUnit(this);	
		};
		place.addUnit(this);
		if(this == player) {
			dungeon.current_place = place;
		};
	};


	this.getPortraitUrl = function() {
		return 'portraits/'+this.template.name + '.jpg';
	};

	this.checkRequirements = function(requirements) {
		var stats = this.stats;
		var res = true;
		$.each(requirements, function(stat, value) {
			if(stats[stat]) {
				console.log(stats[stat], value)
				if(stats[stat] < value) {
					res = false;
				};
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
		console.log('unit unwield start', id)
		this.startAction(1, function (data) {
			this.inventory.unwieldItem(data.id)
		}, {'id':id} );
	};

	this.toggleTwohand = function(slot_id) {
		var slot = this.inventory.slots[slot_id];
		var data = {'slot_id' : slot_id};
		if(slot.pair_slot) {
			this.startAction(1, function(data) {
				this.inventory.unpairSlot(data.slot_id);
				chat.send(this.name + ' onehanded ' + slot.item.name + '.')
			}, {'slot_id':slot_id});			
		} else {
			if(true) { //twohand condition
				var pair_slot = this.inventory.getPairForSlot(slot_id);
				data['pair_slot_id'] = pair_slot.getId();
				if(pair_slot.item) {
					console.log(slot.getId(), pair_slot.getId());
					this.startAction(1, function (data) {
						this.inventory.unwieldItem(data.pair_slot_id);
						this.startAction(1, function(data) {
							this.inventory.pairSlots(data.slot_id, data.pair_slot_id);
							chat.send(this.name + ' twohanded ' + this.inventory.slots[data.slot_id].item.name + '.')
						}, data);
					}, data);
				} else {
					this.startAction(1, function(data) {
						this.inventory.pairSlots(data.slot_id, data.pair_slot_id);
						chat.send(this.name + ' twohanded ' + this.inventory.slots[data.slot_id].item.name + '.')
					}, data);
				}
			};			
		};
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


var unit_templates = new Collection([
	new UnitTemplate('Rat', 		{'hp':range_formula(10, 20)}, null),
	new UnitTemplate('Zombie', 		{'hp':range_formula(20, 30)}, humanoid_slots),
	new UnitTemplate('Skeleton', 	{'hp':range_formula(10, 30)}, humanoid_slots)
]);

var player = new Unit(null, 'player', {'maxhp':100, 'strength': 10}, humanoid_slots_four_hands, []	);