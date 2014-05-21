// Namespace de notre application
// Nous auront acces à toutes les attribut de notre objet forums partout dans notre application (l'application au niveau de notre page index)

var forums = {}; // initialisation de notre objet
forums.widgets = {}; // initialisation de la proprieté widgets qui contiendra tout nos widgets


/***************************
Définition de nos fonctions
***************************/

// La fonction isLogged() permet de checker si une personne est logger ou non
// Permet de faire les actions necessaires sur l'interface
// return true or false à la question is logged ?
forums.isLogged = function(){
	if (WAF.directory.currentUser() == null){ // If not logged
		forums.widgets.loginBtn.setValue('Login');
		forums.widgets.loggedTxt.hide();
		forums.widgets.userPrefBtn.hide();
	}else{ // If logged
		forums.widgets.loggedTxt.setValue('Logged as '+waf.directory.currentUser().fullName);
		forums.widgets.loggedTxt.show();
		forums.widgets.loginBtn.setValue('Logout');
		forums.widgets.userPrefBtn.show();
	}
};

// La fonction isAdmin() permet de checker si la personne logger est admin
// Permet de fait les actions nécessaires sur l'interface
// returne true or false à la question is admin?
forums.isAdmin = function(){
	if(RPCUtils.isDataAdmin()){
		forums.widgets.managementBtn.show();		
		return true;
	}else{
		forums.widgets.managementBtn.hide();
		return false;
	}

};

// La fonction loadCorrectComponent() permet de charger le bon composant lorse que nous souhaitons utiliser un formulaire pour modifier une category ou un forum
// Check si l'utilisateur est admin. Si il est admin, le bon composant sera charger en dépent du niveau de navigation où nous somme (category ou forum)
forums.loadCorrectComponent = function(typeBtn){
	switch(forums.widgets.tabViewNav.getSelectedTab().index){
		case 1 :
			forums.widgets.centerComp.loadComponent('/Components/categoryForm.waComponent');
			break;
		case 2 :
			forums.widgets.centerComp.loadComponent('/Components/forumForm.waComponent');
			break;
		case 3:
			if(typeBtn === 'managementBtn'){
				forums.widgets.centerComp.loadComponent('/Components/moderatorPage.waComponent');
			}else if(typeBtn === 'addBtn'){
				forums.widgets.centerComp.loadComponent({path:'/Components/messageForm.waComponent',userData:{loadedFor:'thread'}});
			}
			break;
		case 4:
			if(typeBtn === 'managementBtn'){
				forums.widgets.centerComp.loadComponent('/Components/moderatorPage.waComponent');
			}else if(typeBtn === 'editBtn' || typeBtn === 'addBtn' || typeBtn === 'replyBtn'){
				forums.widgets.centerComp.loadComponent({path:'/Components/messageForm.waComponent',userData:{loadedFor:'message',typeBtn:typeBtn}});
			}
			break;
	}
};

/*
* This method is to show or hide the correct menuItem for our custom breadcrumb.
* We fire this method everytime we click on a menu item
*/
forums.displayMenuBarItem = function(){
	
	// Assign every menuItem in a variable
	var category = $('#menuCategory');
	var forum = $('#menuForum');
	var thread = $('#menuThread');
	var message = $('#menuMessages');
	
	// We look in which tabView navigation we are, and then we hide/show et add/remove the right class to have the correct visual effect.
	switch(forums.widgets.tabViewNav.getSelectedTab().index){
		case 1:
			forum.removeClass('customMenuItemLast');
			thread.removeClass('customMenuItemLast');
			message.removeClass('customMenuItemLast');
			category.addClass('customMenuItemLast');
			
			forum.removeClass('waf-state-selected');
			thread.removeClass('waf-state-selected');
			message.removeClass('waf-state-selected');
			
			category.addClass('waf-state-selected');
			
			category.html('Categories');
			$('title').text(RPCUtils.getForumTitle());
			
			category.show();
			break;
		case 2:
			category.removeClass('customMenuItemLast');
			thread.removeClass('customMenuItemLast');
			message.removeClass('customMenuItemLast');
			forum.addClass('customMenuItemLast');
			
			category.removeClass('waf-state-selected');
			thread.removeClass('waf-state-selected');
			message.removeClass('waf-state-selected');
			
			forum.addClass('waf-state-selected');
			
			forum.html(waf.sources.category.title);
			$('title').text(waf.sources.category.title);
			
			category.show();
			forum.show();
			break;
		case 3:
			category.removeClass('customMenuItemLast');
			forum.removeClass('customMenuItemLast');
			message.removeClass('customMenuItemLast');
			thread.addClass('customMenuItemLast');
			
			category.removeClass('waf-state-selected');
			forum.removeClass('waf-state-selected');
			message.removeClass('waf-state-selected');
			
			thread.addClass('waf-state-selected');
			
			
			thread.html(waf.sources.forums.title);
			$('title').text(waf.sources.forums.title);
			
			category.show();
			forum.show();
			thread.show();
			break;
		case 4:
			category.removeClass('customMenuItemLast');
			forum.removeClass('customMenuItemLast');
			thread.removeClass('customMenuItemLast');
			message.addClass('customMenuItemLast');
			
			category.removeClass('waf-state-selected');
			forum.removeClass('waf-state-selected');
			thread.removeClass('waf-state-selected');
			
			message.addClass('waf-state-selected');
			
			
			message.html(waf.sources.topics.title);
			$('title').text(waf.sources.topics.title);
			
			category.show();
			forum.show();
			thread.show();
			message.show();
			break;
	}
	thread.html(waf.sources.forums.title);
	message.html(waf.sources.topics.title);
	forum.html(waf.sources.category.title);
	$(".ellipsis").dotdotdot();
};

/*
* This method do the appropriate actions when we want to display the category list
*/
forums.goToCategoryView = function(keepPost){
	forums.widgets.tabViewNav.selectTab(1);
	forums.isAdmin();
	forums.displayMenuBarItem();
	
	forums.widgets.addBtn.hide();
	forums.widgets.editBtn.hide();
	forums.widgets.deleteBtn.hide();
	forums.widgets.moveThreadBtn.hide();
	forums.widgets.closeThreadBtn.hide();
	forums.widgets.unCloseThreadBtn.hide();
	forums.widgets.resolvedBtn.hide();
	forums.widgets.unresolvedBtn.hide();
	
	keepPost = keepPost != null ? keepPost : true;
	
	if(keepPost){
		forums.refreshCategory();
	}else{
		waf.sources.category.serverRefresh({forceReload:true});
	}
	
	$(".ellipsis").dotdotdot();
};

/*
* This method do the appropriate actions when we want to display the forum list
*/
forums.goToForumView = function(){
	forums.widgets.tabViewNav.selectTab(2);
	
	forums.isAdmin();
	forums.displayMenuBarItem();
	
	forums.widgets.addBtn.hide();
	forums.widgets.editBtn.hide();
	forums.widgets.deleteBtn.hide();
	forums.widgets.moveThreadBtn.hide();
	forums.widgets.closeThreadBtn.hide();
	forums.widgets.unCloseThreadBtn.hide();
	forums.widgets.resolvedBtn.hide();
	forums.widgets.unresolvedBtn.hide();
	
	forums.refreshForum();
	
	$(".ellipsis").dotdotdot();
};

/*
* This method do the appropriate actions when we want to display the thread list
*/
forums.goToThreadView = function(){
	forums.widgets.tabViewNav.selectTab(3);
	forums.displayMenuBarItem();
	forums.widgets.editBtn.hide();
	forums.widgets.deleteBtn.hide();
	forums.widgets.moveThreadBtn.hide();
	forums.widgets.closeThreadBtn.hide();
	forums.widgets.unCloseThreadBtn.hide();
	forums.widgets.resolvedBtn.hide();
	forums.widgets.unresolvedBtn.hide();
	
	forums.refreshThread();
	
	if(sources.forums.hasAccess('write')){ // Check if the user has write access and display the add button
		forums.widgets.addBtn.show();
	}else{
		forums.widgets.addBtn.hide();
	}
	
	if(sources.forums.isModerator()){ // Check if the user is a moderator and display the management button
		forums.widgets.managementBtn.show();
	}else{
		forums.widgets.managementBtn.hide();
	}
	$(".ellipsis").dotdotdot();
};

/*
* This method do the appropriate actions when we want to display de message list
*/
forums.goToMessageView = function(){
	forums.widgets.tabViewNav.selectTab(4);
	forums.displayMenuBarItem();
	
	forums.displayActionButtons();
	
	forums.displayMessage();
	$(".ellipsis").dotdotdot();
	
};

/*
* This method load the displayMessage component and set the current post of the local source of the component with the select post in the page
*/
forums.displayMessage = function(){
	waf.sources.posts.viewPost();
	forums.widgets.mainComp.loadComponent({path:'/Components/displayMessage.waComponent',onSuccess:function(){
		var newCol = ds.Post.newCollection(); // Create a new empty collection
		newCol.add(waf.sources.posts.getCurrentElement()); // Add the current post selected in the page to the new empty collection
		waf.sources.mainComp_post.setEntityCollection(newCol);	// Set the new entityCollection of the local source of the component. So that way we always have the correct post displayed
		$(".ellipsis").dotdotdot();
	}});
};

forums.displayActionButtons = function(){
	
	var displayMEDButtons = function(){
		if(sources.forums.isModerator()){ // Check if the user is a moderator and display the management button
			forums.widgets.moveThreadBtn.show();
			forums.widgets.managementBtn.show();
			
			if(sources.forums.hasAccess('modify')){ // Check if the user has write access and display the add button
				forums.widgets.editBtn.show();
			}else{
				forums.widgets.editBtn.hide();
			}
			
			if(sources.forums.hasAccess('del')){ // Check if the user has write access and display the add button
				forums.widgets.deleteBtn.show();
			}else{
				forums.widgets.deleteBtn.hide();
			}
		}else{
			forums.widgets.managementBtn.hide();
			forums.widgets.moveThreadBtn.hide();
			
			if(waf.sources.posts.isMyPost()){
				if(sources.forums.hasAccess('modify')){ // Check if the user has write access and display the add button
					forums.widgets.editBtn.show();
				}else{
					forums.widgets.editBtn.hide();
				}
				
				if(sources.forums.hasAccess('del')){ // Check if the user has write access and display the add button
					forums.widgets.deleteBtn.show();
				}else{
					forums.widgets.deleteBtn.hide();
				}
			}else{
				forums.widgets.editBtn.hide();
				forums.widgets.deleteBtn.hide();
			}
		}
	};
	
	if(waf.sources.posts.isMyThread()){
		
		displayMEDButtons();
				
		if(waf.sources.topics.closed === true){
			if($$('mainComp_closedImg') !== undefined){
				$$('mainComp_closedImg').show();
				$$('mainComp_resolvedImg').hide();
			}
			
			forums.widgets.addBtn.hide();
			forums.widgets.editBtn.hide();
			forums.widgets.deleteBtn.hide();
			forums.widgets.resolvedBtn.hide();
			forums.widgets.unresolvedBtn.hide();
			forums.widgets.closeThreadBtn.hide();
			forums.widgets.unCloseThreadBtn.show();
			
		}else if(waf.sources.topics.resolved === true){
			if($$('mainComp_resolvedImg') !== undefined){
				$$('mainComp_closedImg').hide();
				$$('mainComp_resolvedImg').show();
			}
			
			forums.widgets.resolvedBtn.hide();
			forums.widgets.unresolvedBtn.show();
			forums.widgets.closeThreadBtn.show();
			
		}else if(waf.sources.topics.closed !== true || waf.sources.topics.resolved !== true){
			if($$('mainComp_closedImg') !== undefined){
				$$('mainComp_closedImg').hide();
			}
			
			if($$('mainComp_resolvedImg') !== undefined){
				$$('mainComp_resolvedImg').hide();
			}
			
			forums.widgets.addBtn.show();
			
			forums.widgets.closeThreadBtn.show();
			forums.widgets.unCloseThreadBtn.hide();
			forums.widgets.unresolvedBtn.hide();
			forums.widgets.resolvedBtn.show();
		}
		
	}else{
		
		if(waf.sources.topics.closed === true){
			if($$('mainComp_closedImg') !== undefined){
				$$('mainComp_closedImg').show();
				$$('mainComp_resolvedImg').hide();
			}
			
			forums.widgets.addBtn.hide();
			forums.widgets.editBtn.hide();
			forums.widgets.deleteBtn.hide();
			forums.widgets.managementBtn.hide();
			
			waf.sources.posts.isMyThread({onSuccess:function(evt){
				if(evt.result === true){
					forums.widgets.editBtn.show();
				}
			}});
			
			
		}else{
			if($$('mainComp_closedImg') !== undefined){
				$$('mainComp_closedImg').hide();
			}
			
			if(sources.forums.hasAccess('write')){ // Check if the user has write access and display the add button
				forums.widgets.addBtn.show();
			}else{
				forums.widgets.addBtn.hide();
			}
			
			displayMEDButtons();
			
		}
		
		if(waf.sources.topics.resolved === true){
			if($$('mainComp_resolvedImg') !== undefined){
				$$('mainComp_resolvedImg').show();
			}
		}else{
			if($$('mainComp_resolvedImg') !== undefined){
				$$('mainComp_resolvedImg').hide();
			}
		}
		
		forums.widgets.moveThreadBtn.hide();
		forums.widgets.closeThreadBtn.hide();
		forums.widgets.resolvedBtn.hide();
		forums.widgets.unresolvedBtn.hide();
	}
};

forums.selectSpecificPost = function(postID,goToView){
	forums.vGoToView = (goToView != undefined) ? goToView : 4;
	
	ds.Post.find('ID = :1',postID,{autoExpand:'topic,topic.forum,topic.forum.category',onSuccess:function(evt){
		
		forums.categoryID = evt.entity.topic.relEntity.forum.relEntity.category.relEntity.ID.value;
		forums.forumTempID = evt.entity.topic.relEntity.forum.relEntity.ID.value;
		forums.threadTempID = evt.entity.topic.relEntity.ID.value;
		forums.postTempID = evt.entity.ID.value;
		
		forums.forumListenerID = waf.sources.forums.addListener('onCollectionChange',function(ev){
			
			if(ev.dataSource.length !== 0){
				waf.sources.forums.selectByKey(forums.forumTempID);
			}
		});
		
		forums.threadListenerID = waf.sources.topics.addListener('onCollectionChange',function(ev2){
						//debugger;
			if(ev2.dataSource.length !== 0){
				waf.sources.topics.selectByKey(forums.threadTempID);
			}
		});
		
		forums.postListenerID = waf.sources.posts.addListener('onCollectionChange',function(ev3){
			if(ev3.dataSource.length !== 0){
				waf.sources.posts.selectByKey(forums.postTempID,{onSuccess:function(e){
					forums.widgets.tabViewNav.selectTab(forums.vGoToView);
					forums.displayMenuBarItem();
					forums.displayMessage();
				}});
			}
		});
				
		waf.sources.category.selectByKey(forums.categoryID);
		
	}});
};


forums.refreshCategory = function(){
	forums.forumTempID = waf.sources.forums.ID;
	forums.threadTempID = waf.sources.topics.ID;
	forums.postTempID = waf.sources.posts.ID;
	
	forums.forumListenerID = waf.sources.forums.addListener('onCollectionChange',function(ev){
		if(ev.dataSource.length !== 0){
			waf.sources.forums.selectByKey(forums.forumTempID);
		}
	});
	
	forums.threadListenerID = waf.sources.topics.addListener('onCollectionChange',function(ev2){
		if(ev2.dataSource.length !== 0){
			waf.sources.topics.selectByKey(forums.threadTempID);
		}
	});
	
	forums.postListenerID = waf.sources.posts.addListener('onCollectionChange',function(ev3){
		if(ev3.dataSource.length !== 0){
			waf.sources.posts.selectByKey(forums.postTempID);
		}
	});
	
	waf.sources.category.serverRefresh({forceReload:true,onSuccess:function(evt){
	
	}});
	
};

forums.refreshForum = function(){
	forums.threadTempID = waf.sources.topics.ID;
	forums.postTempID = waf.sources.posts.ID;
	
	forums.threadListenerID = waf.sources.topics.addListener('onCollectionChange',function(ev){
			
		if(ev.dataSource.length !== 0){
			waf.sources.topics.selectByKey(forums.threadTempID);
		}
	});
	
	forums.postListenerID = waf.sources.posts.addListener('onCollectionChange',function(ev2){
		
		if(ev2.dataSource.length !== 0){
			waf.sources.posts.selectByKey(forums.postTempID);
		}
	});
	
	waf.sources.forums.serverRefresh({forceReload:true,onSuccess:function(evt){
		
	}});
};

forums.refreshThread = function(){
	forums.postTempID = waf.sources.posts.ID;
	
	forums.postListenerID = waf.sources.posts.addListener('onCollectionChange',function(ev){
		if(ev.dataSource.length !== 0){
			waf.sources.posts.selectByKey(forums.postTempID);
		}
	});
	
	waf.sources.topics.serverRefresh({forceReload:true,onSuccess:function(evt){
		
	}});
};

forums.closeCenterComp = function(comp){
	comp.removeComponent();
	comp.setHeight(0);
};

forums.promptUrl = function(message,placeholder){
	
	alertify.prompt(message, function (e, str) {
	    // str is the input text
	    
	    if (e) {
	    	// user clicked "ok"
	    	if(str !== '' && forums.isURL(str) && RPCUtils.testUrl(str)){
				forums.insertTag('[url]','[/url]','centerComp_messageContentTxt','url',str);
			}else{
				forums.promptUrl('Enter a valid URL.','Please give a valid URL (E.g. http://www.ajar.ch).');
			}
	    } else {
			// user clicked "cancel"
	    }
	}, placeholder);
};

/*****************
Function qui permet d'inserer un tag dans un textarea

Parametre : starTag : le tag de début. endTag : le tag de fin. textareaId : l'id du textarea dans lequelle on veut inserer le tag. tagType : pour des cas plus complexe qu'une simple insertion de tag.

Probleme : le prompt qui demande certaine infos fait bugger le rendu final.
**********/
forums.insertTag = function(startTag, endTag, textareaId, tagType,argumentValue) {
	//debugger;
	var widget = $$(textareaId);
	var field = document.getElementById(textareaId);
	var scroll = field.scrollTop;
	field.focus();
	/* === Partie 1 : on récupère la sélection === */
	if(window.ActiveXObject) {
		var textRange = document.selection.createRange();
		var currentSelection = textRange.text;
	} else {
		var startSelection = field.value.substring(0, field.selectionStart);
		var currentSelection = field.value.substring(field.selectionStart, field.selectionEnd);
		var endSelection = field.value.substring(field.selectionEnd);
	}
	/* === Partie 2 : on analyse le tagType === */
	if(tagType) {
		switch(tagType) {
			case "image":
			break;
			case "email":
				/*if(!currentSelection) {
					currentSelection = url;
				}*/ //TO DO
			break;
			case "url":
				if(currentSelection) {
					startTag = '[url=' + argumentValue + ']';
				} else {
					currentSelection = argumentValue;
				}
			break;
			case "color":
				startTag = '[color=' + argumentValue + ']';
				
			break;
		}
	}
	/* === Partie 3 : on insère le tout === */
	if(window.ActiveXObject) {
		textRange.text = startTag + currentSelection + endTag;
		textRange.moveStart("character", -endTag.length - currentSelection.length);
		textRange.moveEnd("character", -endTag.length);
		textRange.select();
	} else {
		widget.setValue(startSelection + startTag + currentSelection + endTag + endSelection);
		//field.value = startSelection + startTag + currentSelection + endTag + endSelection;
		field.focus();
		field.setSelectionRange(startSelection.length + startTag.length, startSelection.length + startTag.length + currentSelection.length);
	}
	field.scrollTop = scroll;
};

forums.isURL = function(url){
	var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
	return regexp.test(url);
};


forums.check_password_safety=function(pwd,feedback,safetypwd){

	var msg = "";
	var points = pwd.length;
	var password_info = document.getElementById(feedback);

	var has_letter		= new RegExp("[a-z]");
	var has_caps		= new RegExp("[A-Z]");
	var has_numbers		= new RegExp("[0-9]");
	var has_symbols		= new RegExp("\\W");

	if(has_letter.test(pwd)) 	{ points += 4; }
	if(has_caps.test(pwd)) 		{ points += 4; }
	if(has_numbers.test(pwd)) 	{ points += 4; }
	if(has_symbols.test(pwd)) 	{ points += 4; }


	if( points >= 24 ) {
		msg = '<span style="color: #0f0;">Your password is strong!</span>';
		$$(safetypwd).setValue('/images/002_35.png');
		$$(safetypwd).show();
	} else if( points >= 16 ) {
		msg = '<span style="color: #81BEF7;">Your password is medium!</span>';
		$$(safetypwd).setValue('/images/002_36.png');
		$$(safetypwd).show();
	} else if( points >= 12 ) {
		msg = '<span style="color: #fa0;">Your password is weak!</span>';
		$$(safetypwd).setValue('/images/002_37.png');
		$$(safetypwd).show();
	} else {
		msg = '<span style="color: red;">Your password is very weak!</span>';
		$$(safetypwd).setValue('/images/002_38.png');
		$$(safetypwd).show();
	}

	password_info.innerHTML = msg ;
};

forums.check_password_entropy = function(password) {
	var alphabet = 0, lower = false, upper = false, numbers = false, symbols1 = false, symbols2 = false, other = '', c ;
	
	for(var i = 0; i < password.length; i++) {
		c = password[i];
		if(!lower && 'abcdefghijklmnopqrstuvwxyz'.indexOf(c) >= 0) {
			alphabet += 26;
			lower = true;
		}
		else if(!upper && 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(c) >= 0) {
			alphabet += 26;
			upper = true;
		}
		else if(!numbers && '0123456789'.indexOf(c) >= 0) {
			alphabet += 10;
			numbers = true;
		}
		else if(!symbols1 && '!@#$%^&*()'.indexOf(c) >= 0) {
			alphabet += 10;
			symbols1 = true;
		}
		else if(!symbols2 && '~`-_=+[]{}\|;:",.<>?'+"'".indexOf(c) >= 0) {
			alphabet += 22;
			symbols2 = true;
		}
		else if(other.indexOf(c) === -1) {
			alphabet += 1;
			other += c;
		}
	}

	if(password.length === 0) return 0;
	var entropy = password.length * Math.log(alphabet) / Math.log(2);
	return (Math.round(entropy * 100) / 100) + ' bits';

};

forums.check_same_password=function(pwd1,pwd2,feedback,bvalid,safetypwd,samepwd){
	if ( pwd1 == pwd2 ){
		$$(bvalid).enable();
		$$(feedback).setValue('<span style="color: #0f0;">Password confirmation is OK !</span>');
		$$(samepwd).setValue('/images/002_29.png');
		$$(samepwd).show();
	}
	else{
		$$(bvalid).disable();
		$$(samepwd).setValue('/images/002_30.png');
		$$(feedback).setValue('<span style="color: #f00;">Password Confirmation field is the not the same !</span>');
	}

};

forums.capitalize=function(str){
       return str.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
      };
      
 /* 
  * To Title Case 2.1 – http://individed.com/code/to-title-case/
  * Copyright © 2008–2013 David Gouch. Licensed under the MIT License.
 */

//forums.toTitleCase = function(str){
//  var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs|et|ou|si|pour|un|le|la|me?\.?|via)$/i;
//  return str.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title){
//    if (index > 0 && index + match.length !== title.length &&
//      match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
//      (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
//      title.charAt(index - 1).search(/[^\s-]/) < 0) {
//      return match.toLowerCase();
//    }

//    if (match.substr(1).search(/[A-Z]|\../) > -1) {
//      return match;
//    }

//    return match.charAt(0).toUpperCase() + match.substr(1);
//  });
//};

forums.toTitleCase = function(str){
  	var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;
//debugger;
	var TitleCase = this.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title){
    if (index > 0 && index + match.length !== title.length &&
      match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
      (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
      title.charAt(index - 1).search(/[^\s-]/) < 0) {
      return match.toLowerCase();
    }

    if (match.substr(1).search(/[A-Z]|\../) > -1) {
      return match;
    }

    return match.charAt(0).toUpperCase() + match.substr(1);
  });
$$(str).setValue(TitleCase);
};

