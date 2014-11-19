Cell = function(x, y, tile) {
	var x = x;
	var y = y;
	var items = [];
	var object = null;
	var tile = tile;
	var visible = false;
	return {
		putObject : function(new_object) {
			console.log('putting '+new_object.getName()+' in '+x+'; '+y)
			console.log(object)
			if(object) {
				return undefined;
			} else {
				console.log('succesfull')
				new_object.setCell(this);
				return object = new_object;
			}
		},
		removeObject : function() {
			object.setCell(null);
			return object = null;
		},
		getObject : function() {
			return object;
		},
		isVisible : function() {
			return true;
			// return dist_between(player.getCell(), this) - player.getLOS() <= 0;
		},
		setVisible : function() {
			return visible = true;
		},
		setInvisible : function() {
			return visible = false;
		},
		getTile : function() {
			return tile;
		},
		getX : function() {
			return x;
		},
		getY : function() {
			return y;
		},
		getCode : function() {
			var code = '';
			var object_code = object ? object.getCode() : '';
			var hotkey = '';
			var onclick = '';
			var css_class = 'cell ';
			var dx = player.getX()-x;
			var dy = player.getY()-y;
			if (this.isVisible()) {
				css_class += 'visible'
			} else {
				css_class += 'invisible'
			};
			var background_url = this.getTile().getImageUrl();
			console.log(tile)
			if ((dx >= -1 && dx <= 1) && (dy >= -1 && dy <= 1)) {
				if (dx == -1) {
					hotkey = (dy == -1 ? '99' : (dy == 0 ? '102' : '105'));
				} else {
					if (dx == 0) {
						hotkey = (dy == -1 ? '98' : (dy == 0 ? '101' : '104'));
					} else {
						hotkey = (dy == -1 ? '97' : (dy == 0 ? '100' : '103'));
					}
				};
				onclick = 'player.stepTo('+x+', '+y+')';
				css_class += ' adjacent';
			};
				code  += '<td class="cell-container"><div class="'+css_class+'"style="background: url('+background_url+') no-repeat center center" data-hotkey="'+hotkey+'" data-x="'+x+'" data-y="'+y+'" onclick = "'+onclick+'">'+object_code+'<span class="cords">'+x+'; '+y+'</span></div></td>';

			return code;
		}
	}
};
out_of_borders_cell = '<td class="cell-container"><div class="cell out-of-borders"></div></td>';
