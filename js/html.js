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
                html += cell.getHTML();    
            };
            html += '</td>';        
        });  
        html += '</tr>';
    });
    html += '</table>'
    return html;
};

Place.prototype.getHTML = function() {
    var html = '<div class="place" data-x='+this.x+' data-y = '+this.y+'>';
    html += this.name;
    html += '</div>';
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
	return '<div class="post post-'+this.type+'">'+this.text+'</div>';
};

Tab.prototype.getHTML = function() {
	var html = '<div class = "mode-switcher">';
	html += '</div>';
	html += this.modes2HTML[this.mode];
	return html;
};

