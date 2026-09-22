$(function() {


	var scrollUpdate = function()

	{
		if($(window).scrollTop() >= $(".info-strip").height() + 120)
		{
			
			$(window).unbind('scroll');
			
			 $('#sidebar.is-open').animate({
			    opacity: 0
			  }, 250, function() {
			    $("#sidebar").removeClass('is-open');
			    $("#sidebar").css('opacity', 1);
		      sessvars.menu_open = false;			    
			  });
		} 
	};

//	$(window).scroll(scrollUpdate);
//	scrollUpdate();
  
});	