
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
		forums.threadTempID = waf.sources.topic.ID;
		forums.postTempID = waf.sources.post.ID;
		forums.forumTempID = $comp.sources.forum.ID;
		forums.categoryTempID = $comp.sources.forum.getAttributeValue('category.ID');
		
		waf.sources.topic.move($comp.sources.forum.ID,{onSuccess:function(evt){
			if(evt.result === true){
				
				forums.selectSpecificPost(forums.postTempID);
				
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
