var locations_by_name = [];
var Place = function(id, name, unit_templates, number_of_enemies, connections, settings) {
	var id = id;
	var name = name;
	var unit_templates = unit_templates;
	var number_of_enemies = number_of_enemies;
	var units = [];
	var connections = [];
	var location_id;
	var depth = 0;
	var visited = false;
	var settings = settings;
	if (settings) {
		if(settings['depth']) {depth = settings['depth']};
		if(settings['units']) {units = settings['units']};
		if(settings['location_id']) {location_id = settings['location_id']};
	};
	return {
		getId : function() {
			return id;
		},
		getName : function() {
			return name;
		},
		getUnits : function() {
			return units;
		},
		getUnit : function(id) {
			return this.getUnits()[id];
		},
		hasUnit : function(unit) {
			return (units.indexOf(unit)>0);
		},
		getEnemies : function() {
			var enemies = this.getUnits().slice();
			enemies.splice(enemies.indexOf(Player), 1);
			return enemies;
		},
		addUnit : function(unit) {
			return units.push(unit);
		},
		setUnits : function(new_units) {
			var new_units = new_units;
			if(this.hasUnit(Player)) {
				new_units.push(Player);
			};
			return units = new_units;
		},
		generateUnits : function() {
			//console.log('Generating '+number_of_enemies+' enemies');
			var place_id = this.getId();			
			var location_id = this.getLocation().getId();
			var units_list = [];
			for (var i = 0; i < number_of_enemies; i++) {
				var template = unit_templates.getRandomElement();
				var unit = template.getUnit();
				unit.setLocation(location_id);
				unit.setPlace(place_id);
			};
		},
		removeUnit : function(unit) {
			units.splice(units.indexOf(unit), 1);
			return units;
		},
		getConnections : function() {
			return connections;
		},
		setLocation : function(new_location_id) {
			location_id = new_location_id;
		},
		getLocation : function() {
			return locations[location_id];
		},
		addConnection : function(connection) {
			return connections.push(connection);
		},
		setConnections : function(connections) {
			return connections = connections;
		},
		getDepth : function() {
			return depth;
		},
		isVisited : function() {return visited},
		visit : function() {
			this.generateUnits();
			return visited = true;
		},
		getConnectionsCode : function() {
			var code = '<div class="connection_list_container">'
			code += '<ul class="connections_list">';
			this.getConnections().forEach(function(connection, index) {
				code += '<li><span class="connection" data-hotkey="'+(index+1)+'" data-location_id="'+connection.getLocation().getId()+'" data-place_id="'+connection. getId()+'">'+connection.getName()+ '' + connection.getDepth()+'</span></li>'
			});
			code += '</ul></div>';
			return code;
		},
		getUnitsCode : function() {
			var code = '<div class="units_list_container">';
			code += '<ul class="place_units_list">'
			this.getEnemies().forEach(function(unit, index) {
				code += '<li class="place_unit">'+unit.getShortCode()+'</li>';
			}); 
			code += '</ul></div>';
			return code;
		},
		getCode : function() {
			var code = '';
			code += this.getConnectionsCode();
			code += this.getUnitsCode();
			return code;
		},
		enter : function() {
			units.forEach(function(unit, index) {
				Stack.addObject(unit);
			});
		}	
	}

};
var PlaceTemplate = function(name, unit_templates, number_of_enemies) {
	var name = name;
	var unit_templates = unit_templates;
	var number_of_enemies = number_of_enemies;
	return function(id, connections, settings) {
		return new Place(id, name, unit_templates, number_of_enemies, connections, settings)
	}
};
var place_templates = {
	'Dusty room' : new PlaceTemplate('Dusty room', unit_templates_by_place['Dusty room'], 1),
	'Sewers' : new PlaceTemplate('Sewers', unit_templates_by_place['Sewers'], 3)
};
Place.generate = function(location_id, biom, connections, settings) {
	var settings = settings;
	var connections = connections;
	return place_templates[biom](location_id, connections, settings);
};