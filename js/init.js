
var dungeon = new Dungeon(floor_templates);
var stack = new Stack();

var chat = new Chat($('.chatbox'));
var left_tab = new Tab($('.left.tab'), 'place');
var right_tab = new Tab($('.right.tab'), 'inventory');

var player = new Unit(null, 'player', {hp:100}, [], humanoid_slots);
var sword = new Item(null, 'sword', {'dmg':10}, 'hand', {});
var bow = new Item(null, 'bow', {'dmg':5}, 'hand', {});
var light_helm = new Item(null, 'light helm', {'armor':1}, 'head', {});
var heavy_helm = new Item(null, 'heavy helm', {'armor':2}, 'head', {});
player.addItem(sword);
player.addItem(bow);
player.addItem(light_helm);
player.addItem(heavy_helm);
player.goTo(dungeon.floors[0]);