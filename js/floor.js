/*  
      Floor is a part of dungeon. It is represented as x*y table of places/empty cells.
    Floor.getHTML method returns html code for map of this floor. 'Map' tab displays this for current floor.
    Floor template is a scheme for simillar floors. It can be interpretated as floor-type. 
    For example, Sewers floor template is a pattern which is used to generate every Sewer floor in the game.
    Floor.generate('Sewers') is a way to get completely working floor.
    Rect and pattern are helpers. Rect is x*y array of places or empty places, it is contained in floor. Pattern is function 
    which fills rect with places in certain order
*/

var Floor = function(name, template, width, height, pattern, place_templates) {
    this.name = name;
    this.template = template;
    this.rect = new Rect(this, width, height, pattern, place_templates);
    this.places = this.rect.cells;
    this.entrance = this.rect.entrance;
    this.exit = this.rect.exit;


    this.getHTML = function() {
        var html ='<div class="floor">';
        html += this.rect.getHTML();
        html += '</div`>';
        return html;
    };
};

var FloorTemplate = function(name, pattern, x_formula, y_formula, levels, place_templates) {
    this.name = name;
    this.pattern = pattern;
    this.x_formula = x_formula;
    this.y_formula = y_formula;
    this.levels = levels;
    this.place_templates = place_templates;


    this.getFloor = function() {
        var name = this.name;
        return new Floor(name, this, this.x_formula(), this.y_formula(), pattern, place_templates);
    };
};


Floor.generate = function(name) {
    console.log(name)
    return floor_templates.getByName(name) ? floor_templates.getByName[name].getFloor() : new Floor(name);
};

Floor.generateRandom = function(level) {
    var possible_templates = floor_templates.filter( 'level', function(a){return a==level} );
    return getRandomItemInArray(possible_templates);
};


var Rect = function(floor, width, height, pattern, place_templates) {
    this.floor = floor;
    this.width = width;
    this.height = height;
    this.place_templates = place_templates;
    this.cells = [];
    this.entrance = null;
    this.exit = null;

    for (var y = 0; y < height; y++) {
        var row = [];
        for (var x = 0; x < width; x++) {
           row.push(null); 
        }
        this.cells.push(row);
    }


    this.getCell = function(x, y) {
        return this.cells[y][x];
    };

    this.fill = function(x, y, place) {
        place.x = x;
        place.y = y;
        place.floor = this.floor;
        return this.cells[y][x] = place;
    };

    patterns[pattern](this, place_templates); //generating places


    this.getHTML = function() {
        var html = '<table border="1" class="cells">';
        this.cells.forEach(function(row, y) {
            html += '<tr class="cells_row">';
            row.forEach(function(cell, x) {
                html += '<td class="cell">';
                if(cell === null) {
                    html += 'Empty';
                } else {
                    html += cell.name;    
                }
                html += '</td>';        
            });
            html += '</tr>';
        });
        html += '</table>';
        return html;
    };
};


var floor_templates = new Collection([
    new FloorTemplate('Entrance',   'simple_line', range_formula(4, 7), range_formula(4, 7), [1], [place_templates_collection.getByName('Dusty room'), place_templates_collection.getByName('Hall')]),
    new FloorTemplate('Sewers',     'simple_line', range_formula(4, 7), range_formula(4, 7), [2, 3], [place_templates_collection.getByName('Hall')]),
    new FloorTemplate('Mines',      'simple_line', range_formula(4, 7), range_formula(4, 7), [2, 3, 4, 5], [place_templates_collection.getByName('Hall')]),
    new FloorTemplate('Tombs',      'simple_line', range_formula(4, 7), range_formula(4, 7), [4, 5, 6, 7], [place_templates_collection.getByName('Hall')]),
    new FloorTemplate('Treasury',   'simple_line', range_formula(4, 7), range_formula(4, 7), [6, 7, 8, 9], [place_templates_collection.getByName('Hall')]),
    new FloorTemplate('Stronghold', 'simple_line', range_formula(4, 7), range_formula(4, 7), [8, 9], [place_templates_collection.getByName('Hall')]),
    new FloorTemplate('End',        'simple_line', range_formula(4, 7), range_formula(4, 7), [10], [place_templates_collection.getByName('Hall')])
]);


var patterns = { 
    'linear' : function(rect, place_templates) {
        var rect = rect;
        var place_templates = place_templates;
        var mode = getRandomItemInArray(['horizontal', 'vertical']);
        if(mode == 'horizontal') {
            var y = rand(rect.height-1);
            for (var i = 0; i < rect.width; i++) {
                var place = getRandomItemInArray(place_templates).getPlace();
                rect.fill(i, y, place);
                if(i==0) {rect.entrance = place};
                if(i==rect.width-1) {rect.exit = place};
            }
        }
        if(mode == 'vertical') {
            var x = rand(rect.width);
            for (var i = 0; i < rect.height; i++) {
                var place = getRandomItemInArray(place_templates).getPlace();
                rect.fill(x, i, place);
                if(i==0) {rect.entrance = place};
                if(i==rect.height-1) {rect.exit = place};
            }
        }
        return rect;
    },
    'simple_line' : function(rect, place_templates) {
        var y = rand(rect.height - 1);
        var place = null;
        for (var i = 0; i < rect.width; i++) {
            if (i == 0) {
                place = place_templates_collection.getByName('Entrance').getPlace();
                rect.entrance = place
            } else if (i == (rect.height - 1)) {
                place = place_templates_collection.getByName('Stairs').getPlace();
                rect.exit = place
            } else {
                place = getRandomItemInArray(place_templates).getPlace();
            }
            rect.fill(i, y, place);
        }
        return rect;
    }
};
