
var Item = function(template, name, stats, requirements, slot_type, code) {
	this.name = name;
	this.stats = stats;
	this.requirements = requirements;
	this.slot_type = slot_type;
	this.script = new Script(this, code);


	this.getId = function() {
		if(this.unit) {	
			return this.unit.inventory.items.indexOf(this);
		}
		if(this.place) {
			return this.place.items.indexOf(this);
		}
		if(this.slot) {
			return this.slot.getId();
		}
		return undefined;
	};

	this.setUnit = function(unit) {
		return this.unit = unit;
	};

};

var ItemTemplate = function(name, stat_formulas, requirements, slot_type, code) {
	this.name = name;
	this.stat_formulas = stat_formulas;
	this.requirements = requirements;
	this.slot_type = slot_type;
	this.code = code;


	this.getItem = function() {
		return new Item(this, this.name, Formula.calcArray(this.stat_formulas), requirements, slot_type, code);
	};
};


