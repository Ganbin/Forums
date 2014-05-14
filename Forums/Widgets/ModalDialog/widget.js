WAF.define('ModalDialog', [	'waf-core/widget'], function(widget) {
	
	
	/* Creation of the widget */
    var ModalDialog = widget.create('ModalDialog', {
    	/* Function executed in the initialization of my widget at runtime */
        init: function() {
        	
        	// Creation of the html tags 
        	this.node.innerHTML = '<div id="'+this.id+'-header" class="modalDialogHeader"><div id="'+this.id+'-title" class="modalDialogTitle"></div><button id="'+this.id+'-closeDialogButton" class="modalDialogCloseButton"></button></div>'+
			'<div id="'+this.id+'-main" class="modalDialogMain"></div>'+
			'<div id="'+this.id+'-footer" class="modalDialogFooter"><button id="'+this.id+'-cancelDialogButton" class="modalDialogCancelButton">Cancel</button><button id="'+this.id+'-validDialogButton" class="modalDialogValidButton">Valid</button></div>';
			this._initTitle(); // Initialize the title
			this._initText(); // Initialize the text
			this._initValidButtonText(); // Initialize the validation button text
			this._initCloseButtonEvent(); // Initialize the close button onClick event to close the modal dialog
			this._initCancelButtonEvent(); // Initialize the cancel button onClick event to close the modal dialog
			this.hide(); // Hide widget on load

        },
        
        /* Function who create the close button onClick event to close it */
        _initCloseButtonEvent: function(){
        	var closeBtn = $('#'+this.id+'-closeDialogButton'); //HTML tag
        	closeBtn.click(function(){
        		$$(this.parentElement.parentElement.attributes.id.value).closeDialog()
			});
        },
        
        /* Function who create the cancel button onClick event to close it */
        _initCancelButtonEvent: function(){
        	var cancelBtn = $('#'+this.id+'-cancelDialogButton'); //HTML tag
        	cancelBtn.click(function(){
        		$$(this.parentElement.parentElement.attributes.id.value).closeDialog()
			});
        },
        
        /* Initialization of the title at runtime */
        _initTitle: function(){
        	$('#'+this.id+'-main').text(this.text());
        },
        
        /* Initialization of the text at runtime */
        _initText: function(){
        	$('#'+this.id+'-title').text(this.title());
        },
        
        /* Initialization of the valid Button Text at runtime */
        _initValidButtonText: function(){
        	$('#'+this.id+'-validDialogButton').text(this.validButtonText());
        },
        
        
        /* openDialog method : Open the modal dialog widget in the front and in the middle of the application */
        openDialog:function(){
        	
        	/* Create the fade element to fulfil the window*/
        	var fadeDiv = $("<div>");
			fadeDiv.attr('id','fadeForModalDialog');
			fadeDiv.attr('class','fadeModal');
			$('body').append(fadeDiv); // Show the fade at the top DOM level
			$('body').append(this.node); // Put the modal Dialog at the top DOM level (This is to be sure the modal dialog is on top of all other at runtime, no matter where you put it in the designer)
			
        	this.show(); // Show the modal Dialog
        	
			$('#'+this.id).addClass('centerModal'); // Add the class to center the modal dialog
        },
        
        /* closeDialog : close the modal dialog */
        closeDialog:function(){
        	this.hide(); // hide the modal dialog
			$('#'+this.id).removeClass('centerModal'); // Remove the class that center the modal dialog
			$("#fadeForModalDialog").remove(); // remove the fade element from the DOM
        },
        
        /*Function that allow to set the title of the modal dialog
         * Accessible via $$('modalDialogID').setTitle('My Title');
         */
        setTitle:function(title){
        	if(title != null){
        		this.node.children[0].children[0].textContent = title;
        	}
        },
        
        /*Function that allow to set the text of the modal dialog
         * Accessible via $$('modalDialogID').setText('My Text');
         */
        setText:function(text){
        	if(text != null){
        		this.node.children[1].textContent = text;
        	}
        },
        
        /* Add the title property allow you to set the title directly in the GUI Designer in the property panel */
        title: widget.property({
		    type: 'string',
		    defaultValue: 'My Title',
		    bindable:false,
		    onChange : function(){
		    	this.node.children[0].children[0].textContent = this.title(); // Set the title in the GUI Designer when you change a value
		    }
		}),
		
		/* Add the text property allow you to set the text directly in the GUI Designer in the property panel */
        text: widget.property({
		    type: 'string',
		    defaultValue: 'My Text',
		    bindable:false,
		    onChange : function(){
		    	this.node.children[1].textContent = this.text(); // Set the text in the GUI Designer when you change a value
		    }
		}),
		
		/* Add the validButtonText property allow you to set the text for the valid button directly in the GUI Designer in the property panel */
        validButtonText: widget.property({
		    type: 'enum',
		    "values": {
		        Valid: "Valid",
		        Accept: "Accept",
		        Agree: "Agree",
		    	OK: "OK",
		    	Yes:"Yes"
		    },
		    bindable:false,
		    onChange : function(){
		    	this.node.children[2].children[1].textContent = this.validButtonText(); // Set the text in the GUI Designer when you change a value
		    }
		})
    });

	/* Add the onClick event for the validation button
	 * to allow the user to put his own code
	 */
	ModalDialog.mapDomEvents({
	    'click': 'onValidClick'
	}, '.modalDialogValidButton');

    return ModalDialog;

});

/* For more information, refer to http://doc.wakanda.org/Wakanda0.DevBranch/help/Title/en/page3871.html */