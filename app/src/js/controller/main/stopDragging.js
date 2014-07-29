Main.stopDragging = function(e)
{
	if (
		parseInt($('#main-nav').css('left')) < 0
		||
		parseInt($('#main-nav').css('top')) < 0
	) {
		$('#main-nav').animate({
			left : 0,
			top : 0
		});
	}
};