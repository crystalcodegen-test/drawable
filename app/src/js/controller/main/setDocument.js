Main.setDocument = function(document, layers, objects, $location)
{
	/* get scope */
	$scope = this;
	
	/* set document as drawable */
	$scope.drawable.id = document.id;
	$scope.drawable.name = document.name;
	
	/* set page title */
	$scope.setTitle(document.name);
	
	/* update path */
	$scope.location.path(document.name);
	
	/* add document to storage */
	$scope.storeDocument($scope, {
		id : document.id,
		name : document.name
	});
	
	/* add layers */
	if (layers) {
		$scope.drawable.currentLayer = layers[0].id;
		$scope.drawable.layers = new Object;
		for (var i in layers) {
			layers[i].objects = new Object;
			
			if (objects) {
				for (var n in objects) {
					if (objects[n].layer_id != layers[i].id) {
						continue;
					}
					layers[i].objects[objects[n].id] = objects[n];
					$scope.drawable.addObject(
						new DrawableObject(objects[n])
					);
				}
			}
			
			$scope.drawable.layers[layers[i].id] = layers[i];
		}
	}
	
	console.log($scope.drawable.layers);
};