var MapGenerator = (function () {
	var Floor = function(name, x, y) {
		var name = name;
		var x = x;
		var y = y;
		var cells = [];
		console.log(name, x, y);
		for (var i = 0; i < y; i++) {
			cells.push([]);
			for (var k = 0; k < x; k++) {
				cells[i].push(new Cell(k, i, tiles['rocks']()));
			};
		};
		return {
			getX : function() {return x},
			getY : function() {return x},
			getCells : function() {
				return cells
			},
			getCell : function (x, y) {
				return cells[y][x];
			},
			getCode : function() {
				var code = '';
				return code;
			}
		}
	}
	return {
		generateFloor : function(biom, x, y) {
			var floor = new Floor('generic area', x, y);
			//generation using Floor methods;
			return floor;
		}
	}
})();

var Dungeon = (function() {
	var floors = [];
	for (var i = 0; i < 5; i++) {
		floors.push(MapGenerator.generateFloor('biom1', 100, 100));
	};
	var cur_level_index = 0;
	return {
		getCurrentFloor : function() {
			return floors[cur_level_index];
		}
	}
})();
var Map = (function() {	
	return {    
		getScreenCode : function() {
			var floor = Dungeon.getCurrentFloor();
	        var size =10; // half of screensize
	        var code = '<table cellspacing="0" cellpadding="0" class="screen">';
	        for(var y = player.getY() - size; y <= player.getY() + size; y++) {
		        code += '<tr>';
		            for(var x = player.getX() - size; x <= player.getX() + size; x++) {
		       			if (y >=0 && y < floor.getY()) {
			            	if(x >= 0 && x < floor.getX()) {
				                code += floor.getCell(x, y).getCode();
			            	} else {
			            		//code += out_of_borders_cell;
			            	}
		           		 } else {
		           		 	//code += out_of_borders_cell;

		           		 }
		        }
		        code += '</tr>';
	    	}
	        code += '</table>';
	        return code;
    	},
    	draw : function() {
    		$(".map").html(this.getScreenCode());
    	}
	}
})();

if (player.goTo(10, 10)) {	
	console.log('player is at position')
	Map.draw();
}
