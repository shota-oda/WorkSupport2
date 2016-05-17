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

			var itemsB = new Backbone.Collection();
			var itemsE = new Backbone.Collection();
			var itemsD = new Backbone.Collection();

			var layout = new WorkGadget.View.ReadReportLayout();
			layout.leftCollection = itemsB;
			layout.centerCollection = itemsE;
			layout.rightCollection = itemsD;

			WorkGadget.App.View.Root.showChildView('main', layout);

			var tableB = new WorkGadget.View.ReadReportTable({
				collection: itemsB
			});
			var tableE = new WorkGadget.View.ReadReportTable({
				collection: itemsE
			});
			var tableD = new WorkGadget.View.ReadReportTable({
				collection: itemsD
			});

			layout.showChildView('left', tableB);
			layout.showChildView('center', tableE);
			layout.showChildView('right', tableD);

			WorkGadget.Model.getReadReportItems(new Date(), function (item){
				itemsB.add(item);
				itemsE.add(item);
				itemsD.add(item);
			});
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
