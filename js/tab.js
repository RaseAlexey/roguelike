var Tab = function(mode, inner_html_func) {
	this.mode = mode;
	this.inner_html_func = inner_html_func;
	this.isBlocked = false;
	this.isMinimized = false;
	//this.needRefresh = false;


	UI.tabs[this.mode] = this;

	this.getId = function() {
		return mode;
	};

	this.draw = function() {	
		UI.node.append(this.getHTML());
		this.node = $('.tab[data-id='+this.mode+']');
	};

	this.refresh = function() {
		if(this.node) {
			this.node.html(this.getInnerHTML());
			//this.needRefresh = false;
		};
	};

	this.minimize = function() {
		if(!this.isMinimized) {	
			this.isMinimized = true;
			this.node.remove();
			UI.refreshTabPanel();
		};
	};

	this.maximize = function() {
		if(this.isMinimized && !this.isBlocked) {	
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

	this.block = function() {
		this.isBlocked = true;
		this.minimize();
	};
};


UI.tabs = {};
UI.drawTabs = function() {
	$.each(this.tabs, function(mode, tab) {
		if(!tab.isMinimized && !tab.isBlocked) {
			tab.draw();
		};
	});
};
UI.refreshTabs = function() {
	$.each(this.tabs, function(mode, tab) {
		if(!tab.isMinimized /* && tab.needRefresh */) {
			tab.refresh();
		};
	});
};
UI.refreshTabPanel = function() {
	var panel = $('.tab-panel');
	var html = '';
	$.each(this.tabs, function(mode, tab) {
		console.log(tab)
		html += tab.getPanelButtonHTML();
	});
	panel.html(html);
};
UI.draw = function() {
	this.refreshTabPanel();
	this.drawTabs();
};

new Tab('place', function() {
	if(dungeon.current_place) {
		return dungeon.current_place.getHTML();
	} else {
		return '';
	};
});
new Tab('inventory', function() {
	if(player) {
		return player.getInventoryHTML();
	} else {
		return '';
	};
});
new Tab('slots', function() {
	if(player) {
		return player.getSlotsHTML();
	} else {
		return '';
	};
});
new Tab('stats', function() {
	if(player) {
		return player.getStatsHTML();
	} else {
		return '';
	};
});
new Tab('chat', function() {
	if(chat) {
		return chat.getHTML();
	} else {
		return '';
	};
});


