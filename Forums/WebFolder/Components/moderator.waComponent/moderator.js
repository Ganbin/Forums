
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'moderator';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		
	forums.widgets.centerComp.setWidth(getHtmlObj('moderatorDiv').css('width'));
	forums.widgets.centerComp.setHeight(getHtmlObj('moderatorDiv').css('height'));
	
	//debugger;
	
//	setTimeout(function(){
//		debugger;
		$comp.sources.forum.query('ID = :1',{onSuccess:function(evt){
			//debugger;
				//debugger;
				if(waf.sources.topics.ID !== null){
					$comp.sources.topics.selectByKey(waf.sources.topics.ID);
				}	

		},onError:function(err){
			debugger;
		}},waf.sources.forums.ID);
//	},1000);

//	ds.Forum.find('ID = :1',{onSuccess:function(evt){
//		debugger;
//		setTimeout(function(){
//			debugger;
//			if(evt.entity !== null){
//				$comp.sources.forum.addEntity(evt.entity);
//				$comp.sources.forum.serverRefresh({onSuccess:function(){
//					debugger;
//					if(waf.sources.topics.ID !== null){
//						$comp.sources.topics.selectByKey(waf.sources.topics.ID);
//					}
//				}});
//				
//			}
//		},100);

//	}},waf.sources.forums.ID);


	
	// @region namespaceDeclaration// @startlock
	var returnMessagePreviewBtn = {};	// @button
	var cancelSubscriptionDialog = {};	// @ModalDialog
	var cancelSubscriptionBtn = {};	// @button
	var refuseSubscriptionBtn = {};	// @button
	var refuseSubscriptionDialog = {};	// @ModalDialog
	var validateSubscriptionDialog = {};	// @ModalDialog
	var subscriptionValidationBtn = {};	// @button
	var savePostBtn = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	returnMessagePreviewBtn.click = function returnMessagePreviewBtn_click (event)// @startlock
	{// @endlock
		forums.closeCenterComp($comp);
	};// @lock

	cancelSubscriptionDialog.onValidClick = function cancelSubscriptionDialog_onValidClick (event)// @startlock
	{// @endlock
		$comp.sources.allCloseInscriptions.cancelInscription({onSuccess:function(evt){
			$$(getHtmlId('cancelSubscriptionDialog')).closeDialog();
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

	cancelSubscriptionBtn.click = function cancelSubscriptionBtn_click (event)// @startlock
	{// @endlock
		if($comp.sources.allCloseInscriptions.length !== 0){
			var validationText = 'Are you sure that you want to cancel this subscription ? :\n\t-'+$comp.sources.allCloseInscriptions.getAttributeValue('user.fullName')+'\n\t-'+$comp.sources.allCloseInscriptions.getAttributeValue('forum.title');
			validationText += '\n(If the validation by mail is set, a mail will be send to the user)';
			$$(getHtmlId('cancelSubscriptionDialog')).setText(validationText);
			$$(getHtmlId('cancelSubscriptionDialog')).openDialog();
		}
	};// @lock

	refuseSubscriptionBtn.click = function refuseSubscriptionBtn_click (event)// @startlock
	{// @endlock
		if($comp.sources.allOpenInscriptions.length !== 0){
			var validationText = 'Are you sure that you want to refuse this subscription ? :\n\t-'+$comp.sources.allOpenInscriptions.getAttributeValue('user.fullName')+'\n\t-'+$comp.sources.allOpenInscriptions.getAttributeValue('forum.title');
			validationText += '\n(If the validation by mail is set, a mail will be send to the user)';
			$$(getHtmlId('refuseSubscriptionDialog')).setText(validationText);
			$$(getHtmlId('refuseSubscriptionDialog')).openDialog();
		}
	};// @lock

	refuseSubscriptionDialog.onValidClick = function refuseSubscriptionDialog_onValidClick (event)// @startlock
	{// @endlock
		$comp.sources.allOpenInscriptions.refuseInscription({onSuccess:function(evt){
			$$(getHtmlId('refuseSubscriptionDialog')).closeDialog();
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

	validateSubscriptionDialog.onValidClick = function validateSubscriptionDialog_onValidClick (event)// @startlock
	{// @endlock
		$comp.sources.allOpenInscriptions.acceptInscription({onSuccess:function(evt){
			$$(getHtmlId('validateSubscriptionDialog')).closeDialog();
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

	subscriptionValidationBtn.click = function subscriptionValidationBtn_click (event)// @startlock
	{// @endlock
		if($comp.sources.allOpenInscriptions.length !== 0){
			var validationText = 'Are you sure that you want to validate this subscription ? :\n\t-'+$comp.sources.allOpenInscriptions.getAttributeValue('user.fullName')+'\n\t-'+$comp.sources.allOpenInscriptions.getAttributeValue('forum.title');
			validationText += '\n(If the validation by mail is set, a mail will be send to the user)';
			$$(getHtmlId('validateSubscriptionDialog')).setText(validationText);
			$$(getHtmlId('validateSubscriptionDialog')).openDialog();
		}
	};// @lock

	savePostBtn.click = function savePostBtn_click (event)// @startlock
	{// @endlock
		$comp.sources.topics.edit({onSuccess:function(evt){
			
			try{
				waf.sources.topics.serverRefresh({forceReload:true});
			}catch(e){
				waf.sources.forums.serverRefresh({forceReload:true});
			}
			
			//$comp.sources.topics.serverRefresh({forceReload:true});
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

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_returnMessagePreviewBtn", "click", returnMessagePreviewBtn.click, "WAF");
	WAF.addListener(this.id + "_cancelSubscriptionDialog", "onValidClick", cancelSubscriptionDialog.onValidClick, "WAF");
	WAF.addListener(this.id + "_cancelSubscriptionBtn", "click", cancelSubscriptionBtn.click, "WAF");
	WAF.addListener(this.id + "_refuseSubscriptionBtn", "click", refuseSubscriptionBtn.click, "WAF");
	WAF.addListener(this.id + "_refuseSubscriptionDialog", "onValidClick", refuseSubscriptionDialog.onValidClick, "WAF");
	WAF.addListener(this.id + "_validateSubscriptionDialog", "onValidClick", validateSubscriptionDialog.onValidClick, "WAF");
	WAF.addListener(this.id + "_subscriptionValidationBtn", "click", subscriptionValidationBtn.click, "WAF");
	WAF.addListener(this.id + "_savePostBtn", "click", savePostBtn.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
