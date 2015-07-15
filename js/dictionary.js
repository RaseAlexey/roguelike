/*
	AcronymDictionary contains dictionary of abbreviations and shortenings of words and their full variations
*/

var AcronymDictionary = function(words) {
	this.words = words; // { 'word' : ['abr1', 'abr2'] }


	this.getFullWord = function(short_word) {
		var full_word;
		$.each(this.words, function(word, abbreviations) {
			if(abbreviations.indexOf(short_word) > -1 && !full_word) {
				full_word = word;
			}
		});
		return full_word;
	};
	this.getShortWord = function(full_word) {
		var short_word;
		$.each(this.words, function(word, abbreviations) {
			if(full_word == word && !short_word) {
				short_word = word;
			}
		});
		return short_word;
	};
};

var acronym_dictionary = new AcronymDictionary({
	'strength' : ['str'],
	'dexterity' : ['dex'],
	'endurance' : ['end'],
	'intelligence' : ['int']
});