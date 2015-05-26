
var Inquirer = function(quiz) {
    this.quiz = quiz;
    this.counter = 0;


    this.start = function() {
        this.showText(this.quiz.start);
        this.step();
    };

    this.step = function() {
        if (this.counter == this.quiz.questions.length) {
            this.end();
            return 0;
        }
        var variant = this.showVariants(this.quiz.questions[this.counter]);
        this.quiz.questions[this.counter].options[variant].script();
        this.counter++;
        this.step();
    };

    this.end = function() {
        this.showText(this.quiz.end);
        // UI.draw();
    };

    this.showText = function(text) {
        alert(text);
    };

    this.showVariants = function(question) {
        return prompt(question.text, '0');
    };

};


var Quiz = function(start, questions, end) {
    this.start = start;
    this.questions = questions;
    this.end = end;
};

var Question = function(text, options) {
    this.text = text;
    this.options = options;
};


var Option = function(text, script) {
    this.text = text;
    this.script = script;
};





var initial_draft = new Quiz(
    'Сhoose your destiny!', [
        new Question('choose weapon: ', [
            new Option('sword', function() { player.addItem(new Item(null, 	'sword', {'dmg':3, 'accuracy':7, 'attack_time':1, 'weight':10}, {'strength':10}, 'hand', {})); }),
            new Option('axe',   function() { player.addItem(new Item(null, 	'axe', 	{'dmg':4, 'accuracy':6, 'attack_time':1, 'weight':10}, {'strength':10}, 'hand', {})); }),
            new Option('mace',  function() { player.addItem(new Item(null, 	'mace', {'dmg':5, 'accuracy':5, 'attack_time':1, 'weight':10}, {'strength':10}, 'hand', {})); })
        ]),
        new Question('choose armor: ', [
            new Option('light armor',  function() { player.addItem(new Item(null, 'light armor', {'armor':1, 'weight':1}, {'strength':1}, 'body', {})); }),
            new Option('medium armor', function() { player.addItem(new Item(null, 'medium armor', {'armor':2, 'weight':2}, {'strength':2}, 'body', {})); }),
            new Option('heavy armor',  function() { player.addItem(new Item(null, 'heavy armor', {'armor':3, 'weight':3}, {'strength':3}, 'body', {})); })
        ])
    ],
    'So, lets go fight!');
