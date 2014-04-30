var GridView = Backbone.View.extend({
	el : '#grid',

	initialize : function() {
		//this.render();
	},

	render : function(){
		var gridItem;
        this.collection.forEach(function(model) {
            gridItem = new GridItemView({ model: model });
            this.$el.append(gridItem.el);
        }, this);
	}
});