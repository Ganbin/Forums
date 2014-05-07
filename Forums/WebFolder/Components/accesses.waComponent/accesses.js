
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'accesses';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		
		var groupAccess, // boolean to know if it is a group or a user access to create
			createAccess, // boolean to know if is a creation or a modification
			restricted = false,
			actions = {'read':true,'write':false,'del':false,'modify':false,'vote':false},
			groupOrUserID,
			accessIDToModify = null;
			
		$$(getHtmlId('readCheckbox')).disable();
		
		var getActionObject = function(){
			var returnObject = {'read':true,'write':false,'del':false,'modify':false,'vote':false};
			
			returnObject.read = $$(getHtmlId('readCheckbox')).getValue();
			returnObject.write = $$(getHtmlId('writeCheckbox')).getValue();
			returnObject.del = $$(getHtmlId('deleteCheckbox')).getValue();
			returnObject.modify = $$(getHtmlId('modifyCheckbox')).getValue();
			returnObject.vote = $$(getHtmlId('voteCheckbox')).getValue();
			
			return returnObject;
		};
		
		var setAccessDetails = function(restricted,statut,read,write,del,modify,vote){
			$$(getHtmlId("restrictedCheckbox")).setValue(restricted);
			$$(getHtmlId("statutRadio")).setValue(statut);
			$$(getHtmlId('readCheckbox')).setValue(read);
			$$(getHtmlId('writeCheckbox')).setValue(write);
			$$(getHtmlId('deleteCheckbox')).setValue(del);
			$$(getHtmlId('modifyCheckbox')).setValue(modify);
			$$(getHtmlId('voteCheckbox')).setValue(vote);
		};
		
		var resetAccessDetails = function(){
			var access = $comp.sources.forum.getUserAccess($comp.sources.user.ID)
			
			if(access === false){
				setAccessDetails(false,'member',true,false,false,false,false);
			}else{
				setAccessDetails(access.restricted,access.statut,access.actions.read,access.actions.write,access.actions.del,access.actions.modify,access.actions.vote);
			}
		};

	// @region namespaceDeclaration// @startlock
	var userSearchField = {};	// @textField
	var groupSearchFIeld = {};	// @textField
	var forumSearchField = {};	// @textField
	var deleteAccessBtn = {};	// @button
	var createAccessUserBtn = {};	// @button
	var modifyAccessBtn = {};	// @button
	var createAccessGroupBtn = {};	// @button
	var okAccessInfoDialogBtn = {};	// @button
	var cancelAccessInfoDialogBtn = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	userSearchField.keyup = function userSearchField_keyup (event)// @startlock
	{// @endlock
		$comp.sources.user.query('(lastName == :1 or firstName == :1 or email == :1 or login == :1 or statut == :1) and allGroups.title != "dataAdmin"','*'+this.$domNode.val()+'*');
	};// @lock

	groupSearchFIeld.keyup = function groupSearchFIeld_keyup (event)// @startlock
	{// @endlock
		$comp.sources.group.query('title = :1 and title != "dataAdmin"','*'+this.$domNode.val()+'*');
	};// @lock

	forumSearchField.keyup = function forumSearchField_keyup (event)// @startlock
	{// @endlock
		$comp.sources.forum.query('category.title == :1 or title = :1','*'+this.$domNode.val()+'*');
	};// @lock

	deleteAccessBtn.click = function deleteAccessBtn_click (event)// @startlock
	{// @endlock
		
		$comp.sources.allAccesses.remove({onSuccess:function(evt){
			$comp.sources.forum.serverRefresh();
			$comp.sources.group.serverRefresh();
			$comp.sources.user.serverRefresh();
			//$$(getHtmlId("deleteConfirmDialog")).closeDialog(); //ok button
		}});
		
		/* FOR THE MODAL DIALOG WHEN BUG IS FIXED
		$$(getHtmlId('deleteConfirmDialog')).openDialog();
		
		var text = 'Are you sure that you want to delete this access : '+$comp.sources.forum.title+' for this ';
		
		text += ($comp.sources.allAccesses.getAttributeValue('group.title') !== null) ? 'group : '+$comp.sources.allAccesses.getAttributeValue('group.title') : 'user : '+$comp.sources.allAccesses.getAttributeValue('user.fullName') ;
		text += '?';
		
		$$(getHtmlId('deleteConfirmDialog')).setText(text);
		*/
		
	};// @lock

	createAccessUserBtn.click = function createAccessUserBtn_click (event)// @startlock
	{// @endlock
		resetAccessDetails();
		groupAccess = false;
		createAccess = true;
		$$(getHtmlId("accessInfoDialog")).displayDialog();
	};// @lock

	modifyAccessBtn.click = function modifyAccessBtn_click (event)// @startlock
	{// @endlock
		createAccess = false;
		$$(getHtmlId("accessInfoDialog")).displayDialog();
		setAccessDetails(
			$comp.sources.allAccesses.restricted,
			$comp.sources.allAccesses.statut,
			$comp.sources.allAccesses.getAttributeValue('action.read'),
			$comp.sources.allAccesses.getAttributeValue('action.write'),
			$comp.sources.allAccesses.getAttributeValue('action.del'),
			$comp.sources.allAccesses.getAttributeValue('action.modify'),
			$comp.sources.allAccesses.getAttributeValue('action.vote')
		);
		
	};// @lock

	createAccessGroupBtn.click = function createAccessGroupBtn_click (event)// @startlock
	{// @endlock
		groupAccess = true;
		createAccess = true;
		$$(getHtmlId("accessInfoDialog")).displayDialog();
	};// @lock

	okAccessInfoDialogBtn.click = function okAccessInfoDialogBtn_click (event)// @startlock
	{// @endlock
		if(createAccess === true){
			groupOrUserID = (groupAccess === true) ? $comp.sources.group.ID : $comp.sources.user.ID ;
		}else{
			groupOrUserID = ($comp.sources.allAccesses.getAttributeValue('user.ID') === null) ? $comp.sources.allAccesses.getAttributeValue('group.ID') : $comp.sources.allAccesses.getAttributeValue('user.ID');
			groupAccess = ($comp.sources.allAccesses.getAttributeValue('user.ID') === null) ? true : false;
			accessIDToModify = $comp.sources.allAccesses.ID;
		}
		
		ds.Access.createOrModifyAGroupOrUserAccess({onSuccess:function(evt){
			
			$comp.sources.forum.serverRefresh({forceReload:true});
			$comp.sources.group.serverRefresh({forceReload:true});
			$comp.sources.user.serverRefresh({forceReload:true});
			$$(getHtmlId("accessInfoDialog")).closeDialog(); //ok button
			
		}},createAccess,groupAccess,$comp.sources.forum.ID,groupOrUserID,getActionObject(),$$(getHtmlId('restrictedCheckbox')).getValue(),$$(getHtmlId('statutRadio')).getValue(),accessIDToModify);
		
	};// @lock

	cancelAccessInfoDialogBtn.click = function cancelAccessInfoDialogBtn_click (event)// @startlock
	{// @endlock
		$$(getHtmlId("accessInfoDialog")).closeDialog(); //cancel button
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_userSearchField", "keyup", userSearchField.keyup, "WAF");
	WAF.addListener(this.id + "_groupSearchFIeld", "keyup", groupSearchFIeld.keyup, "WAF");
	WAF.addListener(this.id + "_forumSearchField", "keyup", forumSearchField.keyup, "WAF");
	WAF.addListener(this.id + "_deleteAccessBtn", "click", deleteAccessBtn.click, "WAF");
	WAF.addListener(this.id + "_createAccessUserBtn", "click", createAccessUserBtn.click, "WAF");
	WAF.addListener(this.id + "_modifyAccessBtn", "click", modifyAccessBtn.click, "WAF");
	WAF.addListener(this.id + "_createAccessGroupBtn", "click", createAccessGroupBtn.click, "WAF");
	WAF.addListener(this.id + "_okAccessInfoDialogBtn", "click", okAccessInfoDialogBtn.click, "WAF");
	WAF.addListener(this.id + "_cancelAccessInfoDialogBtn", "click", cancelAccessInfoDialogBtn.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
