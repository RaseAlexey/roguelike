return {
	processFor : function (unit) {
		if(unit.getAction()) {
			unit.getAction().do();
		} else {
			unit.strike(player);
		}
	}
}