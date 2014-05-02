model.Inscription.events.init = function() {	this.stamp = new Date();};model.Inscription.events.restrict = function() {	var returnCol = ds.Inscription.createEntityCollection();	var curSess = currentSession();	var allUserSubscription;	var allModeratorSubscription;	var allUserAccesses;	var promoteToken;		if(curSess.belongsTo('Administrateur')){		returnCol = ds.Inscription.all();	}else if(curSess.user.fullName === 'default guest'){ // Si la personne n'est pas logguer			}else{				try{			promoteToken = curSess.promoteWith('Read_Access');						allUserAccesses = ds.Access.query('user.ID == :1 or group.allUsers.ID == :1 and statut == "Moderator"',curSess.storage.userID);						if(allUserAccesses.length > 0){								var arrayForumIDTemp = allUserAccesses.forum.toArray('ID');				var arrayForumID =[];				for(var i = 0;i<arrayForumIDTemp.length;i++){					arrayForumID.push(arrayForumIDTemp[i].ID);				}								allModeratorSubscription = ds.Inscription.query('forum.ID in :1',arrayForumID);							returnCol.add(allModeratorSubscription);			}						allUserSubscription = ds.Inscription.query('user.ID == :1',curSess.storage.userID);					returnCol.add(allUserSubscription);			curSess.unPromote(promoteToken);		}catch(e){					}			}	return returnCol;};model.Inscription.events.save = function() {	var findSubscription = ds.Inscription.query('user.ID == :1 and forum.ID == :2',this.user.ID,this.forum.ID);		if(findSubscription.length < 0){		return {error:35,errorMessage:'This user is already subscribed to this forum.'};	}};