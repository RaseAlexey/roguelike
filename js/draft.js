
var Draft = function(level, turns, end_callback) { // new Draft(1, )
    this.level = level;
    this.choices = [];
    this.turns = turns;
    this.turn = 0;
    this.end_callback = end_callback;

    var self = this;
    for (var i = 0; i < turns; i++) {
        self.choices.push(new Choice(self, 3));
    };
    

    this.start = function() {
        var tab = UI.tabs['draft'];
        tab.data.draft = this;
        tab.show();
        UI.blockTab('place')
        UI.minimizeTabs();
        UI.maximizeTab('draft');
        UI.maximizeTab('chat');
    }; 

   this.end = function() {
        end_callback();
        UI.tabs['draft'].data.draft = undefined;
        UI.hideTab('draft');
        UI.showTab('place'); 
        UI.maximizeTabs();   
    };

    this.tick = function() {
        this.turn++;
        if (this.turn >= this.choices.length) {
            this.end();
        }
        UI.refreshTabs(); 
    };

    this.pick = function(id) {
        this.choices[this.turn].options[id].pick();
        this.tick();
    };
 
};


var Choice = function(draft) {
    this.draft = draft;
    this.level = this.draft.level;
    this.options = [];


    var self = this;
    for (var k = 0; k < 3; k++) {
        if(rand(100) <= 20) {
            self.options.push(new OptionStat(self, getRandomItemInArray(['str', 'dex', 'int'])));
        } else {
            self.options.push(new OptionItem(self, self.draft.level));        
        }
    };

};


var Option = function(choice, content, script) {
    this.choice = choice;
    this.content = content; //text or item
    this.script = script || function() {};


    this.pick = function() {
        chat.send(this.getChatMessage());
        this.script(); 
    };

    this.getId = function() {
        console.log(this, this.choice, this.choice.options)
        return this.choice.options.indexOf(this);
    };

    this.getChatMessage = function() {
        if(this.content.name) {
            return "You've choosen " + content.name;
        } else {
            return this.content;
        }
    };
};


var OptionItem = function(choice, level) {
    var item = item_templates.getRandom().getItem();  // here we need to choose items by level
    return new Option(choice, item, add_item_to_player_formula(item));
};


var OptionStat = function(choice, stat_name) {
    return new Option(choice, 'Increase your ' + acronym_dictionary.getFullWord(stat_name), inc_player_stat_formula(stat_name));
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

/*
var generate_question = function() {
  var options = [];
    for (var k = 0; k<3; k++) {
        var option = generate_option();
        option.id = k;
        options.push(option);
    };
    return new Question('', options)
}
var generate_option = function() {
    return getRandomItemInArray(options_pull); //here must be recursive algorithm
};

var generate_draft = function(number_of_choices) {
    var questions = [];

    questions.push(new Question('Next five choices will decide your fate!', [new Option('OK')]));

    for (var i = 0; i<number_of_choices; i++) {
        questions.push(generate_question());
    };

    questions.push(new Question('Are you ready?', [new Option('Yes!', function() {
        player.goTo(dungeon.floors[0]);
    } )]));

    return new Draft(new Quiz(questions));
};
*/

/*
var level_up_generator = function(level) {
    var questions = [];
    var options_pull = [];

    item_templates.all.forEach(function(item_template) {
        var item = item_template.getItem();
        options_pull.push(new OptionItemRevard(item));
    });

    ['str', 'dex', 'end', 'int'].forEach(function(stat_name) {
        options_pull.push(new OptionStatRevard(stat_name));
    });

    questions.push(new Question('Choose your reward for completing the floor:', [getRandomItemInArray(options_pull), getRandomItemInArray(options_pull), getRandomItemInArray(options_pull)]));

    questions.push(new Question('Are you ready?', [new Option('Yes!', function() {
    } )]));

    return new Draft(new Quiz(questions));
};
*/

