
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
        var text = question.text;
        question.options.forEach(function(option, id) {
            text += ' ' + id + ':' + option.text;
        });

        return prompt(text, '0');
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


var OptionItemRevard = function(text, item) {
    this.text = text;
    this.script = add_item_to_player_formula(item);
};





var initial_draft = new Quiz(
    'Сhoose your destiny!', [
        new Question('choose weapon: ', [
            new OptionItemRevard('sword', new Item(null, 	'sword', {'dmg':3, 'accuracy':7, 'attack_time':1, 'weight':10}, {'strength':10}, 'hand', {})),
            new OptionItemRevard('axe',   new Item(null, 	'axe', 	{'dmg':4, 'accuracy':6, 'attack_time':1, 'weight':10}, {'strength':10}, 'hand', {})),
            new Option('gold',  function() {  })
        ]),
        new Question('choose armor: ', [
            new OptionItemRevard('light armor',  new Item(null, 'light armor', {'armor':1, 'weight':1}, {'strength':1}, 'body', {})),
            new OptionItemRevard('medium armor', new Item(null, 'medium armor', {'armor':2, 'weight':2}, {'strength':2}, 'body', {})),
            new Option('gold',  function() {  })
        ])
    ],
    'So, lets go fight!');
