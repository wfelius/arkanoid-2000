var BallView = Backbone.View.extend({

	initialize : function() {
		// lisetn to enter frame
	},

	render : function(){

		console.log('ball model', this.model);
		console.log('render bal');
		this.$el.appendTo(app.container);
		console.log('ball rendered');
		console.log('ball model', this.model);


		this.model.set('ballY', this.$el.position().top);
        this.model.set('ballX', this.$el.position().left);
        this.model.set('prevBallPos.x', this.$el.position().top);
        this.model.set('prevBallPos.y', this.$el.position().left);
        this.model.set('ballRadius', this.$el.width());

		console.log('ball model', this.model);


		var currBallsInGame = app.userData.get('ballsInGame');
		app.userData.set({ ballsInGame : ++currBallsInGame });
		this.go();
	},

	go: function(){
		console.log('=== go ball go!');
		console.log('balls in game: ', app.userData.get('ballsInGame'));
	},


	collide_with_window: function() {

		var ballX = this.model.get('ballX'),
			ballY = this.model.get('ballY'),
			ballDirectionX = this.model.get('ballDirectionX'),
			ballDirectionY = this.model.get('ballDirectionY');

	    if (ballX < app.minX) {
	        this.model.set('ballX', app.minX);
	        this.model.set('ballDirectionX', ballDirectionX *= -1.0);
	    }
	    else if (ballX > app.maxX) {
	        this.model.set('ballX', app.maxX);
	        this.model.set('ballDirectionX', ballDirectionX *= -1.0);
	    }
	 
	    if (ballY < app.minY) {
	        this.model.set('ballY', app.minY);
	        this.model.set('ballDirectionY', ballDirectionY *= -1.0);
	        ballDirectionY *= -1.0;
	    }
	    else if (ballY > app.maxY) {
	        this.model.set('ballY', app.maxY);
	        this.model.set('ballDirectionY', ballDirectionY *= -1.0);
	        app.decrease_lives();
	    }
	},
 
	collide_with_pad: function() {

		var ballX = this.model.get('ballX'),
			ballY = this.model.get('ballY'),
			ballRadius = this.model.get('ballRadius'),
			padX = app.pad.model.get('padX'),
			padW = app.pad.model.get('padW');
			padY = app.pad.model.get('padY');

	    if (ballX + ballRadius < padX || ballX - ballRadius > padX + padW)
	        return;
	 
	    if (ballY + ballRadius < padY)
	        return;

	    // set ball X en Y
	 	var prevBallPos_x = this.model.get('prevBallPos.x');
	 	this.model.set('ballX', prevBallPos_x);
	 	var prevBallPos_y = this.model.get('prevBallPos.y');
	    this.model.set('ballY', prevBallPos_y);

		// set new ball direction Y
	    var ballDirectionY = this.model.get('ballDirectionY');
	    var newBallDirectionY = ballDirectionY *= -1.0;
	    this.model.set('ballDirectionY', newBallDirectionY);

	    // set ball direction X
		var dist = ballX - (padX + padW / 2);
		var ballDirectionX = this.model.get('ballDirectionX');
		var newBallDirectionX = ballDirectionX = 2.0 * dist / padW;
		this.model.set('ballDirectionX', newBallDirectionX);
	  
	    var square = Math.sqrt(newBallDirectionX * newBallDirectionX + newBallDirectionY * newBallDirectionY);
	    this.model.set('ballDirectionX', newBallDirectionX /= square);
	    this.model.set('ballDirectionY', newBallDirectionY /= square);
	},

	hide: function() {
		this.$el.fadeOut(300);
	},

	// destroy added gimmick balls
	destroy : function() {
		if(this.$el.id != 'ball-1' ) { // ball one will never get 
			var currBallsInGame = app.userData.get('ballsInGame');
			app.userData.set({ ballsInGame : --currBallsInGame });
			this.remove(); // commit suicide! :)
		}
	}
	
});