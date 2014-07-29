Main.saveDocument = function(name)
{
	/* get scope */
	$scope = this;
	
	$scope.toggleFileOptions(true);
	
	if (window.location.pathname.length > 1 && !name) {
		$scope.showAlert({
			text : 'Rename Drawable<input id="alert-value" type="text" value="' + $scope.drawable.name + '" />',
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
						$scope.saveDocument($('#alert-value').val());
						$scope.hideAlert();
					}
				}
			}
		});
		return;
	}
	
	if (name) {
		$scope.http({
			method : 'PATCH',
			data : {
				name : name
			},
			url : Api.URL.Documents + '/' + $scope.drawable.name
		}).success(function(response) {
			/* get document from response data */
			var document = response.data;
			
			/* set document */
			$scope.setDocument(document);
		});
		
	} else {
		var document_name = new String;
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		for (var i = 0; i < 5; i++) {
			document_name += possible.charAt(Math.floor(Math.random() * possible.length));
	    }
		
		$scope.createDocument(document_name);
	}
};