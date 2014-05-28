/*********************Method who get the access of a forum for a specific user.Only the Administrateur can execute this method.Arguments :	userID			Return : 	{'statut':'member', 'restricted':false,'actions': {'read':true, 'write':true, 'del':false, 'modify':false, 'vote':true}}*********************/model.Forum.entityMethods.getUserAccess = function(userID) {	var accesses,		returnObj = {statut:'',restricted:false,actions:{read:false,write:false,del:false,modify:false,vote:false}},		actions = {},		userGroups,		isAdmin,		namespace;			namespace = require('namespace');		userGroups = ds.User.find('ID == :1',userID).allGroups;	isAdmin = userGroups.query('ID = :1',namespace.getDataAdminGroupID());	if(isAdmin.length !== 0){ // If the user is a dataAdmin		returnObj.actions.read = true;		returnObj.actions.write = true;		returnObj.actions.del = true;		returnObj.actions.modify = true;		returnObj.actions.vote = true;		returnObj.statut = 'Administrator';		returnObj.restricted = false;				return returnObj;	}else{		// query if there is some restricted access			accesses = ds.Access.query('forum.ID == :1 and (group.ID == :3 or user.ID == :2 or group.allUsers.ID == :2) and restricted == true',this.ID,userID,namespace.getPublicGroupID());		if(accesses.length !== 0){ // at least one restricted						actions = accesses.action.compute('read,write,del,modify,vote');			returnObj.actions.read = actions.read.min;			returnObj.actions.write = actions.write.min;			returnObj.actions.del = actions.del.min;			returnObj.actions.modify = actions.modify.min;			returnObj.actions.vote = actions.vote.min;			returnObj.statut = 'Member';			returnObj.restricted = true;		}else{ // no restricted						accesses = ds.Access.query('forum.ID = :1 and (group.ID == :3 or user.ID == :2 or group.allUsers.ID == :2)',this.ID,userID,namespace.getPublicGroupID());						if(accesses.length !== 0){ // at least one access				actions = accesses.action.compute('read,write,del,modify,vote');				returnObj.actions.read = actions.read.max;				returnObj.actions.write = actions.write.max;				returnObj.actions.del = actions.del.max;				returnObj.actions.modify = actions.modify.max;				returnObj.actions.vote = actions.vote.max;				returnObj.statut = accesses.compute('statut').statut.max;				returnObj.restricted = false;			}else{				return false;			}					}				return returnObj;	}	};model.Forum.entityMethods.getUserAccess.scope = 'public';/// Method who check if the user has a specific acces on this forum/// accessType : read,write,modify,del,vote/// Return true or falsemodel.Forum.entityMethods.hasAccess = function(accessType) {		var allAccesses;	var writeAction;	var userAccess;	var curSess = currentSession();	var promoteToken;		namespace = require('namespace');		if(!(accessType === 'read' || accessType === 'write' || accessType === 'modify' || accessType === 'del' || accessType === 'vote')){		return {error : 44, errorMessage : 'This access is not existing...'}	}else{		if(curSess.belongsTo('Administrateur')){			return true;		}else if(curSess.user.fullName === 'default guest'){ // Si la personne n'est pas logguer					try{				// Verify if a unlogged user have the read access to a forum				if(accessType === 'read'){										promoteToken = curSess.promoteWith('Read_Access'); // We promote the currentSession to the administrator group to look inside the accesses					var publicAccess = ds.Access.find('group.ID == :1 and forum.ID == :2 and action.read == true',namespace.getPublicGroupID(),this.ID); // Search in access dataclass if there is an access for the public group for this forum with the read access to true										if(publicAccess !== null){ // If we find an access, we return true						curSess.unPromote(promoteToken); // Don't forget to unpromote the session						return true;					}else{// Else we return false						curSess.unPromote(promoteToken); // Don't forget to unpromote the session						return false;					}				}else{					return false;				}			}catch(e){				return false;			}		}else{ // if the user is logged						try{				promoteToken = curSess.promoteWith('Read_Access');				userAccess = this.getUserAccess(curSess.storage.userID); // get all the accesses of the user				curSess.unPromote(promoteToken);								if(userAccess !== false && userAccess.actions[accessType] === true){					return true;				}else{					return false;				}			}catch(e){				return false;			}		}	}	};model.Forum.entityMethods.hasAccess.scope = 'public';model.Forum.entityMethods.isModerator = function() {		var allAccesses;	var userAccess;	var curSess = currentSession();	var promoteToken;	if(curSess.belongsTo('Administrateur')){		return true;	}else if(curSess.user.fullName !== 'default guest'){		try{			promoteToken = curSess.promoteWith('Read_Access');			userAccess = this.getUserAccess(curSess.storage.userID);			curSess.unPromote(promoteToken);						if(userAccess !== false && userAccess.statut === 'Moderator'){				return true;			}else{				return false;			}		}catch(e){			return false;		}			}else{		return false;	}	};model.Forum.entityMethods.isModerator.scope = 'public';model.Forum.entityMethods.isSubscribed = function() {		var allAccesses;	var userSubscription;	var curSess = currentSession();	var promoteToken;			if(curSess.belongsTo('Administrateur')){		return false;	}else if(curSess.user.fullName !== 'default guest'){				try{			promoteToken = curSess.promoteWith('Read_Access');			userSubscription = this.allOpenInscriptions.query('user.ID == :1',curSess.storage.userID);			curSess.unPromote(promoteToken);						if(userSubscription.length > 0){				return true;			}else{				return false;			}		}catch(e){			return false;		}			}else{		return false;	}};model.Forum.entityMethods.isSubscribed.scope = 'public';model.Forum.methods.getModeratedForums = function() {		var forumCollection = ds.Forum.createEntityCollection();	var curSess = currentSession();	var promoteToken;		if(curSess.belongsTo('Administrateur')){		return ds.Forum.all();	}else if(curSess.user.fullName !== 'default guest'){		try{					forumCollection = ds.Forum.query('$(this.isModerator() == true)',{allowJavascript:true});									}catch(e){			curSess.unPromote(promoteToken);			return forumCollection;		}			}		return forumCollection;};model.Forum.methods.getModeratedForums.scope = 'public';