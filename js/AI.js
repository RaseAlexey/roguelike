
Unit.prototype.tickAI = function() {
    if (this.inventory.inv_items.length) {
        if (this.inventory.getItemsFromNotEmptySlotsOfType('hand').length == 0) {
            var weapons = arrayFilter(this.inventory.inv_items, function(item) {
                return item.slot_type == 'hand';
            });
            // console.log(weapons);
            weapons.forEach(function(weapon) {
                 console.log('wielding', weapon);
                this.wieldItem(weapon.getId());
            }, this);
        }
    }
	if (!this.sawPlayer) {
		chat.send(this.name + ' noticed you!');
		this.sawPlayer = true;
	}
	this.strike(player);
};