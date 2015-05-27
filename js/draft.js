
var Draft = function(quiz) {
    this.quiz = quiz;
    this.turn = 0;
    this.question = this.quiz.questions[0];

    this.start = function() {
        console.log(this.quiz);
        UI.tabs['draft'].draw();
    };

    this.tick = function() {
        this.turn++;
        console.log('tick', this.turn);
        if (this.turn >= this.quiz.questions.length) {
            this.end();
        } else {
            this.question = this.quiz.questions[this.turn];
        };
        console.log(this.turn, this.quiz.questions, this.question);
        UI.refreshTabs(); 

    };

    this.chooseOption = function(id) {
        console.log('you chose option '+id);
        this.question.options[id].script();
        this.tick();
    };

    this.end = function() {
        UI.hideTab('draft');
    };
};


var Quiz = function(questions) {
    console.log(questions)
    this.questions = questions;

    var self = this;
    this.questions.forEach(function(question, id) {
        question.quiz = self;
    });
};


var Question = function(text, options) {
    this.text = text;
    this.options = options;

    var self = this;
    this.options.forEach(function(option, id) {
        option.question = self;
    });
};


var Option = function(text, script) {
    this.text = text;
    this.script = script || function() {};

    this.getId = function() {
        return this.question.options.indexOf(this);
    }
};


var OptionItemRevard = function(text, item) {
    //this.text = text;
    //this.script = add_item_to_player_formula(item);
    return new Option(text, add_item_to_player_formula(item));
};




/*
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
*/



var draft_generator = function() {
    var questions = [];
    var options_pull = [];

    questions.push(new Question('Next five choices will decide your fate!', [new Option('OK')]));

    items_library.all.forEach(function(item) {
        options_pull.push(new OptionItemRevard(item.name, item));
    });

    for (var i = 0; i<5; i++) {
        var options = [];
        options.push(getRandomItemInArray(options_pull));
        options.push(getRandomItemInArray(options_pull));
        options.push(getRandomItemInArray(options_pull));
        questions.push(new Question('Choose: ', options));
    };

    //questions.push(new Question('Are you ready?', [new Option('Yes!', player.goTo(dungeon.floors[0]) )]));
    questions.push(new Question('Are you ready?', [new Option('Yes!', function(){player.goTo(dungeon.floors[0]); UI.maximizeTabs()} )]));

    return new Draft(new Quiz(questions));
};