var Tab = function(node, default_content) {
	this.node = node;
	this.default_content = default_content;
	this.content = default_content;

	this.draw = function() {
		this.node.html(this.content.getHTML());
	};
};