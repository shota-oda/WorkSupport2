/*global WorkGadget:true, Backbone */

var WorkGadget = WorkGadget || {};

(function () {
	'use strict';

	WorkGadget.View = WorkGadget.View || {};

	//Read Repoert View
	// ------------------
	WorkGadget.View.ReadReportRow = Backbone.Marionette.ItemView.extend({
		template: '#template-ReadReportRow',
	})

	WorkGadget.View.ReadReportTable = Backbone.Marionette.CompositeView.extend({

		template: '#template-ReadReportTable',

		collectionEvents: {
      change: 'render'
    },

		childView: WorkGadget.View.ReadReportRow,
		childViewContainer: '#MailRowContainer',

		initialize: function (){
			this.bindUIElements();
		},
	});

	WorkGadget.View.ReadReportLayout = Backbone.Marionette.Layout.extend({
		template : "template-ReadReportLayout",
		regions : {
			left : "#MailLeft",
			center : "#MailCenter",
			right : "#MailRight",
		},
		ui: {
			calendar: ".input-group.date",
			calendarInput: ".input-group.date input",
		},
		events: {
			"change @ui.calendarInput": "changeDate",
		},

		initialize: function (){
			this.bindUIElements();
		},

		templateHelpers: function(){
			return {
				 todayStr: function(){
				 	return WorkGadget.Common.fn.getYYYYMMDD(new Date())
				 }
				,
			}
		},

		onShow: function () {
	        // Invoke the datetimepicker plugin
      	 	this.setCalendar();
	    },

		onClose: function () {
        	// Destroy the datetimepicker plugin
        	this.ui.calendar.datepicker('destroy');
    	},

		setCalendar: function(){
			this.ui.calendar.datepicker({
			    todayBtn: "linked",
			    orientation: "bottom auto",
			    keyboardNavigation: false,
			    daysOfWeekDisabled: "0,6",
			    autoclose: true,
			    todayHighlight: true,
			    format: "yyyy/mm/dd",
			    endDate: "today",
			});
		},

		changeDate: function(){
			var $this = this;
			this.collection.reset()
			var date = this.ui.calendarInput.val()

			WorkGadget.Model.getReadReportItems(date, function (report){
				$this.collection.add(report);
			});
		},
	})
})();
