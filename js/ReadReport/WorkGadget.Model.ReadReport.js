/*global Backbone, WorkGadget:true */

var WorkGadget = WorkGadget || {};

(function () {
	'use strict';

	WorkGadget.Model = WorkGadget.Model || {};

	// ReadReport Model
	// ----------

	function getHeader(headers, key){
		var header = '';
		$.each(headers, function(){
			if(this.name === key){
				header = this.value;
				return false;
			}
		});
		return header;
	}

	function getBody(message) {
		var encodedBody = '';
		var t = '';
		if(typeof message.parts === 'undefined')
		{
			t = 'text'
			encodedBody = message.body.data;
		}
		else
		{
			t = 'html'
			encodedBody = getHTMLPart(message.parts);
		}
		encodedBody = encodedBody.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
		return {
			 content : decodeURIComponent(escape(window.atob(encodedBody)))
			,type : t
		}

	}

	function getHTMLPart(arr) {
		for(var x = 0; x <= arr.length; x++)
		{
			if(typeof arr[x].parts === 'undefined')
			{
				if(arr[x].mimeType === 'text/html')
				{
					return arr[x].body.data;
				}
			}
			else
			{
				return getHTMLPart(arr[x].parts);
			}
		}
		return '';
	}

	WorkGadget.Model.getReadReportItems = function (date,callback) {

		var from = new Date(date);
		var to = new Date(date)
		to.setDate(to.getDate() + 1);

		/**/
		//TODO export settings
		var query = "(to:daily_report_business2016@bizreach.co.jp OR to:rookie_2016@bizreach.co.jp) subject:新卒 after:$ad before:$bd"
			.replace("$ad", WorkGadget.Common.fn.getYYYYMMDD(from))
			.replace("$bd", WorkGadget.Common.fn.getYYYYMMDD(to));

		var d = new $.Deferred();
		WorkGadget.gApi.mail.getMessageIDList(query)
		.done(function(messageIDs){

			$.each(messageIDs, function(){

				WorkGadget.gApi.mail.getMessage(this)
				.done(function(m){

					//check error
					if(!m || m.error){
						//TODO error
						console.log("error")
						if (m.error) console.log(m.error);
						return;
					} else if (!m.payload || !m.payload.headers){
						//TODO no content
						console.log("no content\nresponse:\n")
						console.log(m);
						return;
					}
					var id = this
					var body = getBody(m.payload)
					var model = new Backbone.Model({
						author : getHeader(m.payload.headers, "From")
						,mid: id
						,content : body.content
						,type : body.type
						,date : getHeader(m.payload.headers, "Date")
					})

					callback(model);
				});
			})
		});

		return d;
	}


})();
