
var Chat = function(node) {
	this.node = node;
	this.posts = [];

	this.send = function(post) {
		var post = post.constructor == Post ? post : new Post(post, 'generic', stack.time);
		this.posts.unshift(post);
		UI.refreshTabs();
	};

	this.refresh = function() {
		this.node.html(this.getHTML());
	};
};


var Post = function(text, type, time) {
	this.text = text;
	this.type = type || 'generic';
	this.time = time || stack.time;
};