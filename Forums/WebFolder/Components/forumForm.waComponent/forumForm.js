
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'forumForm';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var deleteForumBtn = {};	// @button
	var button7 = {};	// @button
	var button6 = {};	// @button
	var forumFormBValid = {};	// @button
	var forumFormBCancel = {};	// @button
	// @endregion// @endlock

	// Permet de centrer le contenu du component (qui est variable d'apres ce que l'on veut charger)
	forums.widgets.centerComp.setWidth(getHtmlObj('forumFormDiv').css('width'));
	forums.widgets.centerComp.setHeight(getHtmlObj('forumFormDiv').css('height'));
	
	// eventHandlers// @lock

	deleteForumBtn.click = function deleteForumBtn_click (event)// @startlock
	{// @endlock
		$$(getHtmlId("confirmForumDeleteDialog")).displayDialog();
		$$(getHtmlId('confirmDeleteForumTxt')).setValue('Are you sure that you want delete this forum : "'+waf.sources.forums.title+'" ?');
	};// @lock

	button7.click = function button7_click (event)// @startlock
	{// @endlock
		sources.forums.removeCurrent({onSuccess:function(evt){
			sources.category.serverRefresh({forceReload:true});
			$$(getHtmlId("confirmForumDeleteDialog")).closeDialog(); //ok dialog button button
			$$(getHtmlId('errorDiv1')).setTextColor('green');
			$$(getHtmlId('errorDiv1')).setValue('Forum Deleted!');
		},onError:function(evt){
			$$(getHtmlId("confirmForumDeleteDialog")).closeDialog(); //ok dialog button button
			$$(getHtmlId('errorDiv1')).setTextColor('red');
			$$(getHtmlId('errorDiv1')).setValue(evt.error[0].message);
		}});
	};// @lock

	button6.click = function button6_click (event)// @startlock
	{// @endlock
		$$(getHtmlId("confirmForumDeleteDialog")).closeDialog(); //cancel button
	};// @lock

	forumFormBValid.click = function forumFormBValid_click (event)// @startlock
	{// @endlock
		if(sources.forums.title != null && sources.forums.title != ''){
			sources.forums.save({onSuccess:function(evt){
				sources.category.serverRefresh({forceReload:true});
				$$(getHtmlId('errorDiv1')).setTextColor('green');
				$$(getHtmlId('errorDiv1')).setValue('New forum saved!');
			}});
		}else{
			$$(getHtmlId('errorDiv1')).setTextColor('red');
			$$(getHtmlId('errorDiv1')).setValue('Must have a title!');
		}
		
	};// @lock

	forumFormBCancel.click = function forumFormBCancel_click (event)// @startlock
	{// @endlock
		$$(getHtmlId('errorDiv1')).setValue('');
		forums.closeCenterComp($comp);
		waf.sources.category.serverRefresh({forceReload:true});
		forums.refreshCategory();
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_deleteForumBtn", "click", deleteForumBtn.click, "WAF");
	WAF.addListener(this.id + "_button7", "click", button7.click, "WAF");
	WAF.addListener(this.id + "_button6", "click", button6.click, "WAF");
	WAF.addListener(this.id + "_forumFormBValid", "click", forumFormBValid.click, "WAF");
	WAF.addListener(this.id + "_forumFormBCancel", "click", forumFormBCancel.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
