sap.ui.define([
	"sap/ui/base/Object"
], function (UI5Object) {
	"use strict";

	return UI5Object.extend("sap.ui.walkthrough.component.dialogs.DialogManager", {

		constructor : function (oView) {
			this._oView = oView;	
		},

		_maps: [],
		
		create: function(id){
			var self = this;
			var oView = this._oView;
			var oFragmentController = {
				onCloseDialog : function () {
					self._maps[id].close();
				}
			};
			var oDialog = sap.ui.xmlfragment(oView.getId(), "sap.ui.walkthrough.view.Fragments.HelloDialog", oFragmentController);
			
			oView.addDependent(oDialog);
			this._maps[id] = oDialog;
			
			return oDialog;
		},
		
		open : function (id) {
			//var oDialog = oView.byId("helloDialog");
			var oView = this._oView;
			
			var oDialog = oView.byId(id);
			if(typeof this._maps[id] === "undefined" || !oDialog){
				oDialog = this.create(id);
			}
			
			oDialog.open();
		}
	});

});