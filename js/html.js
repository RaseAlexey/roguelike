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
    if(this.ground_items.length > 0) {
        html += this.getItemsHTML();
    };
    html += this.getConnectionsHTML();
    if(this.hasEnemies()) {
        html += '<div class="rectangle wait-button centered clickable border-thin border-round green sml-pad"><div>Wait</div></div>';
    } else {
        html += '<div class="rectangle rest-button centered clickable border-thin border-round green sml-pad"><div>Rest</div></div>';
    }
    return html;
};

Place.prototype.getEnemiesHTML = function() {
    var html = '';
    html += '<div class="list-header">Enemies</div>';
        html += '<div class="place_enemies column centered">';
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
    html +=  '<div class="rectangle connections-container light-blue column centered border-thin border-round sml-pad">';
    html += '<div class="list-header">Connections</div>';
    html += '<div class="connections column centered">';
    $.each(this.getConnections(), function(direction, destination) {
        html += '<div class="rectangle connection centered clickable border-thin border-round border-thin border-round blue sml-pad" data-x='+destination.x+' data-y='+destination.y+'><span>' + direction + ': ' + destination.name + '</span></div>';
    });
    if (this.template.type == 'entrance') {
        html += '<div class="rectangle centered clickable border-thin border-round stairs up blue sml-pad"><div>Climb the stairs</div></div>';
    }
    if (this.template.type == 'stairs') {
        html += '<div class="rectangle centered clickable border-thin border-round stairs down blue sml-pad"><div>Down the stairs</div></div>';
    }
    html += '</div>';
    html += '</div>';
    return html;
};

Place.prototype.getItemsHTML = function() {
    var html = '';
    html += '<div class="list-header">Items</div>';
    html += '<div class="place_items column centered">';
    this.ground_items.forEach(function(item) {
        html += item.getHTML();
    });
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
	return '<div class="post font-sml '+this.type+'">'+'<span class="time">'+this.time+': </span>'+this.text+'</div>';
};


Unit.prototype.getHTML = function() {
    var classes = player.isEnemyWith(this) ? 'enemy red' : '';
    var html = '';
    html += '<div class="rectangle centered clickable border-thin border-round unit sml-pad '+classes+'" data-id='+this.getId()+'>';
    html += '<div>' + this.name + ' (' + this.stats.hp + '/' + this.stats.max_hp + ')' + '</div>';
    html += '</div>';
    return html;
};

Unit.prototype.getStatsHTML = function() {
    var html = '<div class="unit-stats">';
    html += '<div>Hitpoints: ' + this.stats.hp + '/' + this.stats.max_hp + '</div>';
    var self = this;
    ['str', 'dex', 'end', 'int'].forEach(function(stat) {
        html += '<div class="rectangle stat border-thin border-round grey sml-pad"><div class="stat-name centered">' + stat + '</div><div class="row centered center-aligned stat-value">' + getStatCirclesHTML(self.stats[stat]) + '</div></div>';
    });
    html += '</div>';
    return html;
};

Unit.prototype.getInventoryHTML = function() {
    var html = '<div class="inventory column centered">';
    this.inventory.inv_items.forEach(function(item, id) {
        html += item.getHTML();
    });
    html += '</div>';
    return html;
};

Unit.prototype.getSlotsHTML = function() {
    var html = '';
    html += '<div class="slots column centered">';
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
    var classes = (this.item ? 'full sml-top-pad': 'empty sml-pad');
    html += '<div class="rectangle justified border-thin border-round column slot grey '+classes+'" data-id='+this.getId()+'>';
    html += '<div class="centered">' + this.type + '</div>';
    if(this.item) {
        html += this.item.getHTML();    
    };
    html += '</div>';
    return html;
};

Item.prototype.getHTML = function() {
    var html = '';
    var id = this.getId();
    html += '<div class="rectangle item centered center-aligned row clickable border-thin border-round swampish-yellow sml-pad" data-id='+id+'>';
    html += '<div class="circle button info-button clickable blue border-thin column centered clickable center-aligned font-white font-sml sml-pad"><div class="button-text">i</div></div>';
    html += '<div class="item-name centered-text">' + this.name + '</div>';
    if(this.unit) {
        html += '<div class="rectangle button clickable border-thin border-round drop-button dark-red sml-pad"><div class="button-text">drop</div></div>';
    }
    if(this.slot && this.slot.type == 'hand' && !this.slot.pair_slot) {
        html += '<div class="rectangle button clickable border-thin border-round twohand-button dark-red sml-pad"><div class="button-text">twohand</div></div>';
    }
    if(this.slot && this.slot.type == 'hand' && this.slot.pair_slot) {
        html += '<div class="rectangle button clickable border-thin border-round twohand-button dark-red sml-pad"><div class="button-text">onehand</div></div>';
    }
    html += '</div>'
    return html;
};


Draft.prototype.getHTML = function() {
    var html = '';
    html += '<div class = "draft">';
    console.log(this.choices);
    console.log(this.turn);
    html += this.choices[this.turn].getHTML();
    html += '</div>';
    return html;
};

Choice.prototype.getHTML = function() {
    var html = '';
    html += '<div class = "choice">';
    this.options.forEach(function (option, id) {
        html += option.getHTML();
    });
    html += '</div>';
    return html;
};

Option.prototype.getHTML = function() {
    var html = '';
    html += '<div class = "rectangle option clickable border-thin border-round blue column centered sml-pad" data-option-id=' + this.getId() + '>';
    if(this.content.getHTML) {
        html += this.content.getHTML();
    } else {
        html += '<div class="option-text centered-text">' + this.content + '</div>';  
    };
    html += '</div>';
    return html;
};


Tab.prototype.getHTML = function() {
    if(this.isBlocked) return '';
    var html = '<div class="tab column border-round border-thin" data-id='+this.mode+'>';
    html += this.getInnerHTML();
    html += '</div>';
    return html;
};

Tab.prototype.getInnerHTML = function() {
    var html = '<div class = "tab_header header row centered center-aligned clickable font-white">'+this.mode+'</div>';
    html += '<div class="tab_contents column">';
    html += this.inner_html_func.apply(this, [this.data]);
    html += '</div>';
    return html;
};

Tab.prototype.getMenuButtonHTML = function() {
    var html = '';
    var classes;
    if(this.isBlocked) {
        classes = 'blocked font-dark-grey light-grey';
    } else {
        if(this.isMinimized) {
            var classes = 'minimized grey font-deep-dark-grey'
        } else {
            var classes = 'maximized dark-grey font-white'
        };
    };
    html += '<div class="rectangle tab-icon column centered center-aligned clickable border-round sml-pad '+classes+'" data-id='+this.mode+'><div class="tab-icon-text">'+this.mode+'</div></div>';
    return html;
};


var getStatCircleHTML = function(custom_class) {
    return '<div class = "circle border-thin '+custom_class +'"></div>';
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
