
var UI = {
	'node' : $('.container')
};


$(document).on('click', '.drop-button', function(event) {
	var id = $(this).parent().data('id');
	player.dropItem(id);
	event.stopPropagation();
});

$(document).on('click', '.twohand-button', function(event) {
	var id = $(this).parent().data('id');
	player.toggleTwohand(id);
	event.stopPropagation();
});

$(document).on('click', '.inventory .item', function() {
	var id = $(this).data('id');
	player.wieldItem(id);
});

$(document).on('click', '.slot .item', function() {
	var id = $(this).parent().data('id');
	player.unwieldItem(id);
});

$(document).on('click', '.place_items .item', function() {
	var id = $(this).data('id');
	player.pickUpItem(id);
});

$(document).on('click', '.unit.enemy', function() {
	var id = $(this).data('id');
	player.strike(dungeon.current_place.units[id]);
});

$(document).on('click', '.tab_header', function() {
	var tab = UI.tabs[$(this).parent().data('id')];
	console.log(tab);
	tab.minimize();
});

$(document).on('click', '.tab-icon', function() {
	var tab = UI.tabs[$(this).data('id')];
	console.log(tab);
	tab.toggle();
});

$(document).on('click', '.connection', function() {
	var x = $(this).data('x');
	var y = $(this).data('y');
	var dest = dungeon.current_floor.places[y][x];
	console.log(x, y, dungeon.current_floor[x])
	player.goTo(dest);
});

$(document).on('click', '.option', function() {
	var id = $(this).data('id');
	draft.chooseOption(id);
});