model.User.entityMethods.validatePassword = function (password) {	var ha1 = directory.computeHA1(this.ID,password+this.ID);	var validated = (ha1 === this.ha1key);		return validated;};model.User.methods.addNewUser = function(user) {	var namespace = require('namespace');	var newUser = null;	var returnValue = null;		if ((user.firstName != '') && (user.lastName != '') && (namespace.validateEmail(user.email)) && (user.password != '')){	 	 	try{		 	newUser = ds.User.createEntity();		 	newUser.firstName = user.firstName;		 	newUser.lastName = user.lastName;		 	newUser.email = user.email.toLowerCase();		 	newUser.password = user.password;		 	newUser.login = user.email.toLowerCase();		 	newUser.statut = (namespace.getValidationByEmail() === true) ? 'emailSentForValidation' : 'validated';		 			 	if(namespace.getValidationByEmail() === true){			 	newUser.validationId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {					var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);					return v.toString(16);				});				var subject = '[CONFIRMATION]Registration to the forum '+namespace.getForumTitle();				var messageContent = '<html><B><I>Hello'+newUser.fullName+'</I></B><br>';				messageContent += 'Thanks for your subscription.'+'<br>';				messageContent += 'Please click on this link to validate your request :'+'<br>';				messageContent += '<a href="http://127.0.0.1:8081/confirmation?'+newUser.validationId+'">';				messageContent += 'http://127.0.0.1:8081/confirmation?'+newUser.validationId+'</a><br>'+'<br>';				messageContent += 'This way we are sure that your email was not used by someone else !'+'<br>';				messageContent += 'Please ignore this message if it is an error or if you have not request to subscribe to the forum XXXX';							messageContent += '</HTML>';				namespace.sendMail(newUser.email,subject,'text/html',messageContent);								newUser.save();								returnValue = 'validationByEmailTrue';			}else{								newUser.save();								var newUserGroup = ds.UserGroup.createEntity();		    			    newUserGroup.user = newUser;			    newUserGroup.group = ds.Group(namespace.getMemberGroupID());			    newUserGroup.save();								newUser.validationId = 'none';				returnValue = 'validationByEmailFalse';			}					 	return returnValue;			 		 	}	 	catch(e){			for(var i=0; i<e.messages.length; i++) {				if (e.messages[i] == 'Duplicated key') return 'This account already exists';			}			//ds.rollBack();	 		return e;	 	}	 		}else	{		if (!namespace.validateEmail(user.email)){			return 'email invalid';		}else{			return false;		}		}	};model.User.methods.addNewUser.scope = 'public';model.User.methods.getCurrentUserID = function() {	var curSess = currentSession();		if(typeof curSess.storage.userID != 'undefined'){		return curSess.storage.userID	}else{		return	null;	}	};model.User.methods.getCurrentUserID.scope = 'public';model.User.entityMethods.addAvatar = function(img) {	var curSess = currentSession();		if(this.ID != curSess.storage.userID){		return {error:5,errorMessage:'You can add an avatar only to your account.'}		}else if(this.ID == curSess.storage.userID){		var promoteToken = curSess.promoteWith('Administrateur');				this.avatar = img;				this.save();				curSess.unPromote(promoteToken);				return true;	}};model.User.entityMethods.addAvatar.scope = 'public';model.User.entityMethods.updateUserInfos = function(firstName,lastName,email,login) {	var curSess = currentSession();		if(this.ID != curSess.storage.userID){		return {error:6,errorMessage:'You can\'t update another account than yours.'};	}else if(this.ID == curSess.storage.userID){		var promoteToken = curSess.promoteWith('Administrateur');				this.firstName = firstName;		this.lastName = lastName;		this.email = email;		this.login = login;				try{			this.save();		}catch(e){				return e.messages[0];		}				curSess.unPromote(promoteToken);				return true;	}};model.User.entityMethods.updateUserInfos.scope = 'public';model.User.entityMethods.changePassword = function(oldPassword,newPassword) {	if(this.validatePassword(oldPassword)){				var promoteToken = currentSession().promoteWith('Administrateur');				this.password = newPassword;		try{			this.save();		}catch(e){			currentSession().unPromote(promoteToken);			return e;		}		currentSession().unPromote(promoteToken);		return true;	}else{		return {error:7,errorMessage:"The password is incorrect."};		}};model.User.entityMethods.changePassword.scope = 'public';