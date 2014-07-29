Main.loadDocument = function()
{
	/* get scope */
	$scope = this;
	
	$scope.toggleFileOptions(true);
	
	var documents = $scope.storage.get('documents');
	
	var alert_text = '<div>Load Drawable</div>';
	for (var i in documents) {
		alert_text += '<a style="display: block" href="#" onclick="window.location.href = \'/' + documents[i] + '\'">' + documents[i] + '</a>';
	}
	
	$scope.showAlert({
		text : alert_text,
		buttons : {
			'Cancel' : {
				click : function()
				{
					$scope.hideAlert();
				}
			}
		}
	});
};