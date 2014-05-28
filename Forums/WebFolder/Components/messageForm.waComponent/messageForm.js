
(function Component (id) {// @lock

// Add the code that needs to be shared between components here



function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'message';
	// @endregion// @endlock

	this.load = function (data) {// @lock


	// @region namespaceDeclaration// @startlock
	var colorPickClickHack = {};	// @container
	var colorBtn = {};	// @button
	var codeBtn = {};	// @button
	var urlBtn = {};	// @button
	var underlineBtn = {};	// @button
	var italicBtn = {};	// @button
	var boldBtn = {};	// @button
	var cancelBtn = {};	// @button
	var validBtn = {};	// @button
	// @endregion// @endlock

	$comp.resetValue = function(){
		$$(getHtmlId('messageTitleTxt')).setValue('');
		$$(getHtmlId('messageContentTxt')).setValue('');
	};
	// Permet de centrer le contenu du component (qui est variable d'apres ce que l'on veut charger)
	forums.widgets.centerComp.setWidth(getHtmlObj('messageFormular').css('width'));
	forums.widgets.centerComp.setHeight(getHtmlObj('messageFormular').css('height'));
	
	$comp.loadedFor = data.userData.loadedFor;
	
	if(data.userData.typeBtn){
		$comp.typeBtn = data.userData.typeBtn;
		
		if($comp.typeBtn === 'editBtn'){
			$$(getHtmlId('messageContentTxt')).setValue(waf.sources.post.content);
			$$(getHtmlId('messageTitleTxt')).setValue(waf.sources.post.title);
		}
		if($comp.typeBtn === 'addBtn'){
			$$(getHtmlId('messageTitleTxt')).setValue('RE : '+waf.sources.topic.title);
		}
		if($comp.typeBtn === 'replyBtn'){
			$$(getHtmlId('messageTitleTxt')).setValue('RE : '+waf.sources.post.title);
		}
	}
	
	if(data.userData.title && data.userData.content){
		$$(getHtmlId('messageTitleTxt')).setValue(data.userData.title);
		$$(getHtmlId('messageContentTxt')).setValue(data.userData.content);
	}

	// eventHandlers// @lock

	colorPickClickHack.click = function colorPickClickHack_click (event)// @startlock
	{// @endlock
		if(getHtmlObj('colorPicker').children().length === 0){
			getHtmlObj('colorPicker').colpick({
				flat:true,
				layout:'hex',
				submit:true,
				color:'000000',
				onChange:function(hsb,hex,rgb,el,bySetColor) {
					$(el).css('background-color', '#'+hex);
				},
				onSubmit:function(hsb,hex,rgb,el){
					$(el).css('background-color', '#'+hex);
					$(el).colpickHide();
					forums.insertTag('[color]','[/color]','centerComp_messageContentTxt','color','#'+hex);
				}
			});
		}else{
			getHtmlObj('colorPicker').colpickShow();
		}
	};// @lock

	colorBtn.click = function colorBtn_click (event)// @startlock
	{// @endlock
		if(getHtmlObj('colorPicker').children().length === 0){
			getHtmlObj('colorPicker').colpick({
				flat:true,
				layout:'hex',
				submit:true,
				color:'000000',
				onChange:function(hsb,hex,rgb,el,bySetColor) {
					$(el).css('background-color', '#'+hex);
				},
				onSubmit:function(hsb,hex,rgb,el){
					$(el).css('background-color', '#'+hex);
					$(el).colpickHide();
					forums.insertTag('[color]','[/color]','centerComp_messageContentTxt','color','#'+hex);
				}
			});
		}else{
			getHtmlObj('colorPicker').colpickShow();
		}
		
	};// @lock

	codeBtn.click = function codeBtn_click (event)// @startlock
	{// @endlock
		forums.insertTag('[code]','[/code]',getHtmlId('messageContentTxt'));
	};// @lock

	urlBtn.click = function urlBtn_click (event)// @startlock
	{// @endlock
		forums.promptUrl('Enter a valid URL.','Enter an URL (E.g. http://www.ajar.ch)');
	};// @lock

	underlineBtn.click = function underlineBtn_click (event)// @startlock
	{// @endlock
		forums.insertTag('[u]','[/u]',getHtmlId('messageContentTxt'));
	};// @lock

	italicBtn.click = function italicBtn_click (event)// @startlock
	{// @endlock
		forums.insertTag('[i]','[/i]',getHtmlId('messageContentTxt'));
	};// @lock

	boldBtn.click = function boldBtn_click (event)// @startlock
	{// @endlock
		forums.insertTag('[b]','[/b]',getHtmlId('messageContentTxt'));
	};// @lock

	cancelBtn.click = function cancelBtn_click (event)// @startlock
	{// @endlock
		forums.closeCenterComp($comp);
	};// @lock

	validBtn.click = function validBtn_click (event)// @startlock
	{// @endlock
		if($$(getHtmlId('messageTitleTxt')).getValue() === '' || $$(getHtmlId('messageContentTxt')).getValue() === '' ){
			$$(getHtmlId('errorDiv1')).setValue('Please enter a title and a content.');
		}else if($$(getHtmlId('previewCheckbox')).getValue() === false){
			if($comp.loadedFor === 'thread'){
				
				if($$(getHtmlId('messageTitleTxt')).getValue() === '' || $$(getHtmlId('messageContentTxt')).getValue() === '' ){
					$$(getHtmlId('errorDiv1')).setValue('Please enter a title and a content.');
				}else{
					ds.Topic.createTopic({onSuccess:function(evt){
						
						waf.source.topic.query('forum.ID == :1',waf.sources.forum.ID,{keepOrderBy:true,onSuccess:function(evt){
							waf.sources.post.query('topic.ID == :1',waf.sources.topic.ID,{keepOrderBy:true,onSuccess:function(evt2){
								$comp.resetValue();
								forums.goToMessageView();
								forums.closeCenterComp($comp);
							}});
						}});

					},onError:function(err){
						$$(getHtmlId('errorDiv1')).setValue(err.error[0].message);
					}},$$(getHtmlId('messageTitleTxt')).getValue(),waf.sources.forum.ID,$$(getHtmlId('messageContentTxt')).getValue()); 
				}
				
			}else if($comp.loadedFor === 'message'){
				if($$(getHtmlId('messageTitleTxt')).getValue() === '' || $$(getHtmlId('messageContentTxt')).getValue() === '' ){
					$$(getHtmlId('errorDiv1')).setValue('Please enter a title and a content.');
				}else if($comp.typeBtn === 'addBtn'){ // If we want to reply to a message
					
					ds.Post.find('topic.ID = :1 and replyTo = null',{params:[waf.sources.topic.ID],onSuccess:function(evt){
					
						waf.sources.post.reply({onSuccess:function(evt){
							
							waf.sources.post.query('topic.ID == :1',waf.sources.topic.ID,{keepOrderBy:true,onSuccess:function(evt2){
								forums.goToMessageView();
								forums.closeCenterComp($comp);
							}});
							
						}},$$(getHtmlId('messageContentTxt')).getValue(),$$(getHtmlId('messageTitleTxt')).getValue(),evt.result.ID.value);
						
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
									
									
									
								}},$$(getHtmlId('messageContentTxt')).getValue(),$$(getHtmlId('messageTitleTxt')).getValue(),true);
						}},$$(getHtmlId('messageTitleTxt')).getValue());
					}else{
						waf.sources.post.edit({onSuccess:function(evt){
							
							waf.sources.post.serverRefresh({onSuccess:function(e){
								forums.closeCenterComp($comp);
							},onError:function(err){
								$$(getHtmlId('errorDiv1')).setValue(err.error[0].message);
							},forceReload:true});
							
							
						}},$$(getHtmlId('messageContentTxt')).getValue(),$$(getHtmlId('messageTitleTxt')).getValue(),true);
					}
					
				}else if($comp.typeBtn === 'replyBtn'){
					
					waf.sources.post.reply({onSuccess:function(evt){
						waf.sources.post.query('topic.ID == :1',waf.sources.topic.ID,{keepOrderBy:true,onSuccess:function(evt2){
							forums.goToMessageView();
							forums.closeCenterComp($comp);
						}});
					}},$$(getHtmlId('messageContentTxt')).getValue(),$$(getHtmlId('messageTitleTxt')).getValue(),waf.sources.post.ID);
					
				}
			}
		}else{
			if($comp.typeBtn){
				forums.widgets.centerComp2.loadComponent({path:'/Components/messagePreview.waComponent',userData:{loadedFor:$comp.loadedFor,typeBtn:$comp.typeBtn,title:$$(getHtmlId('messageTitleTxt')).getValue(),content:$$(getHtmlId('messageContentTxt')).getValue()}});
			}else{
				forums.widgets.centerComp2.loadComponent({path:'/Components/messagePreview.waComponent',userData:{loadedFor:$comp.loadedFor,title:$$(getHtmlId('messageTitleTxt')).getValue(),content:$$(getHtmlId('messageContentTxt')).getValue()}});
			}
			$comp.resetValue();
			forums.closeCenterComp($comp);
		}
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_colorPickClickHack", "click", colorPickClickHack.click, "WAF");
	WAF.addListener(this.id + "_colorBtn", "click", colorBtn.click, "WAF");
	WAF.addListener(this.id + "_codeBtn", "click", codeBtn.click, "WAF");
	WAF.addListener(this.id + "_urlBtn", "click", urlBtn.click, "WAF");
	WAF.addListener(this.id + "_underlineBtn", "click", underlineBtn.click, "WAF");
	WAF.addListener(this.id + "_italicBtn", "click", italicBtn.click, "WAF");
	WAF.addListener(this.id + "_boldBtn", "click", boldBtn.click, "WAF");
	WAF.addListener(this.id + "_cancelBtn", "click", cancelBtn.click, "WAF");
	WAF.addListener(this.id + "_validBtn", "click", validBtn.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
