var LevelView = Backbone.View.extend({

	initialize : function() {
		this.listenTo(this.collection, 'reset', this.render);
        this.blocks = Array();
	},

	render : function(){
		var block;
        var id = 0;
        this.collection.forEach(function(model) {
        	// add block to stage
            block = new LevelBlockView({ model: model });
            $('#' + model.attributes.coords).append(block.el);
            // set block X,Y,W,H to the model
            block.model.set('blockY', block.$el.position().top);
            block.model.set('blockX', block.$el.position().left);
            block.model.set('blockH', block.$el.height());
            block.model.set('blockW', block.$el.width());
            block.model.set('id', id++);
            this.blocks.push(block);
        }, this);
	}
});