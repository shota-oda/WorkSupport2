/*global WorkGadget:true, Backbone */

var WorkGadget = WorkGadget || {};

(function () {
	'use strict';

	WorkGadget.View = WorkGadget.View || {};

	//Read Repoert View
	// ------------------
	WorkGadget.View.ReadReportItem = Backbone.Marionette.ItemView.extend({
		tagName: 'tr',
		template: '#template-ReadReportItem',

		ui : {
			"button" : "td"
		},

		events :{
			"click @ui.button" : "showModal"
		},

		initialize : function(){

		},

		onRender : function(){
			var $modal = $(
				'<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="ModalLabel">\
					<div class="modal-dialog modal-lg">\
						<div class="modal-content">\
							<div class="modal-header">\
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">\
									<span aria-hidden="true">&times;</span>\
								</button>\
								<h4 class="modal-title" id="ModalLabel">' +
									this.model.get("author") +
								'</h4>\
							</div>\
							<div class="modal-body">\
								<iframe srcdoc="<p>Loading...</p>">\
								</iframe>\
							</div>\
						</div>\
					</div>\
				</div>')
			this.$el.append($modal)
		},

		showModal : function(){
			this.$el.find("iframe").contents()
				.find("body")
				.html(this.model.get("content"))
			this.$el.find(".modal").modal();
		},

	})

	WorkGadget.View.ReadReport = Backbone.Marionette.CompositeView.extend({

		template: '#template-ReadReport',

		ui: {
			calendar: ".input-group.date",
			calendarInput: ".input-group.date input",
		},

		events: {
			"change @ui.calendarInput": "changeDate",
		},

		collectionEvents: {
      change: 'render'
    },

		childView: WorkGadget.View.ReadReportItem,
		childViewContainer: '#ReportItemContainer',

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

	});
})();
