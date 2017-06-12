sap.ui.define([], function () {
	"use strict";
	return {
		statusText: function (sStatus) {
			var resourceBundle = this.getView().getModel("i18n").getResourceBundle();
			switch (sStatus) {
				case "A":
					return resourceBundle.getText("invoiceStatusA");
				case "B":
					return resourceBundle.getText("invoiceStatusB");
				case "C":
					return resourceBundle.getText("invoiceStatusC");
				default:
					return sStatus;
			}
		},
		
		iconStatus: function(sStatus){
			switch (sStatus) {
				case "A":
					return "sap-icon://feed";
				case "B":
					return "sap-icon://lateness";
				case "C":
					return "sap-icon://complete";
				default:
					return sStatus;
			}
		}
	};
});