var DrawableDocument = function(opts)
{
	this.backgroundColor = opts.backgroundColor ? opts.backgroundColor : '#FFF';
	this.counter = 1;
	this.currentColor = opts.color ? opts.color : '#336666';
	this.currentLayer = null;
	this.currentObject = null;
	this.currentTool = null;
	this.element = $('#drawable-document');
	this.id = null;
	this.isDrawing = false;
	this.isMoving = false;
	this.layers = new Object;
	this.name = null;
	this.objects = new Object;
	this.selectedObject = null;
	this.selectedObjects = new Array;
	this.stroke = opts.stroke ? opts.stroke : {
		color : '#000',
		width : '5px'
	};
	this.x = null;
	this.y = null;
	
	this.onToolChange = null;
	
	this.addObject = function(object)
	{
		/* add object element to document */
		$('#drawable-document').append(object.element);
		
		/* add object to list of objects */
		this.objects[object.id] = object;
	};
	
	this.deleteObject = function(object)
	{
		/* get object id from Object or String */
		var object_id = object instanceof Object ? object.id : object;
		
		/* remove object from svg */
		this.objects[object_id].element.remove();
		
		/* remove object from list of objects */
		delete(this.objects[object_id]);
		
		/* remove object from list of layers */
		for (var i in this.layers) {
			for (var n in this.layers[i].objects) {
				if (n === object_id) {
					delete(this.layers[i].objects[n]);
				}
			}
		}
		
		/* remove bounding box */
		$('#drawable-bounding-box-' + object_id).remove();
	};
	
	this.deleteLayer = function(layer)
	{
		/* get layer id from Object or String */
		var layer_id = layer instanceof Object ? layer.id : layer;
		
		/* remove layer from list of layers */
		delete(this.layers[layer_id]);
		
		/* reset current layer */
		if (this.currentLayer === layer_id) {
			delete(this.currentLayer);
		}
	};
	
	this.deselectAllObjects = function()
	{
		/* remove all bounding boxes */
		$('#drawable-overlays .drawable-bounding-box').remove();
		
		/* reset selected object(s) */
		delete(this.selectedObject);
		this.selectedObjects = new Array;
	};
	
	this.deselectObject = function(object)
	{
		/* get object */
		var object = object instanceof Object ? object : this.objects[object];
		
		/* remove object's bounding box */
		$('#drawable-bounding-box-' + object.id).remove();
		
		/* remove object from selected objects */
		this.selectedObjects.splice(
			this.selectedObjects.indexOf(object.id),
			1
		);
	};
	
	this.moveObjects = function(object_ids, direction, value, http, socket)
	{
		var object, object_id;
		for (var i in object_ids) {
			object_id = object_ids[i];
			object = this.objects[object_id];
			
			switch (direction) {
				case 'down' : {
					object_data = {
						top : object.top + value
					};
					break;
				}
				case 'left' : {
					object_data = {
						left : object.left - value
					};
					break;
				}
				case 'right' : {
					object_data = {
						left : object.left + value
					};
					break;
				}
				case 'up' : {
					object_data = {
						top : object.top - value
					};
					break;
				}
			}
			
			object.update(object_data);
			
			if (object_data.left !== undefined) {
				object.element.data('x', object_data.left);
				$('#drawable-bounding-box-' + object_id).attr('x', object_data.left);
			} else if (object_data.top !== undefined) {
				object.element.data('y', object_data.top);
				$('#drawable-bounding-box-' + object_id).attr('y', object_data.top);
			}

			object_data.document = this.id;
			object_data.object = object_id;
			
			socket.send({
				action : 'updateObject',
				data : object_data
			});
			
			http({
				method : 'PATCH',
				data : object_data,
				url : Api.URL.Objects + '/' + object_id
			});
		}
	};
	
	this.selectObject = function(object, reset_selection)
	{
		/* get object */
		var object = object instanceof Object ? object : this.objects[object];
		
		if (this.selectedObjects.indexOf(object.id) === -1) {
			if (reset_selection === true) {
				/* reset selected objects */
				this.selectedObjects = new Array;
				
				/* remove other bounding boxes */
				$('#drawable-overlays .drawable-bounding-box').remove();
			}
			
			/* add selected object */
			this.selectedObjects.push(object.id);
			
			/* add bounding box to overlays */
			var bounding_box = $(document.createElementNS(Drawable.NAMESPACE, 'rect'));
			bounding_box.addClass('drawable-bounding-box')
				.attr('id', 'drawable-bounding-box-' + object.id)
				.attr('height', object.height)
				.attr('width', object.width)
				.attr('x', object.left)
				.attr('y', object.top)
				.show();
			$('#drawable-overlays').append(bounding_box);
			
			/* set object's color as current color */
			this.currentColor = object.color;
		}
	};
	
	this.setColor = function(color)
	{
		this.currentColor = color;
		if (this.currentObject) {
			this.currentObject.setColor(color);
		}
	};
	
	this.setStroke = function(stroke)
	{
		this.currentStroke = stroke;
		if (this.currentObject) {
			this.currentObject.setStroke(stroke);
		}
	};
	
	this.setTool = function(tool)
	{
		if (_.values(Drawable.TOOL).indexOf(tool) === -1) {
			throw 'Unknown tool: ' + tool;
		}
		this.currentTool = tool;
		this.onToolChange(tool);
	};
	
	this.startDrawing = function(e, socket)
	{
		this.isDrawing = true;
		this.isMoving = false;
		this.x = e.offsetX;
		this.y = e.offsetY;
		
		/* handle selection tool */
		if (this.currentTool == Drawable.TOOL.Selection) {
			/* get selected object from click */
			var selected_object = $(e.target).data('object');
			
			/* selected object not clicked, start selection instead */
			if (!selected_object) {
				var drawable_selection = $('#drawable-selection');
				drawable_selection.attr('height', 0)
					.attr('width', 0)
					.attr('x', e.offsetX)
					.attr('y', e.offsetY);
				drawable_selection.data('x', e.offsetX)
					.data('y', e.offsetY);
				drawable_selection.show();
				
				this.deselectAllObjects();
				
				return;
			}
			
			this.selectObject(selected_object, !e.shiftKey);
			
			return;
		}

		$('body').addClass('drawing');
		
		var drawable_object_data = {
			document : this.id,
			color : this.currentColor,
			left : e.offsetX,
			name : 'Object #' + this.counter,
			tool : this.currentTool,
			top : e.offsetY
		};
		
		var drawable_object = new DrawableObject(drawable_object_data);
		
		this.addObject(drawable_object);
		this.counter++;
		this.currentObject = drawable_object;
		
		if (this.id) {
			socket.send({
				action : 'drawObject',
				data : drawable_object_data
			});
		}
	};
	
	this.stopDrawing = function(e, socket, http)
	{
		this.isDrawing = false;
		this.isMoving = false;
		
		$('body').removeClass('drawing');
		
		if ($(e.target).attr('id') != 'drawable' && !$(e.target).parents('#drawable').length) {
			return;
		
		} else if (this.currentTool == Drawable.TOOL.Selection) {
			if (!this.selectedObjects.length) {
				var drawable_selection = $('#drawable-selection'),
					object,
					object_id,
					objects = this.objects,
					selected_objects = this.selectedObjects;

				drawable_selection.hide();
				
				for (var i in objects) {
					object = objects[i];
					object_id = object.id;
					
					if (
						this.x <= object.left && e.offsetX >= object.left + object.width
						&&
						this.y <= object.top && e.offsetY >= object.top + object.height
					) {
						if (selected_objects.indexOf(object_id) === -1) {
							selected_objects.push(object_id);
							
							var bounding_box = $(document.createElementNS(Drawable.NAMESPACE, 'rect'));
							bounding_box.addClass('drawable-bounding-box')
								.attr('id', 'drawable-bounding-box-' + object_id)
								.attr('height', object.height)
								.attr('width', object.width)
								.attr('x', object.left)
								.attr('y', object.top)
								.show();
							$('#drawable-overlays').append(bounding_box);
						}
					}
				}
				
				return;
			}
			
			/* get selected object from click */
			var selected_object = $(e.target).data('object'),
				selected_objects = this.selectedObjects;
			
			/* selected object not clicked */
			if (!selected_object) {
				/* remove all bounding boxes */
				$('#drawable-overlays .drawable-bounding-box').remove();
				
				/* reset selected objects */
				delete(this.selectedObject);
				this.selectedObjects = new Array;
				
				return;
			}
			
			/* get selected object id */
			var selected_object_id = selected_object.id;
			
			if (
				selected_object.left == parseInt(selected_object.element.data('x'))
				&&
				selected_object.top == parseInt(selected_object.element.data('y'))
			) {
				if (selected_object_id == this.selectedObject) {
					delete(this.selectedObject);
					
					$('#drawable-bounding-box-' + selected_object_id).remove();
					selected_objects.splice(
						selected_objects.indexOf(selected_object_id),
						1
					);
				} else {
					this.selectedObject = selected_object_id;
				}
				
				return;
			}
			
			var objects = this.objects,
				selected_object,
				selected_object_id;
			
			for (var i in selected_objects) {
				selected_object_id = selected_objects[i];
				selected_object = objects[selected_object_id];
				
				selected_object.element.data('x', selected_object.left);
				selected_object.element.data('y', selected_object.top);
				
				http({
					method : 'PATCH',
					data : {
						left : selected_object.left,
						top : selected_object.top
					},
					url : Api.URL.Objects + '/' + selected_object_id
				});
			}
			
			return;
			
		} else if (
			parseInt(this.currentObject.element.attr('width')) == 0
			&&
			parseInt(this.currentObject.element.attr('height')) == 0
			&&
			!this.isMoving
		) {
			this.currentObject.element.attr('height', 100);
			this.currentObject.element.attr('width', 100);
			
		} else if (
			parseInt(this.currentObject.element.attr('width')) <= 0
			||
			parseInt(this.currentObject.element.attr('height')) <= 0
		) {
			this.currentObject.element.remove();
			
			if (this.id) {
				socket.send({
					action : 'eraseObject',
					data : {
						document : this.id,
						name : this.currentObject.name
					}
				});
			}
		}
		
		http.post(Api.URL.Objects, {
			color : this.currentObject.color,
			document : this.id,
			height : this.currentObject.height,
			layer : this.currentLayer,
			left : this.currentObject.left,
			name : this.currentObject.name,
			tool : this.currentObject.tool,
			top : this.currentObject.top,
			width : this.currentObject.width
		});
		
		delete(this.currentObject);
	};
	
	this.updateDrawing = function(e, socket, http)
	{
		if (!this.isDrawing) {
			return;
		}
		
		if (this.currentTool == Drawable.TOOL.Selection) {
			if (this.selectedObjects.length) {
				var objects = this.objects,
					selected_object,
					selected_object_id,
					selected_objects = this.selectedObjects;
				
				for (var i in selected_objects) {
					selected_object_id = selected_objects[i];
					selected_object = objects[selected_object_id];
					
					selected_object_left = parseInt(selected_object.element.data('x')) - (this.x - e.offsetX);
					selected_object_top = parseInt(selected_object.element.data('y')) - (this.y - e.offsetY);
					
					selected_object.update({
						left : selected_object_left,
						top : selected_object_top
					});
					
					$('#drawable-bounding-box-' + selected_object_id).attr('x', selected_object_left);
					$('#drawable-bounding-box-' + selected_object_id).attr('y', selected_object_top);
					
					socket.send({
						action : 'updateObject',
						data : {
							document : this.id,
							left : selected_object.left,
							object : selected_object_id,
							top : selected_object.top
						}
					});
				}
				
			} else {
				var selection_x = parseInt($('#drawable-selection').data('x')),
					selection_y = parseInt($('#drawable-selection').data('y'));
				var selection_height = e.offsetY - selection_y,
					selection_width = e.offsetX - selection_x;
				
				if (selection_height < 0) {
					selection_height = -selection_height;
					selection_x = e.offsetX;
				}
				if (selection_width < 0) {
					selection_width = -selection_width;
					selection_y = e.offsetY;
				}
				
				$('#drawable-selection').attr('height', selection_height);
				$('#drawable-selection').attr('width', selection_width);
				$('#drawable-selection').attr('x', selection_x);
				$('#drawable-selection').attr('y', selection_y);
			}
			
			return;
		}
		
		this.isMoving = true;
		
		var offset_x = e.offsetX,
			offset_y = e.offsetY;
		
		if ($(e.target).attr('id') == 'main') {
			offset_x = offset_x - $('#drawable-document').offset().left;
			offset_y = offset_y - $('#drawable-document').offset().top;
		}
		
		var element_left = parseInt(this.currentObject.element.data('x'));
		var element_top = parseInt(this.currentObject.element.data('y'));
		
		var element_x = offset_x - element_left,
			element_y = offset_y - element_top;
		
		if (element_x < 0) {
			element_left += element_x;
			var element_width = element_x * -1;
		} else {
			var element_width = element_x;
		}
		
		if (element_y < 0) {
			element_top += element_y;
			var element_height = element_y * -1;
		} else {
			var element_height = element_y;
		}
		
		this.currentObject.update({
			height : element_height,
			left : element_left,
			top : element_top,
			width : element_width
		});
		
		if (this.id) {
			socket.send({
				action : 'updateObject',
				data : {
					document : this.id,
					height : element_height,
					left : element_left,
					object : this.currentObject.id,
					top : element_top,
					width : element_width
				}
			});
		}
		
		/*
		switch (this.currentTool) {
			case Drawable.TOOL.Ellipse : {
				var element_left = parseInt(this.currentObject.element.data('x'));
				var element_top = parseInt(this.currentObject.element.data('y'));
				
				var element_x = e.offsetX - element_left,
					element_y = e.offsetY - element_top;
				
				if (element_x < 0) {
					element_left += element_x;
					var element_width = element_x * -1;
				} else {
					var element_width = element_x;
				}
				
				if (element_y < 0) {
					element_top += element_y;
					var element_height = element_y * -1;
				} else {
					var element_height = element_y;
				}
				
				break;
			}
			case Drawable.TOOL.Line : {
				this.currentObject.element
					.attr('x2', e.offsetX)
					.attr('y2', e.offsetY);
				
				break;
			}
			case Drawable.TOOL.Rectangle : {
				var element_left = parseInt(this.currentObject.element.data('x'));
				var element_top = parseInt(this.currentObject.element.data('y'));
				
				var element_x = e.offsetX - element_left,
					element_y = e.offsetY - element_top;
				
				if (element_x < 0) {
					element_left += element_x;
					var element_width = element_x * -1;
				} else {
					var element_width = element_x;
				}
				
				if (element_y < 0) {
					element_top += element_y;
					var element_height = element_y * -1;
				} else {
					var element_height = element_y;
				}
				
				break;
			}
		}
		*/
	};
	
	this.updateObject = function(object_id, data)
	{
		var object, objects = this.objects;
		for (var i in objects) {
			if (i == object_id) {
				object = objects[i];
				break;
			}
		}
		
		if (!object) {
			return;
		}
		
		object.update(data);
	};
};