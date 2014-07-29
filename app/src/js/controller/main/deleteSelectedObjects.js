Main.deleteSelectedObjects = function()
{
	/* get scope */
	$scope = this;
	
	/* get selected objects */
	var selected_object_id,
		selected_objects = $scope.drawable.selectedObjects;
	
	/* loop thru each selected object */
	for (var i in selected_objects) {
		/* get selected object id */
		selected_object_id = selected_objects[i];
		
		/* broadcast object delection notification */
		$scope.socket.send({
			action : 'eraseObject',
			data : {
				document : $scope.drawable.id,
				object : selected_object_id
			}
		});
		
		/* delete object remotely */
		$scope.http.delete(Api.URL.Objects + '/' + selected_object_id);
		
		/* delete object locally */
		$scope.drawable.deleteObject(selected_object_id);
		
		/* reset selected objects */
		$scope.drawable.selectedObjects = new Array;
	}
};