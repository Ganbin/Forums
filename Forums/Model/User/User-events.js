model.User.events.restrict = function () {
	"use strict";

    var session = currentSession(),
    coll = ds.User.createEntityCollection();//default to an empty collection
 
	coll = ds.User.all();
 
    return coll;
	
};


model.User.password.onGet = function () {
	return "*****"; //could also return Null.
};


model.User.password.onSet = function (value) {
	this.ha1key = directory.computeHA1(this.ID, value+this.ID);
};




model.User.fullName.onGet = function() {
	return this.firstName+' '+this.lastName;
};


model.User.events.init = function() {
	this.avatar = getFolder('url')+"Forums/DataFolder/tmp/defaultUserAvatar.png";
};


model.User.events.remove = function() {
	if(this.allForums.length !== 0 || this.allGroups.length !== 0 || this.topics.length !== 0 || this.posts.length !== 0 || this.allAccesses.length !== 0 || this.allInscription.length !== 0){
		return {error:9, errorMessage:"You cannot remove this user, he is using the forum. Please be sure no data is linked to him."}
	}
};