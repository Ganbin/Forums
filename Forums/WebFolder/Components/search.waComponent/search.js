
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'search';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		
	forums.widgets.centerComp.setWidth(getHtmlObj('mainDiv').css('width'));
	forums.widgets.centerComp.setHeight(getHtmlObj('mainDiv').css('height'));
	// @region namespaceDeclaration// @startlock
	var dataGrid1 = {};	// @dataGrid
	var button1 = {};	// @button
	var returnMessagePreviewBtn = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	dataGrid1.onRowDblClick = function dataGrid1_onRowDblClick (event)// @startlock
	{// @endlock
		if(waf.sources.searchPostResult.ID !== null){
			forums.selectSpecificPost(waf.sources.searchPostResult.ID);
			forums.closeCenterComp($comp);
		}
	};// @lock

	dataGrid1.onRowDraw = function dataGrid1_onRowDraw (event)// @startlock
	{// @endlock
		if(event.row.rowNumber === 0){
			if(event.element === null){
				event.row.cells[0].dom[0].children[0].textContent = 'No Result';
			}
		}
	};// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		ds.Post.search($$(getHtmlId('searchField')).getValue(),{onSuccess:function(evt){
			var searchResultCollection = evt.result;
			waf.sources.searchPostResult.setEntityCollection(searchResultCollection);
		}});
	};// @lock

	returnMessagePreviewBtn.click = function returnMessagePreviewBtn_click (event)// @startlock
	{// @endlock
		forums.closeCenterComp($comp);
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_dataGrid1", "onRowDblClick", dataGrid1.onRowDblClick, "WAF");
	WAF.addListener(this.id + "_dataGrid1", "onRowDraw", dataGrid1.onRowDraw, "WAF");
	WAF.addListener(this.id + "_button1", "click", button1.click, "WAF");
	WAF.addListener(this.id + "_returnMessagePreviewBtn", "click", returnMessagePreviewBtn.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
