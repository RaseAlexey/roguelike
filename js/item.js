var Item = function(name, type, stats, actions, script) {
	var item_cell; //inventory item cell in which item is contained
	var slot; //slot in which item is contained
	var name = name;
	var type = type;
	var stats = stats;
	var actions = actions;
	var script = script;
	return {
		getId : function() {
			if(this.getItemCell()) {
				return this.getItemCell().getId();	
			};
			if(this.getSlot()) {
				return this.getSlot().getId();
			}
		},
		getItemCell : function() {
			return item_cell;
		},
		setItemCell : function(new_item_cell) {
			console.log('setting new item cell')
			return item_cell = new_item_cell;
		},
		getSlot : function() {
			return slot;
		},
		setSlot : function(new_slot) {
			return slot = new_slot;
		},
		putOn : function() {
			this.getOwner().addBonuses(this.getStats());
		},
		TakeOff : function() {
			this.getOwner().subtractBonuses(this.getStats());
		},
		removeItemCell : function() {
			return item_cell = undefined;
		},
		removeSlot : function() {
			return slot = undefined;
		},
		getOwner : function() {
			return this.getInventory().getOwner();
		},
		getName : function() {
			return name;
		},
		getType: function() {
			return type;;
		},
		getStats: function() {
			return stats;
		},
		getActions: function() {
			return actions;
		},
		getScript: function() {
			return script;
		},
		getIconUrl : function() {
			if(item_images_by_name[this.getName()]) {
				return item_images_by_name[this.getName()]
			} else {
				return item_images_by_name[this.getTemplate().getName()];
			}
		},
		getCode : function() {
			var code = '';
			code += '<div class="item_code" data-id='+this.getId()+'><img class="item_icon" src = '+this.getIconUrl()+'></div>'
			return code;
		}
	}
};

var ItemTemplate = function(template_name, bonuses, actions, slots, script) {
	var template_name = template_name;
	var bonuses = bonuses;
	var actions = actions;
	var slots = slots; //slots in which item fits
	var script = script;
	return {
		getItem : function() {
			var name = template_name;
			var stats = stats;
			var item = new Item(name, stats);
			item.setTemplate(this);
			return item;
		}
	}
}