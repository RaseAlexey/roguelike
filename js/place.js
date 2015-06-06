
var Place = function(template, name, units) {
    this.name = name;
    this.template = template;
    this.units = units;
    this.items = [];

    var place = this;
    this.units.forEach(function(unit) {
        unit.place = place;
    });


    this.addUnit = function(unit) {
        unit.place = this;
        unit.floor = this.floor || unit.floor || undefined;
        unit.id = this.units.length;
        this.units.push(unit);
    };

    this.removeUnit = function(unit) {
        this.units.splice(this.units.indexOf(unit), 1);
        unit.place = undefined;
    };

    this.clearEnemies = function() {
        var self = this;
        var units = this.units.slice(); // making independent copy of place units array to use later
        units.forEach(function(unit) { // forEach is applied to copy array so removing units from the place doesnt fuck the shit up
            if(unit.isEnemy()) {
                console.log(unit);
                self.removeUnit(unit);
            }
        })
    };

    this.hasEnemies = function() {
        var has_enemies = false;
        if(!this.units) return false;
        this.units.forEach(function(unit) {
            if(unit.isEnemy() && !has_enemies) {
                has_enemies = true;
            }
        });
        return has_enemies;   
    };

    this.addItem = function(item) {
        item.place = this;
        this.items.push(item);
    };

    this.getConnections = function() {
        var x = this.x;
        var y = this.y;
        var places = this.floor.places;
        var connections = {};
        if(x != undefined && y != undefined && places != undefined) {
            //console.log(x, y, places);
            if(places[y][x - 1]) {
                connections['west'] = places[y][x - 1];
            }
            if(places[y][x + 1]) {
                connections['east'] = places[y][x + 1];
            }
            if(places[y - 1] && places[y - 1][x]) {
                connections['north'] = places[y - 1][x];
            }
            if(places[y + 1] && places[y + 1][x]) {
                connections['south'] = places[y + 1][x];
            }
        }
        return connections;
    };

    this.tick = function() {
        this.units.forEach(function(unit) {
            if(unit.action) {
               unit.action.tick();
            }
            if(!unit.action) {
                if(unit == player) {

                } else {
                    unit.tickAI();
                }
            }
            UI.refreshTabs(); 
        }); 
    }
};


var PlaceTemplate = function(name, type, unit_templates, number_of_units_formula) {
    this.name = name;
    this.type = type;
    this.unit_templates = unit_templates;

    this.getPlace = function() {
        var name = this.name;
        var units = [];
        var number_of_units = number_of_units_formula();
        for(var i = 0; i < number_of_units; i++) {
        	units.push(getRandomItemInArray(this.unit_templates).getUnit());
        }
        return new Place(this, name, units);
    };   
};


Place.generate = function(name) {
    return floor_templates.by_name[name] ? floor_templates.by_name[name]() : new Place(name, null, []);
};


var place_templates_collection = new Collection([
    new PlaceTemplate('Entrance', 'entrance', [], constant_formula(0)),
    new PlaceTemplate('Stairs', 'stairs', [], constant_formula(0)),
    new PlaceTemplate('Dusty room', 'generic', [unit_templates.getByName('Rat'), unit_templates.getByName('Skeleton')], constant_formula(3)),
    new PlaceTemplate('Hall', 'generic', [unit_templates.getByName('Rat'), unit_templates.getByName('Zombie')], constant_formula(3)),
    new PlaceTemplate('Zombie room: reward', 'reward', [unit_templates.getByName('Zombie')], constant_formula(5))
]);