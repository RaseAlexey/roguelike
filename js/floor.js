// Floor is a part of dungeon. It is represented as x*y table of places/empty cells.
// Floor.getHTML returns html code for map of this floor. 'Map' tab displays this for current floor.
// Floor template is a scheme for simillar floors. It can be interpretated as floor-type. 
// For example, Sewers floor template is a pattern which is used to generate every Sewer floor in the game.
// Floor.generate('Sewers') is a way to get completely working floor.
// Rect and pattern are helpers. Rect is x*y array of places or empty places, it is contained in floor. Pattern is function 
// which fills rect with certain places


var Floor = function(name, template, rect) {
    this.name = name;
    this.template = template;
    this.rect = rect;
    this.places = this.rect.cells;
    this.entrance = rect.entrance;
    this.exit = rect.exit;

    this.getHTML = function() {
        var html ='<div class="floor">';
        html += this.rect.getHTML();
        html += '</div`>';
        return html;
    }
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
        return new Floor(name, this, patterns[pattern](new Rect(this.x_formula(), this.y_formula()), this.place_templates));
    };
};


Floor.generate = function(name) {
    console.log(name)
    return floor_templates.getByName(name) ? floor_templates.getByName[name].getFloor() : new Floor(name);
};

Floor.generateRandom = function(level) {
    var possible_templates = floor_templates.filter( 'level', function(a){return a==level} );
    return 
};


var Rect = function(width, height) {
    this.width = width;
    this.height = height;
    this.cells = [];


    for (var y = 0; y < height; y++) {
        var row = [];
        for (var x = 0; x < width; x++) {
           row.push(null); 
        };
        this.cells.push(row)
    }; 


    this.getCell = function(x, y) {
        return this.cells[y][x];
    };

    this.fill = function(x, y, place) {
        place.x = x;
        place.y = y;
        return this.cells[y][x] = place;
    };

    this.getHTML = function() {
        var html = '<table border="1" class="cells">';
        this.cells.forEach(function(row, y) {
            html += '<tr class="cells_row">';
            row.forEach(function(cell, x) {
                html += '<td class="cell">';
                if(cell === null) {
                    html += 'Empty';
                } else {
                    html += cell.getHTML();    
                };
                html += '</td>';        
            });  
            html += '</tr>';
        });
        html += '</table>'
        return html;
    }
};

var floor_templates = new Collection([
    new FloorTemplate('Entrance',   'linear', range_formula(4, 7), range_formula(4, 7), [1], [place_templates.getByName('Dusty room'), place_templates.getByName('Hall')]),
    new FloorTemplate('Sewers',     'linear', range_formula(4, 7), range_formula(4, 7), [2, 3], [place_templates.getByName('Hall')]),
    new FloorTemplate('Mines',      'linear', range_formula(4, 7), range_formula(4, 7), [2, 3, 4, 5], [place_templates.getByName('Hall')]),
    new FloorTemplate('Tombs',      'linear', range_formula(4, 7), range_formula(4, 7), [4, 5, 6, 7], [place_templates.getByName('Hall')]),
    new FloorTemplate('Treasury',   'linear', range_formula(4, 7), range_formula(4, 7), [6, 7, 8, 9], [place_templates.getByName('Hall')]),
    new FloorTemplate('Stronghold', 'linear', range_formula(4, 7), range_formula(4, 7), [8, 9], [place_templates.getByName('Hall')]),
    new FloorTemplate('End',        'linear', range_formula(4, 7), range_formula(4, 7), [10], [place_templates.getByName('Hall')])
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
            };
        };
        if(mode == 'vertical') {
            var x = rand(rect.width);
            for (var i = 0; i < rect.height; i++) {
                var place = getRandomItemInArray(place_templates).getPlace();
                rect.fill(x, i, place);
                if(i==0) {rect.entrance = place};
                if(i==rect.height-1) {rect.exit = place};
            };
        };
        return rect;
    }
};