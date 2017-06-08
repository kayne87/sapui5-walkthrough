sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/m/MessageToast",
   "sap/ui/model/json/JSONModel",
   "sap/ui/model/resource/ResourceModel"
], 

function (Controller, MessageToast, JSONModel, ResourceModel) {
	"use strict";
   
	return Controller.extend("sap.ui.walkthrough.controller.App.App", {
		/**
		* Controller Events
		*/
		
		onInit : function () {
			var oData = {
	            recipient : {
	            	name : "World"
	            }
			};
			var oModel = new JSONModel(oData);
			
			/*var i18n = new ResourceModel({
				bundle
			})*/
			
				
			this.getView().setModel(oModel);
      },
		
		onShowHello : function () {
			MessageToast.show("Hello world with Message Toast.");
		}
	});
});