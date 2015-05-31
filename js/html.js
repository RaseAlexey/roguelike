/* example of getHTML function
    Object.prototype.getHTML = function() {
        var html = '';
        html += '<div class="class_name">' + this['property_name'] + '</div>';
        return html;
    };
*/

Dungeon.prototype.getHTML = function() {
	return this.current_floor.getHTML();
};


Floor.prototype.getHTML = function() {
    var html ='<div class="floor">';
    html += this.rect.getHTML();
    html += '</div`>';
    return html;
};


Rect.prototype.getHTML = function() {
    var html = '<table border="1" class="cells">';
    this.cells.forEach(function(row, y) {
        html += '<tr class="cells_row">';
        row.forEach(function(cell, x) {
            html += '<td class="cell">';
            if(cell === null) {
                html += 'Empty';
            } else {
                //html += cell.name;    
                html += 'Place'
            };
            html += '</td>';        
        });  
        html += '</tr>';
    });
    html += '</table>'
    return html;
};


Place.prototype.getHTML = function() {
    var html = '<div class="header">' + this.name + '</div>';
    if(this.hasEnemies()) {
        html += this.getEnemiesHTML();   
    } else {
        //Interaction
    };
    if(this.items.length > 0) {
        html += this.getItemsHTML();
    };
    html += this.getConnectionsHTML();
    return html;
};

Place.prototype.getEnemiesHTML = function() {
    var html = '';
    html += '<div class="list-header">Enemies</div>';
        html += '<div class="place_enemies v-list">';
        this.units.forEach(function(unit, id) {
            if(unit != player) {
            html += unit.getHTML();
            };
        });
    html += '</div>'; 
    return html;
};

Place.prototype.getConnectionsHTML = function() {
    var html = '';        
    html += '<div class="tab_footer">'
    html += '<div class="list-header">Connections</div>';
    html += '<div class="place_connections v-list">';
    $.each(this.getConnections(), function(direction, destination) {
        html += '<div class="rectangle centered clickable border-thin border-round connection blue" data-x='+destination.x+' data-y='+destination.y+'><span>' + direction + ': ' + destination.name + '</span></div>';
    });
    if (this.template.type == 'entrance') {
        html += '<div class="rectangle centered clickable border-thin border-round stairs up blue"><span>Climb the stairs</span></div>';
    }
    if (this.template.type == 'stairs') {
        html += '<div class="rectangle centered clickable border-thin border-round stairs down blue"><span>Down the stairs</span></div>';
    }
    html += '</div>';
    html += '</div>';
    html += '</div>';
    return html;
};

Place.prototype.getItemsHTML = function() {
    var html = '';        
    html += '<div class="tab_footer">'
    html += '<div class="list-header">Items</div>';
    html += '<div class="place_items v-list">';
    this.items.forEach(function(item) {
        html += item.getHTML();
    });
    html += '</div>';
    html += '</div>';
    html += '</div>';
    return html;
};


Chat.prototype.getHTML = function() {
	var html = '';
    html += '<div class="posts">';
	this.posts.forEach(function(post, index) {
		html += post.getHTML();
	});
    html += '</div>';
	return html;
};

Post.prototype.getHTML = function() {
	return '<div class="post '+this.type+'">'+'<span class="time">'+this.time+': </span>'+this.text+'</div>';
};


Unit.prototype.getHTML = function() {
    var classes = player.isEnemyWith(this) ? 'enemy red' : '';
    var html = '';
    html += '<div class="rectangle centered clickable border-thin border-round unit '+classes+'" data-id='+this.getId()+'>';
    html += '<span">' + this.name + ' (' + this.stats.hp + '/' + this.stats.max_hp + ')' + '</span>';
    html += '</div>';
    return html;
};

Unit.prototype.getStatsHTML = function() {
    var html = '<div class="unit-stats">';
    html += '<span>Hitpoints: ' + this.stats.hp + '/' + this.stats.max_hp + '</span>';
    var self = this;
    ['str', 'dex', 'end', 'int'].forEach(function(stat) {
        html += '<div class="rectangle stat grey"><div class="stat-name">' + stat + '</div><div class="stat-value">' + getStatCirclesHTML(self.stats[stat]) + '</div></div>';
    });
    html += '</div>';
    return html;
};

Unit.prototype.getInventoryHTML = function() {
    var html = '<div class="inventory v-list">';
    this.inventory.items.forEach(function(item, id) {
        html += item.getHTML();
    });
    html += '</div>';
    return html;
};

Unit.prototype.getSlotsHTML = function() {
    var html = '';
    html += '<div class="slots v-list">';
    this.inventory.slots.forEach(function(slot, id) {
        html += slot.getHTML();
    });
    html += '</div>';
    return html;
};


Slot.prototype.getHTML = function() {
    if(this.pair_slot && !this.item) { //pair slots without items dont display
        return '';
    }
    var html = '';
    var classes = (this.item ? 'full': 'empty');
    html += '<div class="rectangle centered border-thin border-round column slot grey '+classes+'" data-id='+this.getId()+'>';
    html += '<span class="centered">' + this.type + '</span>';
    if(this.item) {
        html += this.item.getHTML();    
    };
    html += '</div>';
    return html;
};

Item.prototype.getHTML = function() {
    var html = '';
    var id = this.getId();
    html += '<div class="item rectangle centered clickable border-thin border-round swampish-green" data-id='+id+'>';
    html += '<span>' + this.name + '</span>';
    if(this.unit) {
        html += '<div class="button clickable border-thin border-round drop-button dark-red"><span>drop</span></div>';
    };
    if(this.slot && this.slot.type == 'hand' && !this.slot.pair_slot) {
        html += '<div class="button clickable border-thin border-round twohand-button dark-red"><span>twohand</span></div>';
    }
    if(this.slot && this.slot.type == 'hand' && this.slot.pair_slot) {
        html += '<div class="button clickable border-thin border-round twohand-button dark-red"><span>onehand</span></div>';
    }
    html += '</div>'
    return html;
};


Draft.prototype.getHTML = function() {
    var html = '';
    html += '<div class = "draft">';
    html += this.question.getHTML();
    html += '</div>';
    return html;
};

Question.prototype.getHTML = function() {
    var html = '';
    html += '<div class = "question header">';
    html += this.text;
    this.options.forEach(function (option, id) {
        html += option.getHTML();
    });
    html += '</div>';
    return html;
};

Option.prototype.getHTML = function() {
    var html = '';
    html += '<div class = "rectangle clickable border-thin border-round option blue centered" data-id=' + this.getId() + '>';
    html += '<span>'+this.text+'</span>';
    html += '</div>';
    return html;
};

Tab.prototype.getHTML = function() {
    if(this.isBlocked) return '';
    var html = '<div class="tab" data-id='+this.mode+'>';
    html += this.getInnerHTML();
    html += '</div>';
    return html;
};

Tab.prototype.getInnerHTML = function() {
    var html = '<div class = "tab_header header clickable">'+this.mode+'</div>';
    html += '<div class="tab_contents">';
    html += this.inner_html_func.apply(this, [this.data]);
    html += '</div>';
    return html;
};

Tab.prototype.getMenuButtonHTML = function() {
    var html = '';
    var classes;
    if(this.isBlocked) {
        classes = 'blocked light-grey';
    } else {
        if(this.isMinimized) {
            var classes = 'minimized grey'
        } else {
            var classes = 'maximized dark-grey'
        };
    };
    html += '<div class="tab-icon clickable border-round '+classes+'" data-id='+this.mode+'>'+this.mode+'</div>';
    return html;
};


var getStatCircleHTML = function(custom_class) {
    return '<div class = "circle '+custom_class +'"></div>';
};
var getStatCirclesHTML = function(amount) {
    var html = '';
    var amount = amount;
    for(var i = 0; i<5; i++) {
        amount--;
        html += getStatCircleHTML(amount >= 0 ? 'green' : 'white');
    };
    return html;
};
