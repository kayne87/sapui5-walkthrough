sap.ui.define([
	"sap/ui/base/Object"
], function(Object) {
	"use strict";

	return Object.extend("sap.ui.walkthrough.dialogs.BaseDialog", {

		constructor: function(id, dialogManager) {
			this.id = id;
			this.dialogManager = dialogManager;
		},
		
		onCloseDialog:function(){
			this.dialogManager.closeInstantiatedDialog(this.id);
		}
	});
});