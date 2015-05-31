var Tab = function(mode, inner_html_func, data) {
	this.mode = mode;
	this.inner_html_func = inner_html_func;
	this.data = data;
	this.isBlocked = false;
	this.isMinimized = false;
	//this.needRefresh = false;

	this.getId = function() {
		return mode;
	};

	this.draw = function() {	
		if(!this.isHidden) {
			this.isMinimized = false;
			UI.node.append(this.getHTML());
			this.node = $('.tab[data-id='+this.mode+']');	
		};
	};

	this.refresh = function() {
		if(this.node) {
			this.node.html(this.getInnerHTML());
			//this.needRefresh = false;
		}
	};

	this.minimize = function() {
		if(!this.isMinimized) {	
			this.isMinimized = true;
			this.node.remove();
			UI.refreshTabPanel();
		}
	};

	this.maximize = function() {
		if(this.isMinimized && !this.isBlocked && !this.isHidden) {	
			this.isMinimized = false;
			this.draw();
			UI.refreshTabPanel();
		}
	};

	this.hide = function() {
		if(!this.isHidden) {	
			this.isHidden = true;
			this.node.remove();
			UI.refreshTabPanel();
		}
	};

	this.show = function() {
		if(this.isHidden) {	
			this.isHidden = false;
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

	this.unblock = function() {
		this.isBlocked = false;
		this.maximize();
	};
};


UI.tabs = {};

UI.addTab = function(tab) {
	//console.log(tab, this.tabs)
	if(this.tabs[tab.mode]) {
		throw new Error('adding tab with same name');
	} else {
		this.tabs[tab.mode] = tab;
	};
};

UI.removeTab = function(tab_name) {
	if(this.tabs[tab_name]) {
		delete this.tabs[tab_name];
	}
};

UI.blockTab = function(tab_name) {
	this.tabs[tab_name].block();
};

UI.unblockTab = function(tab_name) {
	this.tabs[tab_name].unblock();
};

UI.blockTabs = function() {
	$.each(function(tab_name, tab) {
		tab.block();
	});
};

UI.unblockTabs = function() {
	$.each(function(tab_name, tab) {
		tab.unblock();
	});
};

UI.hideTab = function(tab_name) {
	this.tabs[tab_name].hide();
};

UI.showTab = function(tab_name) {
	this.tabs[tab_name].show();
};

UI.hideTabs = function() {
	$.each(this.tabs, function(tab_name, tab) {
		tab.hide();
	});
};

UI.showTabs = function() {
	$.each(this.tabs, function(tab_name, tab) {
		tab.show();
	});
};

UI.minimizeTab = function(tab_name) {
	this.tabs[tab_name].minimize();
};

UI.maximizeTab = function(tab_name) {
	this.tabs[tab_name].maximize();
};

UI.minimizeTabs = function() {
	$.each(this.tabs, function(tab_name, tab) {
		tab.minimize();
	});
};

UI.maximizeTabs = function() {
	$.each(this.tabs, function(tab_name, tab) {
		tab.maximize();
	});
};

UI.drawTabs = function() {
	$.each(this.tabs, function(mode, tab) {
		if(!tab.isMinimized && !tab.isBlocked) {
			tab.draw();
		}
	});
};

UI.refreshTabs = function() {
	$.each(this.tabs, function(mode, tab) {
		if(!tab.isMinimized /* && tab.needRefresh */) {
			tab.refresh();
		}
	});
};

UI.refreshTabPanel = function() {
	var panel = $('.tab-panel');
	var html = '';
	$.each(this.tabs, function(mode, tab) {
		if(!tab.isHidden && tab.getPanelButtonHTML) {
			console.log(tab)
			html += tab.getPanelButtonHTML();
		};
	});
	panel.html(html);
};

UI.draw = function() {
	this.refreshTabPanel();
	this.drawTabs();
};



UI.addTab(new Tab('inventory', function(data) {
	if(player) {
		return player.getInventoryHTML();
	} else {
		return '';
	}
}));

UI.addTab(new Tab('slots', function(data) {
	if(player) {
		return player.getSlotsHTML();
	} else {
		return '';
	}
}));

UI.addTab(new Tab('stats', function(data) {
	if(player) {
		return player.getStatsHTML();
	} else {
		return '';
	}
}));

UI.addTab(new Tab('chat', function(data) {
	if(chat) {
		return chat.getHTML();
	} else {
		return '';
	}
}));

UI.addTab(new Tab('place', function(data) {
	if(dungeon.current_place) {
		return dungeon.current_place.getHTML();
	} else {
		return '';
	}
}));
