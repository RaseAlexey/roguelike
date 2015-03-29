
var dungeon = new Dungeon(floor_templates);
var stack = new Stack();

var chat = new Chat($('.chatbox'));
var left_tab = new Tab($('.left-tab'), 'place');
var right_tab = new Tab($('right-tab'), 'inv');

var player = new Unit('player', 100);
player.goTo(dungeon.floors[0]);