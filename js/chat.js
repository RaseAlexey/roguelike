var node = $('.chatbox');


var chat = {
	this.node = node;
	this.posts = [];

	this.send = function(post) {
		this.posts.push(post);
	};

	this.refresh = function() {
		var text = '';
		this.posts.forEach(function(post, index) {
			text += post.getHTML();
		});
		this.node.html(text);
	};
})();


var Post = function(type, text) {
	this.type = type;
	this.text = text;

	this.getHTML = function() {
		return '<div class="post '+this.type+'">'+this.text+'</div>'
	};
}