var GridItemView = Backbone.View.extend({
	tagName: 'div',
	className: 'grid-item',

	initialize : function() {
		this.render();
	},

	render : function(){
		this.$el.attr({
			'id' : this.model.get('id')
		});
	}
});