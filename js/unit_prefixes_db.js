var rare_unit_prefixes = {
	large : new UnitPrefix('Large ', [], {hp:'2d4'}, [], {}),
	pox : new UnitPrefix('Infected ', [], {}, [], {onHit : 'Pox'}),
	zombie : new UnitPrefix('Zombie ', [], {}, ['Zombie', 'Undead'], {})
};
var unique_unit_prefixes = {
	crystal : new UnitPrefix('Crystal ', [], {}, [], {})
};
var epic_unit_prefixes = {
	astral : new UnitPrefix('Astral ', [], {}, [], {})
};
var legendary_unit_prefixes = {
	demigod : new UnitPrefix('Demigod ', [], {}, [], {})
};