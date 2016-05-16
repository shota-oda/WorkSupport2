var WorkGadget = WorkGadget || {};
WorkGadget.gApi = WorkGadget.gApi || {};
WorkGadget.gApi.user = WorkGadget.gApi.user || {};

WorkGadget.gApi.user.init = function () {

		var d = new $.Deferred()

		var request = gapi.client.plus.people.get({
			"userId" : "me",
		});

		request.execute(function(resp) {
			WorkGadget.gApi.user.name = resp.name.familyName + resp.name.givenName;
			WorkGadget.gApi.user.dispName = resp.displayName;
			WorkGadget.gApi.user.address = resp.emails[0].value;
			d.resolve();
		});

		return d;
}
