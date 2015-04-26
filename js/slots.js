var SlotsList = function(unit, list) {
	this.unit = unit;
	this.slots = [];

	if(list) {
		var self = this;
		list.forEach(function(type, id) {
			var slot = new Slot(self, type);
			self.slots.push(slot);
		});		
	};


	this.getSlotFor = function(item) {
		var item = item;
		var slot = undefined;
		var slots = this.getSlotsOfType(item.slot_type);
		var i = 0;
		while (!slot && i<slots.length) {
			if (!slots[i].item) {
				slot = slots[i];
				console.log(slot)
			};
			i++;
		};	
		return slot ? slot : slots[0];
	};

	this.getSlotsOfType = function(type) {
		var matching_slots = [];
		this.slots.forEach(function(slot, id) {
			if(slot.type == type) matching_slots.push(slot);
		});
		return matching_slots;
	};

	this.getSlotById = function(id) {
		return this.slots[id];
	};

	this.pairSlot = function(id) {
		var slot = this.getSlotById(id);
		if(slot) {
			var pair_slot = slot.findPair();
			if(pair_slot) {
				slot.pairWith(pair_slot);
			};
		};
	};
};


var Slot = function(slots_list, type, item) {
	this.slots_list = slots_list;
	this.unit = this.slots_list.unit;
	this.type = type;
	this.item = item || null;
	this.pairSlot = undefined;
	
	this.getId = function() {
		return this.slots_list.slots.indexOf(this);
	};

	this.findPair = function() {
		var slots = this.slots_list.getSlotsOfType(this.type);
		console.log(slots);
		return slots.splice(slots.indexOf(this), 1)[0];
	};
	
	this.pairWith = function(slot) { //Call from main slot, which will have item inside
		console.log(slot)
		slot.empty();
		this.pairSlot = slot;
		slot.pairSlot = this;
	};

	this.unpair = function() {
		if(this.item) {
			this.pairSlot.pairSlot = undefined;
		} else {
			this.pairSlot = undefined;
		}
	};

	this.canContain = function(item) {
		console.log('canContain: ', item);
		return this.type == item.slot_type;
	};

	this.putItem = function(item) {
		if(this.canContain(item)) {
			this.empty();
			item.slot = this;
			this.item = item;
			return item;
		} else {
			Chat.send(new Post('Wrong slot!', 'warning'));
			return false;
		}
	};

	this.empty = function() {
		if(this.pairSlot) {
			this.pairSlot.unpair();
		}
		if(this.item) {
			this.unit.inventory.addItem(this.removeItem());
		};
	};

	this.removeItem = function() {
		var item = this.item;
		item.slot = null;
		this.item = null;
		return item;
	};
};

$(document).on('click', '.slot .item', function() {
	var id = $(this).parent().data('id');
	player.unwieldItem(id);
});


//humanoid_slots = ['hand', 'head', 'torso', 'legs'];
//humanoid_slots = ['hand', 'hand', 'head', 'torso', 'foot', 'foot'];
//humanoid_slots = ['hand', 'hand', 'head', 'torso', 'foot', 'foot'];
humanoid_slots = ['hand', 'hand', 'head', 'torso', 'legs'];
//humanoid_slots = ['hand', 'head', 'torso', 'legs'];
