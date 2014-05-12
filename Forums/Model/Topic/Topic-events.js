model.Topic.events.remove = function() {	var posts = ds.Post.query('topic.ID = :1',this.ID);			if(posts.length !== 0){		return {error : 61, errorMessage:'You cannot remove this topic because it contain post(s).'};	}};model.Topic.events.restrict = function() {		var namespace = require('namespace');		var returnCol = ds.Topic.createEntityCollection();	var curSess = currentSession();	var allPublicAccesses;	var allUserAccesses;	var promoteToken;	var accessIDArray = [];	var accessIDArray2 = [];	var topicResult;			if(curSess.belongsTo('Administrateur')){		returnCol = ds.Topic.all();	}else if(curSess.user.fullName === 'default guest'){ // Si la personne n'est pas logguer						promoteToken = curSess.promoteWith('Read_Access');				allPublicAccesses = ds.Access.query('group.ID == :1',namespace.getPublicGroupID());		accessIDArray = allPublicAccesses.ID;			topicResult = ds.Topic.query('forum.allAccesses.ID in :1 and posts.enable == true',accessIDArray);//		topicResult = allPublicAccesses.forum.topics.query('posts.enable == true');			returnCol.add(topicResult);				curSess.unPromote(promoteToken);	}else{		promoteToken = curSess.promoteWith('Read_Access');				allUserAccesses = ds.Access.query('user.ID == :1 or group.allUsers.ID == :1 or group{2}.ID == :2',curSess.storage.userID,namespace.getPublicGroupID());				if(allUserAccesses.length !== 0){						allModeratorAccesses = allUserAccesses.query('statut == "Moderator"');						if(allModeratorAccesses.length !== 0){								accessIDArray = allModeratorAccesses.ID;				accessIDArray2 = allUserAccesses.ID;								topicResult = ds.Topic.query('(forum.allAccesses.ID in :1) or (forum.allAccesses.ID in :2 and posts.enable == true)',accessIDArray,accessIDArray2);				returnCol.add(topicResult);//				topicResult = allModeratorAccesses.forum.topics;//					//				returnCol.add(topicResult.or(allUserAccesses.forum.topics.query('posts.enable == true')));			}else{								forumIDArray = allUserAccesses.ID;								topicResult = ds.Topic.query('forum.ID in :1 and posts.enable == true',forumIDArray);				//				topicResult = allUserAccesses.forum.topics.query('posts.enable == true');								returnCol.add(topicResult);							}		}				curSess.unPromote(promoteToken);	}		return returnCol;};model.Topic.events.save = function() {		if(this.closed === true){		this.resolved = false;	}		if(this.title == '' || this.title == null){		return {error : 62, errorMessage:'Must have a title'};	}		if(this.forum == null){		return {error : 63, errorMessage:'Must have a forum'};	}};model.Topic.events.init = function() {	this.stamp = new Date();};