var PanelCollection = Backbone.Collection.extend({
	model: PanelModel,
	url: 'data/panels.json'
});