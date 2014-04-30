var LevelBlockView = Backbone.View.extend({
	tagName : 'div',


	initialize : function() {
		this.render();
	},

	render: function() {
		this.$el.attr({
			class : 'block gimmick-' + this.model.get('gimmick'),
			'data-gimmick' : this.model.get('gimmick')
		});
	},

	collide: function() {

		if (this.model.get('isDead'))
		    return;
		
		var ballX = app.ball.model.get('ballX'),
			ballY = app.ball.model.get('ballY'),
			ballRadius = app.ball.model.get('ballRadius'),
			blockX = this.model.get('blockX'),
			blockY = this.model.get('blockY');
			blockW = this.model.get('blockW');
			blockH = this.model.get('blockH');


		// Collision
		if (ballX + ballRadius < blockX || ballX - ballRadius > blockX + blockW)
		    return;

		if (ballY + ballRadius < blockY || ballY - ballRadius > blockY + blockH)
		    return;

		// Dead
		this.die();
		this.model.set('isDead', true);

		// Updating ball
		var prevBallPos_x = app.ball.model.get('prevBallPos.x');
		app.ball.model.set('ballX', prevBallPos_x);
		var prevBallPos_y = app.ball.model.get('prevBallPos.y');
		app.ball.model.set('ballY', prevBallPos_y);

		var ballDirectionY = app.ball.model.get('ballDirectionY');
		app.ball.model.set('ballDirectionY', ballDirectionY *= -1.0);
	},

	die : function() {
		console.log('DIE!');
		this.remove();
	}
});