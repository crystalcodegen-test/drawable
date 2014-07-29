Main.newDocument = function()
{
	/* get scope */
	$scope = this;
	
	$scope.toggleFileOptions(true);
	
	var document_name = new String;
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (var i = 0; i < 5; i++) {
		document_name += possible.charAt(Math.floor(Math.random() * possible.length));
    }
	
	$scope.showAlert({
		text : 'New Drawable<input id="alert-value" type="text" value="' + document_name + '" />',
		buttons : {
			'Cancel' : {
				click : function()
				{
					$scope.hideAlert();
				}
			},
			'Save' : {
				click : function()
				{
					$('#drawable-document').empty();
					
					$scope.hideAlert();
					
					var document_name = $('#alert-value').val();
					
					$scope.createDocument(document_name);
				}
			}
		}
	});
};