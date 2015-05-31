

var dungeon = new Dungeon(floor_templates);
var stack = new Stack();
var chat = new Chat();

var player = new Unit(null, 'player', {'bonus_hp': 10, 'str': 1, 'dex': 1, 'end': 1, 'int': 1}, humanoid_slots, [// Items
//	sword, axe, mace, hammer, spear, claymore, light_helm, heavy_helm
]);

// dungeon.floors[0].entrance.clearEnemies();
var draft = draft_generator();
draft.start();