var Inventory = function(unit, items) {
	this.unit = unit;
	this.items = items || [];


	this.addItem = function(item) {
		var item = (item instanceof Item ? item : new Item(item));
		item.unit = this;
		this.items.push(item);
	};

	this.removeItem = function(item_id) {
		var item = this.items[item_id];
		if(item) {
			this.items.splice(item_id, 1);
			return item;
		} else {
			return false
		}
	};

	this.wieldItem = function(item_id) {
		var item = this.items[item_id];
		var slot = this.unit.slots.getSlot(item.type);
		if(slot) {
			this.removeItem(item_id);
			if (!slot.isFree()) {			
				slot.removeItem();
			};
			slot.putItem(item);
		};
	};

	this.dropItem = function(item_id) {
		var item = this.removeItem(item_id);
		if(item) {
			this.unit.place.addItem(item);
		};
	};

};

Unit.prototype.addItem = function(item) {
	this.inventory.addItem(item);
};
Unit.prototype.removeItem = function(id) {
	this.inventory.removeItem(id);
};
Unit.prototype.dropItem = function(id) {
	this.inventory.dropItem(id);
};

$(document).on('click', '.inventory .item', function() {
	var id = $(this).data('id');
	player.inventory.wieldItem(id);
});

