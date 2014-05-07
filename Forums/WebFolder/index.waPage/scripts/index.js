
WAF.onAfterInit = function onAfterInit() {// @lock

	/*
	* Declare widgets in the forum namespace
	*/
	forums.widgets.loginBtn = $$('loginBtn');
	forums.widgets.loggedTxt = $$('loggedTxt');
	forums.widgets.centerComp = $$('centerComp');
	forums.widgets.centerComp2 = $$('centerComp2');
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
	var moveThreadBtn = {};	// @buttonImage
	var closeThreadBtn = {};	// @buttonImage
	var resolvedBtn = {};	// @buttonImage
	var loginBtn = {};	// @button
	var passwordResetDialog = {};	// @ModalDialog
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
	var postsEvent = {};	// @dataSource
	var editBtn = {};	// @buttonImage
	var addBtn = {};	// @buttonImage
	var forumItem = {};	// @container
	var managementBtn = {};	// @buttonImage
	var categoryItem = {};	// @container
	var editCategoryButton = {};	// @button
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	moveThreadBtn.click = function moveThreadBtn_click (event)// @startlock
	{// @endlock
		forums.widgets.centerComp.loadComponent('/Components/userInterface.waComponent');
	};// @lock

	closeThreadBtn.click = function closeThreadBtn_click (event)// @startlock
	{// @endlock
		forums.widgets.centerComp.loadComponent('/Components/userInterface.waComponent');
	};// @lock

	resolvedBtn.click = function resolvedBtn_click (event)// @startlock
	{// @endlock
		forums.widgets.centerComp.loadComponent('/Components/userInterface.waComponent');
	};// @lock

	loginBtn.click = function loginBtn_click (event)// @startlock
	{// @endlock
		if (WAF.directory.currentUser() == null){
			forums.widgets.centerComp.loadComponent('/Components/loginDialog.waComponent');
		}else{
			WAF.directory.logout({onSuccess: function(event) { 
	            forums.isLogged();
		
				forums.isAdmin();
				
				forums.widgets.mainComp.removeComponent();
				
				forums.goToCategoryView();
				waf.sources.category.all({keepOrderBy:true});
	        }});      
		}
	};// @lock

	passwordResetDialog.onValidClick = function passwordResetDialog_onValidClick (event)// @startlock
	{// @endlock
		forums.widgets.passwordResetDialog.closeDialog()
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
			event.htmlObject.children().last()[0].innerText = (moment(event.source.stamp).zone(new Date().getTimezoneOffset()).calendar())
		}
		
		if(event.source.isViewed === true || event.pos === 0){ // if the isViewed attribute is true or if it's the first item
			$(event.htmlObject[0].children[3]).hide(); // Hide the unread icon
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

	messageItem.mouseover = function messageItem_mouseover (event)// @startlock
	{// @endlock
		$(event.currentTarget).addClass('messageItem-hover');
	};// @lock

	messageItem.mouseout = function messageItem_mouseout (event)// @startlock
	{// @endlock
		$(event.currentTarget).removeClass('messageItem-hover');
	};// @lock

	messageItem.click = function messageItem_click (event)// @startlock
	{// @endlock
		$(this.$domNode[0].children[3]).hide();
		forums.displayMessage();
	};// @lock

	threadItem.mouseover = function threadItem_mouseover (event)// @startlock
	{// @endlock
		$(event.currentTarget).addClass('threadItem-hover');
	};// @lock

	threadItem.mouseout = function threadItem_mouseout (event)// @startlock
	{// @endlock
		$(event.currentTarget).removeClass('threadItem-hover');
	};// @lock

	threadItem.click = function threadItem_click (event)// @startlock
	{// @endlock
		forums.goToMessageView();
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

	forumItem.mouseover = function forumItem_mouseover (event)// @startlock
	{// @endlock
		$(event.currentTarget).addClass('forumItem-hover');
	};// @lock

	forumItem.mouseout = function forumItem_mouseout (event)// @startlock
	{// @endlock
		$(event.currentTarget).removeClass('forumItem-hover');
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



	categoryItem.mouseout = function categoryItem_mouseout (event)// @startlock
	{// @endlock
		$(event.currentTarget).removeClass('categoryItem-hover');
	};// @lock

	categoryItem.mouseover = function categoryItem_mouseover (event)// @startlock
	{// @endlock
		$(event.currentTarget).addClass('categoryItem-hover');
	};// @lock

	categoryItem.click = function categoryItem_click (event)// @startlock
	{// @endlock
		forums.goToForumView();
	};// @lock

	editCategoryButton.click = function editCategoryButton_click (event)// @startlock
	{// @endlock

	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		setTimeout(function(){
			forums.isLogged();
			forums.isAdmin();
			forums.displayMenuBarItem();
			$$('titleTxt').setValue(RPCUtils.getForumTitle());
			$('#menuBar2').hide();
			
			// Listener for click on the menuBarItems
			
			$('#menuCategory').click(function(){
				forums.goToCategoryView();
			});
			$('#menuForum').click(function(){
				forums.goToForumView();
			});
			$('#menuThread').click(function(){
				forums.goToThreadView();
			});
			
			// Moment Config
			moment.defaultFormat = 'D/M/YY - H:mm';
			moment.lang('en', {
			    calendar : {
			        lastDay : '[Yesterday at] H:mm',
			        sameDay : '[Today at] H:mm',
			        nextDay : '[Tomorrow at] H:mm',
			        lastWeek : 'dddd [at] H:mm',
			        nextWeek : 'dddd [at] H:mm',
			        sameElse : 'D/M/YY - H:mm'
			    }
			});
		},100);
		
		window.onresize = function(){
			$(".ellipsis").dotdotdot();
		};
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("moveThreadBtn", "click", moveThreadBtn.click, "WAF");
	WAF.addListener("closeThreadBtn", "click", closeThreadBtn.click, "WAF");
	WAF.addListener("resolvedBtn", "click", resolvedBtn.click, "WAF");
	WAF.addListener("messageItem", "mouseover", messageItem.mouseover, "WAF");
	WAF.addListener("messageItem", "mouseout", messageItem.mouseout, "WAF");
	WAF.addListener("threadItem", "mouseover", threadItem.mouseover, "WAF");
	WAF.addListener("threadItem", "mouseout", threadItem.mouseout, "WAF");
	WAF.addListener("forumItem", "mouseover", forumItem.mouseover, "WAF");
	WAF.addListener("forumItem", "mouseout", forumItem.mouseout, "WAF");
	WAF.addListener("categoryItem", "mouseout", categoryItem.mouseout, "WAF");
	WAF.addListener("categoryItem", "mouseover", categoryItem.mouseover, "WAF");
	WAF.addListener("loginBtn", "click", loginBtn.click, "WAF");
	WAF.addListener("passwordResetDialog", "onValidClick", passwordResetDialog.onValidClick, "WAF");
	WAF.addListener("posts", "oncontentHTMLAttributeChange", postsEvent.oncontentHTMLAttributeChange, "WAF", "contentHTML");
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
	WAF.addListener("posts", "onCurrentElementChange", postsEvent.onCurrentElementChange, "WAF");
	WAF.addListener("editBtn", "click", editBtn.click, "WAF");
	WAF.addListener("addBtn", "click", addBtn.click, "WAF");
	WAF.addListener("forumItem", "click", forumItem.click, "WAF");
	WAF.addListener("managementBtn", "click", managementBtn.click, "WAF");
	WAF.addListener("categoryItem", "click", categoryItem.click, "WAF");
	WAF.addListener("editCategoryButton", "click", editCategoryButton.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
