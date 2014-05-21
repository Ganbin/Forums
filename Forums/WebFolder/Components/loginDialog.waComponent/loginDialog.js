
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'loginDialog';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	if(RPCUtils.getValidationByEmail() === true){
		$$(getHtmlId('passwordForgottenTxt')).show()
	}else{
		$$(getHtmlId('passwordForgottenTxt')).hide();
	}

	// Permet de centrer le contenu du component (qui est variable d'apres ce que l'on veut charger)
	$comp.setWidth(getHtmlObj('loginForm').css('width'));
	$comp.setHeight(getHtmlObj('loginForm').css('height'));
	
	getHtmlObj('loginField').focus();
	
	getHtmlObj('loginField').keyup(function (e){
	    if(e.keyCode == 13){
	        getHtmlObj('loginBtn').click();
	    }
	});
	getHtmlObj('passwordField').keyup(function (e){
	    if(e.keyCode == 13){
	        getHtmlObj('loginBtn').click();
	    }
	});
	
	// @region namespaceDeclaration// @startlock
	var loginBtn = {};	// @button
	var newAccountTxt = {};	// @richText
	var icon1 = {};	// @icon
	var passwordForgottenTxt = {};	// @richText
	// @endregion// @endlock

	// eventHandlers// @lock

	loginBtn.click = function loginBtn_click (event)// @startlock
	{// @endlock
		WAF.directory.loginByPassword($$(getHtmlId('loginField')).getValue(), $$(getHtmlId('passwordField')).getValue(), {onSuccess: function(event){
	        if(event.result == true){            
	           forums.isLogged();
				forums.isAdmin();
				
				forums.goToCategoryView(false,false);
				waf.sources.category.all({keepOrderBy:true});
				forums.closeCenterComp($comp);
	        }else{
	            $$(getHtmlId('errorDiv1')).setValue("Incorrect login credentials.");
	            getHtmlObj('errorDiv1').fadeOut(1000,'easeInBack',function(){
	            	$$(getHtmlId('errorDiv1')).setValue('');
					$$(getHtmlId('errorDiv1')).show();
				});
	        }
	    }});
	};// @lock

	newAccountTxt.click = function newAccountTxt_click (event)// @startlock
	{// @endlock
		forums.closeCenterComp($comp);
		setTimeout(function(){
			forums.widgets.centerComp2.loadComponent('/Components/newAccount.waComponent');
		},500);
	};// @lock

	icon1.click = function icon1_click (event)// @startlock
	{// @endlock
		forums.closeCenterComp($comp);
	};// @lock

	passwordForgottenTxt.click = function passwordForgottenTxt_click (event)// @startlock
	{// @endlock
		forums.closeCenterComp($comp);
		setTimeout(function(){
			forums.widgets.centerComp2.loadComponent('/Components/passwordForgotten.waComponent');
		},500);
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_loginBtn", "click", loginBtn.click, "WAF");
	WAF.addListener(this.id + "_newAccountTxt", "click", newAccountTxt.click, "WAF");
	WAF.addListener(this.id + "_icon1", "click", icon1.click, "WAF");
	WAF.addListener(this.id + "_passwordForgottenTxt", "click", passwordForgottenTxt.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
