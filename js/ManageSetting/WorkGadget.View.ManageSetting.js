/*global WorkGadget:true, Backbone */

var WorkGadget = WorkGadget || {};

(function () {
	'use strict';

	WorkGadget.View = WorkGadget.View || {};

	//Manage Setting Collection and Template View
	// ------------------
	WorkGadget.View.SettingItem = Backbone.Marionette.ItemView.extend({

		template: '#template-ManageSettingItem',

		ui: {
			updateButton: ".update",
			resetButton: ".reset",
			input: ".input"
		},

		events: {
			"click @ui.updateButton": "update",
			"click @ui.resetButton": "reset",
		},

		templateHelpers: function(){

		},

		update: function(){

			this.model
			.set({
				 value: this.ui.input.val()
				,
			})
			.save() // here is sync

		},

		reset: function(){
			this.ui.input.text(this.model.value);
			this.render();
		},

	});

	//Manage Setting Collection and Template View
	// ------------------
	WorkGadget.View.ManageSettings = Backbone.Marionette.CompositeView.extend({

		template: '#template-ManageSetting',

		childView: WorkGadget.View.SettingItem,
		childViewContainer: '#SettingContainer',

	});

})();
