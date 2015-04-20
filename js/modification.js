/*
	Modifications are diablo-inspired prefixes and affixes. They can be rolled for barely anything in the game. It is supposed to add
	replayability to the game.
	Modifications may and should be organized by ideas/things they are rolled for/rarity.
*/
var Modification = function(text, type, stats, script) {
	this.text = text;  	// the words modification adds to name of the object it is applied to.
	this.type = type; 	// 'prefix' of 'affix'.
	this.stats = stats;
	this.script = script;	

	this.apply = function(object) {
		var mod_stats = this.stats;

		if(type == 'prefix') {
			object.name = this.text + ' ' + object.name;
		} else {
			object.name = object.name + ' ' + this.text;
		};	

		$.each(object.stats, function(stat, value) {
			value += mod_stats[stat];
		});

		$.each(object.script, function(script_handler, func) {
			value += mod_stats[stat];
		});

	};
}; 