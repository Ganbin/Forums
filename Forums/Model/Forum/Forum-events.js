// Validation rulesmodel.Forum.events.validate = function() {	if(this.title == '' || this.title == null ){		return {error : 40, errorMessage:'Must have a title'};	}	if(this.category === null){		return {error : 41, errorMessage:'Must have a category'};	}};// Validation rulesmodel.Forum.events.save = function() {	if(this.title == '' || this.title == null ){		return {error : 40, errorMessage:'Must have a title'};	}	if(this.category === null){		return {error : 41, errorMessage:'Must have a category'};	}};// Restricting query for the category dataclass// This query return only the data accessible to the current user// For more comment refere to the restricting query of the Category.model.Forum.events.restrict = function() {		var namespace = require('namespace');		var returnCol = ds.Forum.createEntityCollection();	var curSess = currentSession(); 	var allPublicAccesses;	var allUserAccesses;	var promoteToken;	var accessIDArray = [];	var forumResult;		if(curSess.belongsTo('Administrateur')){ 		returnCol = ds.Forum.all();	}else if(curSess.user.fullName === 'default guest'){ 				promoteToken = curSess.promoteWith('Read_Access'); 				allPublicAccesses = ds.Access.query('group.ID == :1',namespace.getPublicGroupID()); 				accessIDArray = allPublicAccesses.ID;				forumResult = ds.Forum.query('allAccesses.ID in :1 and topics.posts # null',accessIDArray); // Query the forum for all the public accesses and where no posts are null//		forumResult = allPublicAccesses.forum.query('topics.posts # null');				returnCol.add(forumResult);						curSess.unPromote(promoteToken);			}else{				promoteToken = curSess.promoteWith('Read_Access');				allUserAccesses = ds.Access.query('user.ID == :1 or group.allUsers.ID == :1 or group{2}.ID == :2',curSess.storage.userID,namespace.getPublicGroupID());				accessIDArray = allUserAccesses.ID;				forumResult = ds.Forum.query('allAccesses.ID in :1 or visible == true',accessIDArray); // Query the forum for all the user accesses and for the visible one//		forumResult = allUserAccesses.forum.query('visible == true');				returnCol.add(forumResult);				curSess.unPromote(promoteToken);			}		return returnCol;	};// Remove rules : Can't remove if there is some accesses or topics related to this forummodel.Forum.events.remove = function() {	if(this.topics.length !== 0){		return {error : 42, errorMessage:'You cannot remove this forum because it contain topic(s).'};	}else if(this.allAccesses.length !== 0){		return {error : 43, errorMessage:'You cannot remove this forum because it have access(es).'};	}};//  the currentUserUnread attribute is to retreive the number of post unread in the forummodel.Forum.currentUserUnread.onGet = function() {	var curSess = currentSession();		if(curSess.user.fullName === 'default guest' || curSess.user.name === 'dataAdmin' || curSess.user.name === 'admin'){		return 0; // return 0 if it's a public or user from the directory	}else{		return this.topics.sum('currentUserUnread');	}};