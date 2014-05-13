
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'messagePreview';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var validMessagePreviewBtn = {};	// @button
	var returnMessagePreviewBtn = {};	// @button
	// @endregion// @endlock

	forums.widgets.centerComp.setWidth(getHtmlObj('unserInterfaceCont').css('width'));
	forums.widgets.centerComp.setHeight(getHtmlObj('unserInterfaceCont').css('height'));

	$comp.loadedFor = data.userData.loadedFor;
	
	$$(getHtmlId('messagePreviewTitleTxt')).setValue(data.userData.title);
	$$(getHtmlId('messagePreviewContentTxt')).setValue(xbbcode.process({text: data.userData.content,removeMisalignedTags: true,addInLineBreaks: true}).html);
	
	if(data.userData.typeBtn){
		$comp.typeBtn = data.userData.typeBtn;
	}
	
	setTimeout(function(){
		$('.xbbcode-code').each(function(i, e) {hljs.highlightBlock(e)});
	},100);
	
	// eventHandlers// @lock

	validMessagePreviewBtn.click = function validMessagePreviewBtn_click (event)// @startlock
	{// @endlock
		if($comp.loadedFor === 'thread'){
			
			if($$(getHtmlId('messagePreviewTitleTxt')).getValue() === '' || $$(getHtmlId('messagePreviewContentTxt')).getValue() === '' ){
				$$(getHtmlId('errorDiv1')).setValue('Please enter a title and a content.');
			}else{
				ds.Topic.createTopic({onSuccess:function(evt){
					waf.sources.forums.serverRefresh({onSuccess:function(e){
						forums.goToMessageView();
						forums.closeCenterComp($comp);
					},forceReload:true});
				},onError:function(err){
					$$(getHtmlId('errorDiv1')).setValue(err.error[0].message);
				}},data.userData.title,waf.sources.forums.ID,data.userData.content); 
			}
			
		}else if($comp.loadedFor === 'message'){
			if($$(getHtmlId('messagePreviewTitleTxt')).getValue() === '' || $$(getHtmlId('messagePreviewContentTxt')).getValue() === '' ){
				$$(getHtmlId('errorDiv1')).setValue('Please enter a title and a content.');
			}else if($comp.typeBtn === 'addBtn'){ // If we want to reply to a message
				
				ds.Post.find('topic.ID = :1 and replyTo = null',{params:[waf.sources.topics.ID],onSuccess:function(evt){
				
					waf.sources.posts.reply({onSuccess:function(evt){
						waf.sources.topics.serverRefresh({onSuccess:function(e){
							forums.goToMessageView();
							forums.closeCenterComp($comp);
						},onError:function(err){
							$$(getHtmlId('errorDiv1')).setValue(err.error[0].message);
						},forceReload:true});
					}},data.userData.content,data.userData.title,evt.result.ID.value);
					
				}});
			}else if($comp.typeBtn === 'editBtn'){ // else if we want to edit a message
			
				if(waf.sources.posts.getPosition() === (waf.sources.posts.length -1)){
					
					waf.sources.topics.edit({onSuccess:function(evt){
							
						waf.sources.posts.edit({onSuccess:function(evt2){
							
							forums.refreshForum();
							forums.closeCenterComp($comp);
							
							// OLD CODE
							/*waf.sources.posts.serverRefresh({onSuccess:function(e2){
								$('.xbbcode-code').each(function(i, e) {hljs.highlightBlock(e)});
								forums.closeCenterComp($comp);
							},onError:function(err2){
								$$(getHtmlId('errorDiv1')).setValue(err2.error[0].message);
							},forceReload:true});*/
							
						}},data.userData.content,data.userData.title,true);
							
					}},data.userData.title);
				}else{
					waf.sources.posts.edit({onSuccess:function(evt){
						
						forums.refreshThread();
						forums.closeCenterComp($comp);
						
						// OLD CODE
						/*waf.sources.posts.serverRefresh({onSuccess:function(e){
							$('.xbbcode-code').each(function(i, e) {hljs.highlightBlock(e)});
							forums.closeCenterComp($comp);
						},onError:function(err){
							$$(getHtmlId('errorDiv1')).setValue(err.error[0].message);
						},forceReload:true});*/
						
					}},data.userData.content,data.userData.title,true);
				}
				
			}else if($comp.typeBtn === 'replyBtn'){
				
				waf.sources.posts.reply({onSuccess:function(evt){
					waf.sources.topics.serverRefresh({onSuccess:function(e){
						forums.goToMessageView();
						forums.closeCenterComp($comp);
					},onError:function(err){
						$$(getHtmlId('errorDiv1')).setValue(err.error[0].message);
					},forceReload:true});
				}},data.userData.content,data.userData.title,waf.sources.posts.ID);
				
			}
			
		}
	};// @lock

	returnMessagePreviewBtn.click = function returnMessagePreviewBtn_click (event)// @startlock
	{// @endlock
		if($comp.typeBtn){
			forums.widgets.centerComp.loadComponent({path:'/Components/messageForm.waComponent',userData:{loadedFor:$comp.loadedFor,typeBtn:$comp.typeBtn,title:data.userData.title,content:data.userData.content}});
		}else{
			forums.widgets.centerComp.loadComponent({path:'/Components/messageForm.waComponent',userData:{loadedFor:$comp.loadedFor,title:data.userData.title,content:data.userData.content}});
		}
		
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_validMessagePreviewBtn", "click", validMessagePreviewBtn.click, "WAF");
	WAF.addListener(this.id + "_returnMessagePreviewBtn", "click", returnMessagePreviewBtn.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
