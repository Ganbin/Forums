
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var button1 = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		alertify.prompt('message', function (e, str) {
		    // str is the input text
		    debugger;
		    if (e) {
		    	// user clicked "ok"
		    } else {
				// user clicked "cancel"
		    }
		}, "Enter an URL (http://www.ajar.ch)");
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("button1", "click", button1.click, "WAF");
// @endregion
};// @endlock
