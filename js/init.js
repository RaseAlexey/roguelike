

var dungeon = new Dungeon(floor_templates);
var stack = new Stack();
var chat = new Chat();



var sword = new Item(null, 		'sword', 			{'dmg':6}, {'strength':10}, 'hand', {});
var axe = new Item(null, 		'axe', 				{'dmg':8}, {'strength':10}, 'hand', {});
var mace = new Item(null, 		'mace', 			{'dmg':8}, {'strength':10}, 'hand', {});
var hammer = new Item(null, 	'hammer', 			{'dmg':4}, {'strength':10}, 'hand', {});
var spear = new Item(null, 		'spear	', 			{'dmg':8}, {'strength':10}, 'hand', {});
var claymore = new Item(null, 	'claymore	', 		{'dmg':16}, {'strength':14}, 'hand', {});
var light_helm = new Item(null, 'light helm', 		{'armor':1}, {}, 'head', {});
var heavy_helm = new Item(null, 'heavy helm', 		{'armor':2}, {'strength':11}, 'head', {});

var player = new Unit(null, 'player', {'max_hp':100, 'strength': 10}, humanoid_slots, [// Items
	sword, axe, mace, hammer, spear, claymore, light_helm, heavy_helm
]);

// dungeon.floors[0].entrance.clearEnemies();
player.goTo(dungeon.floors[0]);
UI.draw();