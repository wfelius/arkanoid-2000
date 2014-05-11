var PadView = Backbone.View.extend({
	el : '#pad',

	initialize: function() {
		// bind all methods to `this` scope
		_.bindAll(this, 'keydown');
		$(document).on('keydown', this.keydown);
	},

	render: function() {
		// this.$el.removeAttr('style').css({ left : '44%' }).fadeIn(300);
		this.$el.fadeIn(300);
		this.reset_pad_coords();
		return this;
	},

	reset_pad_coords: function(){
		console.log(this.model.attributes);
		this.model.set('padY', this.$el.position().top);
        this.model.set('padX', this.$el.position().left);
        this.model.set('padH', this.$el.height());
        this.model.set('padW', this.$el.width());
		console.log(this.model.attributes);

	},

	keydown: function(e) {
		var keycode = e.keyCode ? e.keyCode : e.charCode,
			stepSize = this.model.get('stepSize'),
			maxLeft = this.model.get('maxLeft'),
			minLeft = this.model.get('minLeft'),
			parentWidth = parseFloat(this.$el.parent().width()),
			myPos = parseFloat(this.$el.css('left')),
			currLeftPos = Math.round(myPos / parentWidth * 100);

		// go left
		if(keycode == 37 && currLeftPos > minLeft) { 
			var newLeftPos = currLeftPos - stepSize;
			newLeftPos = (newLeftPos > minLeft) ? newLeftPos : minLeft;
			this.$el.css('left', newLeftPos+'%');
		}
		// go right
		if (keycode == 39 && currLeftPos < maxLeft) {
			var newLeftPos = currLeftPos + stepSize;
			newLeftPos = (newLeftPos < maxLeft) ? newLeftPos : maxLeft;
			this.$el.css('left', newLeftPos+'%');
		}

		// update pad x
		var padX = parentWidth * (newLeftPos / 100);
		this.model.set('padX', padX);
	},

	hide: function() {
		//this.$el.fadeOut(300);
		this.$el.removeAttr('style');
		this.reset_pad_coords();
	},

	show: function() {
		this.$el.fadeIn(300);
	},

	// override remove to also unbind events
	remove: function() {
		$(document).off('keydown', this.keydown);
		Backbone.View.prototype.remove.call(this);
	}
});