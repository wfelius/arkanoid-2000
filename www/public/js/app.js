var AppRouter = Backbone.Router.extend({

	routes : {
		'game-over/' 	: 'game_over',
		'level/:level'	: 'init_level',
	},

	initialize : function() {

		console.log('=== app.initialize');

		// set app vars
		this.minY;
		this.maxY;
		this.minX;
		this.maxX;
		this.padY;
		this.interval = -1;
		this.lives_counter = $('#lives-num');
		this.container = $('#content-main');
		this.userData = new UserData();

		// create grid
		$.getJSON('data/grid.json').done(function(data){
			console.log('=== fetched grid data for grid collection');
			this.gridItems = new GridItems(data);
			this.gridView = new GridView({ collection : this.gridItems });
			this.gridView.render();
		}); 

		// init panel
		this.panelCollection = new PanelCollection();
		this.panel = new PanelView();

		// get panel collection
		$.getJSON('data/panels.json').done(function(data){
			console.log('=== fetched panel data for panel collection');
			app.panelCollection.set(data);
			app.panel.show('welcome');
		});

		// create level
		this.levelBlocks = new LevelBlocks();
		this.level = new LevelView({ collection : this.levelBlocks });

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

	init_level : function (_level) {
		// TODO: store level data locally to reference later on (game over)
		// TODO: getJSON.fail()
		console.log('=== init_level');

		// hide panel is present
		if(!app.panel.$el.hasClass('hidden')) app.panel.close();

		if(app.userData.get('currentLevel') == _level) {
			$.getJSON('data/levels/'+_level+'.json').done(function(_data){
				app.levelBlocks.reset(_data);
			});
		}
	},

	start_game: function() {
		app.init_game();
		if (app.interval > -1) clearInterval(app.interval);
		app.interval = setInterval(app.loop, 16);
	},

	init_game: function(){
		app.lives_counter.text(app.userData.get('lives'));
		app.set_bounding_box();
		app.pad.render();
		app.ball.render();
		app.navigate('//level/'+app.userData.get('currentLevel'), {trigger:true});
	},

	reset_game: function(){
		// TODO
	},

	loop: function() {

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
		var lives = app.userData.get('lives');
		console.log('levens:', lives);
		if(lives == 0) {
			app.game_over();	
		} else {
			app.userData.set('lives', --lives);
			app.init_level();
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