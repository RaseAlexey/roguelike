var unit_templates = [
	new UnitTemplate('Prisoner', 1, {strength : 'low', dexterity : 'low', intelligence : 'low' }, ['Humanoid', 'Alive'], {}, []),
	new UnitTemplate('Rat', 1, 
			{
				strength : 8,
				dexterity : 14,
				intelligence : 6
			}, 
			['Animal', 'Alive'],
			{
				onHit : {
					succes : 'Poison'
				}
			},
			[rare_unit_prefixes.large, rare_unit_prefixes.pox, rare_unit_prefixes.zombie], [], [], []
	)
];
var unit_templates_by_place = {};
var unit_templates_by_name = {};
unit_templates.forEach(function(template, index) {
	unit_templates_by_name[template.getName()] = template;
});
var unit_templates_by_place = {
	'Sewers' : [
		unit_templates_by_name['Rat']
	],
	'Dusty room' : [
		unit_templates_by_name['Prisoner']
	]
};