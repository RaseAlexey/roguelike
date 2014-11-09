var MapGenerator = (function () {
	var Floor = function(name, x, y) {
		var name = name;
		var x = x;
		var y = y;
		var cells = [];
		for (var i = 0; i <= y; i++) {
			cells.push([]);
			for (var k = 0; i <= x; i++) {
				cells[i].push(new Cell(i, k));
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
			var floor = new Floor(x, y);
			//generation using Floor methods;
			return floor;
		}
	}
})();

var Dungeon = (function() {
	var floors = [];
	for (var i = 0; i <= 5; i++) {
		floors.push(MapGenerator.generateFloor('biom1', 100, 100));
	};
	var cur_level_index = 0;
	return {
		getCurrentFloor : function() {
			return floors[cur_level_index];
		},
		getCode : function() {
			var code = '<div class="dungeon">';
			code += this.getCurrentFloor().getCode();
			code += '</div>';
			return code;
		},
		draw : function() {
			$('.main').html(this.getCode());
		}
	}
})();
