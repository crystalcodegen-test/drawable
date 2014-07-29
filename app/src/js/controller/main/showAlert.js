Main.showAlert = function(opts)
{
	$('#alert-text').html(opts.text);
	
	$('#alert-buttons').empty();
	
	var button;
	for (var i in opts.buttons) {
		button = $(document.createElement('button'));
		button.click(opts.buttons[i].click);
		button.text(i);
		$('#alert-buttons').append(button);
	}
	
	$('#alert, #overlay').fadeIn();
	
	$('#alert').find('input').select();
};