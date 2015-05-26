

var dungeon = new Dungeon(floor_templates);
var stack = new Stack();
var chat = new Chat();

/*
 Основная концепция балансировки оружия:
 attack_time = 1; dmg + accuracy =  10;
 attack_time = 2; dmg + accuracy =  15;
 attack_time = 3; dmg + accuracy =  20;
 */


var sword = new Item(null, 		'sword', 			{'dmg':3, 'accuracy':7, 'attack_time':1, 'weight':10}, {'strength':10}, 'hand', {});
var axe = new Item(null, 		'axe', 				{'dmg':4, 'accuracy':6, 'attack_time':1, 'weight':10}, {'strength':10}, 'hand', {});
var mace = new Item(null, 		'mace', 			{'dmg':5, 'accuracy':5, 'attack_time':1, 'weight':10}, {'strength':10}, 'hand', {});
var spear = new Item(null, 		'spear	', 			{'dmg':8, 'accuracy':7, 'attack_time':2, 'weight':10}, {'strength':10}, 'hand', {});
var hammer = new Item(null, 	'hammer', 			{'dmg':10, 'accuracy':5, 'attack_time':2, 'weight':10}, {'strength':10}, 'hand', {});
var claymore = new Item(null, 	'claymore	', 		{'dmg':16, 'accuracy':4, 'attack_time':3, 'weight':10}, {'strength':20}, 'hand', {});

var light_helm = new Item(null, 'light helm', 		{'armor':1, 'weight':4}, {}, 'head', {});
var heavy_helm = new Item(null, 'heavy helm', 		{'armor':2, 'weight':8}, {'strength':11}, 'head', {});

//var heavy_helm = new Item(null, 'heavy helm', 		{'armor':2, 'weight':8}, {'strength':11}, 'head', {});

var player = new Unit(null, 'player', {'max_hp':100, 'strength': 10}, humanoid_slots, [// Items
	sword, axe, mace, hammer, spear, claymore, light_helm, heavy_helm
]);

// dungeon.floors[0].entrance.clearEnemies();
player.goTo(dungeon.floors[0]);
UI.draw();