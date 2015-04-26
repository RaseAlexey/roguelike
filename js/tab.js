var tabs = [];
var tab_modes2HTML = {
	'floor' : function() { return player.floor.getHTML },
	'place' : function() { return player.place.getHTML },
	'inventory' : function() { return player.getInventoryHTML },
	'slots' : function() { return player.slots.getHTML },
	'stats' : function() { return player.getStatsHTML },
	'chat' : function() { return chat.getHTML }
};

var Tab = function(mode) {
	$('.container').append('<div class="tab" data-id='+tabs.length+'></div>');
	this.node = $('.tab[data-id='+tabs.length+']');
	this.mode = mode;
	tabs.push(this);


	this.getId = function() {
		return tabs.indexOf(this);
	};

	this.draw = function() {
		this.node.html(this.getInnerHTML());
	};

	this.close = function() {
		this.node.remove();
		tabs.splice(this.getId(), 1);
	};
};

var draw_tabs = function() {
	if(tabs.length>0) {
		tabs.forEach(function(tab, id) {
			tab.draw();
		});
	}
};


