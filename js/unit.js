Unit = function(name, hp) {
	var name = name;
	var hp = hp;
	return {
		getName : function() {
			return name;
		},
		getHp : function() {
			return hp;
		},
		getCode : function () {
			var code = '<span class="unit">'+this.getName()+'</span>'
		},
		goTo : function(where) {
			this.cell.removeObject();
			return where.putObject(this);
		}
	}
}