sap.ui.define([
   "sap/ui/core/UIComponent",
   "sap/ui/model/json/JSONModel",
   "sap/ui/model/resource/ResourceModel",
   "sap/ui/walkthrough/component/dialogs/DialogManager"
], function (UIComponent, JSONModel, ResourceModel, DialogManager) {

	"use strict";
	
	/**
	 * Whenever we access resources, we will now do this relatively to the component 
	 * (instead of relatively to the index.html). 
	 * This architectural change allows our app to be used in more flexible environments 
	 * than our static index.html page, such as in a surrounding container 
	 * like the SAP Fiori launchpad.
	 */
	
	return UIComponent.extend("sap.ui.walkthrough.Component", {
		metadata:{
			manifest: "json"
		},

		/**
		 * @var sap/ui/walkthrough/component/dialogs/DialogManager
		 */
		_dialogManager: null,
		
		init : function () {
			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);
			
			var oData = {
	            recipient : {
	            	name : "World"
	            }
			};
			var oModel = new JSONModel(oData);
			var oInvoice = this.getModel("invoice");
			var self = this;
			var i18nModel = new ResourceModel({
				bundleName: "sap.ui.walkthrough.i18n.i18n"
	        });
			
			this.setModel(oModel);
	        this.setModel(i18nModel, "i18n");
	        
	        oInvoice.attachRequestCompleted(function(){
	        	self.onInvoiceLoaded.apply(self, arguments);
	        });
	        
	        this._dialogManager = new DialogManager(this.getRootControl());
		},
		
		openHelloDialog : function () {
			this._dialogManager.open("helloDialog");
		},
		
		onInvoiceLoaded: function(){
			var oInvoice = this.getModel("invoice");
			var json = oInvoice.getJSON();
			var oParsed = JSON.parse(json);
			
		}
	});
});