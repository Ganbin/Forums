
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'moderatorPage';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		
		forums.widgets.centerComp.setWidth(getHtmlObj('moderatorDiv').css('width'));
		forums.widgets.centerComp.setHeight(getHtmlObj('moderatorDiv').css('height'));
		
		$comp.sources.forum.query('ID = :1',{onSuccess:function(evt){
			//debugger;
			if(waf.sources.topics.ID !== null){
				setTimeout(function(){
					$comp.sources.topics.selectByKey(waf.sources.topics.ID);
				},100);
			}
		},onError:function(err){
			debugger;
		}},waf.sources.forums.ID);

	// @region namespaceDeclaration// @startlock
	var cancelSubscriptionBtn = {};	// @button
	var subscriptionValidationBtn = {};	// @button
	var refuseSubscriptionBtn = {};	// @button
	var savePostBtn = {};	// @button
	var returnMessagePreviewBtn = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	cancelSubscriptionBtn.click = function cancelSubscriptionBtn_click (event)// @startlock
	{// @endlock
		$comp.sources.allCloseInscriptions.cancelInscription({onSuccess:function(evt){
			//$$(getHtmlId('cancelSubscriptionDialog')).closeDialog();
			$comp.sources.forum.serverRefresh({forceReload:true});
			if(evt.result === false){
				$$(getHtmlId('errorDiv2')).setTextColor('red');
				$$(getHtmlId('errorDiv2')).setValue('Subscription not canceled');
				getHtmlObj('errorDiv2').fadeOut(2000,'easeInBack',function(){
					$$(getHtmlId('errorDiv2')).setValue('');
					$$(getHtmlId('errorDiv2')).show();
				});
			}else{
				$$(getHtmlId('errorDiv2')).setTextColor('green');
				$$(getHtmlId('errorDiv2')).setValue('Subscription canceled');
				getHtmlObj('errorDiv2').fadeOut(2000,'easeInBack',function(){
					$$(getHtmlId('errorDiv2')).setValue('');
					$$(getHtmlId('errorDiv2')).show();
				});
			}
		}});
	};// @lock

	subscriptionValidationBtn.click = function subscriptionValidationBtn_click (event)// @startlock
	{// @endlock
		$comp.sources.allOpenInscriptions.acceptInscription({onSuccess:function(evt){
			//$$(getHtmlId('validateSubscriptionDialog')).closeDialog();
			$comp.sources.forum.serverRefresh({forceReload:true});
			if(evt.result === false){
				$$(getHtmlId('errorDiv2')).setTextColor('red');
				$$(getHtmlId('errorDiv2')).setValue('Subscription not validated');
				getHtmlObj('errorDiv2').fadeOut(2000,'easeInBack',function(){
					$$(getHtmlId('errorDiv2')).setValue('');
					$$(getHtmlId('errorDiv2')).show();
				});
			}else{
				$$(getHtmlId('errorDiv2')).setTextColor('green');
				$$(getHtmlId('errorDiv2')).setValue('Subscription validated');
				getHtmlObj('errorDiv2').fadeOut(2000,'easeInBack',function(){
					$$(getHtmlId('errorDiv2')).setValue('');
					$$(getHtmlId('errorDiv2')).show();
				});
			}
		}});
	};// @lock

	refuseSubscriptionBtn.click = function refuseSubscriptionBtn_click (event)// @startlock
	{// @endlock
		$comp.sources.allOpenInscriptions.refuseInscription({onSuccess:function(evt){
			//$$(getHtmlId('refuseSubscriptionDialog')).closeDialog();
			$comp.sources.forum.serverRefresh({forceReload:true});
			if(evt.result === false){
				$$(getHtmlId('errorDiv2')).setTextColor('red');
				$$(getHtmlId('errorDiv2')).setValue('Subscription not refused');
				getHtmlObj('errorDiv2').fadeOut(2000,'easeInBack',function(){
					$$(getHtmlId('errorDiv2')).setValue('');
					$$(getHtmlId('errorDiv2')).show();
				});
			}else{
				$$(getHtmlId('errorDiv2')).setTextColor('green');
				$$(getHtmlId('errorDiv2')).setValue('Subscription refused');
				getHtmlObj('errorDiv2').fadeOut(2000,'easeInBack',function(){
					$$(getHtmlId('errorDiv2')).setValue('');
					$$(getHtmlId('errorDiv2')).show();
				});
			}
		}});
	};// @lock

	savePostBtn.click = function savePostBtn_click (event)// @startlock
	{// @endlock
		$comp.sources.topics.edit({onSuccess:function(evt){
			
			try{
				waf.sources.topics.serverRefresh({forceReload:true});
			}catch(e){
				waf.sources.forums.serverRefresh({forceReload:true});
			}
			
		}},$$(getHtmlId('topicTitleTxt')).getValue());
		
		$comp.sources.posts.edit({onSuccess:function(evt){
			try{
				waf.sources.topics.serverRefresh({forceReload:true});
			}catch(e){
				waf.sources.forums.serverRefresh({forceReload:true});
			}
			$comp.sources.posts.serverRefresh({forceReload:true});
			
			$$(getHtmlId('errorDiv1')).setTextColor('green');
			$$(getHtmlId('errorDiv1')).setValue('Post Saved !');
			getHtmlObj('errorDiv1').fadeOut(1000,'easeInBack',function(){
				$$(getHtmlId('errorDiv1')).setValue('');
				$$(getHtmlId('errorDiv1')).show();
			});
		},onError:function(evt){
			$$(getHtmlId('errorDiv1')).setTextColor('red');
			$$(getHtmlId('errorDiv1')).setValue(evt.error[0].message);
			getHtmlObj('errorDiv1').fadeOut(1000,'easeInBack',function(){
				$$(getHtmlId('errorDiv1')).setValue('');
				$$(getHtmlId('errorDiv1')).show();
			});
		}},$$(getHtmlId('messageContentTxt')).getValue(),$$(getHtmlId('messageTitleTxt')).getValue(),$$(getHtmlId('messageEnableCheckbox')).getValue());
	};// @lock

	returnMessagePreviewBtn.click = function returnMessagePreviewBtn_click (event)// @startlock
	{// @endlock
		forums.closeCenterComp($comp);
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_cancelSubscriptionBtn", "click", cancelSubscriptionBtn.click, "WAF");
	WAF.addListener(this.id + "_subscriptionValidationBtn", "click", subscriptionValidationBtn.click, "WAF");
	WAF.addListener(this.id + "_refuseSubscriptionBtn", "click", refuseSubscriptionBtn.click, "WAF");
	WAF.addListener(this.id + "_savePostBtn", "click", savePostBtn.click, "WAF");
	WAF.addListener(this.id + "_returnMessagePreviewBtn", "click", returnMessagePreviewBtn.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
