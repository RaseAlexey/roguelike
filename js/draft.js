
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





var old_draft = new Quiz(
    'Сhoose your destiny!', [
        new Question('choose weapon: ', [
            new OptionItemRevard('Light sword', items_library.getByName('Light sword')),
            new OptionItemRevard('Medium sword',   items_library.getByName('Medium sword')),
            new Option('gold',  function() {  })
        ]),
        new Question('choose armor: ', [
            new OptionItemRevard('Light armor',  items_library.getByName('Light armor')),
            new OptionItemRevard('Medium armor',items_library.getByName('Medium armor')),
            new Option('gold',  function() {  })
        ])
    ],
    'So, lets go fight!');




var draft_generator = function() {
    var questions = [];

    var options_pull = [];

    items_library.all.forEach(function(item) {
        options_pull.push(new OptionItemRevard(item.name, item));
    });

    for (var i = 0; i<5; i++) {
        var options = [];
        options.push(getRandomItemInArray(options_pull));
        options.push(getRandomItemInArray(options_pull));
        options.push(getRandomItemInArray(options_pull));
        questions.push(new Question('Choose: ', options));
    }

    return new Quiz(
        'Next 5 elections decide your fate.',
        questions,
        'So, lets go fight!'
    );
};