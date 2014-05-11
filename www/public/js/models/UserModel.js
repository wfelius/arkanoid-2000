var UserModel = Backbone.Model.extend({
	defaults : {
		currentLevel: 1,
		lives: 5,
		username: 'John Doe',
		highscore: 0,
		ballsInGame: 0
	}
});