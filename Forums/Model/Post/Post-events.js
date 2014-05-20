model.Post.events.restrict = function() {	var namespace = require('namespace');		var returnCol = ds.Post.createEntityCollection();	var curSess = currentSession();	var allPublicAccesses;	var allUserAccesses;	var allModeratorAccesses;	var promoteToken;	var accessIDArray = [];	var accessIDArray2 = [];	var postResult;		if(curSess.belongsTo('Administrateur')){		returnCol = ds.Post.all();	}else if(curSess.user.fullName === 'default guest'){ // Si la personne n'est pas logguer				promoteToken = curSess.promoteWith('Read_Access');				allPublicAccesses = ds.Access.query('group.ID == :1',namespace.getPublicGroupID());				accessIDArray = allPublicAccesses.ID;				postResult = ds.Post.query('topic.forum.allAccesses.ID in :1 and enable == true',accessIDArray);		//			postResult = allPublicAccesses.forum.topics.posts.query('enable == true');				returnCol.add(postResult);				curSess.unPromote(promoteToken);					}else{				promoteToken = curSess.promoteWith('Read_Access');				allUserAccesses = ds.Access.query('user.ID = :1 or group.allUsers.ID == :1 or group{2}.ID == :2',curSess.storage.userID,namespace.getPublicGroupID());				if(allUserAccesses.length !== 0){						allModeratorAccesses = allUserAccesses.query('statut == "Moderator"');						if(allModeratorAccesses.length !== 0){								accessIDArray = allModeratorAccesses.ID;				accessIDArray2 = allUserAccesses.ID;								postResult = ds.Post.query('(topic.forum.allAccesses.ID in :1) or (topic.forum.allAccesses.ID in :2 and enable == true)',accessIDArray,accessIDArray2);								returnCol.add(postResult);				//				postResult = allModeratorAccesses.forum.topics.posts;//					//				returnCol.add(postResult.or(allUserAccesses.forum.topics.posts.query('enable == true')));											}else{								accessIDArray = allUserAccesses.ID;								postResult = ds.Post.query('topic.forum.ID in :1 and enable == true',accessIDArray);				//				postResult = allUserAccesses.forum.topics.posts.query('enable == true');								returnCol.add(postResult);							}		}		curSess.unPromote(promoteToken);	}		return returnCol;};model.Post.events.save = function() {	if((this.title == '' || this.title == null) && (this.content == '' || this.content == null)){		return {error : 74, errorMessage:'Must have a title and a content'};	}		if(this.topic == null){		return {error : 75, errorMessage:'Must have a topic'};	}		if(this.user == null){		if(currentSession().storage.userID){			this.user = ds.User(currentSession().storage.userID);		}else{			return {error : 76, errorMessage:'You must be logged with a valid user.'};		}	}		if(this.topic.closed === true){		if(this.isMyThread() !== true || this.isNew()){			return {error : 77, errorMessage:'You cannot update or create a post from a close thread.'};		}	}	};model.Post.events.init = function() {	this.enable = true;	this.stamp = new Date();};model.Post.userStatut.onGet = function() {		var curSess = currentSession();		try{		var promoteToken = curSess.promoteWith('Read_Access');		var allAccesses = this.topic.forum.getUserAccess(this.user.ID);		curSess.unPromote(promoteToken);				return allAccesses.statut;	}catch(e){				}	};// This attribute is only usable if a user is logged via a user dataClass accountmodel.Post.isViewed.onGet = function() {	var curSess = currentSession();	var namespace = require('namespace');		if(((new Date() - this.stamp)/1000/60/60/24).toFixed() > namespace.getPostViewTimeout()){		return true;	}		if(curSess.user.fullName === 'default guest' || curSess.user.name === 'dataAdmin'){		return true;	}else{		var viewPost = ds.ViewPost.find('user.ID == :1 and post.ID == :2',curSess.storage.userID,this.ID);				if(viewPost !== null){			return true;		}else{			return false;		}	}};model.Post.currentUserVote.onGet = function() {	var curSess = currentSession();		if(curSess.user.fullName === 'default guest' || curSess.user.name === 'dataAdmin' || curSess.user.name === 'admin'){		return 0;	}else{		var viewPost = ds.ViewPost.find('user.ID == :1 and post.ID == :2',curSess.storage.userID,this.ID);				if(viewPost !== null){			return (viewPost.vote === -1) ? 0 : viewPost.vote;		}else{			return 0;		}	}};model.Post.voteAverage.onGet = function() {	var viewPosts = ds.ViewPost.query('post.ID == :1 and vote # :2',this.ID,-1);		if(viewPosts.length !== 0){		return viewPosts.average('vote');	}else{		return 0;	}};