model.Inscription.methods.subscribeToForum = function(forumID) {	try{		var curSess = currentSession();		var promoteToken = curSess.promoteWith('CUD_Inscription');				var newInscription = ds.Inscription.createEntity();				newInscription.user = ds.User(curSess.storage.userID);		newInscription.forum = ds.Forum(forumID);		newInscription.accepted = false;				try{			newInscription.save();			curSess.unPromote(promoteToken);			return true;		}catch(e){			curSess.unPromote(promoteToken);			return false;		}	}catch(e){				}		};model.Inscription.methods.subscribeToForum.scope = 'public';