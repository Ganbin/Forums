
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'passwordForgotten';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// Permet de centrer le contenu du component (qui est variable d'apres ce que l'on veut charger)
	forums.widgets.centerComp.setWidth(getHtmlObj('form').css('width'));
	forums.widgets.centerComp.setHeight(getHtmlObj('form').css('height'));

	// @region namespaceDeclaration// @startlock
	var bvalid = {};	// @button
	var bCancel = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	bvalid.click = function bvalid_click (event)// @startlock
	{// @endlock
		ds.User.passwordForgotten($$(getHtmlId('email')).getValue(),{onSuccess:function(evt){
		
			if(evt.result === true){
				forums.closeCenterComp($comp);
				$$('passwordResetDialog').openDialog();
			}else{
				$$(getHtmlId('errorDiv1')).setValue(evt.result.errorMessage);	
			}
		
		}});
		
	};// @lock

	bCancel.click = function bCancel_click (event)// @startlock
	{// @endlock
		forums.closeCenterComp($comp);
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_bvalid", "click", bvalid.click, "WAF");
	WAF.addListener(this.id + "_bCancel", "click", bCancel.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
