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
    console.log(this)
    var html = '<div class="header">' + this.name + '</div>';
    if(this.hasEnemies()) {
        html += '<div class="list-header">Enemies</div>';
        html += '<div class="place_enemies v-list">';
        this.units.forEach(function(unit, id) {
            if(unit != player) {
            html += unit.getHTML();
            };
        })
        html += '</div>';   
    } else {
        //Interaction
    };
    if(this.items.length > 0) {
        html += '<div class="v-list tab_footer">'
        html += '<div class="list-header">Items</div>';
        html += '<div class="place_items v-list">';
        this.items.forEach(function(item, id) {
            html += item.getHTML();
        });
        html += '</div>';
        html += '</div>';
    };
    return html;
};

Chat.prototype.getHTML = function() {
	var html = '';
	this.posts.forEach(function(post, index) {
		html += post.getHTML();
	});
	return html;
};

Post.prototype.getHTML = function() {
	return '<div class="post post-'+this.type+'">'+'<span class="time">'+this.time+': </span>'+this.text+'</div>';
};



Unit.prototype.getHTML = function() {
    var classes = player.isEnemyWith(this) ? ' enemy' : '';
    var html = '';
    html += '<div class="unit" data-id='+this.getId()+'>';
    html += '<div class="name'+classes+'">' + this.name + '(' + this.stats.maxhp + '/' + this.stats.hp + ')' + '</div>';
    html += '</div>';
    return html;
};

Unit.prototype.getStatsHTML = function() {
    var html = '<div class="unit-stats">';
    $.each(this.stats, function(stat, value) {
        html = html + stat + ': ' + value + '<br>';
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
        html += '<div class="button drop-button">drop</div>';
    };
    if(this.slot && this.slot.type == 'hand' && !this.slot.pair_slot) {
        html += '<div class="button twohand-button">twohand</div>';
    }
    if(this.slot && this.slot.type == 'hand' && this.slot.pair_slot) {
        html += '<div class="button twohand-button">onehand</div>';
    }
    html += '</div>'
    return html;
};


Tab.prototype.getHTML = function() {
    var html = '<div class="tab" data-id='+this.getId()+'>';
    html += this.getInnerHTML();
    html += '</div>';
    return html;
};


Tab.prototype.getInnerHTML = function() {
	var html = '<div class = "tab_header header">'+this.mode+'</div>';
    html += '<div class="tab_contents">';
	html += UI.tab_modes2HTML[this.mode]();
    html += '</div>';
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
