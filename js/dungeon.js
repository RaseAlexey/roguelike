/*	
	  Dungeon is constructor for global object of world.
	Dungeon consists of floors. First release version will have ten floors.
	Gameplay is based on roguelikes/TBS, text quests from Space Rangers, traditional rpg elements.
	Lore background isnt complete yet. It is heavily based on traditional roguelike/rpg ideas and fantasy literature.
	Current concept is that you can leave the dungeon through the entrance at the top floor. If you do so current playthrough is over
	and you get save of your character. Then you can start all over again with that character and dungeon will be harder depending on
	your character.
*/

var Dungeon = function(floor_templates) {
	this.floor_templates = floor_templates;
	this.floors = [];

	for (var i = 1; i<=10; i++) {
		var floor = getRandomItemInArray(this.floor_templates.filter('levels', function(levels) {
			return levels.indexOf(i) > -1; 
		})).getFloor();
		console.log(i, floor.name);
		this.floors.push(floor);
	}

	this.getHTML = function() {
		return this.current_floor.getHTML();
	}
};

//player.goTo(dungeon.floors[0])

//$('body').html(dungeon.floors[0].getHTML());