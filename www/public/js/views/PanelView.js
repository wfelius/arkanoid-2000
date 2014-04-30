var PanelView = Backbone.View.extend({
	el : '#panel',

	initialize: function(){
		_.bindAll(this, 'keyup');
		$(document).on('keyup', this.keyup);
	},

	template : Handlebars.compile(
		'<div id="background"></div>' +
		'<h1>{{title}}</h1>' +
		'<div class="content clearfix">{{{content}}}</div>' +
		'<button class="button-close-panel {{button-class}}">{{button-label}}</button>'
	),

	events: {
		'click .button-close-panel' : "hide"
	},

	render : function(){
		this.$el.html(this.template(this.model.attributes));
		return this;
	},

	keyup: function (e) {
		var keycode = e.keyCode ? e.keyCode : e.charCode
		if(keycode == 13) { 
			this.$el.find('button').click();
		}
	},

	show: function(_id){
		this.model = app.panelCollection.get(_id);
		this.render();
		this.$el.removeClass('hidden');
	},

	hide: function(){
		this.$el.addClass('hidden');
	}
});