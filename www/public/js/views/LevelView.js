var LevelView = Backbone.View.extend({

    blocks : [],

	initialize : function() {
		this.listenTo(this.collection, 'reset', this.render);
	},

	render : function(){
        this.blocks = [];
		var block;
        this.collection.forEach(function(model) {
        	// add block to stage
            block = new BlockView({ model: model });
            $('#' + model.attributes.coords).append(block.el);
            // set block X,Y,W,H to the model
            block.model.set('blockY', block.$el.position().top);
            block.model.set('blockX', block.$el.position().left);
            block.model.set('blockH', block.$el.height());
            block.model.set('blockW', block.$el.width());
            this.blocks.push(block);
        }, this);

        console.log('block num: ', this.blocks.length);
	}
});