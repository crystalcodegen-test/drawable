var Drawable = {
	/* define Drawable constants */
	FILTER : {
		Blend : 'blend',
		ColorMatrix : 'colorMatrix',
		ComponentTransfer : 'componentTransfer',
		Composite : 'composite'
	},
	NAMESPACE : 'http://www.w3.org/2000/svg',
	OPTION : {
		Stroke : 'stroke',
		StrokeDashArray : 'stroke-dasharray',
		StrokeLineCap : 'stroke-linecap',
		StrokeWidth : 'stroke-width'
	},
	TOOL : {
		Selection : 'selection',
		/*Circle : 'circle',*/
		Ellipse : 'ellipse',
		Line : 'line',
		Polygon : 'polygon',
		Polyline : 'polyline',
		Rectangle : 'rect',
		Text : 'text'
	},
	
	/* get drawable tools */
	getTools : function()
	{
		var tools = new Array;
		for (var i in Drawable.TOOL) {
			tools.push(
				Drawable.TOOL[i]
			);
		}
		return tools;
	}
};