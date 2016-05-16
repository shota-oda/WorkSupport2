/*global WorkGadget:true, Backbone */

var WorkGadget = WorkGadget || {};
(function () {
	'use strict';

	WorkGadget.View = WorkGadget.View || {};
	WorkGadget.View.RootLayoutView = Backbone.Marionette.LayoutView.extend({
		
		el: 'body',

		regions: {
			 header: "#Header"
			,main: "#Main"
			,footer: "#Footer"
		}
	});
})();
