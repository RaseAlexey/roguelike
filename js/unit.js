Unit = function(name, hp, image_url) {
	var name = name;
	var hp = hp;
	var image_url = image_url;
	var cell;
	var action;
	return {
		getName : function() {
			return name;
		},
		getImageUrl : function() {
			return image_url;
		},
		getHp : function() {
			return hp;
		},
		getCode : function () {
			return '<div style="background: url('+image_url+') no-repeat center center" class="unit">'+this.getName()+'</div>'
		},
		getCell : function() {
			return cell;
		},
		setCell : function(value) {
			return cell = value;
		},
		isWalkable : function() {
			return false;
		},
		getLOS : function() {
			return 4;
		},
		strike : function(target) {

		},
		stepTo : function(x, y) {
			console.log('step to '+x+'; '+y)
			var object = Dungeon.getCurrentFloor().getCell(x, y).getObject();
			if (object && !object.isWalkable()) {
				this.strike(object)
			} else {
				this.startAction(new Action(2, function() {
					console.log(this)
					this.goTo(x, y);
				}));
			};
		},
		goTo : function(x, y) {
			var dest_cell = Dungeon.getCurrentFloor().getCell(x, y);
			console.log(dest_cell)
			if (this.getCell()) {
				this.getCell().removeObject();
			};
			return dest_cell.putObject(this);
		},
		getY : function() {
			return cell.getY();
		},
		setY : function(value) {
			return cell.getY() = value;
		},
		getX : function() {
			return cell.getX();
		},
		setX: function(value) {
			return cell.getX() = value;
		},
		startAction : function(new_action) {
			if(!this.getAction()) {
				new_action.setUnit(this);
				Stack.addObject(this);
				action = new_action;
				if(this==player) {
					Stack.passTillPlayer();
				};
			} else {
				console.log('unit tried to start new action without finishing current one');
			}
		},
		endAction : function() {
			Stack.removeObject(this);
			action = null;
		},
		getAction : function() {
			return action;
		}
	}
}