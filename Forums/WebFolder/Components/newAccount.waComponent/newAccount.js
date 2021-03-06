﻿
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	
	this.displayFeedbackMessage = function displayFeedbackMessage(display,type,message){
		// display : 1 : display the feedback zone
		// display : 0 : hide the feedback zone
		// type : nok : define the background color of the feedback zone and the font color of the message  if there is an error
		// type :  ok : define the background color of the feedback zone and the font color of the message  if there is no error
		
		// get the height of the form container
		var contFeedbackHeight = $$(getHtmlId('feedback')).getHeight();
		var formFieldsHeight = $$(getHtmlId('formFields')).getHeight();
		var toReduce = ($$(getHtmlId('feedback')).isVisible() === true) ? (formFieldsHeight) : (formFieldsHeight-contFeedbackHeight) ;
	
		if(display === 1){
			if(!($$(getHtmlId('feedback')).isVisible())&& (type === 'nok')){
				$('#'+getHtmlId('newAccountform')).delay(0).animate({
					height: '+='+ contFeedbackHeight
				});
				$('#'+getHtmlId('form')).delay(0).animate({
					height: '+='+ contFeedbackHeight
				});
				$('#'+$comp.id).delay(0).animate({
					height: '+='+ contFeedbackHeight
				});
				$('#'+getHtmlId('formFields')).delay(0).animate({
					top: '+='+ contFeedbackHeight
				});
			}
			if(type === 'nok'){
				$$(getHtmlId('feedbackMessage')).setTextColor('#ffffff');
				$$(getHtmlId('feedback')).setBackgroundColor('#282828');
				
			}else{
				$$(getHtmlId('feedbackMessage')).setTextColor('#ffffff');
				$$(getHtmlId('feedback')).setBackgroundColor('#282828');
				// hide all the fields
				$$(getHtmlId('formFields')).hide();
				$('#'+getHtmlId('newAccountform')).delay(0).animate({
					height: '-='+toReduce
				});
				$('#'+$comp.id).delay(0).animate({
					height: '-='+toReduce
				});
			}
			$('#'+getHtmlId('feedback')).slideDown();
			$$(getHtmlId('feedbackMessage')).show();
			$$(getHtmlId('feedbackMessage')).setValue(message);
		}else{
			if($$(getHtmlId('feedback')).isVisible()){
				$('#'+getHtmlId('newAccountform')).delay(0).animate({
					height: '-='+contFeedbackHeight
				});
				$('#'+$comp.id).delay(0).animate({
					height: '-='+contFeedbackHeight
				});
				$('#'+getHtmlId('formFields')).delay(0).animate({
					top: '-=' + contFeedbackHeight
				});
				$('#'+getHtmlId('feedback')).slideUp();
				$$(getHtmlId('feedbackMessage')).hide();
			}
					
		}
	};


	this.doSomething = function(value){
		return 'Hello '+value;
	};
	
	this.toCapitalize = function toCapitalize(str) {
    	return (str.toLowerCase() + '').replace( /(^|\\s)(\\w)/g, function (m,p1,p2) {
     	  return p1+p2.toUpperCase();        
 	   });
	};
	
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'newAccount';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var bvalid = {};	// @button
	var icon1 = {};	// @icon
	var lastName = {};	// @textField
	var firstName = {};	// @textField
	var pwdConfirm = {};	// @textField
	var password = {};	// @textField
	// @endregion// @endlock

	// disable the validate button by default
	$$(this.id+'_bvalid').disable();

	// Permet de centrer le contenu du component (qui est variable d'apres ce que l'on veut charger)
	$comp.setWidth(getHtmlObj('form').css('width'));
	$comp.setHeight(getHtmlObj('form').css('height'));
	
	// eventHandlers// @lock

	bvalid.click = function bvalid_click (event)// @startlock
	{// @endlock
		$$(getHtmlId('feedbackMessage')).setValue('');
		
		var user = {};
		user.firstName = $$(getHtmlId('firstName')).getValue();
		user.lastName = $$(getHtmlId('lastName')).getValue();
		user.email = $$(getHtmlId('email')).getValue();
		user.password = $$(getHtmlId('password')).getValue();
		
		ds.User.addNewUser(user, {onSuccess: function(event){
			switch(event.result){
				case 'email invalid':
				$comp.displayFeedbackMessage(1,'nok','this email is invalid');
				break;
				case 'This account already exists':
				$comp.displayFeedbackMessage(1,'nok',event.result);
				break;
				case 'emailSendError':
				$comp.displayFeedbackMessage(1,'nok','An error occured during the process to send you a confirmation email !');
				break;
				case 'validationByEmailTrue':
				$comp.displayFeedbackMessage(1,'ok','Your request is pending. You will received a confirmation email in the next few minutes !');
				break;
				case 'validationByEmailFalse':
				$comp.displayFeedbackMessage(1,'ok','Your account is now create. You can start to use the forum as a member. Use your email for login.');
				break;
				case 'easy':
					alert('Please let the process go on, don\'t click like a fool...');
				default: $comp.displayFeedbackMessage(1,'nok','An error occured during the registration process. Please retry');
			}
		}});
	};// @lock

	icon1.click = function icon1_click (event)// @startlock
	{// @endlock
		forums.closeCenterComp($comp);
	};// @lock

	lastName.blur = function lastName_blur (event)// @startlock
	{// @endlock
		var name = (this.ref.value).toUpperCase();
		$$(getHtmlId('lastName')).setValue(name);
	};// @lock

	firstName.blur = function firstName_blur (event)// @startlock
	{// @endlock

		var wordCap = $comp.toCapitalize(this.ref.value);
		$$(getHtmlId('firstName')).setValue(wordCap);

	};// @lock

	pwdConfirm.keyup = function pwdConfirm_keyup (event)// @startlock
	{// @endlock

		
		//debugger;
		if ($$(getHtmlId('pwdConfirm')).getValue().length > 0){
			forums.check_same_password($$(getHtmlId('password')).getValue(), 
			this.ref.value, 
			getHtmlId('samePwdID'), // is the same as $comp.id+'_samePwdID'
			$comp.id+'_bvalid',
			$comp.id+'_imgSafetyPwd',
			$comp.id+'_imgSamePwd');
			$$($comp.id+'_imgSamePwd').show();
			$$($comp.id+'_samePwdID').show();
		}else{
			$$($comp.id+'_imgSamePwd').hide();
			$$($comp.id+'_samePwdID').hide();
		}
	};// @lock

	password.keydown = function password_keydown (event)// @startlock
	{// @endlock

	};// @lock

	password.keyup = function password_keyup (event)// @startlock
	{// @endlock
		
		//debugger;
		entropy = forums.check_password_entropy($$(getHtmlId('password')).getValue());
		$$(getHtmlId('entropyId')).setValue(entropy);
		
		//debugger;
		//$$($comp.id+'_pwdConfirm').setValue('');
		//$$($comp.id+'_pwdConfirm').clear();
		$$($comp.id+'_imgSamePwd').hide();
		
		// Is the password Safe ?
		if ($$($comp.id+'_password').getValue().length > 0){
			forums.check_password_safety(this.ref.value,
			$comp.id+'_pwdID',
			$comp.id+'_imgSafetyPwd');
			$$($comp.id+'_pwdID').show();
		}else{
			$$($comp.id+'_imgSafetyPwd').hide();
			$$($comp.id+'_pwdID').hide();
		}

		// Is the pwds the same ?
		if ($$($comp.id+'_pwdConfirm').getValue().length > 0){
			//debugger;
			forums.check_same_password($$($comp.id+'_pwdConfirm').getValue(), 
			this.ref.value, 
			$comp.id+'_samePwdID', 
			$comp.id+'_bvalid',
			$comp.id+'_imgSafetyPwd',
			$comp.id+'_imgSamePwd');
		}else{
			$$($comp.id+'_imgSamePwd').hide();
		}
		
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_bvalid", "click", bvalid.click, "WAF");
	WAF.addListener(this.id + "_icon1", "click", icon1.click, "WAF");
	WAF.addListener(this.id + "_lastName", "blur", lastName.blur, "WAF");
	WAF.addListener(this.id + "_firstName", "blur", firstName.blur, "WAF");
	WAF.addListener(this.id + "_password", "keydown", password.keydown, "WAF");
	WAF.addListener(this.id + "_pwdConfirm", "keyup", pwdConfirm.keyup, "WAF");
	WAF.addListener(this.id + "_password", "keyup", password.keyup, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
