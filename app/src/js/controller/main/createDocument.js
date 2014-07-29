Main.createDocument = function(document_name)
{
	/* get scope */
	$scope = this;
	
	/* create document from path */
	$scope.http.post(Api.URL.Documents, {
		name : document_name
	
	/* created document */
	}).success(function(response) {
		/* get document from response data */
		var document = response.data;
		
		/* set document & title */
		$scope.setDocument(document, null, null, $scope.location);
		
		/* create a layer */
		$scope.http.post(Api.URL.Layers, {
			document : response.data.id,
			name : 'Layer #1'
		/* created layer */
		}).success(function(response) {
			$scope.drawable.layers = new Object;
			$scope.drawable.layers[response.data.id] = response.data.name;
		});
	});
	
	$scope.hideAlert();
};