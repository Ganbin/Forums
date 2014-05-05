
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'passwordForgotten';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// Permet de centrer le contenu du component (qui est variable d'apres ce que l'on veut charger)
	$comp.setWidth(getHtmlObj('form').css('width'));
	$comp.setHeight(getHtmlObj('form').css('height'));

	// @region namespaceDeclaration// @startlock
	var bValid = {};	// @button
	var icon1 = {};	// @icon
	// @endregion// @endlock

	// eventHandlers// @lock

	bValid.click = function bValid_click (event)// @startlock
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

	icon1.click = function icon1_click (event)// @startlock
	{// @endlock
		forums.closeCenterComp($comp);
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_bValid", "click", bValid.click, "WAF");
	WAF.addListener(this.id + "_icon1", "click", icon1.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
