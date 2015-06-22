
// Mission Router

app.Router = Backbone.Router.extend({
	routes: {
		'': 'home',
		'gallery': 'gallery'
	},

	home: function () {
		homeIsDisplayed = true;
		var view = new app.Views.HomeView();
		app.getInstance().goto(view);
	},
	gallery: function () {
		homeIsDisplayed = false;
		var view = new app.Views.GalleryView();
		app.getInstance().goto(view);
	}
});


