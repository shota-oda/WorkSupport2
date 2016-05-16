var WorkGadget = WorkGadget || {};
WorkGadget.Common = WorkGadget.Common || {};

WorkGadget.Common.fn = {
	DoAsync: function (func){
		setTimeout(func, 1);
	},
	getYYYYMMDD: function (date){
		return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
	}
}
