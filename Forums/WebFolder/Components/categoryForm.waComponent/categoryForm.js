
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'categoryForm';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var button6 = {};	// @button
	var button5 = {};	// @button
	var deleteCategoryBtn = {};	// @button
	var categoryFormBvalid = {};	// @button
	var categoryFormBcancel = {};	// @button
	// @endregion// @endlock

	// Permet de centrer le contenu du component (qui est variable d'apres ce que l'on veut charger)
	forums.widgets.centerComp.setWidth(getHtmlObj('categoryFormDiv').css('width'));
	forums.widgets.centerComp.setHeight(getHtmlObj('categoryFormDiv').css('height'));

	// eventHandlers// @lock

	button6.click = function button6_click (event)// @startlock
	{// @endlock
		sources.category.removeCurrent({onSuccess:function(evt){
			sources.category.serverRefresh({forceReload:true});
			$$(getHtmlId("confirmCategoryDeleteDialog")).closeDialog(); //ok dialog button button
			$$(getHtmlId('errorDiv1')).setTextColor('green');
			$$(getHtmlId('errorDiv1')).setValue('Category Deleted!');
		},onError:function(evt){
			$$(getHtmlId("confirmCategoryDeleteDialog")).closeDialog(); //ok dialog button button
			$$(getHtmlId('errorDiv1')).setTextColor('red');
			$$(getHtmlId('errorDiv1')).setValue(evt.error[0].message);
		}});
	};// @lock

	button5.click = function button5_click (event)// @startlock
	{// @endlock
		$$(getHtmlId("confirmCategoryDeleteDialog")).closeDialog(); //cancel dialog button button
	};// @lock

	deleteCategoryBtn.click = function deleteCategoryBtn_click (event)// @startlock
	{// @endlock
		$$(getHtmlId("confirmCategoryDeleteDialog")).displayDialog();
		$$(getHtmlId('confirmDeleteCategoryTxt')).setValue('Are you sure that you want delete this category : "'+waf.sources.category.title+'" ?');
	};// @lock

	categoryFormBvalid.click = function categoryFormBvalid_click (event)// @startlock
	{// @endlock
		if(sources.category.title != null && sources.category.title != ''){
			sources.category.save({onSuccess:function(evt){
				sources.category.serverRefresh({forceReload:true});
				$$(getHtmlId('errorDiv1')).setTextColor('green');
				$$(getHtmlId('errorDiv1')).setValue('New category saved!');
			}});
		}else{
			$$(getHtmlId('errorDiv1')).setTextColor('red');
			$$(getHtmlId('errorDiv1')).setValue('Must have a title!');
		}
	};// @lock

	categoryFormBcancel.click = function categoryFormBcancel_click (event)// @startlock
	{// @endlock
		$$(getHtmlId('errorDiv1')).setValue('');
		forums.closeCenterComp($comp);
		sources.category.all({orderBy:'title'});
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_button6", "click", button6.click, "WAF");
	WAF.addListener(this.id + "_button5", "click", button5.click, "WAF");
	WAF.addListener(this.id + "_deleteCategoryBtn", "click", deleteCategoryBtn.click, "WAF");
	WAF.addListener(this.id + "_categoryFormBvalid", "click", categoryFormBvalid.click, "WAF");
	WAF.addListener(this.id + "_categoryFormBcancel", "click", categoryFormBcancel.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
