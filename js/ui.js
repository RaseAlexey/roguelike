
var UI = {
	'node' : $('.container')
};

$(document).on('click', '.list-header', function() {
    var list = $(this).next();
    if(list.is(':visible')) {  
        list.hide();
    } else {
        list.show();
    }
});

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
    console.log(id);
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

$(document).on('click', '.wait-button', function(event) {
});

$(document).on('click', '.rest-button', function(event) {
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
    console.log(x, y, dungeon.current_floor[x]);
    player.goTo(dest);
});

$(document).on('click', '.stairs', function() {
    var z = $(this).hasClass('up') ? 'up' : 'down';
    var dest = null;
    var current_z = dungeon.floors.indexOf(dungeon.current_floor);
    if (z == 'up') {
        if (current_z == 0) {
            save();
        }
        dest = dungeon.floors[current_z-1];
    } else if (z == 'down') {
        if (current_z == dungeon.floors.length-1) {
            alert("end of dungeon, WIN");
        }
        dest = dungeon.floors[current_z+1];

        if (!dest.is_visited) {
            // level up!
            console.log('LEVEL UP!');
            var draft = new Draft(dungeon.floors.indexOf(dungeon.current_floor)+1, 1);
            player.goTo(dest);
        }

    } else {
        alert('wrong connection');
    }
});

$(document).on('click', '.option', function() {
	var id = $(this).data('id');
	UI.tabs['draft'].data.draft.pick(id);
});

