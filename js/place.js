var Place = function(template, name, units) {
    this.name = name;
    this.template = template;
    this.units = units;

    var place = this;
    this.units.forEach(function(unit, id) {
        console.log(unit);
        unit.place = place;
    })

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

    this.hasEnemies = function() {
        if(!this.units) return true;
        this.units.forEach(function(unit, id) {
            if(unit.isEnemy()) return false;
        });
        return true;   
    };

    this.tick = function() {
        this.units.forEach(function(unit, id) {
            if(!unit.action) {
                unit.requestAction();
            } else {
                //Stack ticks actions itself
            }
        })
    };
};


var PlaceTemplate = function(name, unit_templates, number_of_units_formula) {
    this.name = name;
    this.unit_templates = unit_templates

    this.getPlace = function() {
        var name = this.name;
        var units = [];
        var number_of_units = number_of_units_formula();
        for(var i = 0; i < number_of_units; i++) {
        	units.push(getRandomItemInArray(unit_templates).getUnit()); 
        };
        return new Place(this, name, units);
    };   
};


Place.generate = function(name) {
    return floor_templates.by_name[name] ? floor_templates.by_name[name]() : new Place(name, null, []);
};


var place_templates = new Collection([
    new PlaceTemplate('Dusty room', [unit_templates.getByName('Rat'), unit_templates.getByName('Zombie')], constant_formula(10)),
    new PlaceTemplate('Hall', [unit_templates.getByName('Rat'), unit_templates.getByName('Zombie')], constant_formula(15))
]);