var Shortcut = {
	Control : {},
	Shift : {},
	mapping : {
		8 : 'delete',
		27 : 'esc',
		32 : 'space',
		37 : 'left',
		38 : 'up',
		39 : 'right',
		40 : 'down',
		67 : 'c',
		68 : 'd',
		69 : 'e',
		70 : 'f',
		76 : 'l',
		80 : 'p',
		82 : 'r',
		83 : 's',
		84 : 't',
		85 : 'u',
		86 : 'v',
		87 : 'w',
		88 : 'x',
		191 : 'forwardSlash'
	},
	key : function(e, $scope)
	{
		console.log(e.keyCode);
		
		var mapping = Shortcut.mapping[e.keyCode];
		
		if (!mapping) {
			return;
		}
		
		switch (true) {
			case e.ctrlKey && Shortcut.Control[mapping] !== undefined : {
				Shortcut.Control[mapping]($scope);
				break;
			}
			case e.shiftKey && Shortcut.Shift[mapping] !== undefined : {
				Shortcut.Shift[mapping]($scope);
				break;
			}
			case Shortcut[mapping] !== undefined : {
				Shortcut[mapping]($scope);
				break;
			}
		}
	}
};