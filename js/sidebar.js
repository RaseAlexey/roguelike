var Sidebar = (function() {
	var default_subject = Player;
	var draggable_settings = {				
		stop : function(event, ui){
			ui.helper.css('top', 0);
			ui.helper.css('bottom', 0);
			ui.helper.css('right', 0);
			ui.helper.css('left', 0);
		}
	};
	var cell_droppable_settings = {
	  	drop : function(event, ui) {
	    	var draggable_id = ui.draggable.data('id');
	    	var droppable_id = $(this).data('id');	
	  		console.log('drop in cell', draggable_id, droppable_id);
	  		if(ui.draggable.parent().hasClass('slot')) {
	  			Player.getInventory().moveItemFromSlotToCell(draggable_id, droppable_id);
	  		} else {	
	    		if(draggable_id != droppable_id) {
	    			Player.getInventory().moveItemFromCellToCell(draggable_id, droppable_id);
	    		};
	    	};    	
		}
	};
	var slot_droppable_settings = {
	  	drop : function(event, ui) {
	    	var draggable_id = ui.draggable.data('id');
	    	var droppable_id = $(this).data('id');
	  		console.log('drop in slot', draggable_id, droppable_id);
	    	if(ui.draggable.parent().hasClass('slot')) {
	    		if(draggable_id!=droppable_id) {
	    			Player.getInventory().moveItemFromSlotToSlot(draggable_id, droppable_id); 
	    		}  	
	    	} else {
	    		Player.getInventory().moveItemFromCellToSlot(draggable_id, droppable_id); 
	    	}
		}
	};
	return {
		draw : function(object) { //unit, item
			var object = object || Player;
			$('.sidebar').html(object.getSidebarCode()).hide().fadeIn(600);
			this.setUpDraggables();			
		},
		setUpDraggables : function() {
			console.log('setting up draggables')
			$(".item_code").draggable(draggable_settings);
			$(".inventory_cell").droppable(cell_droppable_settings);
			$(".slot").droppable(slot_droppable_settings);
		},
		fadeOut : function() {
			$('.sidebar').fadeOut(400, function() {
				draw(Player);
			})
		}
	}
})();
Sidebar.draw();
$(document).on('mouseenter', '.unit_code', function() {
	console.log('mouse entered unit_code span')
	var unit = Player.getPlace().getUnit($(this).data('id'));
	Sidebar.draw(unit);
});
$(document).on('mouseleave', '.unit_code', function() {
	console.log('mouse left unit_code span')
	Sidebar.draw();
})
