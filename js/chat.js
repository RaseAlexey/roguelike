var Chat = function(node) {
	this.node = node;
	this.posts = [];

	this.send = function(post) {
		var post = post.constructor == Post ? post : new Post('generic', post);
		this.posts.push(post);
	};

	this.refresh = function() {
		this.node.html(this.getHTML());
	};

	this.getHTML = function() {
		var html = '<div class="chatbox">';
		this.posts.forEach(function(post, index) {
			html += post.getHTML();
		});
		html += '</div>';
		return html;
	};
};


var Post = function(text, type) {
	this.text = text;
	this.type = type || 'generic';

	this.getHTML = function() {
		return '<div class="post post-'+this.type+'">'+this.text+'</div>';
	};
};