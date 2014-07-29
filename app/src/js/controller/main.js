var Main = {};

function MainController($scope, $location, $http, storage)
{
	/* initialize API */
	Api.init();
	
	$scope.socket = new Socket({
		message : function(message)
		{
			if (!message.data || !message.data.document || message.data.document != $scope.drawable.id) {
				return;
			}
			
			switch (message.action) {
				case 'deleteLayer' : {
					$scope.drawable.deleteLayer(
						message.data.layer
					);
					break;
				}
				case 'drawObject' : {
					$scope.drawable.addObject(
						new DrawableObject(message.data)
					);
					break;
				}
				case 'eraseObject' : {
					$scope.drawable.deleteObject(
						message.data.object
					);
					break;
				}
				case 'updateObject' : {
					$scope.drawable.updateObject(
						message.data.object,
						message.data
					);
					break;
				}
			}
		}
	});
	$scope.socket.init();
	
	$scope.colors = [
		'#336666',
		'#666633',
		'#336633',
		'#663333',
		'#666666',
		'#000000'
	];
	$scope.hideColors = true;
	$scope.hideFileOptions = true;
	$scope.hideLayers = true;
	$scope.hideStrokes = true;
	$scope.hideTools = false;
	$scope.hideWindows = true;
	$scope.http = $http;
	$scope.layersExpanded = new Object;
	$scope.objectsExpanded = new Object;
	$scope.selectedColor = '#336666';
	$scope.strokes = [
		{
			color : '#000',
			width : 5
		},
		{
			color : '#000',
			width : 3
		},
		{
			color : '#000',
			width : 1
		}
	];
	$scope.storage = storage;
	
	var tool_name = new String,
		tools = new Array;
	for (var i in Drawable.TOOL) {
		tools.push({
			name : i,
			tag : Drawable.TOOL[i]
		});
	}
	$scope.tools = tools;
	
	$scope.Drawable = Drawable;
	
	$scope.drawable = new DrawableDocument({
		height : 480,
		width : 640
	});
	$scope.drawable.onToolChange = function(tool) {
		if (tool == Drawable.TOOL.Selection) {
			$('#drawable-document').removeClass('drawing');
		} else {
			$('#drawable-document').addClass('drawing');
		}
		$scope.currentTool = tool;
		$scope.toggleTools(true);
	};
	
	$scope.addColor = Main.addColor;
	$scope.addLayer = Main.addLayer;
	$scope.createDocument = Main.createDocument;
	$scope.deleteSelectedLayer = Main.deleteSelectedLayer;
	$scope.deleteSelectedObjects = Main.deleteSelectedObjects;
	$scope.hideAlert = Main.hideAlert;
	$scope.hideUsers = true;
	$scope.loadDocument = Main.loadDocument;
	$scope.location = $location;
	$scope.newDocument = Main.newDocument;
	$scope.saveDocument = Main.saveDocument;
	$scope.selectLayer = Main.selectLayer;
	$scope.selectObject = Main.selectObject;
	$scope.setColor = Main.setColor;
	$scope.setDocument = Main.setDocument;
	$scope.setTitle = Main.setTitle;
	$scope.showAlert = Main.showAlert;
	$scope.stopDragging = Main.stopDragging;
	$scope.storeDocument = Main.storeDocument;
	$scope.toggleColors = Main.toggleColors;
	$scope.toggleFileOptions = Main.toggleFileOptions;
	$scope.toggleLayer = Main.toggleLayer;
	$scope.toggleLayers = Main.toggleLayers;
	$scope.toggleObject = Main.toggleObject;
	$scope.toggleStrokes = Main.toggleStrokes;
	$scope.toggleTools = Main.toggleTools;
	$scope.toggleUsers = Main.toggleUsers;
	$scope.toggleWindows = Main.toggleWindows;
	
	$scope.drawable.setTool(Drawable.TOOL.Selection);
	
	/* handle shortcuts */
	$(window).keydown(function(e) {
		Shortcut.key(e, $scope);
	});
	
	/* document specified via path */
	if (window.location.pathname.length > 1) {
		/* get document name from path */
		var document_name = window.location.pathname.substr(1);
		
		/* get document */
		$http.get(
			Api.URL.Documents + '/' + document_name
			
		/* document exists */
		).success(function(response) {
			/* get document & objects from response data */
			var document = response.data,
				layers = response.layers,
				objects = response.objects;
			
			/* set document & title */
			$scope.setDocument(document, layers, objects, $location);
			
		/* document does not exist */
		}).error(function(response) {
			$scope.showAlert({
				text : 'Drawable does not exist. Would you like to create it?',
				buttons : {
					'Yes' : {
						click : function()
						{
							$scope.createDocument(document_name);
						}
					},
					'No' : {
						click : function()
						{
							$location.path('/');
							
							$scope.hideAlert();
						}
					}
				}
			});
			return;
		});
	}
};