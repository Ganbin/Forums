
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

	forums.widgets.centerComp2.setWidth(getHtmlObj('messagePreviewCont').css('width'));
	forums.widgets.centerComp2.setHeight(getHtmlObj('messagePreviewCont').css('height'));

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
					
					waf.source.topic.query('forum.ID == :1',waf.sources.forum.ID,{keepOrderBy:true,onSuccess:function(evt){
						waf.sources.post.query('topic.ID == :1',waf.sources.topic.ID,{keepOrderBy:true,onSuccess:function(evt2){
							forums.goToMessageView();
							forums.closeCenterComp($comp);
						}});
					}});
					
				},onError:function(err){
					$$(getHtmlId('errorDiv1')).setValue(err.error[0].message);
				}},data.userData.title,waf.sources.forum.ID,data.userData.content); 
			}
			
		}else if($comp.loadedFor === 'message'){
			if($$(getHtmlId('messagePreviewTitleTxt')).getValue() === '' || $$(getHtmlId('messagePreviewContentTxt')).getValue() === '' ){
				$$(getHtmlId('errorDiv1')).setValue('Please enter a title and a content.');
			}else if($comp.typeBtn === 'addBtn'){ // If we want to reply to a message
				
				ds.Post.find('topic.ID = :1 and replyTo = null',{params:[waf.sources.topic.ID],onSuccess:function(evt){
				
					waf.sources.post.reply({onSuccess:function(evt){
						
						waf.sources.post.query('topic.ID == :1',waf.sources.topic.ID,{keepOrderBy:true,onSuccess:function(evt2){
							forums.goToMessageView();
							forums.closeCenterComp($comp);
						}});
					}},data.userData.content,data.userData.title,evt.result.ID.value);
					
				}});
			}else if($comp.typeBtn === 'editBtn'){ // else if we want to edit a message
			
				if(waf.sources.post.getPosition() === (waf.sources.post.length -1)){
					
					waf.sources.topic.edit({onSuccess:function(evt){
							
						waf.sources.post.edit({onSuccess:function(evt2){
							
							waf.sources.post.serverRefresh({onSuccess:function(e){
								forums.closeCenterComp($comp);
							},onError:function(err){
								$$(getHtmlId('errorDiv1')).setValue(err.error[0].message);
							},forceReload:true});
							
						}},data.userData.content,data.userData.title,true);
							
					}},data.userData.title);
				}else{
					waf.sources.post.edit({onSuccess:function(evt){
					
						waf.sources.post.serverRefresh({onSuccess:function(e){
							forums.closeCenterComp($comp);
						},onError:function(err){
							$$(getHtmlId('errorDiv1')).setValue(err.error[0].message);
						},forceReload:true});
						
					}},data.userData.content,data.userData.title,true);
				}
				
			}else if($comp.typeBtn === 'replyBtn'){
				
				waf.sources.post.reply({onSuccess:function(evt){
					
					waf.sources.post.query('topic.ID == :1',waf.sources.topic.ID,{keepOrderBy:true,onSuccess:function(evt2){
						forums.goToMessageView();
						forums.closeCenterComp($comp);
					}});
					
					
					
				},onError:function(err){
					$$(getHtmlId('errorDiv1')).setValue(err.error[0].message);
				}},data.userData.content,data.userData.title,waf.sources.post.ID);
				
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
		forums.closeCenterComp($comp);
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_validMessagePreviewBtn", "click", validMessagePreviewBtn.click, "WAF");
	WAF.addListener(this.id + "_returnMessagePreviewBtn", "click", returnMessagePreviewBtn.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
