var Player = (function(name, image_url) {
	var name = name;
	var image_url = image_url;
	var player = new Unit(name, 10, 10, 10, [], {});
	player.getImageUrl = function() {
		return image_url;
	};
	player.getSidebarCode = function() {
		var code = '<div class="sidebar_header">'+this.getName()+'</div>'
		code += this.getInventory().getCode();
		return code;	
	};
	return player;
})('Alexey', 'units/player.png');
//prompt('say your name')
var inv = Player.getInventory()
var sword = new Weapon('Sword', {'ad':10});
var sword2 = new Weapon('Mace', {'ad':13});
var sword3 = new Weapon('Axe', {'ad':15});
inv.setSlots([Slot.generate('Hand'), Slot.generate('Hand')]);
inv.addItem(sword);
inv.addItem(sword2);
inv.addItem(sword3);
