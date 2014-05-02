
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'displayMessage';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		
	$$(getHtmlId('postDateTxt')).setValue(moment(waf.sources.posts.stamp).zone(new Date().getTimezoneOffset()).format('MMMM Do YYYY, H:mm:ss Z'));
	
	setTimeout(function(){
		$('.xbbcode-code').each(function(i, e) {hljs.highlightBlock(e)});
	},100);
	
	getHtmlObj('rateDiv').rateit({ step : 1 , max : 5, value : waf.sources.posts.voteAverage, ispreset:true });
	
	getHtmlObj('rateDiv').bind('rated', function (event, value) {
		waf.sources.posts.vote(value,{onSuccess:function(evt){
			waf.sources.posts.serverRefresh({forceReload:true});
		}});
	});

	getHtmlObj('rateDiv').bind('reset', function () {
		waf.sources.posts.vote(-1,{onSuccess:function(evt){
			waf.sources.posts.serverRefresh({forceReload:true});
		}});
	});
	// @region namespaceDeclaration// @startlock
	var replyToPostBtn = {};	// @icon
	// @endregion// @endlock

	// eventHandlers// @lock

	replyToPostBtn.click = function replyToPostBtn_click (event)// @startlock
	{// @endlock
		forums.loadCorrectComponent('replyBtn');
	};// @lock
	
	if(waf.sources.forums.hasAccess('write')){
		setTimeout(function(){
			$$(getHtmlId('replyToPostBtn')).show();
		},100);
	}
	
	if(waf.sources.forums.hasAccess('vote')){
		setTimeout(function(){
			$$(getHtmlId('rateContainer')).show();
		},100);
	}
	

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_replyToPostBtn", "click", replyToPostBtn.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
