
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'userInterface';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		
		forums.widgets.centerComp.setWidth(getHtmlObj('unserInterfaceCont').css('width'));
		forums.widgets.centerComp.setHeight(getHtmlObj('unserInterfaceCont').css('height'));
		
		getHtmlObj('avatarUpload').on('mouseenter', function(event){$$(getHtmlId('clickToUploadText')).show();});
		getHtmlObj('avatarUpload').on('mouseleave', function(event){$$(getHtmlId('clickToUploadText')).hide();});
		
		$comp.sources.user.query('ID == :1',$comp.sources.user.getCurrentUserID());
		
		// disable the validate button by default
		$$(this.id+'_bvalid').disable();

	// @region namespaceDeclaration// @startlock
	var passwordChangedDialog = {};	// @ModalDialog
	var modifyPasswordText = {};	// @richText
	var pwdConfirm = {};	// @textField
	var newPassword = {};	// @textField
	var bvalid = {};	// @button
	var button4 = {};	// @button
	var dataGrid3 = {};	// @dataGrid
	var dataGrid2 = {};	// @dataGrid
	var saveUserInfosBtn = {};	// @button
	var dataGrid1 = {};	// @dataGrid
	var avatarUpload = {};	// @fileUpload
	var returnMessagePreviewBtn = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	passwordChangedDialog.onValidClick = function passwordChangedDialog_onValidClick (event)// @startlock
	{// @endlock
		$$(getHtmlId('passwordChangedDialog')).closeDialog();
	};// @lock

	modifyPasswordText.click = function modifyPasswordText_click (event)// @startlock
	{// @endlock
		$$(getHtmlId('modifyPasswordDialog')).displayDialog();
	};// @lock

	pwdConfirm.keyup = function pwdConfirm_keyup (event)// @startlock
	{// @endlock
		if ($$(getHtmlId('pwdConfirm')).getValue().length > 0){
			forums.check_same_password($$(getHtmlId('newPassword')).getValue(), 
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

	newPassword.keyup = function newPassword_keyup (event)// @startlock
	{// @endlock
		
		entropy = forums.check_password_entropy($$(getHtmlId('newPassword')).getValue());
		$$(getHtmlId('entropyId')).setValue(entropy);
		
		$$($comp.id+'_imgSamePwd').hide();
		
		// Is the password Safe ?
		if ($$($comp.id+'_newPassword').getValue().length > 0){
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

	bvalid.click = function bvalid_click (event)// @startlock
	{// @endlock
		$comp.sources.user.changePassword($$(getHtmlId('oldPassword')).getValue(),$$(getHtmlId('newPassword')).getValue(),{onSuccess:function(evt){
			if(evt.result === true){
				$$(getHtmlId("modifyPasswordDialog")).closeDialog(); //ok button
				$$(getHtmlId("passwordChangedDialog")).openDialog(); //ok button
			}else if(evt.result.error === 7){
				$$(getHtmlId('errorDiv2')).setValue(evt.result.errorMessage);
			}else{
				$$(getHtmlId('errorDiv2')).setValue('An error occurs during the process, please try again.');
			}
		}});
	};// @lock

	button4.click = function button4_click (event)// @startlock
	{// @endlock
		$$(getHtmlId("modifyPasswordDialog")).closeDialog(); //cancel button
	};// @lock

	dataGrid3.onRowDblClick = function dataGrid3_onRowDblClick (event)// @startlock
	{// @endlock
		forums.selectSpecificPost($comp.sources.posts.ID);
		forums.closeCenterComp($comp);
	};// @lock

	dataGrid3.onRowDraw = function dataGrid3_onRowDraw (event)// @startlock
	{// @endlock
		//debugger;
		if(event.row.rowNumber === 0){
			if(event.element === null){
				event.row.cells[0].dom[0].children[0].textContent = 'No Posts';
			/*}else{
				event.row.cells[0].dom[0].children[0].textContent = moment(event.element.stamp).format('DD/MM/YYYY');*/
			}
		}
	};// @lock

	dataGrid2.onRowDraw = function dataGrid2_onRowDraw (event)// @startlock
	{// @endlock
		if(event.element === null && event.row.rowNumber === 0){
			event.row.cells[0].dom[0].children[0].textContent = 'No Threads';
		}
	};// @lock

	saveUserInfosBtn.click = function saveUserInfosBtn_click (event)// @startlock
	{// @endlock
		var firstName = $$(getHtmlId('userFirstNameField')).getValue();
		var lastName = $$(getHtmlId('userLastNameField')).getValue();
		var email = $$(getHtmlId('userEmailField')).getValue();
		var login = $$(getHtmlId('userLoginField')).getValue();
		$comp.sources.user.updateUserInfos(firstName,lastName,email,login,{onSuccess:function(evt){
			$$(getHtmlId('errorDiv1')).setTextColor('green');
			$$(getHtmlId('errorDiv1')).setValue('Update Ok');
		},onError:function(err){
			$$(getHtmlId('errorDiv1')).setTextColor('red');
			$$(getHtmlId('errorDiv1')).setValue(err.error[0].message);
		}});
	};// @lock

	dataGrid1.onRowDraw = function dataGrid1_onRowDraw (event)// @startlock
	{// @endlock
		if(event.element === null && event.row.rowNumber === 0){
			event.row.cells[0].dom[0].children[0].textContent = 'No Subscription';
		}else if(event.element !== null){
			if(event.element.accepted === true){
		        event.row.cells[0].dom.css("color","green");
		        event.row.cells[0].dom[0].children[0].textContent = event.element.getAttributeValue('forum.title');
		    }else{
		        event.row.cells[0].dom.css("color","red");
		        event.row.cells[0].dom[0].children[0].textContent = event.element.getAttributeValue('forum.title');
		    }
		}
	};// @lock

	avatarUpload.filesUploaded = function avatarUpload_filesUploaded (event)// @startlock
	{// @endlock
		$comp.sources.user.addAvatar(event.response[0].path,{onSuccess:function(evt){
			$comp.sources.user.serverRefresh({forceReload:true});
			waf.widgets.centerComp_image1.rebuild(); // To force firefox to reload the image
		}});
	};// @lock

	returnMessagePreviewBtn.click = function returnMessagePreviewBtn_click (event)// @startlock
	{// @endlock
		forums.closeCenterComp($comp);
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_dataGrid3", "onRowDblClick", dataGrid3.onRowDblClick, "WAF");
	WAF.addListener(this.id + "_passwordChangedDialog", "onValidClick", passwordChangedDialog.onValidClick, "WAF");
	WAF.addListener(this.id + "_modifyPasswordText", "click", modifyPasswordText.click, "WAF");
	WAF.addListener(this.id + "_pwdConfirm", "keyup", pwdConfirm.keyup, "WAF");
	WAF.addListener(this.id + "_newPassword", "keyup", newPassword.keyup, "WAF");
	WAF.addListener(this.id + "_bvalid", "click", bvalid.click, "WAF");
	WAF.addListener(this.id + "_button4", "click", button4.click, "WAF");
	WAF.addListener(this.id + "_dataGrid3", "onRowDraw", dataGrid3.onRowDraw, "WAF");
	WAF.addListener(this.id + "_dataGrid2", "onRowDraw", dataGrid2.onRowDraw, "WAF");
	WAF.addListener(this.id + "_saveUserInfosBtn", "click", saveUserInfosBtn.click, "WAF");
	WAF.addListener(this.id + "_dataGrid1", "onRowDraw", dataGrid1.onRowDraw, "WAF");
	WAF.addListener(this.id + "_avatarUpload", "filesUploaded", avatarUpload.filesUploaded, "WAF");
	WAF.addListener(this.id + "_returnMessagePreviewBtn", "click", returnMessagePreviewBtn.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
