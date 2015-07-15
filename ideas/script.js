/*
	  Script is an object, which contains code to call when certains events or conditions are satisfied. For example, ring can break 
	when your take it off or sword can deal extra damage on hit if you have no magic items.
	All code is stored as a pair: event : [functions].
	Script is created inside of objects like items or units in their constructor.
*/
var Script = function(object, code) {
	this.object = object;
	this.code = code || {};


	var self = this;
	if(code) {
		$.each(this.code, function(event, funcs) {
			self[event] = function() {
				funcs.forEach(function(func, id) {
					func.call(self.object);
				})
			}
		});
	};


	this.add = function(event, func, data) {
		var object = this.object;
		if(this.code && this.code.event) {
			this.code.event.push(func);
		} else {
			this.code.event = [func];
		};
		this[event] = function() {
			this.code.event.forEach(function(func, id) {
				func.call(object, data);
			});
		};
	};
};