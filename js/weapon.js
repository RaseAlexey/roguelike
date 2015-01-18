var Weapon = function(name, damage, actions, script) {
	var name = name;
	var damage = damage;
	var script = script;
	var strike = new Action(1, function() {

	});
	var weapon = new Item(name, 'weapon', {'damage':damage}, [strike], script);
	weapon.constructor = Weapon;
	return weapon;
}

var WeaponTemplate = function(template_name, damage) {
	var template_name = template_name;
	var damage = damage;
	return {
		getItem : function() {
			var name = template_name;
			var damage = damage;
			var weapon = new Weapon(name, damage);
			weapon.setTemplate(this);
			return weapon;
		}
	}
}