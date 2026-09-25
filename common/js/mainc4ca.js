if ((!sessvars.menu_open && sessvars.menu_open == undefined) && location.pathname == '/' ) {
  sessvars.menu_open = false;
}

$(function() {	
  
  if(sessvars.search_results !== undefined) {
    $("#function-search-results").css("visibility", "visible");
    if(sessvars.term !== undefined){
      $("#function-search-term").attr('placeholder', sessvars.term);
      $("#function-search-results").html(sessvars.search_results);
    }
  }
  
  // set menu to open for first-time users on the homepage
	$scrollPos  = 0;
	
	if (sessvars.menu_open) {
	  $('#sidebar').addClass('is-open'); 
  }	 else {
	  $('#sidebar').removeClass('is-open');     
  }

	$('.function-select').customSelect();
	$("#function-select-constellations, #function-select-texts").change(function()
	{
		window.location.href = $(this).val();
	});

	$(".constellation .warburg img").css("opacity", 0);
	$(".constellation .warburg img").css("visibility", "visible"); /* todo hack */

	$(".constellation .warburg img").each(function() {
		$(this).imagesLoaded(function() {
			$(this).animate({"opacity": 1}, 300);
		});
	});

	$(document).on("click", ".constellation h2 a" ,function(e)
	{
		$(window).scrollTop(0);
		$("#lightworld").addClass("is-open");
		updateLayout();
	});
	
	$(window).resize(updateLayout);

	/*
	$(".constellation").each(function() {
		$this = $(this);
		$this.addClass("is-loading");

		$warburg = $(this).children(".warburg");
		$warburg.hide();

		$warburg.imagesLoaded(function() {
			$(this).fadeIn();
			$(this).parent().removeClass("is-loading");
			updateLayout();
		});
	});
	*/

	/*
	var centerImages = function()
	{
		$(".img-inset img").each(function()
		{
			var $this = $(this);
			$this.parent(".img-inset").width($this.width());
		});
	};
	$(window).load(centerImages);
	*/

	/* $(window).resize($.throttle(250, setWidths)); */
	
		var setWidths = function()
	{
		var $lightworld = $("#lightworld"),
			$sidebar = $("#sidebar"),
			newWidth = $(window).width() - $sidebar.width();

		/* if($sidebar.hasClass("is-open"))
		{
			$lightworld.width(newWidth);
		} else if(newWidth > parseInt($("body > .wrapper").css("min-width")) - $sidebar.width())
		{ */
			$lightworld.width(newWidth);
		/*}*/
	};

	var setHeights = function()
	{
		var $lightworld 		= $("#lightworld"),
			lightworldHeight 	= $lightworld.height("auto").height(),
			$darkworld 			= $("#darkworld"),
			darkworldHeight 	= $darkworld.height("auto").height(),
			$sidebar 			= $("#sidebar"),
			sidebarHeight 		= $sidebar.height("auto").height(),
			sidebarOpen 		= $sidebar.hasClass("is-open"),
			windowHeight 		= $(window).height(),
			height 				= 0;

		if($lightworld.hasClass("is-open"))
		{
			if(lightworldHeight > sidebarHeight || !sidebarOpen) {
				height = lightworldHeight;
			} else {
				height = sidebarHeight;
			}
		} else {
			if(darkworldHeight > sidebarHeight || !sidebarOpen) {
				height = darkworldHeight;
			} else {
				height = sidebarHeight;
			}
		}

		if(height < windowHeight) {
			height = windowHeight;
		}

		$lightworld.height(height);
		//$darkworld.height(height);

		if($sidebar.hasClass("is-open"))
		{
			$sidebar.height(height);
		} else {
			$sidebar.height("auto");
		}
	};
	
	var updateLayout_menu = function()
	{
		setWidths();
		setHeights();

		if($("#lightworld").hasClass("is-open"))
		{	
			//alert($scrollPos);
			$("#darkworld").css("position", "fixed");
			//$(window).scrollTop(0);
			
		} else {
			$("#darkworld").css("position", "static");
			
		}
	}
	
	var updateLayout = function()
	{
		setWidths();
		setHeights();

		if($("#lightworld").hasClass("is-open"))
		{	
			//alert($scrollPos);
			$("#darkworld").css("position", "fixed");
			$("#darkworld").css("top", -$scrollPos);
			$(window).scrollTop(0);
			
		} else {
			$("#darkworld").css({"position" : "static", "top" : 0});
			$(window).scrollTop($scrollPos);
			
		}
	}
	
	updateLayout();
  console.log(location.hash);
  if (location.hash.indexOf('fnref') != 1 && location.hash.indexOf('fn') != 1 ){  
	  $(window).load(updateLayout);
  }
	$(window).resize(updateLayout);

	$(document).on("click", "#lightworld #function-close" ,function(e)
	{
		//e.preventDefault();
		$(window).scrollTop(0);
		$("#lightworld").removeClass("is-open");
		updateLayout();
	});
	
	$(document).on("click", "#lightworld #function-close-img" ,function(e)
	{
		//e.preventDefault();
		$(window).scrollTop(0);
		$("#lightworld").removeClass("is-open");
		updateLayout();
	});
	
	
	$(document).on("click", "#toggle" ,function(e)
	{
		e.preventDefault();
		$(window).scrollTop(0);
		$("#lightworld").addClass("is-open");
		updateLayout();
	});
	
	/*
	$("#darkworld").on('click', function() 
	{
		if(!$(".#function-close").hasClass("is-hidden"))
		{
			$(window).scrollTop(0);
			$("#lightworld").removeClass("is-open");
			updateLayout();
		}
	});
	*/

	var updateToggleMenu = function()
	{
		$toggleMenu = $("#function-toggle-menu");
		if($toggleMenu.hasClass("is-hovered"))
		{
			if($("#sidebar").hasClass("is-open"))
			{
				$toggleMenu.html("Close Menu");			
			} else {
				$toggleMenu.html("Open Menu");
			}			
		} else {
			$toggleMenu.html("Menu");
		}
	};

	$(document).on("click", "#function-toggle-menu" ,function(e)
	{
		e.preventDefault();
		$("#sidebar").toggleClass("is-open");
		if ($('#sidebar').hasClass("is-open")) {
		  sessvars.menu_open = true;
	  } else {
		  sessvars.menu_open = false;	    
    }
		updateLayout_menu();
		updateToggleMenu();
	});
	
	$("#function-toggle-menu").hover(
	function (e) {
		$(this).addClass("is-hovered");
		updateToggleMenu();
	}, function() {
		$(this).removeClass("is-hovered");
		updateToggleMenu();
	}	
	);


	$("#function-image-archive").hover(
	function (e)
	{
		$(this).html("View image archive");
	}, function() {
		$(this).html("Image archive");
	}	
	);

	
    var hideCategories = function()
    {
    	var countToShow = 5;
    	$(".categories").removeClass("is-open");
    	$(".categories li").each(function(i) {
    		if(i > countToShow)
    		{
    			$(this).hide();
    		}
    	});
    	$("#function-show-all").html("Show all");
    };
    var showCategories = function()
    {
    	$(".categories").addClass("is-open");
    	$(".categories li").show();
    	$("#function-show-all").html("Hide all");
    };

    $("#function-show-all").on('click', function(e)
    {
    	e.preventDefault();
    	if($(".categories").hasClass("is-open"))
    	{
    		hideCategories();
    	} else {
			showCategories();
    	}
    	updateLayout();
    });

    hideCategories();

     var search_by_tag = function(search_term) {
		var search_term = encodeURIComponent(search_term),
			search_url  = "http://susanbuckmorss.info/common/partials/search.php?tag=" + search_term;

		$("#function-search-results").css("visibility", "visible");
		$("#function-search-results").load(search_url, function() {
			updateLayout();
		});
    };
    
    var search_by_cat= function(search_term) {
		var search_term = encodeURIComponent(search_term),
			search_url  = "http://susanbuckmorss.info/common/partials/search.php?tag=" + search_term;

		$("#function-category-results").css("visibility", "visible");
		$("#function-category-results").load(search_url, function() {
			updateLayout();
		});
    };
    
    var search_by_search= function(search_term) {
      sessvars.term = search_term;
		var search_term = encodeURIComponent(search_term),
			search_url  = "http://susanbuckmorss.info/common/partials/search-full.php?q=" + search_term;

		$("#function-search-results").css("visibility", "visible");
		$("#function-search-results").load(search_url, function() {
			updateLayout();
		  sessvars.search_results = $("#function-search-results").html();			
		});

    };

    $(document).on("click", ".categories li a" ,function(e)
    {
    	e.preventDefault();
    	search_by_cat($(this).html());
    });

    $(document).on("click", ".tags li a" ,function(e)
    {
    	e.preventDefault();
    	if(!$("#sidebar").hasClass("is-open"))
    	{
    		$("#sidebar").addClass("is-open");
    		updateLayout();
    	}
    	$('html, body').animate({
    		scrollTop: $("#function-search-results").offset().top - 100
    	}, 'slow');
    	search_by_tag($(this).html());
    });

    $("#function-search").bind("submit", function(e)
    {
    	e.preventDefault();
    	search_by_search($("#function-search-term").val());
    });

    $(document).on("click", "#function-print" ,function(e)
	{
		e.preventDefault();
		window.print();	
	});
	
	
	/*
$("a.internal").on('click', function(e)
	{
	
		
	
		e.preventDefault();
		$("#lightworld").addClass("is-open");
		updateLayout();
		
		var $img = $(this).attr('href');
		//alert($img);
    	//newScrollPos = $img.offset().top - ($(window).height() / 2) + ($img.height() / 1.5);
    	
    	$('html, body').animate({
    			scrollTop: $($img).position().top
    	}, 'normal;');

	});
*/	

function show_fig($word1, $int1) {
	$id = $word1 + '_' + $int1;
	
	//$("#sidebar").removeClass('is-open');
	
	$('.wrapper.img_holder').hide();
	$('#lightworld .wrapper').show();
	$("#lightworld").addClass("is-open");
	updateLayout();
	$.scrollTo($('#' +  $id),  300, {offset:-50});   	
}

function show_img($int1) {

	$.ajax({
	  url: '/common/partials/image.php',
	  method: 'GET',
	  data: {
	   	id: $int1
	  },
	  success: function(data) {
	  	$('#lightworld .wrapper').not('.img_holder').hide();
	  	$('.wrapper.img_holder').html(data);
	  	$("#lightworld").addClass("is-open");

	  	updateLayout();
	    //alert(data)
	  }
	})  	

}




$("a.internal").on('click', function(e)
	{
	  $scrollPos  =  $(window).scrollTop();
	  var txt = $(this).attr('href');

    loadLightworld(txt);
});

function loadLightworld(hash) {
  var re1='.*?';	// Non-greedy match on filler
  var re2='((?:[a-z][a-z]+))';	// Word 1
  var re3='.*?';	// Non-greedy match on filler
  var re4='(\\d+)';	// Integer Number 1

  var p = new RegExp(re1+re2+re3+re4,["i"]);
  var m = p.exec(hash);
  
  if (m != null)
  {
      $word1=m[1];
      $int1=m[2];
  
      if ($word1 == "fig") {
      
      show_fig($word1, $int1);
		  
      } else if ($word1 == 'fn') {
        // do default browser behavior for footnotes
      } else {
      console.log('zz');
      show_img($int1);	
        
      }
  }
  
  
}


    /*
    $(window).load(function() {
    	if(function_jump_to_image != null) {

    		var $img = $("#" + function_jump_to_image),
    			newScrollPos = $img.offset().top - ($(window).height() / 2) + ($img.height() / 1.5);

    		$('html, body').animate({
    			scrollTop: newScrollPos
    		}, 'slow');
    	}
    });
*/

	
		
	hash = window.location.hash.substring(1);
		
		if(typeof(hash) != "undefined" && hash !== null) {
		  if(hash == 'close') {
		    $("#lightworld #function-close").click();
	    }else{
        var re1='.*?';	// Non-greedy match on filler
        var re2='((?:[a-z][a-z]+))';	// Word 1
        var re3='.*?';	// Non-greedy match on filler
        var re4='(\\d+)';	// Integer Number 1

        var p = new RegExp(re1+re2+re3+re4,["i"]);
        var m = p.exec(hash);
    
        if (m != null)
        {
            $word1=m[1];
            $int1=m[2];
    
            if ($word1 == "fig") {
        
            $(window).load(function(){
        
            show_fig($word1, $int1);
        
            });	
  		  
            } else if ($word1 == 'fn' || $word1 == 'fnref') {
              
              anchorId = '#' + $word1 + '\\:' + $int1;
              $(window).scrollTop($(anchorId).offset().top);
        		  
            } else {

            show_img($int1);	
          
            }
      }
      }
      }
	
    function locationHashChanged() {      
        if (location.hash === "#close") {
      		$(window).scrollTop(0);
      		$("#lightworld").removeClass("is-open");
      		updateLayout();
        } else if (location.hash.indexOf('fnref') == 1){
          // do default browser behavior
          console.log('hi');
          if(!$('#lightworld').hasClass('is-open')) {
            $("#lightworld").addClass("is-open");
          	$('.wrapper.img_holder').hide();          		
          	$('.wrapper').show();
          	idString = location.hash.replace(':', '\\:');
        		updateLayout();
      		  $(window).scrollTop($(idString).offset().top);
        		
          }

        } else if (location.hash.indexOf('fn') == 1){
          // do default browser behavior
          console.log('there');
          if(!$('#lightworld').hasClass('is-open')) {
            $("#lightworld").addClass("is-open");
          	$('.wrapper.img_holder').hide();          		
          	$('.wrapper').show();
          	idString = location.hash.replace(':', '\\:');
        		updateLayout();
      		  $(window).scrollTop($(idString).offset().top);
        		
          }
          

        } else if(typeof(location.hash) != "undefined" && location.hash !== null) {
          if (location.hash === '') {
            //if the page shows lightworld by default
            if ($("body").hasClass("pagetype-text") || location.pathname.indexOf('page/index.html') > -1 || (location.pathname.indexOf('books/index.html') > -1 && location.pathname.length > 7)) {
          		$(window).scrollTop(0);
          		$("#lightworld").addClass("is-open");
            	$('.wrapper.img_holder').hide();          		
            	$('.wrapper').show();          		
          		updateLayout();            
            } else if (location.pathname == '/' || location.pathname.indexOf('constellation') > -1 || location.pathname.indexOf('/archive') > -1 || location.pathname == 'books/index.html') {
          		$(window).scrollTop(0);
          		$("#lightworld").removeClass("is-open");
          		updateLayout();            
              
            }
            
            
          }
          loadLightworld(location.hash);
        }
       	
    }
    window.onhashchange = locationHashChanged;
});

