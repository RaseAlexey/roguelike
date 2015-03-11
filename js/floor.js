var Floor = function(name, template, rect) {
    this.name = name;
    this.template = template;
    this.rect = rect;
    this.cells = this.rect.cells;

    this.getHTML = function() {
        var html ='<div class="floor">';
        html += this.rect.getHTML();
        html += '</div`>';
        return html;
    }
};  


var FloorTemplate = function(name, pattern, x_formula, y_formula, place_templates) {
    this.name = name;
    this.pattern = pattern;
    this.x_formula = x_formula;
    this.y_formula = y_formula;
    this.place_templates = place_templates;


    this.getFloor = function() {
        var name = this.name;
        return new Floor(name, this, patterns[pattern](new Rect(this.x_formula(), this.y_formula()), this.place_templates));
    };
};


Floor.generate = function(name) {
    return floor_templates.getByName(name) ? floor_templates.getByName[name].getFloor() : new Floor(name);
};


var Rect = function(x, y) {
    this.x = x;
    this.y = y;
    this.cells = [];


    for (var h = 0; h < y; h++) {
        var row = [];
        for (var w = 0; w < x; w++) {
           row.push(null); 
        };
        this.cells.push(row)
    }; 


    this.getCell = function(x, y) {
        return this.cells[y][x];
    };

    this.fill = function(x, y, place) {
        console.log(x, y, place, this.cells)
        a = this.cells;
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
    new FloorTemplate('Entrance', 'linear', range_formula(4, 7), range_formula(4, 7), [place_templates.getByName('Dusty room'), place_templates.getByName('Hall')]),
    new FloorTemplate('Sewers', 'linear',  range_formula(4, 7), range_formula(4, 7), [place_templates.getByName('Hall')]),
    new FloorTemplate('Mines', 'linear',  range_formula(4, 7), range_formula(4, 7), [place_templates.getByName('Hall')]),
    new FloorTemplate('Tombs', 'linear',  range_formula(4, 7), range_formula(4, 7), [place_templates.getByName('Hall')]),
    new FloorTemplate('Treasury', 'linear',  range_formula(4, 7), range_formula(4, 7), [place_templates.getByName('Hall')]),
    new FloorTemplate('Sewers', 'linear',  range_formula(4, 7), range_formula(4, 7), [place_templates.getByName('Hall')]),
    new FloorTemplate('End', 'linear',  range_formula(4, 7), range_formula(4, 7), [place_templates.getByName('Hall')])
]);
/*
var floor_templates = new Collection([
    new FloorTemplate('TestFloor', 'linear', constant_formula(5), constant_formula(5), [place_templates.getByName('Dusty room')])
]);
*/


var patterns = { 
    'linear' : function(rect, place_templates) {
        var rect = rect;
        var place_templates = place_templates;
        var mode = getRandomItemInArray(['horizontal', 'vertical']);
        if(mode == 'horizontal') {
            var y = rand(rect.y-1);
            console.log('horizontal', y);
            for (var i = 0; i < rect.x; i++) {
                rect.fill(i, y, getRandomItemInArray(place_templates).getPlace());
            };
        };
        if(mode == 'vertical') {
            var x = rand(rect.x);
            console.log('vertical', x);
            for (var i = 0; i < rect.y; i++) {
                rect.fill(x, i, getRandomItemInArray(place_templates).getPlace());
            };
        };
        return rect;
    }
};