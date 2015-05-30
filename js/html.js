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
        html += '<div class="connection" data-x='+destination.x+' data-y='+destination.y+'><div class="name">' + direction + ': ' + destination.name + '</div></div>';
    });
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
    this.items.forEach(function(item, id) {
        console.log(this.items, item)
        a = item;
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
	return '<div class="post post-'+this.type+'">'+'<span class="time">'+this.time+': </span>'+this.text+'</div>';
};


Unit.prototype.getHTML = function() {
    var classes = player.isEnemyWith(this) ? ' enemy' : '';
    var html = '';
    html += '<div class="unit'+classes+'" data-id='+this.getId()+'>';
    html += '<div class="name">' + this.name + ' (' + this.stats.hp + '/' + this.stats.max_hp + ')' + '</div>';
    html += '</div>';
    return html;
};

Unit.prototype.getStatsHTML = function() {
    var html = '<div class="unit-stats">';
    /*
    $.each(this.stats, function(stat, value) {
        html = html + stat + ': ' + value + '<br>';
    });
    */
    html += '<span>Hitpoints: ' + this.stats.hp + '/' + this.stats.max_hp + '</span>';
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
    var classes = (this.item ? ' full': ' empty');
    html += '<div class="slot'+classes+'" data-id='+this.getId()+'>';
    html += '<div class="name">' + this.type + '</div>';
    if(this.item) {
        html += this.item.getHTML();    
    };
    html += '</div>';
    return html;
};

Item.prototype.getHTML = function() {
    var classes = '';
    var html = '';
    var id = this.getId();
    html += '<div class="item" data-id='+id+'>';
    html += '<div class="name'+classes+'">' + this.name + '</div>';
    if(this.unit) {
        html += '<div class="button drop-button"><span>drop</span></div>';
    };
    if(this.slot && this.slot.type == 'hand' && !this.slot.pair_slot) {
        html += '<div class="button twohand-button"><span>twohand</span></div>';
    }
    if(this.slot && this.slot.type == 'hand' && this.slot.pair_slot) {
        html += '<div class="button twohand-button"><span>onehand</span></div>';
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
    html += '<div class = "question">';
    html += this.text;
    this.options.forEach(function (option, id) {
        html += option.getHTML();
    });
    html += '</div>';
    return html;
};

Option.prototype.getHTML = function() {
    var html = '';
    html += '<div class = "option" data-id=' + this.getId() + '>';
    html += '<span>'+this.text+'</span>';
    //html += '<div class="name">'+this.text+'</div>';
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
    var html = '<div class = "tab_header header">'+this.mode+'</div>';
    html += '<div class="tab_contents">';
    html += this.inner_html_func.apply(this, [this.data]);
    html += '</div>';
    return html;
};

Tab.prototype.getPanelButtonHTML = function() {
    var html = '';
    var classes;
    if(this.isBlocked) {
        classes = 'blocked';
    } else {
        if(this.isMinimized) {
            var classes = 'minimized'
        } else {
            var classes = 'maximized'
        };
    };
    html += '<div class="tab-icon '+classes+'" data-id='+this.mode+'>'+this.mode+'</div>';
    return html;
};


$(document).on('click', '.list-header', function() {
    var list = $(this).next();
    if(list.is(':visible')) {  
        list.hide();
    } else {
        list.show();
    }
});
