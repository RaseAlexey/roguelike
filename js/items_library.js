

/*
 Основная концепция балансировки оружия:
 attack_time = 1; dmg  =  5;
 attack_time = 2; dmg =  10;
 attack_time = 3; dmg =  15;

 среднее accuracy = 5
 средний dps = 5
 */

var items_library = new Collection([
    // old trash section
new Item(null, 		'sword', 			{'dmg':3, 'accuracy':7, 'attack_time':1, 'weight':10}, {'strength':10}, 'hand', {}),
new Item(null, 		'axe', 				{'dmg':4, 'accuracy':6, 'attack_time':1, 'weight':10}, {'strength':10}, 'hand', {}),
new Item(null, 		'mace', 			{'dmg':5, 'accuracy':5, 'attack_time':1, 'weight':10}, {'strength':10}, 'hand', {}),
new Item(null, 		'spear	', 			{'dmg':8, 'accuracy':7, 'attack_time':2, 'weight':10}, {'strength':10}, 'hand', {}),
new Item(null, 	'hammer', 			{'dmg':10, 'accuracy':5, 'attack_time':2, 'weight':10}, {'strength':10}, 'hand', {}),
new Item(null, 	'claymore	', 		{'dmg':16, 'accuracy':4, 'attack_time':3, 'weight':10}, {'strength':20}, 'hand', {}),
new Item(null, 'light helm', 		{'armor':1, 'weight':4}, {}, 'head', {}),
new Item(null, 'heavy helm', 		{'armor':2, 'weight':8}, {'strength':11}, 'head', {}),

//var heavy_helm = new Item(null, 'heavy helm', 		{'armor':2, 'weight':8}, {'strength':11}, 'head', {});



    // ########################################## WEAPON ##########################################
    // Light
    new Item(null, 'Light sword',   {'dmg':5, 'accuracy':5, 'attack_time':1}, {'strength':0}, 'hand', {}),
    // Medium
    new Item(null, 'Medium sword',  {'dmg':10, 'accuracy':5, 'attack_time':2}, {'strength':1}, 'hand', {}),
    // Heavy
    new Item(null, 'Heavy sword',   {'dmg':15, 'accuracy':5, 'attack_time':3}, {'strength':2}, 'hand', {}),
    // SuperHeavy
    new Item(null, 'SuperHeavy sword', {'dmg':20, 'accuracy':5, 'attack_time':4}, {'strength':3}, 'hand', {}),


    // ########################################## ARMOR ##########################################
    // Light
    new Item(null, 'Light armor',   {'def':1, 'dex_penalty':0}, {'strength':0}, 'torso', {}),
    // Medium
    new Item(null, 'Medium armor',  {'def':2, 'dex_penalty':1}, {'strength':1}, 'torso', {}),
    // Heavy
    new Item(null, 'Heavy armor',   {'def':3, 'dex_penalty':2}, {'strength':2}, 'torso', {}),
    // SuperHeavy
    new Item(null, 'SuperHeavy armor', {'def':4, 'dex_penalty':3}, {'strength':3}, 'torso', {}),


    // ########################################## SHIELDS ##########################################
    // Light
    new Item(null, 'Light shield',   {'block_rate':20, 'dex_penalty':0}, {'strength':0}, 'hand', {}),
    // Medium
    new Item(null, 'Medium shield',  {'block_rate':35, 'dex_penalty':1}, {'strength':1}, 'hand', {}),
    // Heavy
    new Item(null, 'Heavy shield',   {'block_rate':50, 'dex_penalty':2}, {'strength':2}, 'hand', {}),
    // SuperHeavy
    new Item(null, 'SuperHeavy shield', {'block_rate':60, 'dex_penalty':3}, {'strength':3}, 'hand', {}),



]);
