sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/walkthrough/utils/DialogManager"
], function (Controller, MessageToast, DialogManager) {

	"use strict";
   
	return Controller.extend("sap.ui.walkthrough.app.overview.controller.HelloPanel", {
		
		onInit: function(){
			this._dialogManager = DialogManager.getInstance();
		},
		
		onShowHello: function () {
			// read msg from i18n model
			var oBundle = this.getView().getModel("i18n").getResourceBundle();
			var sRecipient = this.getView().getModel().getProperty("/recipient/name");
			var sMsg = oBundle.getText("helloMsg", [sRecipient]);
			// show message
			MessageToast.show(sMsg);
		},
		
		onOpenDialog : function () {
			this._dialogManager.open("helloDialog");
			//this.getOwnerComponent().openHelloDialog();
		}
	});
});