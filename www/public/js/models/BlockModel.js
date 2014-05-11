var BlockModel = Backbone.Model.extend({
	defaults : {
		id : 0,
		coords: 'a-1',
		gimmick: 'none',
		isDead: false,
		blockX: 0,
		blockY: 0,
		blockH: 0,
		BlockW: 0 
	}
});