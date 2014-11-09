Cell = function(object) {
	var items = [];
	var object = object || null;
	return {
		putObject : function(new_object) {
			if(object) {
				return undefined;
			} else {
				new_object.cell = this;
				return object = new_object;
			}
		},
		removeObject : function() {
			return object = null;
		},
		getCode : function() {
			var code  = '<span class="cell">'+object.getCode()+'</span>';
		}
	}
};