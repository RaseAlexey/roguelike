var Dungeon = function(floor_templates) {
	this.floor_templates = floor_templates;
	var floors = [];

	this.floor_templates.forEach(function(template, index) {
		console.log(template, index);
		floors.push(template.getFloor());
	});

	this.floors = floors;

	this.getHTML = function() {
		return this.current_floor.getHTML();
	}
}
var dungeon = new Dungeon(floor_templates.all);
//player.goTo(dungeon.floors[0])

//$('body').html(dungeon.floors[0].getHTML());