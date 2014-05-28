
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'displayMessage';
	// @endregion// @endlock

	$comp.TEMPRateInit = false;

	this.load = function (data) {// @lock
		

	
	setTimeout(function(){
		$$(getHtmlId('postDateTxt')).setValue(moment(waf.sources.post.stamp).zone(new Date().getTimezoneOffset()).format('MMMM Do YYYY, H:mm:ss Z'));
		$('.xbbcode-code').each(function(i, e) {hljs.highlightBlock(e)});
		forums.displayActionButtons();
		if($comp.sources.post.voteAverage !== null){
			getHtmlObj('rateDiv').rateit({ step : 1 , max : 5, value : waf.sources.post.voteAverage, ispreset:true });
			$comp.TEMPRateInit = true;
		}
		
		if(waf.sources.forum.hasAccess('write')){
			setTimeout(function(){
				$$(getHtmlId('replyToPostBtn')).show();
			},10);
		}
		
		if(waf.sources.forum.hasAccess('vote')){
			setTimeout(function(){
				$$(getHtmlId('rateContainer')).show();
			},10);
		}
	},200);
	
	getHtmlObj('rateDiv').bind('rated', function (event, value) {
		waf.sources.post.vote(value,{onSuccess:function(evt){
			forums.refreshThread();
			//waf.sources.post.serverRefresh({forceReload:true});
		}});
	});

	getHtmlObj('rateDiv').bind('reset', function () {
		waf.sources.post.vote(-1,{onSuccess:function(evt){
			forums.refreshThread();
			//waf.sources.post.serverRefresh({forceReload:true});
		}});
	});
	// @region namespaceDeclaration// @startlock
	var postEvent = {};	// @dataSource
	var replyToPostBtn = {};	// @icon
	// @endregion// @endlock

	// eventHandlers// @lock

	postEvent.onCurrentElementChange = function postEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		if($comp.sources.post.voteAverage !== null && $comp.TEMPRateInit == true){
			getHtmlObj('rateDiv').rateit('value', $comp.sources.post.voteAverage);
			getHtmlObj('rateDiv').rateit('ispreset', true);
		}
		
		if($comp.sources.post.contentHTML !== null){
			setTimeout(function(){
				$('.xbbcode-code').each(function(i, e) {hljs.highlightBlock(e)});
			},200);
		}
	};// @lock

	replyToPostBtn.click = function replyToPostBtn_click (event)// @startlock
	{// @endlock
		forums.loadCorrectComponent('replyBtn');
	};// @lock
	

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_post", "onCurrentElementChange", postEvent.onCurrentElementChange, "WAF");
	WAF.addListener(this.id + "_replyToPostBtn", "click", replyToPostBtn.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
