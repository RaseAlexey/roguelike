var Loc = function(name, places) {
	var name = name;
	var places = places;
	var id = locations.length;
	places.forEach(function(place, index) {
		place.setLocation(locations.length);
	});
	var location = {
		getName : function() {return name},
		getPlaces : function() {return places},
		getPlace : function(id) {return places[id]},
		getId : function() {return id}
	};
	location.constructor = Loc;
	return location;
};
var location_patterns = {
	'Generic' : function(size, biom) {
		return [];
	},
	'Linear' : function(size, biom) {
		var places = [];
		for(var id = 0; id < size; id++) {
			var place = Place.generate(id, biom, [], {'depth' : id+1});
			places.push(place);
		};
		places.forEach(function(place, index) {
			if (index < size-1) {
				var next_place = places[index + 1];
				place.addConnection(next_place);
				next_place.addConnection(place);
			};
			
		});
		return places;
	}
};
var locations = [];
Loc.generate = function(name, biom, pattern, size) {
	var pattern = pattern || 'Generic';
	var places = location_patterns[pattern](size, biom);
	var new_location = new Loc(name, places);
	locations_by_name[name] = new_location;
	locations.push(new_location);
	return new_location;
};
Loc.generate('Northern Sewers', 'Sewers', 'Linear', 10);
var locations_by_name = {};
locations.forEach(function(location, index){
	locations_by_name[location.getName()] = location;
});
Player.goTo(0, 0);