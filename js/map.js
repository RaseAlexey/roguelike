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
				cells[i].push(new Cell(k, i));
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
	for (var i = 0; i <= 5; i++) {
		floors.push(MapGenerator.generateFloor('biom1', 20, 20));
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
	        var n = player.getLOS(); // полуразмер
	        var code = '<table>';
	        for(var y = player.getY() - n; y <= player.getY() + n; y++) {
	            code += '<tr>';
	            for(var x = player.getX() - n; x <= player.getX() + n; x++) {
	            	var cell = floor.getCell(x, y);
	            	console.log(cell.getCode());
	                code += cell.getCode();
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
player.goTo(10, 10);
Map.draw();
