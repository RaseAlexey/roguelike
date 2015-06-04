
var Collection = function(items) {
    this.all = [];
    this.byName = {};


    this.add = function(item) {
        this.all.push(item);
        this.byName[item.name] = item;
    };

    this.getByName = function(name) {
        return this.byName[name];
    };

    this.getRandom = function() {
        return getRandomItemInArray(this.all);
    }

    this.createByName = function(name) {
        return clone(this.getByName(name));
    };

    this.filter = function(property, condition) {
        var result = [];
        this.all.forEach(function(item) {
            if(condition(item[property])) {
                result.push(item);
            }
        });
        return result;
    };

    this.customFilter = function (condition) {
        var result = [];
        this.all.forEach(function(item) {
            if(condition(item)) {
                result.push(item);
            }
        });
        return result;
    };


    items.forEach(function(item) {
        this.add(item);
    }, this);
};