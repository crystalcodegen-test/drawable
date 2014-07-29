Main.addLayer = function()
{
	/* get scope */
	$scope = this;
	
	/* show alert */
	$scope.showAlert({
		text : 'New Layer<input id="alert-value" type="text" value="New Layer" />',
		buttons : {
			'Cancel' : {
				click : function()
				{
					/* hide alert */
					$scope.hideAlert();
				}
			},
			'Save' : {
				click : function()
				{
					/* hide alert */
					$scope.hideAlert();
					
					/* get layer name */
					var layer_name = $('#alert-value').val();
					
					/* create new layer */
					$scope.http.post(Api.URL.Layers, {
						document : $scope.drawable.id,
						name : layer_name
						
					/* layer created */
					}).success(function(response) {
						/* get layer from response data */
						var layer = response.data;
						
						/* add layer to layers */
						$scope.drawable.layers[layer.id] = layer;
						
						$scope.selectLayer(layer.id);
					});
				}
			}
		}
	});
};