var SlotsList = function(unit, list) {
	this.unit = unit;
	this.slots = [];

	if(list) {
		var self = this;
		list.forEach(function(slot_name, id) {
			var slot = new Slot(self, slot);
			slot.unit = this.unit;
			self.slots.push(slot);
		});		
	};

	this.getSlot = function(type) {
		this.slots.forEach(function(slot, id) {
			if(slot.type == type) {
				return slot;
			}
		});
		return undefined;
	};

};


var Slot = function(slots_list, type, item) {
	this.slots_list = slots_list;
	this.type = type;
	this.item = item || null;

	
	this.getId = function() {
		return this.slots_list.slots.indexOf(this);
	};

	this.putItem = function(item) {
		if(item.slot_type == this.type) {
			item.slot = this;
			this.item = item;
			return item;
		} else {
			Chat.send(new Post('Wrong slot!', 'warning'));
			return false;
		}
	};

	this.removeItem = function() {
		var item = this.item;
		item.slot = null;
		this.item = null;
		this.unit.addItem(item);
	};
};


humanoid_slots = ['hand', 'hand', 'head', 'torso', 'foot', 'foot'];
