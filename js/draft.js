
var Draft = function(quiz) {
    this.quiz = quiz;
    this.turn = 0;
    this.question = this.quiz.questions[0];
    console.log(this.question);

    UI.tabs['draft'].data.draft = this;

    this.start = function() {
        var tab = UI.tabs['draft'];
        tab.data.draft = this;
        tab.show();
        UI.minimizeTabs();
        UI.maximizeTab('draft');
    };

    this.tick = function() {
        this.turn++;
        if (this.turn >= this.quiz.questions.length) {
            this.end();
        } else {
            this.question = this.quiz.questions[this.turn];
        };
        console.log(this.question, this.question.options);
        UI.refreshTabs(); 
    };

   this.end = function() {
        UI.tabs['draft'].data.draft = undefined;
        UI.hideTab('draft');
        UI.showTab('place'); 
        UI.maximizeTabs();   
    };

    this.chooseOption = function(id) {
        console.log('chooseOption', id, this.question.options, this.question.options[id]);
        chat.send(this.question.options[id].text);
        this.question.options[id].script();
        this.tick();
    };
 
};


var Quiz = function(questions) {
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


var OptionItemRevard = function(item) {
    return new Option(item.name, add_item_to_player_formula(item));
};

var OptionStatsRevard = function(text, stats_name) {
    return new Option(text, inc_player_stats_formula(stats_name));
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


    item_templates.all.forEach(function(item_template) {
        var item = item_template.getItem();
        options_pull.push(new OptionItemRevard(item));
    });

    ['str', 'dex', 'end', 'int'].forEach(function(stat_name) {
        options_pull.push(new OptionStatsRevard('Increase your ' + stat_name, stat_name));
    });


    for (var i = 0; i<5; i++) {
        var options = [];
        options.push(getRandomItemInArray(options_pull));
        options.push(getRandomItemInArray(options_pull));
        options.push(getRandomItemInArray(options_pull));
        questions.push(new Question('', options));
    }

    //questions.push(new Question('Are you ready?', [new Option('Yes!', player.goTo(dungeon.floors[0]) )]));
    questions.push(new Question('Are you ready?', [new Option('Yes!', function() {
        player.goTo(dungeon.floors[0]);
    } )]));

    return new Draft(new Quiz(questions));
};


var level_up_generator = function(level) {
    var questions = [];
    var options_pull = [];

    item_templates.all.forEach(function(item_template) {
        var item = item_template.getItem();
        options_pull.push(new OptionItemRevard(item));
    });

    ['str', 'dex', 'end', 'int'].forEach(function(stat_name) {
        options_pull.push(new OptionStatsRevard('Increase your ' + stat_name, stat_name));
    });

    questions.push(new Question('Choose your reward for completing the floor:', [getRandomItemInArray(options_pull), getRandomItemInArray(options_pull), getRandomItemInArray(options_pull)]));

    questions.push(new Question('Are you ready?', [new Option('Yes!', function() {
    } )]));

    return new Draft(new Quiz(questions));
};

