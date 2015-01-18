var Hotkeys = (function() {
	var nav = [97, 98, 99, 100, 101, 102, 103, 104, 105];
	var arrows = [37, 38, 39, 40];
	var arrow2nav = {
		37 : 100,
		38 : 104,
		39 : 102,
		40 : 98
	};
	return {
		press : function(event) {
			console.log(event.which)
			var keyCode = event.keyCode;
			if (arrows.indexOf(keyCode)>-1) {
				event.preventDefault();
				keyCode = arrow2nav[keyCode];
			};
			$('[data-hotkey='+String.fromCharCode(keyCode)+']').click();
		}
	}
})();
$(document).keypress(function(event) {
	Hotkeys.press(event);
})