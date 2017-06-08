sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/m/MessageToast"
], 

function (Controller, MessageToast) {
	"use strict";
   
	return Controller.extend("sap.ui.walkthrough.controller.App.App", {
   
		/**
		* Controller Events
		*/
		onShowHello : function () {
			MessageToast.show("Hello world with Message Toast.");
		}
	});
});