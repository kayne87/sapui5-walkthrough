sap.ui.define([
    "sap/ui/walkthrough/dialogs/BaseDialog"
], function(BaseDialog) {
	"use strict";
	
	return BaseDialog.extend("sap.ui.walkthrough.dialogs.hello.controller.HelloDialog", {
		constructor: function(id, dialogManager) {
			BaseDialog.call(this, id, dialogManager);
		}
    });
});
