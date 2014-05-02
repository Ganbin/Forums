
WAF.onAfterInit = function onAfterInit() {// @lock

	/*
	* Declare widgets in the forum namespace
	*/
	
	forums.widgets.newaccount = $$('newAccountBtn');
	forums.widgets.centerComp = $$('centerComp');
	forums.widgets.mainComp = $$('mainComp');
	forums.widgets.tabViewNav = $$('tabViewNav');
	forums.widgets.passwordForgottenTxt = $$('passwordForgottenTxt');
	
	// Bottom left buttons
	forums.widgets.managementBtn = $$('managementBtn');
	forums.widgets.addBtn = $$('addBtn');
	forums.widgets.editBtn = $$('editBtn');
	forums.widgets.deleteBtn = $$('deleteBtn');
	forums.widgets.userPrefBtn = $$('userPrefBtn');
	forums.widgets.replyToPostBtn = $$('replyToPostBtn');
	
	// Dialog widgets
	forums.widgets.alreadySubscribedDialog = $$('alreadySubscribedDialog');
	forums.widgets.subscriptionOkDialog = $$('subscriptionOkDialog');
	forums.widgets.subscriptionDialog = $$('subscriptionDialog');
	forums.widgets.confirmPostDeleteDialog = $$('confirmPostDeleteDialog');
	forums.widgets.passwordResetDialog = $$('passwordResetDialog');
	
	
// @region namespaceDeclaration// @startlock
	var passwordResetDialog = {};	// @ModalDialog
	var passwordForgottenTxt = {};	// @richText
	var replyToPostBtn = {};	// @icon
	var userPrefBtn = {};	// @buttonImage
	var alreadySubscribedDialog = {};	// @ModalDialog
	var subscriptionOkDialog = {};	// @ModalDialog
	var subscriptionDialog = {};	// @ModalDialog
	var matrixForum = {};	// @matrix
	var confirmPostDeleteDialog = {};	// @ModalDialog
	var matrixMessage = {};	// @matrix
	var deleteBtn = {};	// @buttonImage
	var messageItem = {};	// @container
	var threadItem = {};	// @container
	var menuThread = {};	// @menuItem
	var postsEvent = {};	// @dataSource
	var editBtn = {};	// @buttonImage
	var addBtn = {};	// @buttonImage
	var menuCategory = {};	// @menuItem
	var menuForum = {};	// @menuItem
	var forumItem = {};	// @container
	var managementBtn = {};	// @buttonImage
	var categoryItem = {};	// @container
	var editCategoryButton = {};	// @button
	var newAccountBtn = {};	// @button
	var documentEvent = {};	// @document
	var login1 = {};	// @login
// @endregion// @endlock

// eventHandlers// @lock

	passwordResetDialog.onValidClick = function passwordResetDialog_onValidClick (event)// @startlock
	{// @endlock
		forums.widgets.passwordResetDialog.closeDialog()
	};// @lock

	passwordForgottenTxt.click = function passwordForgottenTxt_click (event)// @startlock
	{// @endlock
		forums.widgets.centerComp.loadComponent('/Components/passwordForgotten.waComponent');
	};// @lock

	replyToPostBtn.click = function replyToPostBtn_click (event)// @startlock
	{// @endlock
		forums.loadCorrectComponent('replyBtn');
	};// @lock

	userPrefBtn.click = function userPrefBtn_click (event)// @startlock
	{// @endlock
		forums.widgets.centerComp.loadComponent('/Components/userInterface.waComponent');
	};// @lock

	alreadySubscribedDialog.onValidClick = function alreadySubscribedDialog_onValidClick (event)// @startlock
	{// @endlock
		forums.widgets.alreadySubscribedDialog.closeDialog();
	};// @lock

	subscriptionOkDialog.onValidClick = function subscriptionOkDialog_onValidClick (event)// @startlock
	{// @endlock
		forums.widgets.subscriptionOkDialog.closeDialog();
	};// @lock

	subscriptionDialog.onValidClick = function subscriptionDialog_onValidClick (event)// @startlock
	{// @endlock
		ds.Inscription.subscribeToForum(waf.sources.forums.ID);
		forums.widgets.subscriptionDialog.closeDialog();
		forums.widgets.subscriptionOkDialog.openDialog();
	};// @lock

	matrixForum.onChildrenDraw = function matrixForum_onChildrenDraw (event)// @startlock
	{// @endlock
		if(!event.source.hasAccess('read')){
			event.htmlObject.css("background-color", "lightgray");
		}
	};// @lock

	confirmPostDeleteDialog.onValidClick = function confirmPostDeleteDialog_onValidClick (event)// @startlock
	{// @endlock
		waf.sources.posts.disable({onSuccess:function(evt){
			waf.sources.topics.serverRefresh({forceReload:true});
		}});
		forums.widgets.confirmPostDeleteDialog.closeDialog(); //ok button confirmDeletePostDialog
	};// @lock

	matrixMessage.onChildrenDraw = function matrixMessage_onChildrenDraw (event)// @startlock
	{// @endlock
		if(event.source.stamp != null){
			event.htmlObject.children()[1].innerText = (moment(event.source.stamp).zone(new Date().getTimezoneOffset()).format('D/M/YY - H:m'))
		}
		
		if(event.source.isViewed === true || event.pos === 0){ // if the isViewed attribute is true or if it's the first item
			$(event.htmlObject[0].children[4]).hide(); // Hide the unread icon
		}
		
		if (event.source.enable === false) { 
		   event.htmlObject.css("background-color", "lightgray");
		} else {
		}
	};// @lock

	deleteBtn.click = function deleteBtn_click (event)// @startlock
	{// @endlock
		forums.widgets.confirmPostDeleteDialog.openDialog();
		forums.widgets.confirmPostDeleteDialog.setText('Are you sure that you want to delete this post "'+waf.sources.posts.title+'" and all the posts linked ?');
	};// @lock

	messageItem.click = function messageItem_click (event)// @startlock
	{// @endlock
		$(this.$domNode[0].children[4]).hide();
		forums.displayMessage();
	};// @lock

	threadItem.click = function threadItem_click (event)// @startlock
	{// @endlock
		forums.goToMessageView();
	};// @lock

	menuThread.click = function menuThread_click (event)// @startlock
	{// @endlock
		forums.goToThreadView();
	};// @lock

	postsEvent.onCurrentElementChange = function postsEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		if(forums.widgets.tabViewNav.getSelectedTab().index === 4){
			if(sources.forums.isModerator() === true || waf.sources.posts.isMyPost()){
				forums.widgets.editBtn.show();
				forums.widgets.deleteBtn.show();
			}else{
				forums.widgets.editBtn.hide();
				forums.widgets.deleteBtn.hide();
			}
			
			setTimeout(function(){
				$('.xbbcode-code').each(function(i, e) {hljs.highlightBlock(e)});
			},100);
			
			if(waf.sources.posts.getCurrentElement() !== null && typeof waf.sources.mainComp_post != 'undefined'){
				var newCol = ds.Post.newCollection();
				newCol.add(waf.sources.posts.getCurrentElement());
				waf.sources.mainComp_post.setEntityCollection(newCol);
			}
		}
			
	};// @lock

	editBtn.click = function editBtn_click (event)// @startlock
	{// @endlock
		forums.loadCorrectComponent('editBtn');
	};// @lock

	addBtn.click = function addBtn_click (event)// @startlock
	{// @endlock
		forums.loadCorrectComponent('addBtn');
		
	};// @lock

	menuCategory.click = function menuCategory_click (event)// @startlock
	{// @endlock
		forums.goToCategoryView();
	};// @lock

	menuForum.click = function menuForum_click (event)// @startlock
	{// @endlock
		forums.goToForumView();
	};// @lock

	forumItem.click = function forumItem_click (event)// @startlock
	{// @endlock
		if(waf.sources.forums.hasAccess('read')){
			forums.goToThreadView();
		}else{
			if(waf.sources.forums.isSubscribed()){
				forums.widgets.alreadySubscribedDialog.openDialog();
				forums.widgets.alreadySubscribedDialog.setText('Your subscription for this forum is pending. Wait for a confirmation from the moderator.');
			}else{
				forums.widgets.subscriptionDialog.openDialog();
				forums.widgets.subscriptionDialog.setText('You don\'t have any access for this forum : "'+waf.sources.forums.title+'". Do you want to subscribe to this forum?');
			}
		}
	};// @lock

	managementBtn.click = function managementBtn_click (event)// @startlock
	{// @endlock
		forums.loadCorrectComponent('managementBtn');
	};// @lock



	categoryItem.click = function categoryItem_click (event)// @startlock
	{// @endlock
		forums.goToForumView();
	};// @lock

	editCategoryButton.click = function editCategoryButton_click (event)// @startlock
	{// @endlock

	};// @lock

	newAccountBtn.click = function newAccountBtn_click (event)// @startlock
	{// @endlock

		forums.widgets.centerComp.loadComponent('/Components/newAccount.waComponent');
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		setTimeout(function(){
			forums.isLogged();
			forums.isAdmin();
			forums.displayMenuBarItem();
			$$('titleTxt').setValue(RPCUtils.getForumTitle());
			$('#menuBar2').appendTo('body');
		},100);
		
		window.onresize = function(){
			$(".ellipsis").dotdotdot();
		};
	};// @lock

	login1.logout = function login1_logout (event)// @startlock
	{// @endlock
		forums.isLogged();
		
		forums.isAdmin();
		
		forums.widgets.mainComp.removeComponent();
		
		forums.goToCategoryView();
		waf.sources.category.all({orderBy:'title'});
	};// @lock

	login1.login = function login1_login (event)// @startlock
	{// @endlock
		forums.isLogged();
		forums.isAdmin();
		
		forums.goToCategoryView();
		waf.sources.category.all({orderBy:'title'});
	
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("passwordResetDialog", "onValidClick", passwordResetDialog.onValidClick, "WAF");
	WAF.addListener("passwordForgottenTxt", "click", passwordForgottenTxt.click, "WAF");
	WAF.addListener("posts", "oncontentHTMLAttributeChange", postsEvent.oncontentHTMLAttributeChange, "WAF", "contentHTML");
	WAF.addListener("replyToPostBtn", "click", replyToPostBtn.click, "WAF");
	WAF.addListener("userPrefBtn", "click", userPrefBtn.click, "WAF");
	WAF.addListener("alreadySubscribedDialog", "onValidClick", alreadySubscribedDialog.onValidClick, "WAF");
	WAF.addListener("subscriptionOkDialog", "onValidClick", subscriptionOkDialog.onValidClick, "WAF");
	WAF.addListener("subscriptionDialog", "onValidClick", subscriptionDialog.onValidClick, "WAF");
	WAF.addListener("matrixForum", "onChildrenDraw", matrixForum.onChildrenDraw, "WAF");
	WAF.addListener("confirmPostDeleteDialog", "onValidClick", confirmPostDeleteDialog.onValidClick, "WAF");
	WAF.addListener("matrixMessage", "onChildrenDraw", matrixMessage.onChildrenDraw, "WAF");
	WAF.addListener("deleteBtn", "click", deleteBtn.click, "WAF");
	WAF.addListener("messageItem", "click", messageItem.click, "WAF");
	WAF.addListener("threadItem", "click", threadItem.click, "WAF");
	WAF.addListener("menuThread", "click", menuThread.click, "WAF");
	WAF.addListener("posts", "onCurrentElementChange", postsEvent.onCurrentElementChange, "WAF");
	WAF.addListener("editBtn", "click", editBtn.click, "WAF");
	WAF.addListener("addBtn", "click", addBtn.click, "WAF");
	WAF.addListener("menuCategory", "click", menuCategory.click, "WAF");
	WAF.addListener("menuForum", "click", menuForum.click, "WAF");
	WAF.addListener("forumItem", "click", forumItem.click, "WAF");
	WAF.addListener("managementBtn", "click", managementBtn.click, "WAF");
	WAF.addListener("categoryItem", "click", categoryItem.click, "WAF");
	WAF.addListener("editCategoryButton", "click", editCategoryButton.click, "WAF");
	WAF.addListener("newAccountBtn", "click", newAccountBtn.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("login1", "logout", login1.logout, "WAF");
	WAF.addListener("login1", "login", login1.login, "WAF");
// @endregion
};// @endlock
