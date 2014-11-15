Tile = function(name, isWalkable) {
	var name = name;
	var isWalkable = isWalkable;
	var image_url = tiles_images[name][Math.floor(Math.random() * tiles_images[name].length)];
	console.log(tiles_images[name])
	console.log(image_url);
	return {
		getName : function() {
			return name;
		},
		isWalkable : function() {
			return isWalkable;
		},
		getImageUrl : function() {
			return image_url;
		}
	}
};
var tiles_images = {
	'ground' : ['http://www.mocap-dancer.com/worlds/imvu/MDT/MDT-site-pictures/MDT-Pirates-Island-ground1-sm.jpg'],
	'rocks' : ['tiles/rocks.jpg', 'tiles/rocks2.jpg']
};
var tiles = {
	'ground' : function() {
		return new Tile("ground", true);
	},
	'rocks' : function() {
		return new Tile("rocks", true);
	},
	//'rocks' : clone(new Tile('rocks', true))
};

