
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'userAndGroup';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var groupSearchField = {};	// @textField
	var userSearchField = {};	// @textField
	var removeUserFromGroupBtn = {};	// @button
	var removeGroupFromUserBtn = {};	// @button
	var addUserToGroupBtn = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	groupSearchField.keyup = function groupSearchField_keyup (event)// @startlock
	{// @endlock
		$comp.sources.group.query('title == :1 or description == :1','*'+this.$domNode.val()+'*');
	};// @lock

	userSearchField.keyup = function userSearchField_keyup (event)// @startlock
	{// @endlock
		$comp.sources.user.query('lastName == :1 or firstName == :1 or email == :1 or login == :1 or statut == :1','*'+this.$domNode.val()+'*');
	};// @lock

	removeUserFromGroupBtn.click = function removeUserFromGroupBtn_click (event)// @startlock
	{// @endlock
		ds.UserGroup.removeUserInGroup({onSuccess:function(evt){
			$comp.sources.user.serverRefresh({forceReload:true});
			$comp.sources.group.serverRefresh({forceReload:true});
		}},$comp.sources.allUsers.ID,$comp.sources.group.ID);
	};// @lock

	removeGroupFromUserBtn.click = function removeGroupFromUserBtn_click (event)// @startlock
	{// @endlock
		ds.UserGroup.removeUserInGroup({onSuccess:function(evt){
			$comp.sources.user.serverRefresh({forceReload:true});
			$comp.sources.group.serverRefresh({forceReload:true});
		}},$comp.sources.user.ID,$comp.sources.allGroups.ID);
	};// @lock

	addUserToGroupBtn.click = function addUserToGroupBtn_click (event)// @startlock
	{// @endlock
		ds.UserGroup.addUserToGroup({onSuccess:function(evt){
			$comp.sources.user.serverRefresh({forceReload:true});
			$comp.sources.group.serverRefresh({forceReload:true});
		}},$comp.sources.user.ID,$comp.sources.group.ID);
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_groupSearchField", "keyup", groupSearchField.keyup, "WAF");
	WAF.addListener(this.id + "_userSearchField", "keyup", userSearchField.keyup, "WAF");
	WAF.addListener(this.id + "_removeUserFromGroupBtn", "click", removeUserFromGroupBtn.click, "WAF");
	WAF.addListener(this.id + "_removeGroupFromUserBtn", "click", removeGroupFromUserBtn.click, "WAF");
	WAF.addListener(this.id + "_addUserToGroupBtn", "click", addUserToGroupBtn.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
