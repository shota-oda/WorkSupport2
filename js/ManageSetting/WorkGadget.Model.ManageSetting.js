/*global Backbone, WorkGadget:true */

var WorkGadget = WorkGadget || {};

/*
 * setting IDs are below for easy access
 * 0 ReportTemplate
 * 1 ReportTemplateHead
 * 2 ReportTemplateFoot
 * 3 CaledarID
 * 4 to
 * 5 cc
 * 6 bcc
 *
 */

(function () {
	'use strict';

	WorkGadget.Model = WorkGadget.Model || {};

	// IMPL Setting Model
	// ----------
	WorkGadget.Model.UserSettingItem = Backbone.Model.extend({
		defaults: {
			  key:""
			 ,value:{}
			 ,id: {}
			 ,row: 10
		},
	});

	// IMPL Setting Collection
	// ----------
	WorkGadget.Model.UserSettingCollection = Backbone.Collection.extend({

		model: WorkGadget.Model.UserSettingItem,

		localStorage: new Backbone.LocalStorage("Model.ManageSettings"),

		comparator: "id",

		initialize: function () {

		},
	});

	// FUNC Setting Collection
	// ----------
	WorkGadget.Model.UserSettingList = function(){
		var settings = new WorkGadget.Model.UserSettingCollection();

		//warn: fetch/save/get is async
		// 		now is sync because use localstorage
		settings.fetch();

		if (settings.length === 0 || settings.length !== 7){
			//reset default datas
			settings.reset();
			var setting = WorkGadget.Model.UserSettingItem
			var templateSetH = new setting({
				key: "ReportTemplateHead",
				value: "",
				id: 0,
				row:5,
			});
			var templateSetF = new setting({
				key: "ReportTemplateFoot",
				value: "",
				id: 1,
				row:5,
			});
			var templateSetC = new setting({
				key: "ReportTemplateContent",
				value: "",
				id: 2,
			});
			var calendarSet = new setting({
				key: "CalendarIDs"
				,value: ""
				,id: 3
				,row: 3
			});
			var mailToSet = new setting({
				 key: "MailHeaderTo"
				,value: ""
				,id: 4
				,row: 3
			})
			var mailCcSet = new setting({
				 key: "MailHeaderCc"
				,value: ""
				,id: 5
				,row: 3
			})
			var mailBccSet = new setting({
				 key: "MailHeaderBcc"
				,value: ""
				,id: 6
				,row: 3
			})

			settings.add(templateSetC);
			settings.add(templateSetH);
			settings.add(templateSetF);
			settings.add(calendarSet);
			settings.add(mailToSet);
			settings.add(mailCcSet);
			settings.add(mailBccSet);

			templateSetC.save()
			templateSetH.save()
			templateSetF.save()
			calendarSet.save()
			mailToSet.save()
			mailCcSet.save()
			mailBccSet.save()
		}

		return settings
	}
})();
