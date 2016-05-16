/*global WorkGadget:true, Backbone, $ */

var WorkGadget = WorkGadget || {};

(function () {
	'use strict';

	// IMPL
	// Handles a single dynamic route to show
	// the active vs complete todo items
	WorkGadget.Router = Backbone.Marionette.AppRouter.extend({
		appRoutes: {
			 '': 'SendReport',
			 'Send': 'SendReport',
			 'Read': 'ReadReport',
			 'Setting' : 'ManageSetting',
		}
	});

	// IMPL
	// Controller is just Object
	// For store routing inner logic
	WorkGadget.Controller = Backbone.Marionette.Object.extend({

		initialize: function () {
			WorkGadget.App.View.Header = new WorkGadget.View.Header();
		},

		ObserveHash: function(){
			WorkGadget.App.View.Header.navTo(Backbone.history.getFragment());
		},

		SendReport: function(){
			this.ObserveHash();

			var content = new WorkGadget.View.SendReport({
						model: new WorkGadget.Model.SendReport()
					})

			WorkGadget.App.View.Root.showChildView('main', content);
		},

		ReadReport: function(){
			this.ObserveHash();

			var items = new Backbone.Collection();
			var content = new WorkGadget.View.ReadReport({collection : items})
			WorkGadget.Model.getReadReportItems(new Date(), function (item){
				items.add(item);
			});

			WorkGadget.App.View.Root.showChildView('main', content);
		},

		ManageSetting: function(){
			this.ObserveHash();

			var content = new WorkGadget.View.ManageSettings({
				 collection: WorkGadget.Model.UserSettingList()
				,
			});

			WorkGadget.App.View.Root.showChildView('main', content);
		},

 	});

})();
