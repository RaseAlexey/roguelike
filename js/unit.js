var Unit = function(name, level, strength, dexterity, intelligence, types, script) {
	var name = name;
	var hp = hp;
	var level = level;
	var strength = strength;
	var dexterity = dexterity;
	var intelligence = intelligence;
	var stats = {};
	var script = script;
	var image_url = image_url;
	var location_id;
	var place_id;
	var action;
	var target;
	var template;
	var inventory = new Inventory();
	return {
		getId : function() {
			return this.getPlace().getUnits().indexOf(this);
		},
		isEnemy : function() {
			return this!=Player;
		},
		getName : function() {
			return name;
		},
		getInventory : function() {
			return inventory;
		},
		getTemplate : function() {
			return template;
		},
		setTemplate : function(new_template) {
			return template = new_template;
		},
		getImageUrl : function() {
			if(unit_images_by_name[this.getName()]) {
				return unit_images_by_name[this.getName()];
			} else {
				return unit_images_by_name[this.getTemplate().getName()];
			}
		},
		getLevel : function() {
			return level;
		},
		getHp : function() {
			return this.getLevel()*this.getStrength();
		},
		getStat : function(stat_name) {
			return stats(stat);
		},
		setStat : function(stat_name, number) {
			return stats(stat) = number;
		},
		plusStat : function(stat_name, number) {
			return stats(stat) += number;
		},
		minusStat : function(stat_name, number) {
			return stats(stat) -= number;
		},
		addBonuses : function(bonuses) {
			var bonuses = bonuses;
			var unit = this;
			$.each(this.getStats(), function(stat_name, value) {
				unit.addStat(stat_name, bonuses(stat_name))
			})
		},
		getStrength : function() {
			return strength;
		},
		getDexterity : function() {
			return dexterity;
		},
		getIntelligence : function() {
			return intelligence;
		},
		getStats : function() {
			return {
				strength : strength,
				dexterity : dexterity,
				intelligence : intelligence
			}
		},
		getScript : function() {
			return script;
		},
		getShortCode : function () {
			var css_class = this.isEnemy()?'enemy':'ally';
			var code = '<span class="unit_code '+css_class+'" data-id="'+this.getId()+'">';
			code += '<span class="unit_name">'+this.getName()+'</span>';
			code += '</span>'
			return code;
		},
		getSidebarCode : function() {
			var code = '<div class="unit_sidebar_code"><div class="sidebar_header"><span class="unit_name">'+this.getName()+'</span></div><img src="'+this.getImageUrl()+'">';
			return code;	
		},
		getAttackSpeed : function() {
			return 5
		},
		getPlace : function() {
			if ((this.getLocationId()==undefined) && (this.getPlaceId()==undefined)) {
				return undefined;
			} else {
				return this.getLocation().getPlace(this.getPlaceId());
			}
		},
		getPlaceId : function() {
			return place_id;
		},
		getLocation : function() {
			return locations[location_id];
		},
		getLocationId : function() {
			return location_id;
		},
		setLocation : function(new_location_id) {
			return location_id = new_location_id;
		},
		setPlace : function(new_place_id) {
			this.getLocation().getPlace(new_place_id).addUnit(this);
			return place_id = new_place_id;
		},
		startAction : function(new_action) {
			if(!this.getAction()) {
				new_action.setUnit(this);
				Stack.addObject(this);
				action = new_action;
				if(this==Player) {
					Stack.passTillPlayer();
				};
			} else {
				console.log('unit tried to start new action without finishing current one');
			}
		},
		endAction : function() {
			Stack.removeObject(this);
			action = null;
		},
		getAction : function() {
			return action;
		},
		strike : function(target) {
			this.startAction(new Action(this.getAttackSpeed(), function() {
				weapon.dealDamageTo(target);
			}));
			return target = target;
		},
		goTo : function(dest_location_id, dest_place_id) {
			var place = locations[dest_location_id].getPlace(dest_place_id);
			this.startAction(new Action(10, function() {
				if(this.getPlace()) {
					this.getPlace().removeUnit(this);
				};
				this.setLocation(dest_location_id);
				this.setPlace(dest_place_id);
				if(this == Player) {
					if(!place.isVisited()) {						
						place.visit();
					};
					Chat.post(new Post('You entered '+Player.getLocation().getName()+': '+Player.getPlace().getName()+Player.getPlace().getDepth()))			
				};
			}))
		}
	}
};
var UnitBonus = function(text, bonuses, types, script) {
	this.text = text;
	this.bonuses = bonuses;
	this.types = types;
	this.script = script;
	this.getText = function(){return text}
};
var UnitPrefix = function(text, bonuses, types, script) {
	var prefix = new UnitBonus(text, bonuses, types, script);
	prefix.constructor = UnitPrefix;
	return prefix;
};
var UnitAffix = function(text, bonuses, types, script) {
	var affix = new UnitBonus(text, bonuses, types, script);
	affix.constructor = UnitPrefix;
	return affix;
};
var UnitTemplate = function(template_name, level, stats, types, script, rare_bonuses, unique_bonuses, epic_bonuses, legendary_bonuses) {
	var template_name = template_name;
	var level = level;
	var stats = stats;
	var stat_template = {
		low : 2+level*2,
		average : 4+level*3,
		high : 5+level*4,
	};
	var types = types;
	var script = script;
	var rare_bonuses = rare_bonuses;
	var unique_bonuses = unique_bonuses;
	var epic_bonuses = epic_bonuses;
	var legendary_bonuses = legendary_bonuses;
	return {
		getName : function() {
			return template_name;
		},
		calc_stat : function(stat) {
			return rand(stat_template[stats[stat]])+10
		},
		apply_bonuses : function(start) {
			
		},
		getUnit : function(settings) {
			var name = template_name;
			var settings = settings;
			var prefix = (function() {
				var a = rand(1000);
				if(a<=500) {return null};
				if(a<=750) {return randomPropertyInObject(rare_unit_prefixes)};
				if(a<=900) {return randomPropertyInObject(unique_unit_prefixes)};
				if(a<=970) {return randomPropertyInObject(epic_unit_prefixes)};
				if(a<=990) {return randomPropertyInObject(legendary_unit_prefixes)};
			})();
			if(prefix) {
				name = prefix.getText() + name;
			}
			var strength = this.calc_stat('strength');
			var dexterity = this.calc_stat('dexterity');
			var intelligence = this.calc_stat('intelligence');
			var unit = new Unit(name, level, strength, dexterity, intelligence, types, script);
			unit.setTemplate(this);
			return unit;		
		}
	}
};
Unit.generate = function(name) {
	var template = unit_templates_by_name[name];
	return template ? template.getUnit() : undefined;
};
var units = [];
