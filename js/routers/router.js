
// Mission Router

app.Router = Backbone.Router.extend({
	routes: {
		'': 'home',
		'gallery': 'gallery'
	},

	home: function () {
		// make the Home view persist in memory and on the DOM
		//if (!this.homeView) {
			//this.homeView = new app.Views.Home();
		//}
		var view = new app.Views.HomeView();
		app.getInstance().goto(view);
	},
	gallery: function () {
		// make the Home view persist in memory and on the DOM
		//if (!this.homeView) {
		//this.homeView = new app.Views.Home();
		//}
		var view = new app.Views.GalleryView();
		app.getInstance().goto(view);
	}
});


