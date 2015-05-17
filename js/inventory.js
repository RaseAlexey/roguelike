var Inventory = function(unit, slots_list, items) {
	this.unit = unit;
	this.slots = [];
	this.items = items || [];

	if(slots_list) {
		var self = this;
		slots_list.forEach(function(type, id) {
			self.slots.push(new Slot(self, type));
		});		
	};

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

	this.canWield = function(item) {
		var slot = this.getSlotForItem(item);
		if (unit.checkRequirements(item.requirements)) {
			if(slot.item) {
				return false;
			} else {
				return true
			};
		};
	};

	this.wieldItem = function(item_id) {
		var item = this.items[item_id];
		var slot = this.getSlotForItem(item);
		if (slot) {
			this.removeItem(item_id);
			slot.putItem(item);
			chat.send(this.unit.name + ' wielded ' + item.name + '.');
		} else {

		}
	};

	this.unwieldItem = function(slot_id) {
		var slot = this.slots[slot_id];
		console.log('unwield', slot_id)
		if(slot) {
			if(slot.pair_slot) {
				this.unpairSlot(slot_id);
			}
			var item = slot.item;
			console.log(slot, item)
			if(item) {
				slot.removeItem();
				this.addItem(item);
				chat.send(this.unit.name + ' unwielded ' + item.name + '.');
			}
		};
	};

	this.dropItem = function(item_id) {
		var item = this.removeItem(item_id);
		if(item) {
			this.unit.place.addItem(item);
		};
	};
	this.getSlotsOfType = function(type) {
		var slots = []
		this.slots.forEach(function(slot, id) {
			if(slot.type == type) {
				slots.push(slot);
			};
		});
		return slots;
	};

	this.getSlotForItem = function(item) {
		var free_slot;
		var slots = this.getSlotsOfType(item.slot_type);
		var new_slots = [];
		slots.forEach(function(slot, id) {
			if(!slot.pair_slot) {
				new_slots.push(slot);
				if(!slot.item && !free_slot) {
					free_slot = slot;
				};
			};
		});
		return free_slot || new_slots[0];
	};

	this.getPairForSlot = function(id) {
		var first_slot = this.slots[id]; //First slot of pair
		var free_slot;
		var slots = this.getSlotsOfType(first_slot.item.slot_type);
		var new_slots = [];
		slots.forEach(function(slot, id) {
			if(slot != first_slot && !slot.pair_slot) {
				new_slots.push(slot);
				if(!free_slot && !slot.item) {
					free_slot = slot;
				}
			}
		});
		return free_slot || slots [0];
	};

	this.pairSlots = function(id1, id2) {
		console.log('pair', id1, id2);
		var slot1 = this.slots[id1];
		var slot2 = this.slots[id2];
		slot1.pair_slot = slot2;
		slot2.pair_slot = slot1;
	};

	this.unpairSlot = function(id) {
		var slot = this.slots[id];
		console.log('unpair', id, slot.pair_slot.getId());
		slot.pair_slot.pair_slot = undefined;
		slot.pair_slot = undefined;
	};

	this.emptySlots = function() {
		this.slots.forEach(function(slot, id) {
			slot.empty();
		});
	};

	this.dropItems = function() {
		while(this.items.length>0) {
			this.dropItem(0);
		};
	};

};


var Slot = function(slots_list, type, item) {
	this.slots_list = slots_list;
	this.unit = this.slots_list.unit;
	this.type = type;
	this.item = item || null;
	this.pair_slot = undefined;

	
	this.getId = function() {
		return this.slots_list.slots.indexOf(this);
	};

	this.canContain = function(item) {
		return this.type == item.slot_type && this.unit.checkRequirements(item.requirements);
	};

	this.putItem = function(item) {
		if(this.canContain(item)) {
			item.slot = this;
			this.item = item;
			return item;
		}
	};

	this.removeItem = function() {
		var item = this.item;
		item.slot = null;
		this.item = null;
		return item;
	};
};


//humanoid_slots = ['hand', 'head', 'torso', 'legs'];
//humanoid_slots = ['hand', 'hand', 'head', 'torso', 'foot', 'foot'];
//humanoid_slots = ['hand', 'hand', 'head', 'torso', 'foot', 'foot'];
humanoid_slots = ['hand', 'hand', 'head', 'torso', 'legs'];
humanoid_slots_four_hands = ['hand', 'hand', 'hand', 'hand', 'head', 'torso', 'legs'];
//humanoid_slots = ['hand', 'head', 'torso', 'legs'];