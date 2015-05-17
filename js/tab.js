var Tab = function(mode) {
	this.mode = mode;
	UI.tabs.push(this);
	this.isMinimized = true;
	UI.refreshTabPanel();

	this.getId = function() {
		return UI.tabs.indexOf(this);
	};

	this.draw = function() {
		UI.node.append(this.getHTML());
		this.node = $('.tab[data-id='+this.getId()+']');
	};

	this.refresh = function() {
		this.node.html(this.getInnerHTML());
	};

	this.minimize = function() {
		if(!this.isMinimized) {	
			this.isMinimized = true;
			this.node.remove();
			UI.refreshTabPanel();
		};
	};

	this.maximize = function() {
		if(this.isMinimized) {	
			this.isMinimized = false;
			this.draw();
			UI.refreshTabPanel();
		}
	};

	this.toggle = function() {
		if(this.isMinimized) {
			this.maximize();
		} else {
			this.minimize();
		}
	};
};

UI.tabs = [];
UI.tab_modes2HTML = {
	'place' : function() { return player.place.getHTML() },
	'inventory' : function() { return player.getInventoryHTML() },
	'slots' : function() { return player.getSlotsHTML() },
	'stats' : function() { return player.getStatsHTML() },
	'chat' : function() { return chat.getHTML() }
};

UI.refreshTabs = function() {
	if(this.tabs.length>0) {
		this.tabs.forEach(function(tab, id) {
			if(!tab.isMinimized) {
				tab.refresh();
			}
		});
	}
};
UI.refreshTabPanel = function() {
	var panel = $('.tab-panel');
	var html = '';
	this.tabs.forEach(function(tab, id) {
		if(tab.isMinimized) {
			var classes = 'minimized'
		} else {
			var classes = 'maximized'
		};
		html += '<div class="tab-icon '+classes+'" data-id='+id+'>'+tab.mode+'</div>'
	});
	panel.html(html);
};

new Tab('place');
new Tab('inventory');
new Tab('slots');
new Tab('stats');
new Tab('chat');

UI.refreshPlace = function() {
	this.tabs[0].refresh();
};
UI.refreshInventory = function() {
	this.tabs[1].refresh();
};
UI.refreshSlots = function() {
	this.tabs[2].refresh();
};
UI.refreshStats = function() {
	this.tabs[3].refresh();
};
UI.refreshChat = function() {
	this.tabs[4].refresh();
};

$(document).on('click', '.tab_header', function() {
	var tab = UI.tabs[$(this).parent().data('id')];
	tab.minimize();
});

$(document).on('click', '.tab-icon', function() {
	var tab = UI.tabs[$(this).data('id')];
	tab.toggle();
});

