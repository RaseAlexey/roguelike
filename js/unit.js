var Unit = function(template, name, stats, items, slots) {
	this.template = template;
	this.name = name;
	this.stats = stats;
	this.slots = new SlotsList(this, slots);
	this.inventory = new Inventory(this, items);

	this.getId = function() {
		return this.place.units.indexOf(this);
	};
	this.startAction = function(time, code, data, context) {
		var context = context || this;
		this.action = new Action(this, time, code, data);
		stack.addAction(this.action);
	};

	this.removeAction = function() {
		this.action = undefined;
	};

	this.strike = function(target) {
		var target;
		this.startAction(this.attack_time, function() {
			target.dealDamage(this.attack_damage);
		}, data)
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

	this.goTo = function(dest) {
		var dest_place = typeof dest == Place ? dest : dest.entrance;
		console.log(dest_place);
		var data = {
			'dest_place' : dest_place
		};
		this.startAction(10, function(data) {
			if(this.place) {
				this.place.removeUnit(this);	
			};
			data.dest_place.addUnit(this);
			if(this == player) {
				dungeon.current_place = dest_place;
			};
		}, data);
	};

	this.getPortraitUrl = function() {
		return 'portraits/'+this.template.name + '.jpg';
	};
};

Unit.prototype.addItem = function(item) {
	this.startAction(1, function (data) {
		this.inventory.addItem(data.item)
	}, {'item':item} );
};
Unit.prototype.pickUpItem = function(id) {
	this.startAction(1, function (data) {
		this.inventory.pickUpItem(data.id)
	}, {'id':id} );
};
Unit.prototype.removeItem = function(id) {
	this.startAction(1, function (data) {
		this.inventory.removeItem(data.id)
	}, {'id':id} );
};
Unit.prototype.wieldItem = function(id) {
	this.startAction(1, function (data) {
		this.inventory.wieldItem(data.id)
	}, {'id':id} );
};
Unit.prototype.unwieldItem = function(id) {
	this.startAction(1, function (data) {
		this.inventory.unwieldItem(data.id)
	}, {'id':id} );
};
Unit.prototype.dropItem = function(id) {
	this.startAction(1, function (data) {
		this.inventory.dropItem(data.id)
	}, {'id':id} );
};

var UnitTemplate = function(name, stat_formulas, slots) {
	this.name = name;
	this.slots = slots;
	this.stat_formulas = stat_formulas;

	this.getUnit = function() {
		return new Unit(this, this.name, Formula.calcArray(this.stat_formulas), this.slots)
	};
};


var unit_templates = new Collection([
	new UnitTemplate('Rat', 		{'hp':range_formula(10, 20)}, []),
	new UnitTemplate('Zombie', 		{'hp':range_formula(20, 30)}, [], humanoid_slots),
	new UnitTemplate('Skeleton', 	{'hp':range_formula(10, 30)}, [], humanoid_slots)
]);

var player = new Unit(null, 'player', {hp:100}, [], humanoid_slots);