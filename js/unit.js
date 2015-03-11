var Unit = function(name, hp) {
	this.name = name;
	this.hp = hp;
	this.items = [];


	this.startAction = function(time, code, data) {
		this.action = new Action(this, time, code, data);
		stack.addAction(this.action);
	};

	this.strike = function(target) {
		var target;
		this.startAction(this.attack_time, function() {
			target.dealDamage(this.attack_damage);
		}, data)
	};

	this.removeAction = function() {
		this.action = undefined;
	};

	this.goTo = function(target_place) {
		var data = {
			'target_place' : target_place
		};
		this.startAction(10, function(data) {
			if(this.place) {
				this.place.removeUnit(this);	
			};
			data.target_place.addUnit(this);
			if(this == player) {
				dungeon.current_floor = target_place;
				left_tab.content = target_place;
				left_tab.draw();
			};
		}, data);
	};
};


var UnitTemplate = function(name, hp_formula) {
	this.name = name;
	this.hp_formula = hp_formula;


	this.getUnit = function() {
		return new Unit(name, hp_formula())
	};
};


var unit_templates = new Collection([
	new UnitTemplate('Rat', range_formula(10, 20)),
	new UnitTemplate('Zombie', range_formula(20, 30)),
	new UnitTemplate('Skeleton', range_formula(10, 30))
])