var BallModel = Backbone.Model.extend({
	defaults : {
		ballRadius: 15,
		ballSpeed: 10,
		ballX: 0,
		ballY: 0,
		prevBallPos: { x: 0, y: 0 },
		ballDirectionX : 1,
		ballDirectionY : -1 
	}
});