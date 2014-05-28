﻿// This methods accept a subscription and create an access for the usermodel.OpenInscription.entityMethods.acceptInscription = function() {	var curSess = currentSession();	var allUserAccesses;	var promoteToken;	var namespace = require('namespace');		if(curSess.belongsTo('Administrateur')){ // If the user is a admin				try{						if(namespace.getValidationByEmail() === true){ // Send a mail if the admin have choose the validation by email				var subject = 'Subscription to the forum '+this.forum.title;				var messageContent = '<html><h3>Hello '+this.user.fullName+'</h3><br>';				messageContent += 'Thanks for your subscription to the <b>'+this.forum.title+'</b> forum.'+'<br>';				messageContent += 'Your subsciption request is validated by a moderator. You can now use this forum.';				messageContent += '</HTML>';				namespace.sendMail(this.user.email,subject,'text/html',messageContent);			}						this.accepted = true;					ds.Access.createOrModifyAGroupOrUserAccess(true,false,this.forum.ID,this.user.ID,{'read':true,'write':true,'del':true,'modify':true,'vote':true},false,'Member');						this.save();					}catch(e){			return {error:e.sourceId,errorMessage:e.message};		}				return true;			}else if(curSess.user.fullName === 'default guest'){ // Si la personne n'est pas logguer		return false;	}else{ // If the user is a moderator				try{			promoteToken = curSess.promoteWith('CUD_Inscription');						allUserAccesses = ds.Access.query('(user.ID == :1 or group.allUsers.ID == :1) and statut == "Moderator" and forum.ID == :2',curSess.storage.userID,this.forum.ID);						if(allUserAccesses.length > 0){							try{					if(namespace.getValidationByEmail() === true){// Send a mail if the admin have choose the validation by email						var subject = 'Subscription to the forum '+this.forum.title;						var messageContent = '<html><h3>Hello '+this.user.fullName+'</h3><br>';						messageContent += 'Thanks for your subscription to the <b>'+this.forum.title+'</b> forum.'+'<br>';						messageContent += 'Your subsciption request is validated by a moderator. You can now use this forum.';						messageContent += '</HTML>';						var mailReturn = namespace.sendMail(this.user.email,subject,'text/html',messageContent);					}										this.accepted = true;									var newAccess = ds.Access.createOrModifyAGroupOrUserAccess(true,false,this.forum.ID,this.user.ID,{'read':true,'write':true,'del':true,'modify':true,'vote':true},false,'Member');										this.save();									}catch(e){					curSess.unPromote(promoteToken);					return {error:e.sourceId,errorMessage:e.message};				}								curSess.unPromote(promoteToken);				return true;			}else{				curSess.unPromote(promoteToken);				return false;			}		}catch(e){					}	}};model.OpenInscription.entityMethods.acceptInscription.scope = 'public';model.OpenInscription.entityMethods.refuseInscription = function() {	var curSess = currentSession();	var allUserAccesses;	var promoteToken;	var namespace = require('namespace');		if(curSess.belongsTo('Administrateur')){ // If the user is a admin				try{						if(namespace.getValidationByEmail() === true){ // Send a mail if the admin have choose the validation by email				var subject = 'Subscription to the forum '+this.forum.title;				var messageContent = '<html><h3>Hello '+this.user.fullName+'</h3><br>';				messageContent += 'Thanks for your subscription to the <b>'+this.forum.title+'</b> forum.'+'<br>';				messageContent += 'Unfortunately, the moderator have refuses your subscription. You can still ask in the future.';				messageContent += '</HTML>';				namespace.sendMail(this.user.email,subject,'text/html',messageContent);			}			var accessToDelete = ds.Access.query('forum.ID == :1 and user.ID == :2',this.forum.ID,this.user.ID);			accessToDelete.remove();						this.remove();					}catch(e){			return {error:e.sourceId,errorMessage:e.message};		}				return true;			}else if(curSess.user.fullName === 'default guest'){ // Si la personne n'est pas logguer		return false;	}else{ // If the user is a moderator				try{			promoteToken = curSess.promoteWith('CUD_Inscription');						allUserAccesses = ds.Access.query('(user.ID == :1 or group.allUsers.ID == :1) and statut == "Moderator" and forum.ID == :2',curSess.storage.userID,this.forum.ID);						if(allUserAccesses.length > 0){							try{										if(namespace.getValidationByEmail() === true){ // Send a mail if the admin have choose the validation by email						var subject = 'Subscription to the forum '+this.forum.title;						var messageContent = '<html><h3>Hello '+this.user.fullName+'</h3><br />';						messageContent += 'Thanks for your subscription to the <b>'+this.forum.title+'</b> forum.'+'<br />';						messageContent += 'Unfortunately, the moderator have refuses your subscription. You can still ask in the future.';						messageContent += '</HTML>';												namespace.sendMail(this.user.email,subject,'text/html',messageContent);					}										var accessToDelete = ds.Access.query('forum.ID == :1 and user.ID == :2',this.forum.ID,this.user.ID);					accessToDelete.remove();										this.remove();									}catch(e){					curSess.unPromote(promoteToken);					return {error:e.sourceId,errorMessage:e.message};				}								curSess.unPromote(promoteToken);				return true;			}else{				curSess.unPromote(promoteToken);				return false;			}		}catch(e){					}	}};model.OpenInscription.entityMethods.refuseInscription.scope = 'public';