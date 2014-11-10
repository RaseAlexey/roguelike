Unit = function(name, hp) {
	var name = name;
	var hp = hp;
	var cell;
	return {
		getName : function() {
			return name;
		},
		getHp : function() {
			return hp;
		},
		getCode : function () {
			return '<span class="unit">'+this.getName()+'</span>'
		},
		getCell : function() {
			return cell;
		},
		setCell : function(value) {
			return cell = value;
		},
		goTo : function(x, y) {
			var dest_cell = Dungeon.getCurrentFloor().getCell(x, y);
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
		}
	}
}