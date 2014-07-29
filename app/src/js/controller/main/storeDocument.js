Main.storeDocument = function($scope, document)
{
	/* get documents from storage */
	var documents = $scope.storage.get('documents') || {};
	/* add document to documents */
	documents[document.id] = document.name;
	/* store documents */
	$scope.storage.set('documents', documents);
};