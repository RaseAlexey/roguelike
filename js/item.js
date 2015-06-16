
var Item = function(template, name, stats, requirements, slot_type, code) {
	this.name = name;
	this.stats = stats;
	this.requirements = requirements;
	this.slot_type = slot_type;
	this.script = new Script(this, code);


	this.getId = function() {
		return items.all.indexOf(this);
	};

	this.setUnit = function(unit) {
		return this.unit = unit;
	};
	items.add(this);
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

var items = new Collection();

