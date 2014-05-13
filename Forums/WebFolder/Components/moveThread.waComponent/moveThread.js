
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'moveThread';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// Permet de centrer le contenu du component (qui est variable d'apres ce que l'on veut charger)
	forums.widgets.centerComp.setWidth(getHtmlObj('moveThreadDiv').css('width'));
	forums.widgets.centerComp.setHeight(getHtmlObj('moveThreadDiv').css('height'));
	
	$comp.sources.forum.setEntityCollection($comp.sources.forum.getModeratedForums());
	$comp.sources.forum.declareDependencies('category');

	// @region namespaceDeclaration// @startlock
	var cancelBtn = {};	// @button
	var validBtn = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	cancelBtn.click = function cancelBtn_click (event)// @startlock
	{// @endlock
		forums.closeCenterComp($comp);
	};// @lock

	validBtn.click = function validBtn_click (event)// @startlock
	{// @endlock
		forums.threadTempID = waf.sources.topics.ID;
		forums.postTempID = waf.sources.posts.ID;
		
		waf.sources.topics.move($comp.sources.forum.ID,{onSuccess:function(evt){
			if(evt.result === true){
				//forums.refreshCategory();
				//waf.sources.category.all({onSuccess:function(evt){
				
//					forums.categoryListenerID = waf.sources.category.addListener('onCollectionChange',function(ev){
//				
//						if(ev.dataSource.length !== 0){
//							waf.sources.category.selectByKey($comp.sources.forum.getAttributeValue('category.ID'),{onSuccess:function(e){
//								waf.sources.category.removeListener({ID:forums.categoryListenerID});
//								forums.displayMenuBarItem();
//							},onError:function(err){
//								waf.sources.category.removeListener({ID:forums.categoryListenerID});
//								forums.displayMenuBarItem();
//							}});
//						}
//					});

				waf.sources.category.selectByKey($comp.sources.forum.getAttributeValue('category.ID'),{onSuccess:function(evt){
				
					forums.forumListenerID = waf.sources.forums.addListener('onCollectionChange',function(ev){
				
						if(ev.dataSource.length !== 0){
							waf.sources.forums.selectByKey($comp.sources.forum.ID,{onSuccess:function(e){
								waf.sources.forums.removeListener({ID:forums.forumListenerID});
								forums.displayMenuBarItem();
							},onError:function(err){
								waf.sources.forums.removeListener({ID:forums.forumListenerID});
								forums.displayMenuBarItem();
							}});
						}
					});
					
					forums.threadListenerID = waf.sources.topics.addListener('onCollectionChange',function(ev){
						
						if(ev.dataSource.length !== 0){
							waf.sources.topics.selectByKey(forums.threadTempID,{onSuccess:function(e){
								waf.sources.topics.removeListener({ID:forums.threadListenerID});
								forums.displayMenuBarItem();
							},onError:function(err){
								waf.sources.topics.removeListener({ID:forums.threadListenerID});
								forums.displayMenuBarItem();
							}});
						}
					});
					
					forums.postListenerID = waf.sources.posts.addListener('onCollectionChange',function(ev){
						if(ev.dataSource.length !== 0){
							waf.sources.posts.selectByKey(forums.postTempID,{onSuccess:function(e){
								waf.sources.posts.removeListener({ID:forums.postListenerID});
								forums.displayMenuBarItem();
								forums.displayMessage();
							},onError:function(err){
								waf.sources.posts.removeListener({ID:forums.postListenerID});
								forums.displayMenuBarItem();
							}});
						}
					});
				}});
				/*
					$('#menuThread').hide();
					$('#menuMessages').hide();
					
					forums.goToForumView();
					
					forums.displayMenuBarItem();*/
				//}});
				
				$$('threadMovedDialog').openDialog();
				forums.closeCenterComp($comp);
			}else{
				$$(getHtmlId('errorDiv1')).setValue(evt.result.errorMessage);
			}
		}});
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_cancelBtn", "click", cancelBtn.click, "WAF");
	WAF.addListener(this.id + "_validBtn", "click", validBtn.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
