
var dungeon = new Dungeon(floor_templates);
var stack = new Stack();

var chat = new Chat();

var sword = new Item(null, 'sword', {'dmg':10}, 'hand', {});
var axe = new Item(null, 'axe', {'dmg':10}, 'hand', {});
var bow = new Item(null, 'bow', {'dmg':5}, 'hand', {});
var light_helm = new Item(null, 'light helm', {'armor':1}, 'head', {});
var heavy_helm = new Item(null, 'heavy helm', {'armor':2}, 'head', {});

player.addItem(sword);
player.addItem(bow);
player.addItem(axe);
player.addItem(light_helm);
player.addItem(heavy_helm);

player.goTo(dungeon.floors[0]);
