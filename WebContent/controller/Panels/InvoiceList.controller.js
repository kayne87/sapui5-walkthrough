sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/walkthrough/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, JSONModel, formatter, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("sap.ui.walkthrough.controller.Panels.InvoiceList", {
		formatter: formatter,

		onInit : function () {
			var self = this;
			var oViewModel = new JSONModel({
				currency: "EUR",
				test: self.test
			});
			/*var oInvoiceModel = this.getOwnerComponent().getModel("invoice");
			var aSorter = []
			
			console.log(oInvoiceModel);
			
			window.setTimeout(function(){
				console.log(oInvoiceModel.getJSON());
				
				
				
			}, 1000);*/
			
			this.getView().setModel(oViewModel, "view");
			//aSorter.push(new sap.ui.model.Sorter(, true, false));
			
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
			
			
			/*var aSorters = [];
			aSorters.push(new sap.ui.model.Sorter("ShipperName", false, true));
			aSorters.push(new sap.ui.model.Sorter("ProductName", false, false));
			
			oBinding.aSorters = aSorters;
			oBinding.applySort();*/
			
		}
	});
});