var Inventory = function(slots) {
	var item_cells = [];
	var slots = slots || [];
	var inventory = {
		addItem : function(item, cell_id) {
			var cell_id = cell_id;
			var item_cells = this.getItemCells();
			var i = 0;
			while(cell_id==undefined && i < 32) {
				console.log(item_cells[i])
				if(item_cells[i].isFree()) {
					cell_id = i;
				}
				i++;
			};
			if(cell_id!=undefined) {
				this.getItemCell(cell_id).setItem(item);
				this.refreshItemCell(cell_id);
			};			
			return item;
		},
		getSlots : function() {
			return slots;
		},
		getSlot : function(slot_id) {
			return slots[slot_id];
		},
		setSlots : function(slots) {
			var inventory = this;
			console.log('setting slots ', slots)
			slots.forEach(function(slot, id) {
				console.log(slot.getName());
				inventory.addSlot(slot);
			});
			return slots;
		},
		addSlot : function(slot) {
			slot.setInventory(this);
			return slots.push(slot);
		},
		addItemCell : function(item_cell) {
			item_cell.setInventory(this);
			return this.getItemCells().push(item_cell);
		},
		getItemCells : function() {
			return item_cells;
		},
		getItemCell : function(id) {
			return this.getItemCells()[id];
		},
		moveItemFromCellToCell : function(item_cell_id1, item_cell_id2) {
			console.log('cell to cell',item_cell_id1, item_cell_id2)
			var item_cell1 = this.getItemCell(item_cell_id1);
			var item1 = item_cell1.getItem();
			var item_cell2 = this.getItemCell(item_cell_id2);
			var item2 = item_cell2.getItem();
			if(item1) {
				if(item2) {
					item_cell1.setItem(item2);
					item_cell2.setItem(item1)
				} else {
					item_cell1.removeItem();
					item_cell2.setItem(item1);
				}
			} else {
				if(item2) {
					item_cell2.removeItem();
					item_cell1.setItem(item2);
				};
			};
			item_cell1.refresh();
			item_cell2.refresh();
			Sidebar.setUpDraggables();
		},
		moveItemFromCellToSlot : function(item_cell_id, slot_id) { 
			console.log('cell to slot',item_cell_id, slot_id)
			var item_cell = this.getItemCell(item_cell_id);
			var item1 = item_cell.getItem();
			var slot = this.getSlot(slot_id);
			var item2 = slot.getItem();
			if(item1 && slot.canContain(item1)) {
				slot.setItem(item1);
				if(item2) {
					item_cell.setItem(item2);
				} else {
					item_cell.removeItem();
				}
			};
			if(!item1 && item2) {
				slot.removeItem();
				item_cell.setItem(item2)
			}
			this.refreshItemCell(item_cell_id);
			this.refreshSlot(slot_id);
			Sidebar.setUpDraggables();
		},
		moveItemFromSlotToCell : function(slot_id, item_cell_id) {
			console.log('slot to cell',slot_id, item_cell_id) 
			this.moveItemFromCellToSlot(item_cell_id, slot_id);
		},
		moveItemFromSlotToSlot : function(slot_id1, slot_id2) { 
			console.log('slot to slot',slot_id1, slot_id2) 
			var slot1 = this.getSlot(slot_id1);
			var slot2 = this.getSlot(slot_id2);
			var slot_item1 = slot1.getItem();
			var slot_item2 = slot2.getItem();
			if(slot1.canContain(slot_item2) && slot2.canContain(slot_item1)) {
				slot1.setItem(slot_item2);
				slot2.setItem(slot_item1);
			};
			slot1.refresh();
			slot2.refresh();
			Sidebar.setUpDraggables();
		},
		removeItem : function(cell_id) {
			var item = this.getItem(cell_id);
			this.getItems()[cell_id] = null;
			item.removeInventory();
			this.refreshItemCell(cell_id)
			return item;
		},
		refreshItemCell : function(cell_id) {
			this.getItemCell(cell_id).refresh();
			//$('.inventory_cell[data-id='+cell_id+']').html(this.getItemCellCode(cell_id))
		},
		refreshSlot : function(slot_id) {
			this.getSlot(slot_id).refresh();
		},
		getSlotsCode : function() {
			var code = '';			
			code += '<div class="slots_container"><div class="slots">';
			this.getSlots().forEach(function(slot, slot_index) {
				code += slot.getCode();
			})
			code += '</div></div>';
			return code;
		},
		getItemsCode : function() {
			var code = '';
			code += '<div class="inventory_container">';
			var item_list = this.getItemCells();
			item_list.forEach(function(cell, id) {
				code += cell.getCode();
			})
			code += '</div>';
			return code;
		},
		getCode : function() {
			var code = '';
			code += this.getSlotsCode();
			code += this.getItemsCode();
			return code;
		}
	};
	for(var i = 0; i<32; i++) {
		inventory.addItemCell(new InventoryCell());
	}
	return inventory;
};
InventoryCell = function() {
	var item;
	var inventory;
	return {
		getId : function() {
			return this.getInventory().getItemCells().indexOf(this);
		},
		getItem : function() {
			return item;
		},
		isFree : function() {
			return !item;
		},
		setItem : function(new_item) {
			new_item.setItemCell(this);
			return item = new_item;
		},
		removeItem : function() {
			var old_item = item;
			item = undefined;
			return old_item;
		},
		getInventory : function() {
			return inventory;
		},
		setInventory : function(new_inventory) {
			return inventory = new_inventory;
		},
		getInnerCode : function() {
			if(!this.isFree()) {
				return this.getItem().getCode();
			} else {
				return '';
			}
		},
		getCode : function() {
			var code = '<div class="inventory_cell" data-id="'+this.getId()+'">'
			code += this.getInnerCode();
			code += '</div>';
			return code;
		},
		refresh : function() {
			$('.inventory_cell[data-id='+this.getId()+']').html(this.getInnerCode());
		}
	}
}