/**
 * @author Marco Distrutti.
 * 
 * Dialog Manager is responsible to instantiate, open and create
 * sapui5 application dialogs. It provides the callbacks 
 * management too.
 * 
 * Defined as a Singleton you have to initialize it in 
 * the main Component.
 * 
 * Use it in order to prevent unuseful code redundancy
 */

sap.ui.define([
	"sap/ui/base/Object"
], function (UI5Object) {

	"use strict";

	var DialogManager = UI5Object.extend("sap.ui.walkthrough.utils.DialogManager", {

		constructor : function (oView) {
			//@todo: use AMD dependency injection.
			jQuery.sap.require("sap.ui.model.json.JSONModel");
			var JSONModel = sap.ui.model.json.JSONModel;
			var path = jQuery.sap.getModulePath("sap.ui.walkthrough.config");
			
			this._oView = oView;
			this.oConfig = new JSONModel();
			this.oConfig.attachEventOnce("requestCompleted", function(oEvent) {
			    console.log(oConfig.getData());
			}, this);
			
			this.oConfig.loadData(path + "/dialogs.json");
		},

		//object map that contains all dialog instances
		_maps: [],

		//object map by id => config
		_templates: {
			//"helloDialog": "sap.ui.walkthrough.dialogs.hello.fragment.HelloDialog"

			/*
			 * If you want define your custom controller, extend BaseDialog and
			 * then add your business logic
			 * 
			 */ "helloDialog": {
				"view": "sap.ui.walkthrough.dialogs.hello.fragment.HelloDialog",
				"controller": "sap.ui.walkthrough.dialogs.hello.controller.HelloDialog"
			}/**/
		},

		_create: function(id){
			var self = this;
			var oView = this._oView;
			var oDialog, oFragmentController;
			var sFragment = "";
			
			if(typeof this._templates[id] == "undefined"){
				throw new Error("Dialog id '" + id + "' not recognized.");
			}
			
			//generate an instance dialog controller for a specific id
			var oFragmentController = {
				id: id,
				onCloseDialog : function () {
					self.closeInstantiatedDialog(this.id);
				}
			};

			sFragment = this._templates[id];
			
			if(typeof this._templates[id].controller !== "undefined"){
				jQuery.sap.require(this._templates[id].controller);
				eval("oFragmentController = new " + this._templates[id].controller + "(id, this);");
				//oFragmentController = new sap.ui.walkthrough.dialogs.hello.controller.HelloDialog(id, this);
				sFragment = this._templates[id].view;
			}
			
			oDialog = sap.ui.xmlfragment(oView.getId(), sFragment, oFragmentController);
			
			oView.addDependent(oDialog);
			this._maps[id] = oDialog;

			return oDialog;
		},
		
		closeInstantiatedDialog: function(id){
			this._maps[id].close();
		},
		
		/**
		 * Open a dialog by a given id.
		 * 
		 * @param int id
		 */
		
		open : function (id) {
			var oView = this._oView;

			var oDialog = oView.byId(id);
			if(typeof this._maps[id] === "undefined" || !oDialog){
				oDialog = this._create(id);
			}
			
			oDialog.open();
		}
	});
	
	var instance; //singleton instance
	return {
		getInstance: function (oView) {
			if (!instance) {
				instance = new DialogManager(oView);
			}
			return instance;
		}
    };

});