
WAF.onAfterInit = function onAfterInit() {// @lock
	
	var displayLoggedPage = function(){
		if(waf.directory.currentUser() !== null){
			if(RPCUtils.isDataAdmin() === true){
				
				$('#mainContentTabView').append('<div id="fadeSpinner" style="position: relative;left: 0;top: 0;right:0;bottom:0;background: #000;width: 100%;height: 100%;opacity: .80;z-index: 1000000000;"><div id="divSpinner" style="position:absolute;margin: auto !important;max-width:40px;max-height:40px;right: 0px !important;left: 0px !important;top:0px !important;bottom : 0px !important;z-index:1000000001 !important;"><img src="/images/spinner.gif" height="60" /></div></div>')
				
				$$('mainContentTabView').show();
				$$('userAndGroupComp').loadComponent({path:'/Components/userAndGroup.waComponent',onSuccess:function(evt){
					
				}});
				$$('accessesComp').loadComponent({path:'/Components/accesses.waComponent',onSuccess:function(evt){
					$('#fadeSpinner').remove(); // Remove the spinner once the biggest component is loaded to avoid display
												// bug if the admin click to fast on a menuItem on the tabview
				}});
				$$('categoryAndForumComp').loadComponent('/Components/categoryAndForum.waComponent');
			}
		}
	}

// @region namespaceDeclaration// @startlock
	var imageButton1 = {};	// @buttonImage
	var documentEvent = {};	// @document
	var login1 = {};	// @login
// @endregion// @endlock

// eventHandlers// @lock

	imageButton1.click = function imageButton1_click (event)// @startlock
	{// @endlock
		for(var x in waf.sources){
			try{
				if(x === 'accessesComp_group'){
					waf.sources[x].query('title != "dataAdmin"');
				}else if(x === 'accessesComp_user'){
					waf.sources[x].query('allGroups.title != "dataAdmin"');
				}else{
					waf.sources[x].all();
				}
			}catch(e){
				
			}
		}
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		setTimeout(displayLoggedPage,100);
		$('#userAndGroupComp').css('overflow','scroll');
		$('#accessesComp').css('overflow','scroll');
		$('#categoryAndForumComp').css('overflow','scroll');
	};// @lock

	login1.logout = function login1_logout (event)// @startlock
	{// @endlock
		$$('mainContentTabView').hide();
		$$('userAndGroupComp').removeComponent();
		$$('accessesComp').removeComponent();
		$$('categoryAndForumComp').removeComponent();
	};// @lock

	login1.login = function login1_login (event)// @startlock
	{// @endlock
		displayLoggedPage();
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("imageButton1", "click", imageButton1.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("login1", "logout", login1.logout, "WAF");
	WAF.addListener("login1", "login", login1.login, "WAF");
// @endregion
};// @endlock
