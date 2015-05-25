
var Collection = function(items) {
    this.all = [];
    this.byName = {};

    this.add = function(item) {
    	this.all.push(item);
    	this.byName[item.name] = item;
    };

    items.forEach(function(item, index) {
        this.add(item);
    }, this);

    this.getByName = function(name) {
    	return this.byName[name];
    };

    this.filter = function(property, condition) {
        var result = [];
        this.all.forEach(function(item, id) {
            if(condition(item[property])) {
                result.push(item);
            }
        });
        return result;
    };
};