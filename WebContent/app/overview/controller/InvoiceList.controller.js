sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/walkthrough/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, JSONModel, formatter, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("sap.ui.walkthrough.app.overview.controller.InvoiceList", {
		formatter: formatter,

		onInit : function () {
			var self = this;
			var oViewModel = new JSONModel({
				currency: "EUR",
				test: self.test
			});
			
			this.getView().setModel(oViewModel, "view");
		},

		onFilterInvoices : function (oEvent) {
			// build filter array
			var aFilter = [];
			var sQuery = "";
			switch(oEvent.getId()){
				case 'search':
					sQuery = oEvent.getParameter("query");
					break;
				case 'liveChange':
					sQuery = oEvent.getParameter("newValue");
					break;
			}

			//sQuery = sQuery.toUpperCase();
			if (sQuery != "") {
				aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
			}

			// filter binding
			var oList = this.getView().byId("invoiceList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);	
		},
		
		onPress: function (oEvent) {
			var oItem = oEvent.getSource();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("detail", {
				invoicePath: oItem.getBindingContext("invoice").getPath().substr(1)
			});
		}
	});
});