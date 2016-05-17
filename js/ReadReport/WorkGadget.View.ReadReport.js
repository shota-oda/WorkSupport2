/*global WorkGadget:true, Backbone */

var WorkGadget = WorkGadget || {};

(function () {
	'use strict';

	WorkGadget.View = WorkGadget.View || {};

	//Read Repoert View
	// ------------------
	WorkGadget.View.ReadReportRow = Backbone.Marionette.ItemView.extend({
		template: '#template-ReadReportRow',
		tagName: 'tr',
		ui : {
			"button" : "td"
		},

		events :{
			"click @ui.button" : "showModal"
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
				</div>\
				</div>\
				</div>\
				</div>'
			)
			this.$el.append($modal)
		},

		showModal : function(){
			var content = this.model.get("content");
			if (this.model.get("type") == "text") {
				content = "<pre>" + content +  "</pre>"
			}
			this.$el.find(".modal-body")
			.html(content)
			this.$el.find(".modal").modal();
		},

	})

	WorkGadget.View.ReadReportTable = Backbone.Marionette.CompositeView.extend({

		tagName : "table",
		className : "table table-hover",
		template: '#template-ReadReportTable',

		collectionEvents: {
			change: 'render'
		},

		childView: WorkGadget.View.ReadReportRow,
		childViewContainer: '.mailrow',

		initialize: function (){
			this.bindUIElements();
		},
	});

	WorkGadget.View.ReadReportLayout = Backbone.Marionette.LayoutView.extend({
		template : "#template-ReadReportLayout",
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

		leftCollection:[],
		centerCollection:[],
		rightCollection:[],

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
			this.leftCollection.reset()
			this.centerCollection.reset()
			this.rightCollection.reset()

			var date = this.ui.calendarInput.val()

			WorkGadget.Model.getReadReportItems(date, function (report){
				$this.leftCollection.add(report);
				$this.centerCollection.add(report);
				$this.rightCollection.add(report);
			});
		},
	})
})();
