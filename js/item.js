var Item = function(template, name, stats, slot_type, code) {
	this.name = name;
	this.stats = stats;
	this.slot_type = slot_type;
	this.script = new Script(this, code);


	this.getId = function() {
		return this.unit.items.indexOf(this);
	};
};

var ItemTemplate = function(template, name, stat_formulas, code) {
	return new Item(this, name, Formula.calcArray(stat_formulas), code);
};


