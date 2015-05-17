
var dungeon = new Dungeon(floor_templates);
var stack = new Stack();

var chat = new Chat();

var sword = new Item(null, 		'sword', 			{'dmg':3}, {'strength':10}, 'hand', {});
var axe = new Item(null, 		'axe', 				{'dmg':3}, {'strength':10}, 'hand', {});
var mace = new Item(null, 		'mace', 			{'dmg':3}, {'strength':10}, 'hand', {});
var hammer = new Item(null, 	'hammer', 			{'dmg':3}, {'strength':10}, 'hand', {});
var spear = new Item(null, 		'spear	', 			{'dmg':3}, {'strength':10}, 'hand', {});
var claymore = new Item(null, 	'claymore	', 		{'dmg':5}, {'strength':14}, 'hand', {});
var light_helm = new Item(null, 'light helm', 		{'armor':1}, {}, 'head', {});
var heavy_helm = new Item(null, 'heavy helm', 		{'armor':2}, {'strength':11}, 'head', {});

player.addItem(sword);
player.addItem(mace);
player.addItem(axe);
player.addItem(hammer);
player.addItem(spear);
player.addItem(claymore);
player.addItem(light_helm);
player.addItem(heavy_helm);
UI.tabs[1].maximize();
UI.tabs[2].maximize();
UI.tabs[4].maximize();
player.goTo(dungeon.floors[0]);
