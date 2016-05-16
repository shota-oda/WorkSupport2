/*global WorkGadget:true, Backbone */

var WorkGadget = WorkGadget || {};

(function () {
	'use strict';

	WorkGadget.View = WorkGadget.View || {};

	//Send Repoert View
	// ------------------
	WorkGadget.View.SendReport = Backbone.Marionette.ItemView.extend({

		template: '#template-SendReport',

		ui: {
			input: '#Report-Content',
			send: '#Report-Send',
			reset:'#Report-Reset',
			preview: '#Report-Preview',
			confirm: '#Report-Modal',
		},

		events: {
			'keyup @ui.input': 'onInputKeyUp',
			'click @ui.send': 'onSendClick',
			'click @ui.reset': 'onResetClick',
			'click @ui.preview': 'onPreviewClick',
		},

		modelEvents: {
			'change': 'render',
		},

		initialize: function () {

		},

		templateHelpers: function(){
			return {
				 inputTemplate: this.model.get("input")
				,body: this.getBody()
			}
		},

		getBody: function () {
			return this.model.get("head") + this.model.get("col1") + this.model.get("col2") + this.model.get("col3") + this.model.get("col4") + this.model.get("input") + this.model.get("foot") + '\n\n';
		},

		onInputKeyUp: function () {
			this.model.set("input" ,this.ui.input.val(), {silent: true});
			this.ui.preview.text(this.getBody());
		},

		onSendClick: function() {
			//this.ui.confirm.modal("hide");
			var header = {
				 To: this.model.get("to")
				,Cc: this.model.get("cc")
				,Bcc: this.model.get("bcc")
			}

			WorkGadget.gApi.mail.send(
			 header
			,this.model.get("subject")
			,this.ui.preview.text())
		},

		onResetClick: function() {

		},

		onPreviewClick: function(e){

			var $e = $(e.target)

			if(!($e.prop("tagName") == "TEXTAREA") && !$e.hasClass('on')){
			   //to edit mode
			    $e
			    .addClass('on')
			    .html('<textarea class="form-control" rows="10">'+$e.text()+'</textarea>');
			    //focus on
			    $e
			    .find("textarea")
			    .focus()
			    .blur(function(){
			        var inputVal = $(this).val();
			        //replace default value
			        if(inputVal===''){
			            inputVal = this.defaultValue;
			        };
			        //when edit is done
			        $(this).parent().removeClass('on').text(inputVal);
			    });
			};
		},
	});
})();
