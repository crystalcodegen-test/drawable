Main.deleteSelectedLayer = function()
{
	/* get scope */
	$scope = this;
	
	/* show alert */
	$scope.showAlert({
		text : 'Are you sure you want to delete this layer and all of its objects?',
		buttons : {
			'No, Keep It' : {
				click : function()
				{
					/* hide alert */
					$scope.hideAlert();
				}
			},
			'Yes, Delete It' : {
				click : function()
				{
					/* hide alert */
					$scope.hideAlert();
					
					/* broadcast layer deletion */
					$scope.socket.send({
						action : 'deleteLayer',
						data : {
							document : $scope.drawable.id,
							layer : $scope.drawable.currentLayer
						}
					});
					
					/* delete layer */
					$scope.http.delete(Api.URL.Layers + '/' + $scope.drawable.currentLayer);
					
					/* remove layer from layers */
					delete($scope.drawable.layers[$scope.drawable.currentLayer]);
					delete($scope.drawable.currentLayer);
				}
			}
		}
	});
};