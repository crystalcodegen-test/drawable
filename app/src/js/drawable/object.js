var DrawableObject = function(opts)
{
	/* validate opts */
	if ($.inArray(opts.tool, _.values(Drawable.TOOL)) === -1) {
		throw 'Unknown tool: ' + opts.tool;
	}
	
	this.color = opts.color ? opts.color : '#336666';
	this.element = $(document.createElementNS(Drawable.NAMESPACE, opts.tool));
	this.element.data('object', this);
	this.height = opts.height ? opts.height : 0;
	this.id = opts.id;
	this.left = opts.left;
	this.name = opts.name;
	this.points = opts.points;
	this.stroke = opts.stroke ? opts.stroke : {
		color : '#000',
		width : '5px'
	};
	this.top = opts.top;
	this.tool = opts.tool;
	this.width = opts.width ? opts.width : 0;
	
	this.setColor = function(color)
	{
		this.color = color;
		
		this.element.attr('fill', color);
	};
	
	this.setStroke = function(stroke)
	{
		this.stroke = stroke;
		
		for (var i in stroke) {
			switch (i) {
				case 'color' : {
					this.element.attr('stroke', stroke[i]);
					break;
				}
				case 'width' : {
					this.element.attr('stroke-width', stroke[i]);
					break;
				}
			}
		}
	};
	
	this.update = function(opts)
	{
		if (opts.height !== undefined) {
			this.height = opts.height;
		}
		if (opts.left !== undefined) {
			this.left = opts.left;
		}
		if (opts.top !== undefined) {
			this.top = opts.top;
		}
		if (opts.width !== undefined) {
			this.width = opts.width;
		}
		
		switch (this.tool) {
			case Drawable.TOOL.Circle : {
				var size = (opts.width > opts.height ? opts.width : opts.height) / 2;
				this.element.attr('cx', opts.left + size);
				this.element.attr('cy', opts.top + size);
				this.element.attr('r', size);
				
				break;
			}
			case Drawable.TOOL.Ellipse : {
				console.log(opts);
				this.element.attr('cx', opts.left + (opts.width / 2));
				this.element.attr('cy', opts.top + (opts.height / 2));
				this.element.attr('rx', opts.width / 2);
				this.element.attr('ry', opts.height / 2);
				
				break;
			}
			case Drawable.TOOL.Line : {
				this.element.attr('x1', opts.left);
				this.element.attr('x2', opts.left);
				this.element.attr('y1', opts.top);
				this.element.attr('y2', opts.top);
				
				break;
			}
			case Drawable.TOOL.Rectangle : {
				if (opts.height !== undefined) {
					this.element.attr('height', opts.height);
				}
				if (opts.width !== undefined) {
					this.element.attr('width', opts.width);
				}
				if (opts.left !== undefined) {
					this.element.attr('x', opts.left);
				}
				if (opts.top !== undefined) {
					this.element.attr('y', opts.top);
				}
				
				break;
			}
			case Drawable.TOOL.Text : {
				this.element.attr('x', opts.left);
				this.element.attr('y', opts.top);
				this.element.text('Text');
				
				break;
			}
		}
		/*
		this.element.css({
			stroke : '#000',
			strokeWidth : '5px'
		});
		*/
	};
	
	this.setColor(this.color);
	this.setStroke(this.stroke);
	
	this.element.data('x', opts.left);
	this.element.data('y', opts.top);
	
	this.update({
		height : this.height,
		left : this.left,
		top : this.top,
		width : this.width
	});
};