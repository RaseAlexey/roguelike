var Inventory = function(unit, items) {
	this.unit = unit;
	this.slots = this.unit.slots;
	this.items = items || [];


	this.addItem = function(item) {
		item.unit = this;
		this.items.push(item);
	};

	this.pickUpItem = function(id) {
		var item = this.unit.place.items[id];
		this.unit.place.items.splice(id, 1);
		item.unit = this;
		this.items.push(item);
	};

	this.removeItem = function(item_id) {
		var item = this.items[item_id];
		if(item) {
			item.unit = undefined;
			this.items.splice(item_id, 1);
			return item;
		} else {
			return false;
		}
	};

	this.wieldItem = function(item_id) {
		var item = this.items[item_id];
		var slot = this.slots.getSlotFor(item);
		if (slot) {
			console.log(slot, item, item_id)
			this.removeItem(item_id);
			slot.putItem(item);
		};
	};

	this.unwieldItem= function(slot_id) {
		var slot = this.slots.getSlotById(slot_id);
		console.log(slot_id, slot);
		if (slot) {
			var item = slot.item;
			console.log(item);
			if (item) {
				slot.removeItem();
				this.addItem(item);
			}
		};
	};

	this.dropItem = function(item_id) {
		var item = this.removeItem(item_id);
		if(item) {
			this.unit.place.addItem(item);
		};
	};

};


$(document).on('click', '.drop-button', function(event) {
	var id = $(this).parent().data('id');
	player.dropItem(id);
	event.stopPropagation();
});

$(document).on('click', '.inventory .item', function() {
	var id = $(this).data('id');
	player.wieldItem(id);
});

$(document).on('click', '.place_items .item', function() {
	var id = $(this).data('id');
	player.pickUpItem(id);
});
