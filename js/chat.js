var Chat = (function() {
	var posts = [];
	return {
		refresh : function() {
			$('.chat_container').html(this.getCode());
		},
		getPosts : function() {return posts},
		getCode : function() {
			var code = '<div class="chat">';
			this.getPosts().slice().reverse().forEach(function(post, index) {
				code += post.getCode();
			});
			code += '</div>';
			return code;
		},
		post : function(post) {
			posts.push(post);
			this.refresh();
		}
	}
})();
var Post = function (message, type) {
	var message = message;
	var type = type || 'generic';
	return {
		getCode : function() {
			return '<div class="post post_'+type+'">'+message+'</div>'
		},
		getType : function() {return type},
		getMessage : function() {return message}
	}
};