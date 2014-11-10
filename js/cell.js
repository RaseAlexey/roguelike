Cell = function(x, y, object) {
	var x = x;
	var y = y;
	var items = [];
	var object = object || null;
	return {
		putObject : function(new_object) {
			if(object) {
				return undefined;
			} else {
				new_object.setCell(this);
				return object = new_object;
			}
		},
		removeObject : function() {
			object.setCell(null);
			return object = null;
		},
		getX : function() {
			return x;
		},
		getY : function() {
			return y;
		},
		getCode : function() {
			var code = '';
			if(object) {
				code  += '<td class="cell-container"><div class="cell" data-x="'+x+'" data-y="'+y+'">'+object.getCode()+'<span class="cords">'+x+'; '+y+'</span></div></td>';
			} else {
 				code += '<td class="cell-container"><div class="cell empty" data-x="'+x+'" data-y="'+y+'"><span class="cords">'+x+'; '+y+'</span></div></td>'
			};
			return code;
		}
	}
};