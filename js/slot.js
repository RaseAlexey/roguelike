var Slot = function(name, item_types) {
	var name = name;
	var item_types = item_types;
	var inventory;
	var item;
	return {
		getId : function() {
			return this.getInventory().getSlots().indexOf(this);
		},
		getName : function() {
			return name;
		},
		getInventory : function() {
			return inventory;
		},
		setInventory : function(new_inventory) {
			console.log('setting inventory to slot '+this.getName());
			return inventory = new_inventory;
		},
		getItemTypes : function() {
			return item_types;
		},
		getItem : function() {
			return item;
		},
		setItem : function(new_item) {
			if(new_item) {
				new_item.setSlot(this);
				new_item.removeItemCell();
			};
			return item = new_item;
		},
		removeItem : function() {
			return item = undefined;
		},
		hasItem : function() {
			return !!item;
		},
		canContain : function(item) {
			if(!item) {
				return true
			};
			console.log(this.getItemTypes(), item.getType())
			return this.getItemTypes().indexOf(item.getType())>=0;
		},
		getInnerCode : function() {
			if(this.hasItem()) {
				return this.getItem().getCode();
			} else {
				return '';
			}
		},
		getCode : function() {
			var code = '<div class="slot" data-id='+this.getId()+'>';
			code += this.getInnerCode();
			code += '</div>';
			return code;
		},
		refresh : function() {
			$('.slot[data-id='+this.getId()+']').html(this.getInnerCode());
		}
	}
};
var SlotTemplate = function(template_name, item_types) {
	var template_name = template_name;
	var item_types = item_types;
	return {
		getName : function() {
			return template_name;
		},
		getSlot : function() {
			var name = this.getName();
			var slot = new Slot(name, item_types);
			return slot;
		}
	}
};
Slot.generate = function(name) {
	return slot_templates_by_name[name].getSlot();
}
var slot_templates = [
	new SlotTemplate('Hand', 'weapon'),
	new SlotTemplate('Head', 'head_armor'),
];
var slot_templates_by_name = {};
slot_templates.forEach(function(template, index) {
	slot_templates_by_name[template.getName()] = template;
});