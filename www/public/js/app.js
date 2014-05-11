var AppRouter = Backbone.Router.extend({

	routes : {
		// 'game-over/' 	: 'game_over',
		// 'level/:level'	: 'init_level',
	},

	initialize : function() {

		// set app vars
		this.minY;
		this.maxY;
		this.minX;
		this.maxX;
		this.padY;
		this.blockCount = 0;
		this.interval = -1;
		this.lives_counter = $('#lives-num');
		this.container = $('#content-main');
		this.userdata = new UserModel();

		// create grid
		$.getJSON('data/grid.json').done(function(data){
			console.log('=== fetched grid data for grid collection');
			this.gridCollection = new GridCollection(data);
			this.gridView = new GridView({ collection : this.gridCollection });
			this.gridView.render();
		}); 

		// get panel collection
		$.getJSON('data/panels.json').done(function(data){
			console.log('=== fetched panel data for panel collection');
			app.panelCollection = new PanelCollection(data);
			app.panel = new PanelView({ collection: app.panelCollection });
			app.panel.show('welcome');
		});

		// create level
		this.blockCollection = new BlockCollection();
		this.level = new LevelView({ collection : this.blockCollection });

		// create pad
		this.padModel = new PadModel();
		this.pad = new PadView({ model : this.padModel });

		// create ball
		this.ballModel = new BallModel();
		this.ball = new BallView({ id : 'ball-1', model : this.ballModel });
	},

	resize: function(){
		app.set_bounding_box();
		// TODO: reset all blocks, pad and ball
	},

	set_bounding_box: function(){
		var ballRadius = app.ball.model.get('ballRadius');
		app.minY = 0;
		app.minX = 0;
		app.maxX = window.innerWidth - ballRadius;
		app.maxY = window.innerHeight - 60 - 30 - ballRadius; // header(60) - footer(30)
		app.padY = app.maxY - 40; // 40 = bottom value pad
	},

	build_level : function (_level) {
		// TODO: store level data locally to reference later on (game over)
		// TODO: getJSON.fail()
		// hide panel if present
		//if(!app.panel.$el.hasClass('hidden')) app.panel.close();

		$.getJSON('data/levels/'+_level+'.json').done(function(data){
			app.blockCollection.reset(data);
			app.ball.show();
			app.pad.show();
			app.start_loop();
		});
	},

	start_game: function() {
		app.init_game();
		//if (app.interval > -1) clearInterval(app.interval);
		//app.interval = setInterval(app.loop, 16);
	},

	init_game: function(){
		app.lives_counter.text(app.userdata.get('lives'));
		app.set_bounding_box();
		app.pad.render();
		app.ball.render();
		app.build_level(1);
	},

	stop_loop: function(){
		clearInterval(app.interval);
	},

	start_loop: function(){
		app.interval = setInterval(app.loop, 16);
	},

	reset_game: function(){
		// TODO
	},

	loop: function() {

		if(app.blockCount == app.level.blocks.length) {
			app.stop_loop();
			app.blockCount = 0;
			app.ball.hide();
			app.pad.hide();
			var currentLevel = app.userdata.get('currentLevel');
			app.userdata.set('currentLevel', ++currentLevel);
			app.build_level(currentLevel);
		}

	    var ballX = app.ball.model.get('ballX'),
	    	ballY = app.ball.model.get('ballY'),
	    	ballSpeed = app.ball.model.get('ballSpeed'),
	    	ballDirectionX = app.ball.model.get('ballDirectionX'),
	    	ballDirectionY = app.ball.model.get('ballDirectionY');

	   	// movements
	   	app.ball.model.set('prevBallPos.x', ballX);
	   	app.ball.model.set('prevBallPos.y', ballY);
	   	app.ball.model.set('ballX', ballX + (ballDirectionX * ballSpeed));
	   	app.ball.model.set('ballY', ballY + (ballDirectionY * ballSpeed));
	 
	    // check Collisions ball
	    app.ball.collide_with_window();
	    app.ball.collide_with_pad();

	    // check collisions brick
	    for (var i = 0; i < app.level.blocks.length; i++) {
	        app.level.blocks[i].collide();
	    }
	 
	    // move Ball
	    app.ball.$el.css({ left: ballX });
	    app.ball.$el.css({ top: ballY });
	},

	// not in use, for multi ball
	add_ball: function(_id){
		var ball = new BallView({ id : _id, model : app.ballModel });
		ball.render();
	},

	execute_gimmick: function() {
		// TODO
	},

	decrease_lives: function(){
		var lives = app.userdata.get('lives');
		console.log('levens:', lives);
		if(lives == 0) {
			app.game_over();	
		} else {
			app.userdata.set('lives', --lives);
		}
		app.lives_counter.text(lives);
	},

	game_over : function(){
		clearInterval(app.interval);
    	app.interval = -1;
    	app.panel.show('game-over');
    	app.ball.hide();
    	app.pad.hide();
	}

}); 

var app = new AppRouter();

function add_event_listeners() {
	$(document).on('click', '.button-start', app.start_game);
	$(window).on('resize', app.resize);
}

(function(){
	Backbone.history.start();
	add_event_listeners();
})();