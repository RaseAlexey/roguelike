

var dungeon = new Dungeon(floor_templates);
var stack = new Stack();
var chat = new Chat();

var player = new Unit(null, 'player', {'max_hp':100, 'strength': 10}, humanoid_slots, [// Items
//	sword, axe, mace, hammer, spear, claymore, light_helm, heavy_helm
]);

// dungeon.floors[0].entrance.clearEnemies();

var draft_handler = new Inquirer(initial_draft);
draft_handler.start();

player.goTo(dungeon.floors[0]);
UI.draw();