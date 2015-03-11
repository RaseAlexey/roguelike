var Place = function(name, template, units) {
    this.name = name;
    this.template = template;
    this.units = units;


    this.addUnit = function(unit) {
        unit.place = this;
        unit.id = this.units.length;
        this.units.push(unit);
    };

    this.removeUnit = function(unit) {
        this.units.splice(this.units.indexOf(unit), 1);
        unit.place = undefined;
    };

    this.getHTML = function() {
        var html = '<div class="place" data-x='+this.x+' data-y = '+this.y+'>';
        html += this.name;
        html += '</div>';
        return html;
    }

};


var PlaceTemplate = function(name, unit_templates, number_of_units_formula) {
    this.name = name;
    this.unit_templates = unit_templates

    this.getPlace = function() {
        var name = this.name;
        var units = [];
        for(var i = number_of_units_formula(); i<=0; i--) {
        	units.push(getRandomItemInArray(unit_templates).getUnit())
        };
        return new Place(name, this, units)
    }    
};


Place.generate = function(name) {
    return floor_templates.by_name[name] ? floor_templates.by_name[name]() : new Place(name, null, []);
};


var place_templates = new Collection([
    new PlaceTemplate('Dusty room', [unit_templates.getByName('Rat'), unit_templates.getByName('Zombie')], rand_formula(3)),
    new PlaceTemplate('Hall', [unit_templates.getByName('Rat'), unit_templates.getByName('Zombie')], rand_formula(5))
]);